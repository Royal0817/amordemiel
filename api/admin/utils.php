<?php

function admin_start_session(): void
{
    if (session_status() === PHP_SESSION_NONE) {
        session_name('amordemiel_admin');
        session_start();
    }
}

function admin_csrf_token(): string
{
    admin_start_session();
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(16));
    }
    return $_SESSION['csrf_token'];
}

function admin_require_csrf(string $token): void
{
    admin_start_session();
    if (!isset($_SESSION['csrf_token']) || !hash_equals($_SESSION['csrf_token'], $token)) {
        http_response_code(403);
        echo 'Invalid CSRF token.';
        exit;
    }
}

function admin_is_logged_in(): bool
{
    admin_start_session();
    return !empty($_SESSION['admin_user']);
}

function admin_require_login(array $config): void
{
    if (!admin_is_logged_in()) {
        $redirect = $config['admin']['login_url'] ?? 'login.php';
        header('Location: ' . $redirect, true, 302);
        exit;
    }
}

function admin_login(array $config, string $username, string $password): bool
{
    $admin = $config['admin'] ?? [];
    $expectedUser = $admin['username'] ?? '';
    $expectedHash = $admin['password_hash'] ?? '';
    if ($expectedUser === '' || $expectedHash === '') {
        return false;
    }
    if (!hash_equals($expectedUser, $username)) {
        return false;
    }
    if (!password_verify($password, $expectedHash)) {
        return false;
    }
    admin_start_session();
    session_regenerate_id(true);
    $_SESSION['admin_user'] = $expectedUser;
    return true;
}

function admin_logout(): void
{
    admin_start_session();
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $params['path'], $params['domain'], $params['secure'], $params['httponly']);
    }
    session_destroy();
}

function admin_log_event(PDO $pdo, string $submissionId, string $eventType, array $meta = []): void
{
    $stmt = $pdo->prepare('INSERT INTO submission_events (submission_id, event_type, event_meta, created_at) VALUES (:submission_id, :event_type, :event_meta, :created_at)');
    $stmt->execute([
        ':submission_id' => $submissionId,
        ':event_type' => $eventType,
        ':event_meta' => $meta ? json_encode($meta, JSON_UNESCAPED_UNICODE) : null,
        ':created_at' => gmdate('Y-m-d H:i:s'),
    ]);
}
