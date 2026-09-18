<?php
/* =====================================================================
   SCHEMA ENGINE v2.0 — GEM Gujarat
   File: includes/schema-engine.php

   Outputs a single JSON-LD @graph block per page via render_schema().
   Requires: includes/service-schema-data.php (auto-loaded below).

   Page-level variables consumed (set before including head.php):
     $page_title          string  — full SEO title
     $page_desc           string  — meta description
     $page_keywords       string  — meta keywords (comma-separated)
     $canonical_url       string  — absolute canonical URL for this page
     $og_image            string  — absolute OG image URL
     $page_published_date string  — ISO 8601 date e.g. "2026-09-01"
     $page_modified_date  string  — ISO 8601 date (falls back to published)
     $breadcrumb_parent   array   — ['name'=>'...','url'=>'...'] manual override
     $breadcrumb_name     string  — short name for current crumb (optional)
   ===================================================================== */


/* ─────────────────────────────────────────────────────────────────────
   0. SHARED CONSTANTS
   ───────────────────────────────────────────────────────────────────── */
define('_WEBSITE_URL', 'https://www.gemgujarat.in/');
define('_WEBSITE_ORG_ID', 'https://www.gemgujarat.in/#organization');
define('_WEBSITE_ID',  'https://www.gemgujarat.in/#website');
define('_WEBSITE_LOGO',   'https://www.gemgujarat.in/images/gem-gujarat-logo.webp');
define('_WEBSITE_NAME',   'GEM Gujarat');
define('_DATE_CREATED',   '2026-09-01T14:30:00Z');
define('_DATE_PUBLISHED',   '2026-09-01T14:30:00Z');
define('_DATE_MODIFIED',   '2026-09-01T14:30:00Z');
define('_IN_LANGUAGE',   'en');

/* ─────────────────────────────────────────────────────────────────────
   1. PAGE CONTEXT
   ───────────────────────────────────────────────────────────────────── */
$current_url  = $protocol . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
$request_path = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');
$file_name    = basename($_SERVER['SCRIPT_NAME']);
$is_home      = ($file_name === 'index.php' || $request_path === $base_path);


/* ─────────────────────────────────────────────────────────────────────
   2. SITE ROOT NORMALISATION
   ───────────────────────────────────────────────────────────────────── */
$site_root = $base_url;
$site['url'] = $site_root;


/* ─────────────────────────────────────────────────────────────────────
   3. SERVICE PAGE REGISTRY
   All pages that receive a Service schema block.
   ───────────────────────────────────────────────────────────────────── */
$service_pages = [
    'gem-registration-consultant.php',
    'gem-catalogue-management-services.php',
    'gem-product-catalogue-update.php',
    'gem-stock-update-service.php',
    'gem-invoice-generation.php',
    'gem-order-acceptance-guide.php',
    'gem-l1-comparison-service.php',
    'gem-oem-panel-registration.php',
    'gem-tender-bidding-support.php',
    'gem-vendor-assessment-support.php',
    'gem-msme-udyam-registration.php',
    'gem-iso-certificate-9001.php',
];


/* ─────────────────────────────────────────────────────────────────────
   5. SERVICE SCHEMA DATA
   ───────────────────────────────────────────────────────────────────── */
require_once __DIR__ . '/service-schema-data.php';


/* ─────────────────────────────────────────────────────────────────────
   6. SCHEMA ACCUMULATOR
   ───────────────────────────────────────────────────────────────────── */
$schemas = [];


/* ─────────────────────────────────────────────────────────────────────
   HELPER: _schema_clean()
   Recursively removes null, empty string, and empty array values
   from a schema array before json_encode. Preserves false and 0.
   ───────────────────────────────────────────────────────────────────── */
function _schema_clean(array $data): array
{
    $cleaned = [];
    foreach ($data as $key => $value) {
        if (is_array($value)) {
            $value = _schema_clean($value);
        }
        if ($value !== null && $value !== '' && $value !== []) {
            $cleaned[$key] = $value;
        }
    }
    return $cleaned;
}


/* ─────────────────────────────────────────────────────────────────────
   HELPER: _schema_breadcrumb_name()
   Priority: $breadcrumb_name var > service map name > pipe-stripped
   page title > filename-derived name.
   ───────────────────────────────────────────────────────────────────── */
function _schema_breadcrumb_name(string $filename, string $page_title, array $map): string
{
    global $breadcrumb_name;
    if (!empty($breadcrumb_name)) return $breadcrumb_name;
    if (!empty($map[$filename]['name'])) return $map[$filename]['name'];
    if ($page_title !== '') {
        $stripped = trim(preg_replace('/\s*\|.*$/u', '', $page_title));
        if ($stripped !== '') return $stripped;
    }
    return ucwords(str_replace(['-', '.php', 'gem '], [' ', '', 'GeM '], $filename));
}


/* =====================================================================
   BLOCK A — CORPORATION + WEBSITE  (homepage only)
   ===================================================================== */
