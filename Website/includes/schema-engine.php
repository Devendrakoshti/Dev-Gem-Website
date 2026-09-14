<?php
/* =====================================================================
   SCHEMA ENGINE v2.0 — Tesla Mechanical Designs
   File: includes/schema-engine.php

   Outputs a single JSON-LD @graph block per page via render_schema().
   Requires: includes/service-schema-data.php (auto-loaded below).

   Page-level variables consumed (set before including head.php):
     $page_title          string  — full SEO title
     $page_desc           string  — meta description
     $page_keywords       string  — meta keywords (comma-separated)
     $canonical_url       string  — absolute canonical URL for this page
     $og_image            string  — absolute OG image URL
     $page_published_date string  — ISO 8601 date e.g. "2025-08-26"
     $page_modified_date  string  — ISO 8601 date (falls back to published)
     $page_category       string  — article section (case-studies)
     $page_pdf_url        string  — override PDF URL for DigitalDocument
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
   Strips sub-folder suffixes from $base_url for pages inside
   /infographics/, & etc.
   Uses a while loop to handle nested folders like case-studies/x/.
   ───────────────────────────────────────────────────────────────────── */
$site_root = $base_url;
$_subdirs  = ['infographics/', 'blog/'];   // 'x/' (case studies) disabled - no case studies yet
$_changed  = true;
while ($_changed) {
    $_changed = false;
    foreach ($_subdirs as $_sub) {
        if (substr($site_root, -strlen($_sub)) === $_sub) {
            $site_root = substr($site_root, 0, -strlen($_sub));
            $_changed  = true;
            break;
        }
    }
}
$site['url'] = $site_root;
unset($_subdirs, $_sub, $_changed);


/* ─────────────────────────────────────────────────────────────────────
   3. SERVICE PAGE REGISTRY
   All pages that receive a Service schema block.
   ───────────────────────────────────────────────────────────────────── */
