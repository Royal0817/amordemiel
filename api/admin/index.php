<?php

$config = require __DIR__ . '/../config.php';
require __DIR__ . '/../db.php';
require __DIR__ . '/utils.php';

$pdo = get_db($config);
$show = $_GET['show'] ?? '';
$includeDeleted = $show === 'all' || $show === 'deleted';

$query = 'SELECT id, created_at, form_type, snapshot_status, notification_status, status, admin_notes, deleted_at FROM submissions';
if (!$includeDeleted) {
    $query .= ' WHERE deleted_at IS NULL';
}
$query .= ' ORDER BY created_at DESC';
$stmt = $pdo->query($query);
$submissions = $stmt->fetchAll();
$csrfToken = admin_csrf_token();

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
      .status-deleted { background: #f0e0e0; }
      .actions { display: flex; gap: 8px; align-items: center; }
      .actions form { display: inline; margin: 0; }
      .toolbar { display: flex; gap: 12px; align-items: center; margin-bottom: 18px; }
      .toolbar a { font-size: 14px; }
      .notes { max-width: 240px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .btn { border: 1px solid #d9c2bd; background: #fff; padding: 6px 10px; border-radius: 999px; font-size: 12px; cursor: pointer; color: #5a3939; }
      .btn-danger { border-color: #e2b2b2; color: #7a2d2d; }
      .muted { color: #8a6b6b; font-size: 12px; }
    </style>
  </head>
  <body>
    <h1>Submission control panel</h1>
    <div class="toolbar">
      <a class="btn" href="new.php">New submission</a>
      <?php if ($includeDeleted): ?>
        <a class="btn" href="index.php">Hide deleted</a>
      <?php else: ?>
        <a class="btn" href="index.php?show=all">Show deleted</a>
      <?php endif; ?>
      <span class="muted"><?php echo count($submissions); ?> items</span>
    </div>
    <table>
      <thead>
        <tr>
          <th>Created</th>
          <th>Type</th>
          <th>ID</th>
          <th>Status</th>
          <th>Notes</th>
          <th>Snapshot</th>
          <th>Notify</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($submissions as $row): ?>
          <tr>
            <td><?php echo htmlspecialchars($row['created_at'], ENT_QUOTES, 'UTF-8'); ?></td>
            <td><?php echo htmlspecialchars($row['form_type'], ENT_QUOTES, 'UTF-8'); ?></td>
            <td><?php echo htmlspecialchars($row['id'], ENT_QUOTES, 'UTF-8'); ?></td>
            <td>
              <span class="pill status-<?php echo htmlspecialchars($row['status'] ?? 'open', ENT_QUOTES, 'UTF-8'); ?>">
                <?php echo htmlspecialchars($row['status'] ?? 'open', ENT_QUOTES, 'UTF-8'); ?>
              </span>
            </td>
            <td class="notes"><?php echo htmlspecialchars($row['admin_notes'] ?? '', ENT_QUOTES, 'UTF-8'); ?></td>
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
            <td class="actions">
              <a class="btn" href="edit.php?id=<?php echo htmlspecialchars($row['id'], ENT_QUOTES, 'UTF-8'); ?>">Edit</a>
              <?php if (empty($row['deleted_at'])): ?>
                <form method="post" action="delete.php" onsubmit="return confirm('Archive this submission?');">
                  <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($csrfToken, ENT_QUOTES, 'UTF-8'); ?>">
                  <input type="hidden" name="id" value="<?php echo htmlspecialchars($row['id'], ENT_QUOTES, 'UTF-8'); ?>">
                  <button class="btn btn-danger" type="submit">Archive</button>
                </form>
              <?php else: ?>
                <form method="post" action="update.php">
                  <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($csrfToken, ENT_QUOTES, 'UTF-8'); ?>">
                  <input type="hidden" name="id" value="<?php echo htmlspecialchars($row['id'], ENT_QUOTES, 'UTF-8'); ?>">
                  <input type="hidden" name="restore" value="1">
                  <button class="btn" type="submit">Restore</button>
                </form>
              <?php endif; ?>
            </td>
          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
  </body>
</html>