if ($is_home) {

    $schemas[] = _schema_clean([
        '@type'               => 'Corporation',
        '@id'                 => _WEBSITE_ORG_ID,
        'name'                => _WEBSITE_NAME,
        'legalName'           => _WEBSITE_NAME,
        'url'                 => _WEBSITE_URL,
        'logo'                => _WEBSITE_LOGO,
        'description'         => 'India’s Leading Strategic Partner for GeM (Government e-Marketplace) Success. Empowering MSMEs, OEMs, and government suppliers nationwide with expert GeM seller registration, catalogue management, OEM panel approval, L1 price comparison, and tender bidding support to win government contracts.',
        'email'               => 'info@gemgujarat.com',
        'telephone'           => '+918015291471',
        'areaServed'          => [
            [
                '@type' => 'Country',
                'name'  => 'India',
            ]
        ],
        'address' => [
            [
                '@type'           => 'PostalAddress',
                'streetAddress'   => '512 5th floor, Trade square, Khokra',
                'addressLocality' => 'Ahmedabad',
                'addressRegion'   => 'Gujarat',
                'postalCode'      => '380008',
                'addressCountry'  => 'IN',
            ],
        ],
        'contactPoint' => [
            [
                '@type'             => 'ContactPoint',
                'telephone'         => '+918015291471',
                'contactType'       => 'customer service',
                'areaServed'        => ['IN'],
                'availableLanguage' => ['English', 'Hindi', 'Gujarati'],
            ],
        ],
        'knowsAbout' => [
            [
                '@type'  => 'Thing',
                'name'   => 'Government e-Marketplace',
                'sameAs' => 'https://en.wikipedia.org/wiki/Government_e_Marketplace',
            ],
            [
                '@type'  => 'Thing',
                'name'   => 'Public Procurement',
                'sameAs' => 'https://en.wikipedia.org/wiki/Government_procurement',
            ],
            [
                '@type'  => 'Thing',
                'name'   => 'Micro, Small and Medium Enterprises',
                'sameAs' => 'https://en.wikipedia.org/wiki/Ministry_of_Micro,_Small_and_Medium_Enterprises',
            ],
            [
                '@type'  => 'Thing',
                'name'   => 'ISO 9001',
                'sameAs' => 'https://en.wikipedia.org/wiki/ISO_9000',
            ],
            [
                '@type'  => 'Thing',
                'name'   => 'Tender Bidding & Public Procurement in India',
            ],
            [
                '@type'  => 'Thing',
                'name'   => 'OEM Panel Registration & Brand Authorization',
            ],
            [
                '@type'  => 'Thing',
                'name'   => 'GeM Catalogue Management & Listing Optimization',
            ],
            [
                '@type'  => 'Thing',
                'name'   => 'GeM Vendor Assessment by RITES and QCI',
            ],
            [
                '@type'  => 'Thing',
                'name'   => 'GeM L1 Comparison and Direct Purchase Rule 149',
            ],
            [
                '@type'  => 'Thing',
                'name'   => 'Consignee Receipt and Acceptance Certificate (CRAC)',
            ],
            [
                '@type'  => 'Thing',
                'name'   => 'GeM Invoice Generation and Payment Processing',
            ],
        ],
    ]);

    $schemas[] = [
        '@type'     => 'WebSite',
        '@id'       => _WEBSITE_ID,
        'name'      => _WEBSITE_NAME,
        'url'       => _WEBSITE_URL,
        'publisher' => ['@id' => _WEBSITE_ORG_ID],
    ];
}


/* =====================================================================
   BLOCK A2 — ORGANISATION + WEBSITE STUBS  (every non-home page)
   ===================================================================== */
if (!$is_home) {
    $schemas[] = [
        '@type' => 'Organization',
        '@id'   => _WEBSITE_ORG_ID,
        'name'  => _WEBSITE_NAME,
        'url'   => _WEBSITE_URL,
        'logo'  => _WEBSITE_LOGO,
    ];

    $schemas[] = [
        '@type'     => 'WebSite',
        '@id'       => _WEBSITE_ID,
        'name'      => _WEBSITE_NAME,
        'url'       => _WEBSITE_URL,
        'publisher' => ['@id' => _WEBSITE_ORG_ID],
    ];
}


/* =====================================================================
   BLOCK B — SERVICE SCHEMA  (service pages only)
   ===================================================================== */
