<?php

$config = require __DIR__ . '/../config.php';
require __DIR__ . '/../db.php';
require __DIR__ . '/utils.php';

admin_require_csrf($_POST['csrf_token'] ?? '');

$payloadJson = $_POST['payload_json'] ?? '';
$status = trim((string)($_POST['status'] ?? 'open'));

$decoded = json_decode($payloadJson, true);
if (!is_array($decoded)) {
    http_response_code(422);
    echo 'Payload JSON is invalid.';
    exit;
}

if (empty($decoded['name']) || empty($decoded['email']) || empty($decoded['phone']) || empty($decoded['inquiryType'])) {
    http_response_code(422);
    echo 'Payload JSON must include name, email, phone, and inquiryType.';
    exit;
}

$id = bin2hex(random_bytes(16));
$createdAt = gmdate('Y-m-d H:i:s');
$formType = strtolower(preg_replace('/\s+/', '-', (string)$decoded['inquiryType']));

$pdo = get_db($config);
$stmt = $pdo->prepare('INSERT INTO submissions (id, created_at, form_type, payload_json, snapshot_status, notification_status, status, admin_notes) VALUES (:id, :created_at, :form_type, :payload_json, :snapshot_status, :notification_status, :status, :admin_notes)');
$stmt->execute([
    ':id' => $id,
    ':created_at' => $createdAt,
    ':form_type' => $formType,
    ':payload_json' => json_encode($decoded, JSON_UNESCAPED_UNICODE),
    ':snapshot_status' => 'manual',
    ':notification_status' => 'manual',
    ':status' => $status ?: 'open',
    ':admin_notes' => 'Created in admin portal',
]);

admin_log_event($pdo, $id, 'admin_created', [
    'status' => $status ?: 'open',
]);

header('Location: edit.php?id=' . urlencode($id));
exit;

