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
  'name' => 'CAD Services India',
  'url' => $base_url, // Dynamic URL
  'logo' => $base_url . 'images/logo.svg'
];
?>