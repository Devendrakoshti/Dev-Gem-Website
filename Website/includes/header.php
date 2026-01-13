<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />
    <!-- Google Analytics 4 (GA4) js code -->
    <!-- <script>
      window.dataLayer = window.dataLayer || [];

      function gtag() {
        dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', 'G-GTHFZCVWNB');
    </script> -->
    <!-- Meta Title & Description For All pages-->
    <title> <?php echo $page_title; ?> </title>
    <meta name="description" content="
		<?php echo $page_desc; ?>"> <?php if (!empty($page_keywords)) : ?>
    <meta name="keywords" content="
			<?php echo htmlspecialchars($page_keywords, ENT_QUOTES, 'UTF-8'); ?>"> <?php endif; ?>
    <!-- index, follow Meta Code -->
    <meta name="robots" content="<?php echo $robots_meta ?? 'index, follow'; ?>" />
    <meta name="googlebot" content="<?php echo $googlebot_meta ?? 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'; ?>" />
    <meta name="bingbot" content="<?php echo $bingbot_meta ?? 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'; ?>" />
    <link rel="canonical" href="<?php echo $canonical_url; ?>">
    <!-- Open Graph Tags -->
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Cad Services India">
    <meta property="og:logo" content="https://www.cadservicesindia.com/images/logo.webp">
    <meta property="og:title" content="<?php echo $page_title; ?>">
    <meta property="og:description" content="<?php echo $page_desc; ?>">
    <meta property="og:url" content="<?php echo $canonical_url; ?>">
    <meta property="og:image" content="<?php echo $og_image; ?>">
    <meta property="og:image:width" content="<?php echo $og_width; ?>" />
    <meta property="og:image:height" content="<?php echo $og_height; ?>" />
    <meta property="og:image:type" content="image/webp" />
    <!-- Twitter Card Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?php echo $page_title; ?>">
    <meta name="twitter:description" content="<?php echo $page_desc; ?>">
    <meta name="twitter:image" content="<?php echo $og_image; ?>">
    <!-- Preconnects -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="dns-prefetch" href="https://www.google.com">
    <link rel="dns-prefetch" href="https://googleads.g.doubleclick.net">
    <link rel="dns-prefetch" href="https://www.googletagmanager.com">
    <link rel="dns-prefetch" href="https://www.gstatic.com">
    <link rel="dns-prefetch" href="https://js.clarity.ms">
    <link rel="preconnect" href="https://www.google.com">
    <link rel="preconnect" href="https://googleads.g.doubleclick.net">
    <link rel="preconnect" href="https://www.googletagmanager.com">
    <link rel="preconnect" href="https://www.gstatic.com">
    <link rel="preconnect" href="https://js.clarity.ms">
    <!-- Favicon & App Icons -->
    <!-- Basic Favicon -->
    <link rel="icon" type="image/x-icon" href="./images/favicon/favicon.ico">
    <!-- Standard PNG Favicons -->
    <link rel="icon" type="image/png" sizes="16x16" href="./images/favicon/favicon-16x16.png">
    <link rel="icon" type="image/png" sizes="32x32" href="./images/favicon/favicon-32x32.png">
    <!-- Apple Touch Icon -->
    <link rel="apple-touch-icon" sizes="180x180" href="./images/favicon/apple-touch-icon.png">
    <!-- Android / PWA -->
    <link rel="manifest" href="./images/favicon/site.webmanifest">
    <link rel="icon" type="image/png" sizes="192x192" href="./images/favicon/android-chrome-192x192.png">
    <link rel="icon" type="image/png" sizes="512x512" href="./images/favicon/android-chrome-512x512.png">
    <meta name="theme-color" content="#f70629">
    <!-- apple web app title  -->
    <meta name="apple-mobile-web-app-title" content="<?php echo $page_title; ?>">
    <!-- hreflang Tag  -->
    <link rel="alternate" hreflang="en-us" href="<?php echo $canonical_url; ?>">
    <link rel="alternate" hreflang="en-au" href="<?php echo $canonical_url; ?>">
    <link rel="alternate" hreflang="en-ca" href="<?php echo $canonical_url; ?>">
    <link rel="alternate" hreflang="en-gb" href="<?php echo $canonical_url; ?>">
    <link rel="alternate" hreflang="x-default" href="<?php echo $canonical_url; ?>">
    <!-- Style CSS --> 
     <?php echo '<style>'; include "../css/style.css"; echo '</style>';?> 
     <?php echo '<style>'; include "../css/source.css"; echo '</style>';?>
    <!-- Banner Image Preload --> <?php if (isset($preload_image) && $preload_image): ?>
    <link rel="preload" as="image" href="<?php echo $preload_image; ?>" fetchpriority="high"> <?php endif; ?>
    <!-- Schema Engine Include --> <?php include 'schema-engine.php'; ?>
  </head>
  <body>
    <nav class="navbar navbar-expand-xl navbar-light bg-white shadow fixed-top py-0 header-menu">
      <div class="container-fluid px-0">
        <div class="d-block w-100">
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
                <span class="ms-2 fw-semibold">Nirant Cross Rd, Vastral, Ahmedabad, Gujarat 382418</span>
              </div>
            </div>
          </div>
          <div class="nav-bottom d-flex align-items-center justify-content-between px-3">
            <a class="navbar-brand px-xl-4 px-0" href="http://localhost/Dev-Gem-Website/Website/" title="GEM Gujarat">
              <img loading="eager" src="./images/gem-gujarat-logo.webp" alt="GEM Gujarat" title="GEM Gujarat" class="img-fluid" width="165" height="74">
            </a>
            <button class="navbar-toggler" aria-label="hamburger" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
              <div class="offcanvas-header border-bottom">
                <a class="offcanvas-title" id="offcanvasNavbarLabel" href="http://localhost/Dev-Gem-Website/Website/" title="GEM Gujarat">
                  <img loading="eager" src="./images/gem-gujarat-logo.webp" alt="GEM Gujarat" title="GEM Gujarat" class="img-fluid" width="165" height="74">
                </a>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div class="offcanvas-body mx-xl-auto mx-0 h-100">
                <ul class="navbar-nav align-items-xxl-center fw-bold">
                  <li class="nav-item">
                    <a class="nav-link fs-18" href="http://localhost/Dev-Gem-Website/Website/" title="Gem Gujarat Home Page"> Home </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link fs-18" href="gem-registration-consultant.php" title="Gem Registration Page"> Gem Registration </a>
                  </li>
                  <li class="nav-item dropdown position-static">
                    <a class="nav-link px-xxl-3 px-xl-1 dropdown-toggle d-flex justify-content-between justify-content-xxl-start align-items-center fs-18" href="#" id="navbarSSLAboutus" role="button" data-bs-toggle="dropdown" aria-expanded="false" title="Gem Services Page"> Services </a>
                    <div class="dropdown-menu border-0 shadow w-100 start-0 bg-transparent mt-0 pt-0">
                      <div class="mx-auto p-3">
                        <div class="row">
                          <div class="col-xl-6">
                            <ul class="list-unstyled" aria-labelledby="navbarSSLAboutus">
                              <li>
                                <a class="dropdown-item" href="gem-registration-consultant.php" title="Gem Registration Consultant Page">Gem Registration Consultant</a>
                              </li>
                              <li>
                                <a class="dropdown-item" href="gem-catalogue-management-services.php" title="Gem Catalogue Management Services Page">Gem Catalogue Management Services</a>
                              </li>
                              <li>
                                <a class="dropdown-item" href="gem-product-catalogue-update.php" title="Gem Product Catalogue Update Page">Gem Product Catalogue Update</a>
                              </li>
                              <li>
                                <a class="dropdown-item" href="gem-stock-update-service.php" title="Gem Stock Update Service Page">Gem Stock Update Service</a>
                              </li>
                              <li>
                                <a class="dropdown-item" href="gem-invoice-generation.php" title="Gem Invoice Generation Page">Gem Invoice Generation</a>
                              </li>
                              <li>
                                <a class="dropdown-item" href="gem-order-acceptance-guide.php" title="Gem Order Acceptance Guide Page">Gem Order Acceptance Guide</a>
                              </li>
                            </ul>
                          </div>
                          <div class="col-xl-6">
                            <ul class="list-unstyled" aria-labelledby="navbarSSLAboutus">
                              <li>
                                <a class="dropdown-item" href="gem-tender-bidding-support.php" title="Gem Tender Bidding Support Page">Gem Tender Bidding Support</a>
                              </li>
                              <li>
                                <a class="dropdown-item" href="gem-l1-comparison-service.php" title="Gem L1 comparison Page">Gem L1 comparison</a>
                              </li>
                              <li>
                                <a class="dropdown-item" href="gem-vendor-assessment-support.php" title="Gem Vendor Assessment Support Page">Gem Vendor Assessment Support</a>
                              </li>
                              <li>
                                <a class="dropdown-item" href="gem-oem-panel-registration.php" title="Gem Oem Panel Registration Page">Gem Oem Panel Registration</a>
                              </li>
                              <li>
                                <a class="dropdown-item" href="gem-msme-udyam-registration.php" title="Gem Msme Udyam Registration Page">Gem Msme Udyam Registration</a>
                              </li>
                              <li>
                                <a class="dropdown-item" href="gem-iso-certificate-9001.php" title="Gem Iso Certificate 9001 Page">Gem Iso Certificate</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link fs-18" href="https://eprocure.gov.in/eprocure/app?page=FrontEndLatestActiveTenders&service=page" title="Live Tender" target="_blank"> Live Tender </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link fs-18" href="about-us.php" title="About us Page">About Us</a>
                  </li>
                  <li class="nav-item d-block d-xl-none mt-2">
                    <a title="Explore More" class="btn-primary" href="contact-us.php"> Contact Us <span>
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
              <a title="Explore More" class="btn-primary" href="contact-us.php"> Contact Us <span>
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