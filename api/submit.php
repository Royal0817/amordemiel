<?php

header('Content-Type: application/json');

$config = require __DIR__ . '/config.php';
require __DIR__ . '/db.php';
require __DIR__ . '/s3.php';
require __DIR__ . '/snapshot-template.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed.']);
    exit;
}

$raw = file_get_contents('php://input');
$input = json_decode($raw, true);
if (!is_array($input)) {
    $input = $_POST;
}

$required = ['name', 'email', 'phone', 'inquiryType'];
foreach ($required as $field) {
    if (empty($input[$field])) {
        http_response_code(422);
        echo json_encode(['status' => 'error', 'message' => 'Missing required fields.']);
        exit;
    }
}

if (!filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['status' => 'error', 'message' => 'Invalid email.']);
    exit;
}

$id = bin2hex(random_bytes(16));
$createdAt = gmdate('Y-m-d H:i:s');
$formType = strtolower(preg_replace('/\s+/', '-', (string)$input['inquiryType']));

$record = [
    'id' => $id,
    'created_at' => $createdAt,
    'form_type' => $formType,
    'payload' => $input,
];

try {
    $pdo = get_db($config);
    $stmt = $pdo->prepare('INSERT INTO submissions (id, created_at, form_type, payload_json, snapshot_status, notification_status) VALUES (:id, :created_at, :form_type, :payload_json, :snapshot_status, :notification_status)');
    $stmt->execute([
        ':id' => $id,
        ':created_at' => $createdAt,
        ':form_type' => $formType,
        ':payload_json' => json_encode($input, JSON_UNESCAPED_UNICODE),
        ':snapshot_status' => 'pending',
        ':notification_status' => 'pending',
    ]);

    $snapshotKey = 'snapshots/' . gmdate('Y') . '/' . gmdate('m') . '/' . $id . '.html';
    $record['checksum'] = '';
    $html = render_snapshot($record);
    $checksum = hash('sha256', $html);
    $record['checksum'] = $checksum;

    $s3Result = s3_put_object($config['s3'], $snapshotKey, $html, 'text/html');

    $stmt = $pdo->prepare('UPDATE submissions SET snapshot_url = :snapshot_url, snapshot_key = :snapshot_key, snapshot_checksum = :snapshot_checksum, snapshot_status = :snapshot_status WHERE id = :id');
    $stmt->execute([
        ':snapshot_url' => $s3Result['url'],
        ':snapshot_key' => $snapshotKey,
        ':snapshot_checksum' => $checksum,
        ':snapshot_status' => 'stored',
        ':id' => $id,
    ]);

    $ntfy = $config['ntfy'];
    if (!empty($ntfy['topic'])) {
        $adminUrl = rtrim($config['admin']['portal_url'], '/') . '/?id=' . $id;
        $payload = "New inquiry received.\n";
        $headers = [
            'Title: New Inquiry',
            'Priority: 3',
            'Click: ' . $adminUrl,
        ];
        if (!empty($ntfy['token'])) {
            $headers[] = 'Authorization: Bearer ' . $ntfy['token'];
        }
        $ch = curl_init(rtrim($ntfy['server'], '/') . '/' . $ntfy['topic']);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $ntfyResponse = curl_exec($ch);
        $ntfyStatus = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        $stmt = $pdo->prepare('UPDATE submissions SET notification_status = :status, notification_response = :response WHERE id = :id');
        $stmt->execute([
            ':status' => $ntfyStatus >= 200 && $ntfyStatus < 300 ? 'sent' : 'failed',
            ':response' => $ntfyResponse ?: '',
            ':id' => $id,
        ]);
    }

    echo json_encode(['status' => 'ok', 'id' => $id]);
} catch (Throwable $error) {
    error_log('submit.php error: ' . $error->getMessage());
    http_response_code(500);
    $message = 'Submission failed.';
    if (!empty($config['debug'])) {
        $message = $error->getMessage();
    }
    echo json_encode(['status' => 'error', 'message' => $message]);
}
