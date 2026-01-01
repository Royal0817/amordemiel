<?php

$config = require __DIR__ . '/../config.php';
require __DIR__ . '/../db.php';
require __DIR__ . '/utils.php';

$csrfToken = admin_csrf_token();
$defaultPayload = [
    'inquiryType' => 'Desserts',
    'name' => '',
    'email' => '',
    'phone' => '',
];

?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>New submission</title>
    <style>
      body { font-family: Georgia, "Times New Roman", serif; padding: 32px; color: #3b2626; background: #fbf6f4; }
      h1 { margin-bottom: 12px; }
      label { display: block; margin: 16px 0 6px; font-weight: 600; color: #5a3a3a; }
      textarea, select { width: 100%; padding: 10px 12px; border: 1px solid #e2d6d2; border-radius: 10px; font-family: inherit; }
      textarea { min-height: 220px; font-family: "Courier New", Courier, monospace; }
      .actions { margin-top: 18px; display: flex; gap: 10px; align-items: center; }
      .btn { border: 1px solid #d9c2bd; background: #fff; padding: 8px 14px; border-radius: 999px; font-size: 13px; cursor: pointer; color: #5a3939; }
      .btn-primary { background: #6c3b3b; color: #fff; border-color: #6c3b3b; }
      .muted { color: #8a6b6b; font-size: 12px; }
    </style>
  </head>
  <body>
    <h1>New submission</h1>
    <p class="muted">Create a manual submission. This does not send notifications or snapshots.</p>

    <form method="post" action="create.php">
      <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($csrfToken, ENT_QUOTES, 'UTF-8'); ?>">

      <label for="status">Status</label>
      <select name="status" id="status">
        <option value="open">open</option>
        <option value="in-progress">in-progress</option>
        <option value="completed">completed</option>
        <option value="archived">archived</option>
      </select>

      <label for="payload_json">Payload JSON</label>
      <textarea name="payload_json" id="payload_json"><?php echo htmlspecialchars(json_encode($defaultPayload, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), ENT_QUOTES, 'UTF-8'); ?></textarea>

      <div class="actions">
        <button class="btn btn-primary" type="submit">Create submission</button>
        <a class="btn" href="index.php">Back to list</a>
      </div>
    </form>
  </body>
</html>

