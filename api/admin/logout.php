<?php

header('HTTP/1.1 401 Unauthorized');
header('WWW-Authenticate: Basic realm="Amor de Miel Admin"');
echo 'Logged out.';

