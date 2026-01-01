<?php

$config = require __DIR__ . '/../config.php';
require __DIR__ . '/../db.php';
require __DIR__ . '/utils.php';

admin_require_login($config);
admin_require_csrf($_POST['csrf_token'] ?? '');

$id = $_POST['id'] ?? '';
if (!$id) {
    http_response_code(400);
    echo 'Missing id.';
    exit;
}

$restore = !empty($_POST['restore']);
$status = trim((string)($_POST['status'] ?? 'open'));
$adminNotes = trim((string)($_POST['admin_notes'] ?? ''));
$payloadJson = $_POST['payload_json'] ?? '';

$pdo = get_db($config);

$stmt = $pdo->prepare('SELECT payload_json, status, admin_notes, deleted_at FROM submissions WHERE id = :id');
$stmt->execute([':id' => $id]);
$current = $stmt->fetch();
if (!$current) {
    http_response_code(404);
    echo 'Submission not found.';
    exit;
}

if ($restore) {
    $stmt = $pdo->prepare('UPDATE submissions SET deleted_at = NULL, status = :status WHERE id = :id');
    $stmt->execute([
        ':status' => 'open',
        ':id' => $id,
    ]);
    admin_log_event($pdo, $id, 'admin_restored');
    header('Location: index.php?show=all');
    exit;
}

$decoded = json_decode($payloadJson, true);
if (!is_array($decoded)) {
    http_response_code(422);
    echo 'Payload JSON is invalid.';
    exit;
}

$formType = $current['form_type'] ?? '';
if (!empty($decoded['inquiryType'])) {
    $formType = strtolower(preg_replace('/\s+/', '-', (string)$decoded['inquiryType']));
}

$stmt = $pdo->prepare('UPDATE submissions SET payload_json = :payload_json, form_type = :form_type, status = :status, admin_notes = :admin_notes WHERE id = :id');
$stmt->execute([
    ':payload_json' => json_encode($decoded, JSON_UNESCAPED_UNICODE),
    ':form_type' => $formType ?: 'unknown',
    ':status' => $status ?: 'open',
    ':admin_notes' => $adminNotes,
    ':id' => $id,
]);

$meta = [
    'status' => $status,
    'notes_changed' => $adminNotes !== ($current['admin_notes'] ?? ''),
    'payload_changed' => $payloadJson !== ($current['payload_json'] ?? ''),
];
admin_log_event($pdo, $id, 'admin_updated', $meta);

header('Location: edit.php?id=' . urlencode($id));
exit;
