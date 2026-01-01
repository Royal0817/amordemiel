<?php

$localConfig = __DIR__ . '/config.local.php';
if (file_exists($localConfig)) {
    return require $localConfig;
}

$env = function (string $key, ?string $default = null): ?string {
    $value = getenv($key);
    if ($value === false || $value === '') {
        return $default;
    }
    return $value;
};

$envBool = function (string $key, bool $default = false): bool {
    $value = getenv($key);
    if ($value === false || $value === '') {
        return $default;
    }
    return in_array(strtolower($value), ['1', 'true', 'yes', 'on'], true);
};

$require = function (string $key): string {
    $value = getenv($key);
    if ($value === false || $value === '') {
        throw new RuntimeException('Missing required env: ' . $key);
    }
    return $value;
};

return [
    'debug' => $envBool('ADM_DEBUG', false),
    'db' => [
        'host' => $env('ADM_DB_HOST', 'localhost'),
        'name' => $require('ADM_DB_NAME'),
        'user' => $require('ADM_DB_USER'),
        'pass' => $require('ADM_DB_PASS'),
    ],
    's3' => [
        'endpoint' => $require('ADM_S3_ENDPOINT'),
        'region' => $require('ADM_S3_REGION'),
        'bucket' => $require('ADM_S3_BUCKET'),
        'access_key' => $require('ADM_S3_ACCESS_KEY'),
        'secret_key' => $require('ADM_S3_SECRET_KEY'),
        'path_style' => $envBool('ADM_S3_PATH_STYLE', true),
        'public_base' => $env('ADM_S3_PUBLIC_BASE', ''),
        'object_lock' => $envBool('ADM_S3_OBJECT_LOCK', true),
        'retention_days' => $env('ADM_S3_RETENTION_DAYS', '3650'),
    ],
    'ntfy' => [
        'server' => $env('ADM_NTFY_SERVER', 'https://ntfy.sh'),
        'topic' => $env('ADM_NTFY_TOPIC', ''),
        'token' => $env('ADM_NTFY_TOKEN', ''),
    ],
    'admin' => [
        'portal_url' => $env('ADM_ADMIN_PORTAL_URL', ''),
    ],
];
