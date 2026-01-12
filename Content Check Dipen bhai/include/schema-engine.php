<?php
/* =====================================================
  BASIC SITE CONFIG (EDIT ONCE)
===================================================== */
$site = [
  'name' => 'CAD Services India',
  'url'  => 'https://www.cadservicesindia.com/',
  'logo' => 'https://www.cadservicesindia.com/images/logo.webp'
];

/* =====================================================
  CURRENT PAGE INFO
===================================================== */
$protocol    = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
$current_url = $protocol . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];

$path      = trim(parse_url($current_url, PHP_URL_PATH), '/');
$segments  = $path ? explode('/', $path) : [];
$file_name = strtolower(basename($path));

$is_home = in_array($file_name, ['index.php'], true);

/* =====================================================
  DEFINE SERVICE PAGES (ADD HERE ONLY)
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
  'structural-drafting-services'
];

/* =====================================================
  INIT
===================================================== */
$schemas = [];

/* =====================================================
  ORGANIZATION + WEBSITE (HOME ONLY)
===================================================== */
if ($is_home) {

  $schemas[] = [
    "@context" => "https://schema.org",
    "@type"    => "Organization",
    "name"     => $site['name'],
    "url"      => $site['url'],
    "logo"     => $site['logo']
  ];

  $schemas[] = [
    "@type" => "WebSite",
    "url"   => $site['url']
  ];
}

/* =====================================================
  SERVICE SCHEMA (MULTIPLE SERVICE PAGES)
===================================================== */
if (in_array($file_name, $service_pages, true)) {

  // Auto-generate service name from file
  $service_name = ucwords(str_replace(['-','.php'], [' ',''], $file_name));

  $schemas[] = [
    "@type" => "Service",
    "serviceType" => $service_name,
    "provider" => [
      "@type" => "Organization",
      "name"  => $site['name']
    ],
    "url" => $current_url
  ];
}

/* =====================================================
  ARTICLE SCHEMA (BLOG + PROJECT)
===================================================== */
if (!empty($segments[0]) && in_array($segments[0], ['blog','project'], true)) {

  $slug  = str_replace('.php','', end($segments));
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
  BREADCRUMB (ALL EXCEPT HOME)
===================================================== */
if (!$is_home && !empty($segments)) {

  $breadcrumb_items = [];
  $breadcrumb_url   = $site['url'];

  foreach ($segments as $index => $segment) {

    $breadcrumb_url .= '/' . $segment;

    $breadcrumb_items[] = [
      "@type" => "ListItem",
      "position" => $index + 1,
      "name" => ucwords(str_replace(['-','.php'], [' ',''], $segment)),
      "item" => $breadcrumb_url
    ];
  }

  $schemas[] = [
    "@type" => "BreadcrumbList",
    "itemListElement" => $breadcrumb_items
  ];
}

/* =====================================================
  OUTPUT SINGLE JSON-LD (SEO SAFE)
===================================================== */
if (!empty($schemas)) {
  echo '<script type="application/ld+json">';
  echo json_encode($schemas, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
  echo '</script>';
}
