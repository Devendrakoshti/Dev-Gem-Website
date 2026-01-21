<?php
// Configuration is now handled in config.php
// Ensure $base_url and $site are available from the global scope/inclusion


/* =====================================================
3. CURRENT PAGE INFO
===================================================== */
$current_url = $protocol . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
$request_path = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');

// Calculate relative path for breadcrumbs (subtract base path from request path)
// If mapped to a corpus, request URI might differ, so we rely on script name mostly for mapped envs
$file_name = basename($_SERVER['SCRIPT_NAME']);

$is_home = ($file_name === 'index.php' || $file_name === '-index.php' || $request_path === $base_path);

/* =====================================================
4. DEFINE SERVICE PAGES
===================================================== */
$service_pages = [
  '3d-rendering-services.php',
  'architectural-drafting-services.php',
  'bim-services.php',
  'construction-documentation-services.php',
  'drafting-services.php',
  'mep-cad-drafting-services.php',
  'mep-drafting-services.php',
  'scan-to-bim-services.php',
  'structural-drafting-services.php'
];

/* =====================================================
5. INIT SCHEMA ARRAY
===================================================== */
$schemas = [];

/* =====================================================
6. ORGANIZATION + WEBSITE (HOME ONLY)
===================================================== */
if ($is_home) {
  $schemas[] = [
    "@type" => "Organization",
    "name" => $site['name'],
    "url" => $site['url'],
    "logo" => $site['logo']
  ];

  $schemas[] = [
    "@type" => "WebSite",
    "url" => $site['url']
  ];
}

/* =====================================================
7. SERVICE SCHEMA
===================================================== */
if (in_array($file_name, $service_pages, true)) {
  $service_name = ucwords(str_replace(['-', '.php'], [' ', ''], $file_name));
  $schemas[] = [
    "@type" => "Service",
    "serviceType" => $service_name,
    "provider" => [
      "@type" => "Organization",
      "name" => $site['name']
    ],
    "url" => $current_url
  ];
}

/* =====================================================
8. ARTICLE SCHEMA (BLOG + PROJECT)
===================================================== */
if (strpos($request_path, 'blog/') !== false || strpos($request_path, 'project/') !== false) {
  // Simple logic: if path contains blog or project
  $slug = str_replace('.php', '', basename($request_path));
  $title = ucwords(str_replace('-', ' ', $slug));

  $schemas[] = [
    "@type" => "Article",
    "headline" => $title,
    "author" => [
      "@type" => "Organization",
      "name" => $site['name']
    ],
    "mainEntityOfPage" => $current_url
  ];
}

/* =====================================================
9. BREADCRUMB
===================================================== */
if (!$is_home) {
  $breadcrumb_items = [];

  // Home
  $breadcrumb_items[] = [
    "@type" => "ListItem",
    "position" => 1,
    "name" => "Home",
    "item" => $site['url']
  ];

  // Current Page
// Ideally, we would map the full hierarchy, but for this flat structure:
  $page_name = ucwords(str_replace(['-', '.php'], [' ', ''], $file_name));

  $breadcrumb_items[] = [
    "@type" => "ListItem",
    "position" => 2,
    "name" => $page_name,
    "item" => $current_url
  ];

  $schemas[] = [
    "@type" => "BreadcrumbList",
    "itemListElement" => $breadcrumb_items
  ];
}

/* =====================================================
HELPER FUNCTION: OUTPUT SCHEMA
Call this function in the <head>
===================================================== */
function render_schema()
{
  global $schemas;
  if (!empty($schemas)) {
    echo '<script type="application/ld+json">' . "\n";
    echo json_encode([
      "@context" => "https://schema.org",
      "@graph" => $schemas
    ], JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
    echo "\n" . '</script>';
  }
}
?>