if (in_array($file_name, $service_pages, true)) {

    $svc = $service_schema_map[$file_name] ?? [];

    /* Build areaServed - defaults to India */
    if (!empty($svc['areaServed'])) {
        $area_served = array_map(
            fn($c) => ['@type' => 'Country', 'name' => $c],
            $svc['areaServed']
        );
    } else {
        $area_served = [
            ['@type' => 'Country', 'name' => 'India'],
        ];
    }

    /* Build audience array */
    $audience = null;
    if (!empty($svc['audience'])) {
        $audience = array_map(
            fn($a) => ['@type' => 'Audience', 'audienceType' => $a],
            $svc['audience']
        );
    }

    $svc_url = !empty($canonical_url) ? $canonical_url : $current_url;
    // Ensure absolute canonical URL for schema ID
    if (!preg_match('~^https?://~i', $svc_url)) {
        $svc_url = rtrim($site_root, '/') . '/' . ltrim($svc_url, '/');
    }
    $svc_id  = rtrim($svc_url, '/') . '#' . (!empty($svc['id_fragment']) ? $svc['id_fragment'] : 'service');

    $service_block = [
        '@type'         => 'Service',
        '@id'           => $svc_id,
        'name'          => !empty($svc['name'])          ? $svc['name']          : ($page_title ?? null),
        'serviceType'   => !empty($svc['serviceType'])   ? $svc['serviceType']   : null,
        'serviceOutput' => !empty($svc['serviceOutput']) ? $svc['serviceOutput'] : null,
        'description'   => !empty($svc['description'])   ? $svc['description']   : ($page_desc  ?? null),
        'url'           => $svc_url,
        'image'         => !empty($og_image)             ? ((preg_match('~^https?://~i', $og_image)) ? $og_image : rtrim($site_root, '/') . '/' . ltrim($og_image, '/')) : null,
        'areaServed'    => $area_served,
        'audience'      => $audience,
        'provider'      => ['@id' => _WEBSITE_ORG_ID],
    ];

    $schemas[] = _schema_clean($service_block);
}


/* =====================================================================
   BLOCK E — WEB PAGE TYPES  (static non-service pages)
   ===================================================================== */
$static_page_types = [
    'about-us.php'       => 'AboutPage',
    'contact-us.php'     => 'ContactPage',
    'privacy-policy.php' => 'WebPage',
    'thank-you.php'      => 'WebPage',
];

if (!$is_home
    && isset($static_page_types[$file_name])
    && !in_array($file_name, $service_pages, true)
) {
    $page_url = !empty($canonical_url) ? $canonical_url : $current_url;
    if (!preg_match('~^https?://~i', $page_url)) {
        $page_url = rtrim($site_root, '/') . '/' . ltrim($page_url, '/');
    }

    $schemas[] = _schema_clean([
        '@type'         => $static_page_types[$file_name],
        '@id'           => rtrim($page_url, '/') . '#webpage',
        'name'          => $page_title ?? null,
        'headline'      => $page_title ?? null,
        'description'   => $page_desc  ?? null,
        'url'           => $page_url,
        'inLanguage'    => _IN_LANGUAGE,
        'datePublished' => _DATE_PUBLISHED,
        'dateModified'  => _DATE_MODIFIED,
        'isPartOf'      => ['@id' => _WEBSITE_ID],
        'about'         => ['@id' => _WEBSITE_ORG_ID],
        'publisher'     => ['@id' => _WEBSITE_ORG_ID],
        'primaryImageOfPage' => !empty($og_image)
            ? ['@type' => 'ImageObject', 'url' => (preg_match('~^https?://~i', $og_image) ? $og_image : rtrim($site_root, '/') . '/' . ltrim($og_image, '/'))]
            : null,
    ]);
}


/* =====================================================================
   BLOCK F — BREADCRUMB LIST  (all non-home pages)
   ===================================================================== */
if (!$is_home) {

    $breadcrumb_items = [];
    $pos              = 1;

    // 1. Home
    $breadcrumb_items[] = [
        '@type'    => 'ListItem',
        'position' => $pos++,
        'name'     => 'Home',
        'item'     => $site_root,
    ];

    // 2. Manual level-2 override if supplied
    if (!empty($breadcrumb_parent)) {
        $breadcrumb_items[] = [
            '@type'    => 'ListItem',
            'position' => $pos++,
            'name'     => $breadcrumb_parent['name'],
            'item'     => $breadcrumb_parent['url'],
        ];
    }

    // 3. Current page (always last)
    $current_name = _schema_breadcrumb_name(
        $file_name,
        $page_title ?? '',
        $service_schema_map ?? []
    );

    $page_item_url = !empty($canonical_url) ? $canonical_url : $current_url;
    if (!preg_match('~^https?://~i', $page_item_url)) {
        $page_item_url = rtrim($site_root, '/') . '/' . ltrim($page_item_url, '/');
    }

    $breadcrumb_items[] = [
        '@type'    => 'ListItem',
        'position' => $pos++,
        'name'     => $current_name,
        'item'     => $page_item_url,
    ];

    $schemas[] = [
        '@type'           => 'BreadcrumbList',
        'itemListElement' => $breadcrumb_items,
    ];
}

/* =====================================================================
   OUTPUT — render_schema()
   Call once inside <head>, after this file is included.
   Outputs a single <script type="application/ld+json"> block
   containing all accumulated schema nodes in a @graph array.
   ===================================================================== */
function render_schema(): void
{
    global $schemas;
    if (empty($schemas)) return;

    echo '<script type="application/ld+json">' . "\n";
    echo json_encode(
        ['@context' => 'https://schema.org', '@graph' => $schemas],
        JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT
    );
    echo "\n</script>\n";
}
?>