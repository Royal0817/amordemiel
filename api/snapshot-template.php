<?php

function render_snapshot(array $record): string
{
    $safe = function ($value) {
        return htmlspecialchars((string)$value, ENT_QUOTES, 'UTF-8');
    };

    $payload = $record['payload'];
    $rows = '';
    foreach ($payload as $key => $value) {
        if (is_array($value)) {
            $value = implode(', ', $value);
        }
        $rows .= '<tr><th>' . $safe($key) . '</th><td>' . $safe($value) . '</td></tr>';
    }

    return '<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Inquiry ' . $safe($record['id']) . '</title>
    <meta name="snapshot-version" content="1">
    <meta name="checksum" content="sha256:' . $safe($record['checksum']) . '">
    <style>
      body { font-family: Georgia, "Times New Roman", serif; padding: 32px; color: #3b2626; }
      h1 { margin: 0 0 8px; font-size: 28px; }
      .meta { margin-bottom: 24px; font-size: 14px; color: #6b4a4a; }
      table { width: 100%; border-collapse: collapse; }
      th, td { text-align: left; padding: 10px 12px; border-bottom: 1px solid #eadfdd; }
      th { width: 200px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; font-size: 12px; }
    </style>
  </head>
  <body>
    <h1>Inquiry snapshot</h1>
    <div class="meta">
      <div>ID: ' . $safe($record['id']) . '</div>
      <div>Created: ' . $safe($record['created_at']) . '</div>
      <div>Type: ' . $safe($record['form_type']) . '</div>
    </div>
    <table>' . $rows . '</table>
  </body>
</html>';
}
