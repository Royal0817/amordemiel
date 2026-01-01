<?php

function s3_build_url(array $s3, string $key): string
{
    $endpoint = rtrim($s3['endpoint'], '/');
    if ($s3['path_style']) {
        return $endpoint . '/' . $s3['bucket'] . '/' . ltrim($key, '/');
    }
    $host = preg_replace('#^https?://#', '', $endpoint);
    return 'https://' . $s3['bucket'] . '.' . $host . '/' . ltrim($key, '/');
}

function s3_put_object(array $s3, string $key, string $body, string $contentType = 'text/html'): array
{
    $url = s3_build_url($s3, $key);
    $payloadHash = hash('sha256', $body);
    $amzDate = gmdate('Ymd\THis\Z');
    $dateStamp = gmdate('Ymd');
    $parsed = parse_url($url);
    $host = $parsed['host'];
    $uri = $parsed['path'];

    $contentMd5 = base64_encode(md5($body, true));
    $contentLength = strlen($body);
    $headers = [
        'content-md5' => $contentMd5,
        'content-length' => (string)$contentLength,
        'content-type' => $contentType,
        'host' => $host,
        'x-amz-content-sha256' => $payloadHash,
        'x-amz-date' => $amzDate,
    ];

    if ($s3['object_lock']) {
        $retainUntil = gmdate('Y-m-d\TH:i:s\Z', time() + ((int)$s3['retention_days'] * 86400));
        $headers['x-amz-object-lock-mode'] = 'COMPLIANCE';
        $headers['x-amz-object-lock-retain-until-date'] = $retainUntil;
    }

    $signedHeaderKeys = array_keys($headers);
    sort($signedHeaderKeys);
    $canonicalHeaders = '';
    foreach ($signedHeaderKeys as $keyName) {
        $canonicalHeaders .= $keyName . ':' . $headers[$keyName] . "\n";
    }
    $signedHeaders = implode(';', $signedHeaderKeys);

    $canonicalRequest = implode("\n", [
        'PUT',
        $uri,
        '',
        $canonicalHeaders,
        $signedHeaders,
        $payloadHash,
    ]);

    $algorithm = 'AWS4-HMAC-SHA256';
    $credentialScope = $dateStamp . '/' . $s3['region'] . '/s3/aws4_request';
    $stringToSign = implode("\n", [
        $algorithm,
        $amzDate,
        $credentialScope,
        hash('sha256', $canonicalRequest),
    ]);

    $signingKey = s3_get_signature_key($s3['secret_key'], $dateStamp, $s3['region'], 's3');
    $signature = hash_hmac('sha256', $stringToSign, $signingKey);
    $authorization = $algorithm . ' Credential=' . $s3['access_key'] . '/' . $credentialScope .
        ', SignedHeaders=' . $signedHeaders . ', Signature=' . $signature;

    $curlHeaders = [];
    foreach ($headers as $keyName => $value) {
        $curlHeaders[] = $keyName . ': ' . $value;
    }
    $curlHeaders[] = 'Authorization: ' . $authorization;

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
    curl_setopt($ch, CURLOPT_HTTPHEADER, $curlHeaders);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
    curl_setopt($ch, CURLOPT_POSTFIELDSIZE, $contentLength);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($status < 200 || $status >= 300) {
        throw new RuntimeException('S3 upload failed: ' . ($error ?: $response));
    }

    return [
        'url' => $url,
        'key' => $key,
        'checksum' => $payloadHash,
    ];
}

function s3_presign_url(array $s3, string $key, int $expires = 300): string
{
    $url = s3_build_url($s3, $key);
    $parsed = parse_url($url);
    $host = $parsed['host'];
    $uri = $parsed['path'];
    $amzDate = gmdate('Ymd\THis\Z');
    $dateStamp = gmdate('Ymd');
    $algorithm = 'AWS4-HMAC-SHA256';
    $credentialScope = $dateStamp . '/' . $s3['region'] . '/s3/aws4_request';
    $credential = rawurlencode($s3['access_key'] . '/' . $credentialScope);

    $query = [
        'X-Amz-Algorithm' => $algorithm,
        'X-Amz-Credential' => $credential,
        'X-Amz-Date' => $amzDate,
        'X-Amz-Expires' => $expires,
        'X-Amz-SignedHeaders' => 'host',
    ];
    ksort($query);
    $canonicalQuery = http_build_query($query, '', '&', PHP_QUERY_RFC3986);

    $canonicalRequest = implode("\n", [
        'GET',
        $uri,
        $canonicalQuery,
        'host:' . $host . "\n",
        'host',
        'UNSIGNED-PAYLOAD',
    ]);

    $stringToSign = implode("\n", [
        $algorithm,
        $amzDate,
        $credentialScope,
        hash('sha256', $canonicalRequest),
    ]);

    $signingKey = s3_get_signature_key($s3['secret_key'], $dateStamp, $s3['region'], 's3');
    $signature = hash_hmac('sha256', $stringToSign, $signingKey);

    return $url . '?' . $canonicalQuery . '&X-Amz-Signature=' . $signature;
}

function s3_get_signature_key(string $key, string $dateStamp, string $regionName, string $serviceName): string
{
    $kDate = hash_hmac('sha256', $dateStamp, 'AWS4' . $key, true);
    $kRegion = hash_hmac('sha256', $regionName, $kDate, true);
    $kService = hash_hmac('sha256', $serviceName, $kRegion, true);
    return hash_hmac('sha256', 'aws4_request', $kService, true);
}
