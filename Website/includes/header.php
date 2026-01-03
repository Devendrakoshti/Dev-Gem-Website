<!-- Basic Favicon -->
<link rel="icon" type="image/x-icon" href="./images/favicon/favicon.ico" >

<!-- Standard PNG Favicons -->
<link rel="icon" type="image/png" sizes="16x16" href="./images/favicon/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="./images/favicon/favicon-32x32.png">

<!-- Apple Touch Icon -->
<link rel="apple-touch-icon" sizes="180x180" href="./images/favicon/apple-touch-icon.png">

<!-- Android / PWA -->
<link rel="manifest" href="./images/favicon/site.webmanifest">
<link rel="icon" type="image/png" sizes="192x192" href="./images/favicon/android-chrome-192x192.png">
<link rel="icon" type="image/png" sizes="512x512" href="./images/favicon/android-chrome-512x512.png">

<!-- Theme Color -->
<meta name="theme-color" content="#f70629">

<!-- index, follow Meta Code -->
<meta name="robots" content="index, follow" />
<meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
<meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
<!-- Google Tag Manager -->
<!-- <script>
    (function (w, d, s, l, i) {
        w[l] = w[l] || []; w[l].push({
            'gtm.start':
                new Date().getTime(), event: 'gtm.js'
        }); var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
                'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-W6K2GBM');
</script> -->
<!-- End Google Tag Manager -->
<!-- Custome Style CSS -->
<style>
  <?php include 'css/source.css'; ?>
  <?php include 'css/style.css'; ?>
</style>

<!-- Organization Schema -->
<script type="application/ld+json">
  {"@context":"https://schema.org","@type":"Organization","name":"GEM Gujarat","legalName":"GEM Gujarat LLC","url":"https://www.teslaoutsourcingservices.com","logo":"https://www.teslaoutsourcingservices.com/images/tos-logo.svg","image":"https://www.teslaoutsourcingservices.com/images/bim-services-og-img.webp","sameAs":["https://www.linkedin.com/company/tesla-outsourcing-services/","https://www.facebook.com/teslaoutsourcingservices/","https://twitter.com/teslaoutsource","https://www.pinterest.com/teslaoutsource/","https://www.instagram.com/teslaos/","https://www.crunchbase.com/organization/tesla-outsourcing-services","https://clutch.co/profile/tesla-outsourcing-services","https://www.goodfirms.co/company/bim-service-provider-tesla-outsourcing-services","https://www.bimcommunity.com/brand/tesla-outsourcing-services/","https://techbehemoths.com/company/tesla-outsourcing-services","https://bimworx.net/company/tesla-outsourcing-services/profile/info","https://www.enggpro.com/company/tesla-outsourcing-services","https://businessfirms.co/company/tesla-outsourcing-services","https://medium.com/@teslaoutsourcingservices"],"areaServed":{"@type":"Place","name":"Global"},"contactPoint":[{"@type":"ContactPoint","telephone":"+1 416 907 9430","contactType":"sales","areaServed":["US","CA"],"availableLanguage":"en"},{"@type":"ContactPoint","telephone":"+44 333 011 9045","contactType":"sales","areaServed":"GB","availableLanguage":"en"},{"@type":"ContactPoint","telephone":"+61 386 521 136","contactType":"sales","areaServed":"AU","availableLanguage":"en"}],"address":[{"@type":"PostalAddress","streetAddress":"418 Broadway, 10229","addressLocality":"Albany","addressRegion":"NY","postalCode":"12207","addressCountry":"US"},{"@type":"PostalAddress","streetAddress":"Indraprasth Corporate 304, Prahladnagar, opposite Shell Petrol Pump","addressLocality":"Ahmedabad","addressRegion":"GJ","postalCode":"380015","addressCountry":"IN"}],"description":"Trusted by 300+ Leading Architectural and Engineering Companies in the USA, UK, Europe, Australia, and Canada for BIM Services","email":"services@teslaoutsourcingservices.com","aggregateRating":{"@type":"AggregateRating","ratingValue":"4.5","reviewCount":"650"}}
</script>
<?php
function getPageTitle()
{
  $content = file_get_contents($_SERVER['SCRIPT_FILENAME']);
  preg_match('/<title\b[^>]*>(.*?)<\/title>/is', $content, $matches);
  return $matches[1] ?? 'Reliable CAD & BIM Service Provider | GEM Gujarat';
}
function getMetaTagContent($name)
{
  $content = file_get_contents($_SERVER['SCRIPT_FILENAME']);
  preg_match('/<meta\s+name=["\']' . preg_quote($name, '/') . '["\']\s+content=["\']([^"\']*)["\']/i', $content, $matches);
  return $matches[1] ?? null;
}
$currentUrl = "https://www.teslaoutsourcingservices.com" . $_SERVER['REQUEST_URI'];
$currentTitle = getPageTitle();
$currentDescription = getMetaTagContent('description') ?: "GEM Gujarat LLC: Your trusted partner for fast and affordable global CAD and BIM outsourcing.";
$excludeService = ['/', '/3d-floor-plan-samples.php', '/3d-rendering-samples.php', '/architectural-bim-samples.php', '/architectural-cad-drafting-samples.php', '/architectural-construction-drawings-samples.php', '/bim-samples.php', '/infographics.php', '/management-tesla.php', '/mechanical-drafting-samples.php', '/mechanical-engineering-analysis-samples.php', '/mep-bim-co-ordination-samples.php', '/mep-bim-samples.php', '/mep-drafting-samples.php', '/mep-installation-drawings-samples.php', '/point-cloud-bim-samples.php', '/pricing-model.php', '/privacy-policy.php', '/product-design-samples.php', '/revit-family-sample.php', '/sheet-metal-design-samples.php', '/structural-bim-samples.php', '/structural-shop-drawing-samples.php', '/structural-steel-detailing-samples.php', '/team-tesla.php', '/thank-you.php', '/projects/3d-revit-modeling-and-shop-drawing-of-academic-institution.php', '/projects/bim-modeling-airport.php', '/projects/bim-modeling-hospital.php', '/projects/construction-documentation-hotel.php', '/projects/mep-bim-modeling-bim-coordination-performing-arts-center.php'];
$excludeBreadcrumb = ['/'];
$requestUri = strtok($_SERVER['REQUEST_URI'], '?');
$serviceSchema = null;
if (!in_array($_SERVER['REQUEST_URI'], $excludeService)) {
  $serviceSchema = [
    "@context" => "https://schema.org/",
    "@type" => "Service",
    "name" => $currentTitle,
    "serviceType" => ["Architectural BIM Services", "Architectural CAD Drafting", "Construction Drawings", "Architectural Design Services", "Mechanical Drafting Services", "Product Design Services", "Sheet Metal Design Services", "Engineering Analysis Services", "Structural Steel Detailing", "Rebar Detailing Services", "Structural CAD Drafting", "Steel Shop Drawings", "Structural BIM Services", "3D Rendering", "3D Floor Plan Services", "MEP BIM Services", "MEP BIM Coordination", "MEP Clash Detection", "MEP Shop Drawings", "MEP CAD Drafting", "Drafting Services", "As Built Drawing Services", "Shop Drawings Services", "BIM Services", "BIM Consulting Services", "BIM for Infrastructure", "Scan to BIM", "BIM Coordination", "BIM Clash Detection", "BIM Content Creation", "4D BIM Services", "Quantity Takeoff", "COBie", "CAD Drafting Services", "Architectural 3D Rendering Services", "Construction Documentation", "Structural Steel Drawings Services", "Steel Detailing Documentation", "Laser Scanning Point Cloud BIM Modeling", "Point Cloud to BIM Services", "Staff Augmentation for AEC"],
    "url" => $currentUrl,
    "areaServed" => [["@type" => "Place", "name" => "Global"]],
    "brand" => [
      "@type" => "Brand",
      "name" => "GEM Gujarat LLC",
      "logo" => "https://www.teslaoutsourcingservices.com/images/tos-logo.svg"
    ]
  ];
}
$breadcrumb = null;
if (!in_array($_SERVER['REQUEST_URI'], $excludeBreadcrumb) && $_SERVER['REQUEST_URI'] !== '/') {
  $breadcrumb = [
    "@context" => "https://schema.org",
    "@type" => "BreadcrumbList",
    "itemListElement" => [
      [
        "@type" => "ListItem",
        "@id" => "https://www.teslaoutsourcingservices.com/#listItem",
        "position" => 1,
        "name" => "Home",
        "item" => "https://www.teslaoutsourcingservices.com"
      ],
      [
        "@type" => "ListItem",
        "@id" => $currentUrl . "/#listItem",
        "position" => 2,
        "name" => $currentTitle,
        "item" => $currentUrl
      ]
    ]
  ];
}
if ($serviceSchema) {
  echo '<script type="application/ld+json">' .
    json_encode($serviceSchema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) .
    '</script>';
}

if ($breadcrumb) {
  echo '<script type="application/ld+json">' .
    json_encode($breadcrumb, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) .
    '</script>' . "\n";
}
$socialTags = [
  'twitter:card' => 'summary_large_image',
  'twitter:title' => $currentTitle,
  'twitter:description' => $currentDescription,
  'twitter:image:alt' => $currentTitle,
  'og:locale' => 'en_US',
  'og:type' => 'website',
  'og:title' => $currentTitle,
  'og:description' => $currentDescription,
  'og:url' => $currentUrl,
  'og:site_name' => 'GEM Gujarat LLC',
  'og:logo' => 'https://www.teslaoutsourcingservices.com/images/tos-logo.svg'
];

foreach ($socialTags as $key => $value) {
  $prefix = str_starts_with($key, 'twitter') ? 'name' : 'property';
  echo "<meta $prefix=\"$key\" content=\"" . htmlspecialchars($value, ENT_QUOTES) . "\">\n";
}
echo '<link rel="alternate" hreflang="en-us" href="' . htmlspecialchars($currentUrl, ENT_QUOTES) . '">' . "\n";
echo '<link rel="alternate" hreflang="en-au" href="' . htmlspecialchars($currentUrl, ENT_QUOTES) . '">' . "\n";
echo '<link rel="alternate" hreflang="en-ca" href="' . htmlspecialchars($currentUrl, ENT_QUOTES) . '">' . "\n";
echo '<link rel="alternate" hreflang="en-gb" href="' . htmlspecialchars($currentUrl, ENT_QUOTES) . '">' . "\n";
echo '<link rel="alternate" hreflang="x-default" href="' . htmlspecialchars($currentUrl, ENT_QUOTES) . '">' . "\n";
echo '<meta name="apple-mobile-web-app-title" content="' . $currentTitle . '">' . "\n"
  ?>
</head>

<body>
  <!-- Google Tag Manager (noscript) -->
  <!-- <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W6K2GBM" height="0" width="0"
      style="display:none;visibility:hidden"></iframe></noscript> -->
  <!-- End Google Tag Manager (noscript) -->
  <nav class="navbar navbar-expand-xl navbar-light bg-white shadow fixed-top py-0 header-menu">
  <div class="container-fluid px-0">
    <div class="d-block w-100">
      <!-- <div class="nav-top d-none w-100 bg-dark-grey py-3 px-xl-5 px-4"> -->
      <div class="nav-top d-none d-lg-flex w-100 bg-dark-grey py-3 px-xl-5 px-4">
        <div class="d-flex align-items-center text-white fs-14">
          <div class="me-3 d-flex align-items-center">
            <div class="nav-con-box">
              <img src="./images/icons/phone-icon.svg" alt="Phone Icon" title="Call Us Now" width="20" height="20" loading="eager">
            </div>
            <a href="tel:+91801529147" title="+91801529147">+91 80152 91471</a>
          </div>
          <div class="me-3 d-flex align-items-center">
            <div class="nav-con-box">
              <img src="./images/icons/email-icon.svg" alt="Email Icon" title="Email Us" width="20" height="20" loading="eager">
            </div>
            <a href="mailto:info@gemgujarat.com" title="info@gemgujarat.com">info@gemgujarat.com</a>
          </div>
          <div class="d-flex align-items-center">
            <div class="nav-con-box">
              <img src="./images/icons/location-icon.svg" alt="Location Icon" title="Location" width="20" height="20" loading="eager">
            </div>
            <span class="ms-2 fw-semibold">123 Tesla St, Toronto, ON, Canada</span>
          </div>
        </div>
      </div>
      <div class="nav-bottom d-flex align-items-center justify-content-between px-3">
        <a class="navbar-brand px-xl-4 px-0" href="#" title="GEM Gujarat">
          <img loading="eager" src="./images/gem-gujarat-logo.webp" alt="GEM Gujarat" title="GEM Gujarat" class="img-fluid" width="165" height="74">
        </a>
        <button class="navbar-toggler" aria-label="hamburger" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div class="offcanvas-header border-bottom">
            <a class="offcanvas-title" id="offcanvasNavbarLabel" href="/" title="GEM Gujarat">
              <img loading="eager" src="./images/gem-gujarat-logo.webp" alt="GEM Gujarat" title="GEM Gujarat" class="img-fluid" width="165" height="74">              
            </a>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body mx-xl-auto mx-0">
            <ul class="navbar-nav mb-2 mb-xxl-0 align-items-xxl-center fw-bold">
              <li class="nav-item px-xl-1">
                <a class="nav-link fs-18" href="#" title="BIM Consulting Services Page"> Home </a>
              </li>
              <li class="nav-item px-xxl-2 dropdown">
                <a class="nav-link px-xxl-3 px-xl-1 dropdown-toggle d-flex justify-content-between justify-content-xxl-start align-items-center fs-18" href="#" id="navbarSSLAboutus" role="button" data-bs-toggle="dropdown" aria-expanded="false" title="About Us Page"> Pages </a>
                <div class="dropdown-menu mt-0 shadow border-0">
                  <ul class="list-unstyled" aria-labelledby="navbarSSLAboutus">
                    <li>
                      <a class="dropdown-item" href="#" title="Company Page">Company</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#" title="Pricing Model Page">Pricing Model</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#" title="Project Delivery Process Page">Project Delivery Process</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#" title="Leadership Team Page">Leadership Team</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#" title="Team Tesla Page">Team Tesla</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#" title="We are Hiring Page">We are Hiring</a>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link px-xxl-3 px-xl-1 dropdown-toggle d-flex justify-content-between justify-content-xxl-start align-items-center fs-18" href="#" id="navbarSSLAboutus" role="button" data-bs-toggle="dropdown" aria-expanded="false" title="BIM Services Page"> Services </a>
                <div class="dropdown-menu mt-0 shadow border-0">
                  <ul class="list-unstyled" aria-labelledby="navbarSSLAboutus">
                    <li>
                      <a class="dropdown-item" href="#" title="CAD to BIM Services Page">CAD to BIM Services</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#" title="Scan to BIM Services Page">Scan to BIM Services</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#" title="Clash Detection Page">Clash Detection</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#" title="BIM Coordination Page">BIM Coordination</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#" title="Revit Families Page">Revit Families</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#" title="COBie Page">COBie</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#" title="Steel Detailing Services Page">Steel Detailing Services</a>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="nav-item px-xl-1">
                <a class="nav-link fs-18" href="#" title="Staff Augmentation">About Us</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link px-xxl-3 px-xl-1 fs-18 dropdown-toggle d-flex justify-content-between justify-content-xxl-start align-items-center" href="#" id="navbarSSLAboutus" role="button" data-bs-toggle="dropdown" aria-expanded="false" title="Projects">Projects</a>
                <div class="dropdown-menu mt-0 shadow border-0">
                  <ul class="list-unstyled" aria-labelledby="navbarSSLAboutus">
                    <li>
                      <a class="dropdown-item" href="#" title="Case Study Page">Case Study</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#" title="Portfolio Page">Portfolio</a>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="nav-item px-xl-1 d-block d-xl-none mt-2">
                <a title="Explore More" class="btn-primary" href="/contact-us.php"> Contact Us <span>
                    <svg id="Layer_1" enableBackground="new 0 0 100 100" height="40" viewBox="0 0 100 100" fill="#f70629" width="40" xmlns="http://www.w3.org/2000/svg">
                      <path d="m50 10.75c-18.266 0-34.562 13.129-38.383 31.007-1.909 8.933-.623 18.432 3.636 26.515 4.099 7.779 10.819 14.066 18.859 17.629 8.363 3.707 17.964 4.353 26.754 1.825 8.48-2.438 15.999-7.789 21.118-14.972 10.703-15.017 9.272-36.111-3.32-49.567-7.38-7.886-17.862-12.437-28.664-12.437zm18.829 41.347-10.7 10.958c-2.709 2.775-6.991-1.429-4.293-4.191l5.399-5.529h-25.586c-1.817 0-3.333-1.517-3.333-3.333s1.517-3.333 3.333-3.333h25.458l-5.506-5.505c-2.736-2.736 1.506-6.979 4.242-4.243l10.961 10.96c1.162 1.161 1.173 3.041.025 4.216z" />
                    </svg>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="d-xl-block d-none">
          <a title="Explore More" class="btn-primary" href="/contact-us.php"> Contact Us <span>
              <svg id="Layer_1" enableBackground="new 0 0 100 100" height="40" viewBox="0 0 100 100" fill="#f70629" width="40" xmlns="http://www.w3.org/2000/svg">
                <path d="m50 10.75c-18.266 0-34.562 13.129-38.383 31.007-1.909 8.933-.623 18.432 3.636 26.515 4.099 7.779 10.819 14.066 18.859 17.629 8.363 3.707 17.964 4.353 26.754 1.825 8.48-2.438 15.999-7.789 21.118-14.972 10.703-15.017 9.272-36.111-3.32-49.567-7.38-7.886-17.862-12.437-28.664-12.437zm18.829 41.347-10.7 10.958c-2.709 2.775-6.991-1.429-4.293-4.191l5.399-5.529h-25.586c-1.817 0-3.333-1.517-3.333-3.333s1.517-3.333 3.333-3.333h25.458l-5.506-5.505c-2.736-2.736 1.506-6.979 4.242-4.243l10.961 10.96c1.162 1.161 1.173 3.041.025 4.216z" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </div>
</nav>
  <main>