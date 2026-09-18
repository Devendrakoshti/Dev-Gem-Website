<?php
/* =====================================================
  1. BASE URL & ENVIRONMENT CONFIGURATION
===================================================== */
// Determine protocol
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';

// Determine host and path
$host = $_SERVER['HTTP_HOST'];
$script_path = dirname($_SERVER['SCRIPT_NAME']); // e.g., /my-data/csi-live or /

// Clean up script path (remove leading/trailing slashes for consistency)
$base_path = trim($script_path, '/');
if ($base_path === '\\')
  $base_path = ''; // Fix for Windows root if needed

// Construct Base URL with trailing slash
$base_url = $protocol . '://' . $host . ($base_path ? '/' . $base_path : '') . '/';

/* =====================================================
  2. SITE DETAILS
===================================================== */
$site = [
  'name' => 'GEM Gujarat',
  'url' => $base_url, // Dynamic URL
  'logo' => $base_url . 'images/gem-gujarat-logo.webp'
];

/* =====================================================
  3. SESSION + CSRF TOKEN
===================================================== */
if (session_status() !== PHP_SESSION_ACTIVE) {
  // Stop PHP sending its own cache headers.
  //
  // session.cache_limiter defaults to "nocache", which makes session_start()
  // emit "Cache-Control: no-store, no-cache, must-revalidate" on every page.
  // The no-store is the problem: it disables the browser's back/forward cache,
  // so pressing Back re-downloaded and re-executed the entire page - all the
  // GSAP setup included - instead of restoring it instantly. Every page here
  // starts a session, only to hold the contact form's CSRF token, so the whole
  // site paid for it.
  //
  // '' means "send nothing"; .htaccess supplies
  // "private, no-cache, must-revalidate" instead, which keeps the page out of
  // shared caches and still forces revalidation, but leaves bf-cache working.
  session_cache_limiter('');
  session_start([
    'cookie_httponly' => true,
    'cookie_samesite' => 'Lax',
    'cookie_secure'   => (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off'),
  ]);
}
if (empty($_SESSION['csrf_token'])) {
  $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

/* =====================================================
  4. RECAPTCHA SECRET (loaded from outside source control)
  Order: environment variable > includes/secrets.php
  The previous hard-coded key MUST be rotated in the
  reCAPTCHA admin console — treat it as compromised.
===================================================== */
$_recaptcha_secret = getenv('RECAPTCHA_SECRET') ?: '';
if ($_recaptcha_secret === '' && file_exists(__DIR__ . '/secrets.php')) {
  include __DIR__ . '/secrets.php';
}
if (!defined('RECAPTCHA_SECRET')) {
  define('RECAPTCHA_SECRET', $_recaptcha_secret);
}
unset($_recaptcha_secret);
?>
