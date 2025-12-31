<?php

$config = require __DIR__ . '/../config.php';
require __DIR__ . '/../db.php';

$pdo = get_db($config);
$stmt = $pdo->query('SELECT id, created_at, form_type, snapshot_status, notification_status FROM submissions ORDER BY created_at DESC');
$submissions = $stmt->fetchAll();

?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Amor de Miel - Submissions</title>
    <style>
      body { font-family: Georgia, "Times New Roman", serif; padding: 32px; color: #3b2626; background: #fbf6f4; }
      h1 { margin-bottom: 16px; }
      table { width: 100%; border-collapse: collapse; background: #fff; border-radius: 12px; overflow: hidden; }
      th, td { text-align: left; padding: 12px 14px; border-bottom: 1px solid #f1e6e3; }
      th { text-transform: uppercase; font-size: 12px; letter-spacing: 0.08em; color: #7b5151; }
      a { color: #6c3b3b; text-decoration: none; }
      .pill { display: inline-block; padding: 2px 8px; border-radius: 999px; font-size: 12px; background: #f0e5e2; }
      .status-failed { background: #f8d7da; }
      .status-pending { background: #fdeecb; }
    </style>
  </head>
  <body>
    <h1>Submission control panel</h1>
    <table>
      <thead>
        <tr>
          <th>Created</th>
          <th>Type</th>
          <th>ID</th>
          <th>Snapshot</th>
          <th>Notify</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($submissions as $row): ?>
          <tr>
            <td><?php echo htmlspecialchars($row['created_at'], ENT_QUOTES, 'UTF-8'); ?></td>
            <td><?php echo htmlspecialchars($row['form_type'], ENT_QUOTES, 'UTF-8'); ?></td>
            <td><?php echo htmlspecialchars($row['id'], ENT_QUOTES, 'UTF-8'); ?></td>
            <td>
              <?php if ($row['snapshot_status'] === 'stored'): ?>
                <a href="snapshot.php?id=<?php echo htmlspecialchars($row['id'], ENT_QUOTES, 'UTF-8'); ?>">View</a>
              <?php else: ?>
                <span class="pill status-<?php echo htmlspecialchars($row['snapshot_status'], ENT_QUOTES, 'UTF-8'); ?>">
                  <?php echo htmlspecialchars($row['snapshot_status'], ENT_QUOTES, 'UTF-8'); ?>
                </span>
              <?php endif; ?>
            </td>
            <td>
              <span class="pill status-<?php echo htmlspecialchars($row['notification_status'], ENT_QUOTES, 'UTF-8'); ?>">
                <?php echo htmlspecialchars($row['notification_status'], ENT_QUOTES, 'UTF-8'); ?>
              </span>
            </td>
          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
  </body>
</html>
