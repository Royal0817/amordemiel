<?php

require __DIR__ . '/utils.php';

admin_logout();
header('Location: login.php', true, 302);
exit;
