<?php

$config = require __DIR__ . '/../config.php';
require __DIR__ . '/../db.php';
require __DIR__ . '/../s3.php';

$id = $_GET['id'] ?? '';
if (!$id) {
    http_response_code(400);
    echo 'Missing id.';
    exit;
}

$pdo = get_db($config);
$stmt = $pdo->prepare('SELECT id, snapshot_key, snapshot_status FROM submissions WHERE id = :id');
$stmt->execute([':id' => $id]);
$row = $stmt->fetch();

if (!$row || $row['snapshot_status'] !== 'stored' || empty($row['snapshot_key'])) {
    http_response_code(404);
    echo 'Snapshot not available.';
    exit;
}

$meta = [
    'ip' => $_SERVER['REMOTE_ADDR'] ?? '',
    'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? '',
];

$event = $pdo->prepare('INSERT INTO submission_events (submission_id, event_type, event_meta, created_at) VALUES (:submission_id, :event_type, :event_meta, :created_at)');
$event->execute([
    ':submission_id' => $row['id'],
    ':event_type' => 'snapshot_viewed',
    ':event_meta' => json_encode($meta, JSON_UNESCAPED_UNICODE),
    ':created_at' => gmdate('Y-m-d H:i:s'),
]);

if (!empty($config['s3']['public_base'])) {
    $url = rtrim($config['s3']['public_base'], '/') . '/' . ltrim($row['snapshot_key'], '/');
} else {
    $url = s3_presign_url($config['s3'], $row['snapshot_key'], 300);
}

header('Location: ' . $url, true, 302);
exit;
