<?php

$config = require __DIR__ . '/../config.php';
require __DIR__ . '/utils.php';

admin_start_session();

if (admin_is_logged_in()) {
    header('Location: index.php', true, 302);
    exit;
}

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    admin_require_csrf($_POST['csrf_token'] ?? '');
    $username = trim((string)($_POST['username'] ?? ''));
    $password = (string)($_POST['password'] ?? '');
    if (admin_login($config, $username, $password)) {
        header('Location: index.php', true, 302);
        exit;
    }
    $error = 'Invalid credentials.';
}

$csrfToken = admin_csrf_token();

?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Admin login</title>
    <style>
      body { font-family: Georgia, "Times New Roman", serif; padding: 40px; background: #fbf6f4; color: #3b2626; }
      .panel { max-width: 420px; background: #fff; border-radius: 16px; padding: 26px; box-shadow: 0 12px 32px rgba(92, 63, 63, 0.12); }
      h1 { margin: 0 0 12px; }
      label { display: block; margin: 14px 0 6px; font-weight: 600; }
      input { width: 100%; padding: 10px 12px; border: 1px solid #e2d6d2; border-radius: 10px; font-family: inherit; }
      button { margin-top: 16px; background: #6c3b3b; color: #fff; border: none; padding: 10px 16px; border-radius: 999px; font-size: 14px; cursor: pointer; }
      .error { color: #8a2f2f; font-size: 13px; margin-top: 10px; }
      .hint { color: #8a6b6b; font-size: 12px; margin-top: 12px; }
    </style>
  </head>
  <body>
    <div class="panel">
      <h1>Admin login</h1>
      <form method="post">
        <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($csrfToken, ENT_QUOTES, 'UTF-8'); ?>">
        <label for="username">Username</label>
        <input id="username" name="username" autocomplete="username" required>
        <label for="password">Password</label>
        <input id="password" type="password" name="password" autocomplete="current-password" required>
        <button type="submit">Sign in</button>
      </form>
      <?php if ($error): ?>
        <div class="error"><?php echo htmlspecialchars($error, ENT_QUOTES, 'UTF-8'); ?></div>
      <?php endif; ?>
      <div class="hint">If you forgot your password, update it in <code>config.local.php</code>.</div>
    </div>
  </body>
</html>

