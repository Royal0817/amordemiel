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

$hardDelete = !empty($_POST['hard_delete']);

$pdo = get_db($config);
if ($hardDelete) {
    $events = $pdo->prepare('DELETE FROM submission_events WHERE submission_id = :id');
    $events->execute([':id' => $id]);

    $stmt = $pdo->prepare('DELETE FROM submissions WHERE id = :id');
    $stmt->execute([':id' => $id]);

    header('Location: index.php?show=all');
    exit;
}

$stmt = $pdo->prepare('UPDATE submissions SET deleted_at = :deleted_at, status = :status WHERE id = :id');
$stmt->execute([
    ':deleted_at' => app_now(),
    ':status' => 'deleted',
    ':id' => $id,
]);

admin_log_event($pdo, $id, 'admin_archived');

header('Location: index.php?show=all');
exit;