$service_pages = [
    '2D-mechanical-drawings-services.php',
    '3d-modeling-services.php',
    '3d-printing-services.php',
    'assembly-drawing-services.php',
    'assembly-modeling-services.php',
    'cad-conversion-services.php',
    'computational-fluid-dynamics.php',
    'enclosure-design-services.php',
    'engineering-analysis-services.php',
    'fabrication-design-services.php',
    'finite-element-analysis.php',
    'furniture-modeling-services.php',
    'industrial-design-services.php',
    'machine-design-services.php',
    'manufacturing-services.php',
    'mechanical-drafting-services.php',
    'mechanical-part-modelling-services.php',
    'piping-design-and-engineering-services.php',
    'product-design-services.php',
    'product-development-services.php',
    'product-modeling-services.php',
    'product-rendering-services.php',
    'rapid-prototyping-services.php',
    'reverse-engineering-services.php',
    'scan-to-cad-modeling-services.php',
    'sheet-metal-design-services.php',
    'sheet-metal-modeling-services.php',
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
   Prevents full SEO titles appearing as breadcrumb labels.
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
    return ucwords(str_replace(['-', '.php'], [' ', ''], $filename));
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
        'description'         => 'Outsourced mechanical engineering for manufacturers and OEMs. Machine design, 3D CAD modeling, manufacturing drawings, FEA and CFD analysis, reverse engineering and prototyping, delivered manufacturing-ready across 300+ projects. Send a sketch, drawing or CAD file and we will scope it.',
        'email'               => 'info@teslamechanicaldesigns.com',
        'areaServed'  => 'Worldwide',
        'address' => [
            [
                '@type'           => 'PostalAddress',
                'streetAddress'   => 'Indraprastha Corporate, 303, 100 Feet Anand Nagar Rd, Prahlad Nagar',
                'addressLocality' => 'Ahmedabad',
                'addressRegion'   => 'Gujarat',
                'postalCode'      => '380015',
                'addressCountry'  => 'IN',
            ],
            [
                '@type'           => 'PostalAddress',
                'streetAddress'   => '1 Dayton Dr #5D',
                'addressLocality' => 'Edison',
                'addressRegion'   => 'NJ',
                'postalCode'      => '08820',
                'addressCountry'  => 'US',
            ],
            [
                '@type'           => 'PostalAddress',
                'streetAddress'   => '108 Ramney Dr',
                'addressLocality' => 'Enfield',
                'addressRegion'   => 'London',
                'postalCode'      => 'EN3 6FE',
                'addressCountry'  => 'GB',
            ],
            [
                '@type'           => 'PostalAddress',
                'streetAddress'   => '9 Vance Court',
                'addressLocality' => 'Narre Warren',
                'addressRegion'   => 'VIC',
                'postalCode'      => '3805',
                'addressCountry'  => 'AU',
            ],
        ],

        /* International phone numbers exposed as ContactPoint nodes.
           Schema.org recommends ContactPoint over multiple `telephone`
           properties when serving more than one region. Each entry carries
           its own areaServed + availableLanguage so search engines can
           surface the right number per visitor geography. */
        'contactPoint' => [
            [
                '@type'             => 'ContactPoint',
                'telephone'         => '+917948004669',
                'contactType'       => 'sales',
                'areaServed'        => ['IN'],
                'availableLanguage' => ['English', 'Hindi'],
            ],
            [
                '@type'             => 'ContactPoint',
                'telephone'         => '+15106803390',
                'contactType'       => 'sales',
                'areaServed'        => ['US', 'CA'],
                'availableLanguage' => ['English'],
            ],
            [
                '@type'             => 'ContactPoint',
                'telephone'         => '+443330119045',
                'contactType'       => 'sales',
                'areaServed'        => ['GB'],
                'availableLanguage' => ['English'],
            ],
            [
                '@type'             => 'ContactPoint',
                'telephone'         => '+61489997117',
                'contactType'       => 'sales',
                'areaServed'        => ['AU'],
                'availableLanguage' => ['English'],
            ],
        ],
        

    /* knowsAbout for Tesla Mechanical Designs — mechanical engineering & CAD outsourcing.
    All entries use @type Thing (concepts, disciplines, standards, industries) or
    SoftwareApplication (CAD/CAE tools) with Wikipedia sameAs for AI/LLM entity resolution.
    Standards cover both US (ASME) and international (ISO) per target markets:
    USA, UK, Canada, Australia, Europe. */

        'knowsAbout' => [

            /* ── Core Engineering Disciplines ─────────────────────────────── */

            [
                '@type'  => 'Thing',
                'name'   => 'Mechanical Engineering',
                'sameAs' => 'https://en.wikipedia.org/wiki/Mechanical_engineering',
            ],
            [
                '@type'  => 'Thing',
                'name'   => 'Computer-Aided Design',
                'sameAs' => 'https://en.wikipedia.org/wiki/Computer-aided_design',
            ],
            [
                '@type'  => 'Thing',
                'name'   => 'Computer-Aided Engineering',
                'sameAs' => 'https://en.wikipedia.org/wiki/Computer-aided_engineering',
            ],
            [
                '@type'  => 'Thing',
                'name'   => '3D Modeling',
                'sameAs' => 'https://en.wikipedia.org/wiki/3D_modeling',
            ],
            [
                '@type'  => 'Thing',
                'name'   => 'Engineering Drawing',
                'sameAs' => 'https://en.wikipedia.org/wiki/Engineering_drawing',
            ],
            [
                '@type'  => 'Thing',
                'name'   => 'Product Design',
                'sameAs' => 'https://en.wikipedia.org/wiki/Product_design',
            ],
            [
                '@type'  => 'Thing',
                'name'   => 'Sheet Metal Design',
                'sameAs' => 'https://en.wikipedia.org/wiki/Sheet_metal',
            ],
            [
                '@type'  => 'Thing',
                'name'   => 'Reverse Engineering',
                'sameAs' => 'https://en.wikipedia.org/wiki/Reverse_engineering',
            ],
            [
                '@type'  => 'Thing',
                'name'   => 'Rapid Prototyping',
                'sameAs' => 'https://en.wikipedia.org/wiki/Rapid_prototyping',
            ],
            [
                '@type'  => 'Thing',
                'name'   => 'Automation',
                'sameAs' => 'https://en.wikipedia.org/wiki/Automation',
            ],
            [
                '@type'  => 'Thing',
                'name'   => 'Mechanism Design',
                'sameAs' => 'https://en.wikipedia.org/wiki/Mechanism_(engineering)',
            ],
            [
                '@type'  => 'Thing',
                'name'   => 'Manufacturing Engineering',
                'sameAs' => 'https://en.wikipedia.org/wiki/Manufacturing_engineering',
            ],
            [
                '@type'  => 'Thing',
                'name'   => 'Product Lifecycle Management',
                'sameAs' => 'https://en.wikipedia.org/wiki/Product_lifecycle',
            ],

            /* ── Analysis & Simulation Techniques ─────────────────────────── */

            [
                '@type'  => 'Thing',
                'name'   => 'Finite Element Analysis',
                'sameAs' => 'https://en.wikipedia.org/wiki/Finite_element_method',
            ],
            [
                '@type'  => 'Thing',
                'name'   => 'Computational Fluid Dynamics',
                'sameAs' => 'https://en.wikipedia.org/wiki/Computational_fluid_dynamics',
            ],
            [
                '@type'  => 'Thing',
                'name'   => 'Geometric Dimensioning and Tolerancing',
                'sameAs' => 'https://en.wikipedia.org/wiki/Geometric_dimensioning_and_tolerancing',
            ],
            [
                '@type'  => 'Thing',
                'name'   => 'Engineering Tolerance',
                'sameAs' => 'https://en.wikipedia.org/wiki/Engineering_tolerance',
            ],

            /* ── Standards (US + International) ───────────────────────────── */

            [
                '@type'  => 'Thing',
                'name'   => 'ASME Standards',
                'sameAs' => 'https://en.wikipedia.org/wiki/American_Society_of_Mechanical_Engineers',
            ],
            [
                '@type'  => 'Thing',
                'name'   => 'ISO Standards',
                'sameAs' => 'https://en.wikipedia.org/wiki/International_Organization_for_Standardization',
            ],

            /* ── Industries Served ─────────────────────────────────────────── */

            [
                '@type'  => 'Thing',
                'name'   => 'Automotive Engineering',
                'sameAs' => 'https://en.wikipedia.org/wiki/Automotive_engineering',
            ],           
        ],

        'sameAs' => [
            'https://www.linkedin.com/company/tesla-mechanical-designs/',
            'https://www.facebook.com/teslamechanicaldesigns',
            'https://www.instagram.com/teslamechanicaldesigns/',
            'https://x.com/teslamechd',
            'https://bsky.app/profile/teslamechdesign.bsky.social',
            'https://www.tumblr.com/teslamechanicaldesign',
            'https://www.pinterest.com/teslamechanicaldesigns/',
            'https://www.youtube.com/@TeslaMechanicalDesigns',
            'https://www.cadcrowd.com/profile/47650-teslamechanicaldesigns',
            'https://about.me/teslamechanical',
            'https://www.crazyengineers.com/user/teslamechanicaldesigns',
            'https://www.trustindex.io/reviews/www.teslamechanicaldesigns.com',
            'https://businessfirms.co/company/tesla-mechanical-designs',
            'https://www.manta.com/c/m1xxv9x/tesla-mechanical-designs',
            'https://www.goodfirms.co/company/tesla-mechanical-designs',
            'https://www.cad3d.it/forum1/iscritti/tesla-mechanical-designs.110545/',
            'https://www.provenexpert.com/en-us/tesla-mechanical-designs/',
            'https://clutch.co/profile/tesla-mechanical-designs',
            'https://reviews.birdeye.com/tesla-mechanical-designs-175506906082717',
            'https://www.brownbook.net/business/54621656/tesla-mechanical-designs',
            'https://www.remotehub.com/teslamechanicaldesigns',
            'https://www.hotfrog.com/company/0aa98a1131e1019c9495a8cb2cc32a65',
            'https://www.merchantcircle.com/tesla-mechanical-designs',
        ],
        /* aggregateRating intentionally omitted: a self-serving AggregateRating on an
           Organization breaches Google's structured-data policy and risks a manual
           action. Reinstate only with verifiable third-party review data. */
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
   The full Corporation node lives on the homepage only. Without these
   stubs, provider / publisher / isPartOf / about references on inner
   pages point at an @id that is absent from the page graph, so the
   entity never resolves. These lightweight nodes make each page's
   @graph self-contained while the homepage remains the canonical,
   fully-detailed definition.
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

    /* Build areaServed
       Default: United States (Country) — US-focused site,
       matches site content and target market.
       Override: set 'areaServed' string array in service-schema-data.php
       for any geo-specific page. */
    if (!empty($svc['areaServed'])) {
        $area_served = array_map(
            fn($c) => ['@type' => 'Country', 'name' => $c],
            $svc['areaServed']
        );
    } else {
        $area_served = [
            ['@type' => 'Country',   'name' => 'India'],
            ['@type' => 'Country',   'name' => 'United States'],
            ['@type' => 'Country',   'name' => 'United Kingdom'],
            ['@type' => 'Country',   'name' => 'Australia'],
            ['@type' => 'Country',   'name' => 'Canada'],
            ['@type' => 'Continent', 'name' => 'Europe'],
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
    $svc_id  = rtrim($svc_url, '/') . '#' . (!empty($svc['id_fragment']) ? $svc['id_fragment'] : 'service');

    $service_block = [
        '@type'         => 'Service',
        '@id'           => $svc_id,
        'name'          => !empty($svc['name'])          ? $svc['name']          : ($page_title ?? null),
        'serviceType'   => !empty($svc['serviceType'])   ? $svc['serviceType']   : null,
        'serviceOutput' => !empty($svc['serviceOutput']) ? $svc['serviceOutput'] : null,
        'description'   => !empty($svc['description'])   ? $svc['description']   : ($page_desc  ?? null),
        'url'           => $svc_url,
        'image'         => !empty($og_image)             ? $og_image             : null,
        'areaServed'    => $area_served,
        'audience'      => $audience,
        'provider'      => ['@id' => _WEBSITE_ORG_ID],
    ];

    $schemas[] = _schema_clean($service_block);
}


/* =====================================================================
   BLOCK C — DIGITAL DOCUMENT  (infographics/ only)
   Fires for /infographics/<slug>.php and links the downloadable PDF at
   /resources/<slug>.pdf, overridable per page via $page_pdf_url.
   Case-studies support is intentionally disabled — there are no case studies yet.
   ===================================================================== */
if (
    strpos($request_path, 'infographics/') !== false 
) {
    $slug = str_replace('.php', '', $file_name);

    if (!empty($page_pdf_url)) {
        $pdf_url = $page_pdf_url;
    } else {
        $pdf_url = $site_root . 'resources/' . $slug . '.pdf';
    }

    $schemas[] = _schema_clean([
        '@type'           => 'DigitalDocument',
        'name'            => $page_title    ?? null,
        'headline'        => $page_title    ?? null,
        'url'             => $pdf_url,
        'encodingFormat'  => 'application/pdf',
        'fileFormat'      => 'application/pdf',
        'inLanguage'      => _IN_LANGUAGE,
        'dateCreated'     => _DATE_CREATED,
        'datePublished'   => _DATE_PUBLISHED,
        'dateModified'    => _DATE_MODIFIED,
        'description'     => $page_desc     ?? null,
        'author'    => ['@type' => 'Organization', 'name' => _WEBSITE_NAME, 'url' => $site_root],
        'publisher' => [
            '@type' => 'Organization',
            'name'  => _WEBSITE_NAME,
            'logo'  => ['@type' => 'ImageObject', 'url' => _WEBSITE_LOGO],
        ],
        'hasDigitalDocumentPermission' => [
            '@type'          => 'DigitalDocumentPermission',
            'permissionType' => 'ReadPermission',
            'grantee'        => ['@type' => 'Audience', 'audienceType' => 'public'],
        ],
    ]);
}


/* =====================================================================
   BLOCK D — CREATIVE WORK  (infographics/ only)
   ===================================================================== */
if (strpos($request_path, 'infographics/') !== false) {

    $slug = $slug ?? str_replace('.php', '', $file_name);

    $creative_image = !empty($og_image)
        ? $og_image
        : $site_root . 'images/infographics/' . $slug . '.webp';

    $schemas[] = _schema_clean([
        '@type'               => 'CreativeWork',
        'mainEntityOfPage'    => ['@type' => 'WebPage', '@id' => $current_url],
        'name'                => $page_title    ?? null,
        'headline'            => $page_title    ?? null,
        'learningResourceType'=> 'Infographic',
        'url'                 => $current_url,
        'image'               => ['@type' => 'ImageObject', 'url' => $creative_image],
        'description'         => $page_desc     ?? null,
        'isAccessibleForFree' => true,
        'inLanguage'          => _IN_LANGUAGE,
        'keywords'            => !empty($page_keywords) ? $page_keywords : null,
        'dateCreated'         => _DATE_CREATED,
        'datePublished'       => _DATE_PUBLISHED,
        'dateModified'        => _DATE_MODIFIED,
        'creator'   => ['@type' => 'Organization', 'name' => _WEBSITE_NAME, 'url' => $site_root],
        'publisher' => [
            '@type' => 'Organization',
            'name'  => _WEBSITE_NAME,
            'logo'  => ['@type' => 'ImageObject', 'url' => _WEBSITE_LOGO],
        ],
    ]);
}


/* =====================================================================
   BLOCK E — WEB PAGE TYPES  (static non-service pages)
   Emits the specific WebPage subtype Google recognises for each page.
   Any non-home page not listed here and not a service page falls back
   to a plain WebPage node.
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
            ? ['@type' => 'ImageObject', 'url' => $og_image]
            : null,
    ]);
}


/* =====================================================================
   BLOCK F — BREADCRUMB LIST  (all non-home pages)

   Logic:
     1. Home (always)
     2. Infographics folder crumb (if in that folder)
     3. Manual level-2 override via $breadcrumb_parent (for any page
        not covered by the folder logic above)
     4. Current page (always last)
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

    // 2a. Infographics folder
    if (strpos($request_path, 'infographics/') !== false) {
        $breadcrumb_items[] = [
            '@type'    => 'ListItem',
            'position' => $pos++,
            'name'     => 'Infographics',
            'item'     => $site_root . 'infographics.php',
        ];
    } elseif (!empty($breadcrumb_parent)) {
        // 4. Manual level-2 override
        $breadcrumb_items[] = [
            '@type'    => 'ListItem',
            'position' => $pos++,
            'name'     => $breadcrumb_parent['name'],
            'item'     => $breadcrumb_parent['url'],
        ];
    }

    // 5. Current page (always last)
    $current_name = _schema_breadcrumb_name(
        $file_name,
        $page_title ?? '',
        $service_schema_map ?? []
    );

    $breadcrumb_items[] = [
        '@type'    => 'ListItem',
        'position' => $pos++,
        'name'     => $current_name,
        'item'     => !empty($canonical_url) ? $canonical_url : $current_url,
    ];

    $schemas[] = [
        '@type'           => 'BreadcrumbList',
        'itemListElement' => $breadcrumb_items,
    ];
} // Make sure to close the !$is_home if block!

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