<?php

$config = require __DIR__ . '/../config.php';
require __DIR__ . '/../db.php';
require __DIR__ . '/utils.php';

admin_require_csrf($_POST['csrf_token'] ?? '');

$id = $_POST['id'] ?? '';
if (!$id) {
    http_response_code(400);
    echo 'Missing id.';
    exit;
}

$pdo = get_db($config);
$stmt = $pdo->prepare('UPDATE submissions SET deleted_at = :deleted_at, status = :status WHERE id = :id');
$stmt->execute([
    ':deleted_at' => gmdate('Y-m-d H:i:s'),
    ':status' => 'deleted',
    ':id' => $id,
]);

admin_log_event($pdo, $id, 'admin_archived');

header('Location: index.php?show=all');
exit;

