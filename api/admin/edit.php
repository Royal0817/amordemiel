<?php

$config = require __DIR__ . '/../config.php';
require __DIR__ . '/../db.php';
require __DIR__ . '/utils.php';

admin_require_login($config);

$id = $_GET['id'] ?? '';
if (!$id) {
    http_response_code(400);
    echo 'Missing id.';
    exit;
}

$pdo = get_db($config);
$stmt = $pdo->prepare('SELECT id, created_at, form_type, payload_json, status, admin_notes, deleted_at FROM submissions WHERE id = :id');
$stmt->execute([':id' => $id]);
$row = $stmt->fetch();

if (!$row) {
    http_response_code(404);
    echo 'Submission not found.';
    exit;
}

$csrfToken = admin_csrf_token();
$payloadText = json_encode(json_decode($row['payload_json'], true), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Edit submission</title>
    <style>
      body { font-family: Georgia, "Times New Roman", serif; padding: 32px; color: #3b2626; background: #fbf6f4; }
      h1 { margin-bottom: 12px; }
      label { display: block; margin: 16px 0 6px; font-weight: 600; color: #5a3a3a; }
      input, textarea, select { width: 100%; padding: 10px 12px; border: 1px solid #e2d6d2; border-radius: 10px; font-family: inherit; }
      textarea { min-height: 220px; font-family: "Courier New", Courier, monospace; }
      .actions { margin-top: 18px; display: flex; gap: 10px; align-items: center; }
      .btn { border: 1px solid #d9c2bd; background: #fff; padding: 8px 14px; border-radius: 999px; font-size: 13px; cursor: pointer; color: #5a3939; }
      .btn-primary { background: #6c3b3b; color: #fff; border-color: #6c3b3b; }
      .muted { color: #8a6b6b; font-size: 12px; }
    </style>
  </head>
  <body>
    <div class="actions">
      <h1>Edit submission</h1>
      <a class="btn" href="logout.php">Log out</a>
    </div>
    <p class="muted">ID: <?php echo htmlspecialchars($row['id'], ENT_QUOTES, 'UTF-8'); ?> · Created <?php echo htmlspecialchars($row['created_at'], ENT_QUOTES, 'UTF-8'); ?></p>

    <form method="post" action="update.php">
      <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($csrfToken, ENT_QUOTES, 'UTF-8'); ?>">
      <input type="hidden" name="id" value="<?php echo htmlspecialchars($row['id'], ENT_QUOTES, 'UTF-8'); ?>">

      <label for="status">Status</label>
      <select name="status" id="status">
        <?php
          $statuses = ['open', 'in-progress', 'completed', 'archived', 'deleted'];
          $currentStatus = $row['status'] ?? 'open';
          foreach ($statuses as $status) {
              $selected = $status === $currentStatus ? 'selected' : '';
              echo '<option value="' . htmlspecialchars($status, ENT_QUOTES, 'UTF-8') . '" ' . $selected . '>' . htmlspecialchars($status, ENT_QUOTES, 'UTF-8') . '</option>';
          }
        ?>
      </select>

      <label for="notes">Admin notes</label>
      <textarea name="admin_notes" id="notes"><?php echo htmlspecialchars($row['admin_notes'] ?? '', ENT_QUOTES, 'UTF-8'); ?></textarea>

      <label for="payload_json">Payload JSON</label>
      <textarea name="payload_json" id="payload_json"><?php echo htmlspecialchars($payloadText ?: $row['payload_json'], ENT_QUOTES, 'UTF-8'); ?></textarea>

      <div class="actions">
        <button class="btn btn-primary" type="submit">Save changes</button>
        <a class="btn" href="index.php">Back to list</a>
        <?php if (!empty($row['deleted_at'])): ?>
          <span class="muted">This submission is archived.</span>
        <?php endif; ?>
      </div>
    </form>
  </body>
</html>
