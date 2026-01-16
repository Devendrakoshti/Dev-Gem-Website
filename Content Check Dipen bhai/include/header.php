<!doctype html>
<html lang="en">
  <head>
   <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />    
    <!-- Google Analytics 4 (GA4) js code -->
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-GTHFZCVWNB');
    </script>
    <!-- Meta Title & Description For All pages-->
    <title><?php echo $page_title; ?></title>
    <meta name="description" content="<?php echo $page_desc; ?>">
    <?php if (!empty($page_keywords)) : ?>
<meta name="keywords" content="<?php echo htmlspecialchars($page_keywords, ENT_QUOTES, 'UTF-8'); ?>">
    <?php endif; ?>
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
    <link rel="android-chrome" type="image/png" sizes="192x192" href="./images/favicon/android-chrome-192x192.png">
    <link rel="android-chrome" type="image/png" sizes="512x512" href="./images/favicon/android-chrome-512x512.png">
    <link rel="apple-touch-icon" sizes="180x180" href="./images/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="./images/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="./images/favicon/favicon-16x16.png">
    <link rel="icon" type="image/x-icon" href="./images/favicon/favicon.ico">
    <link rel="manifest" href="./images/favicon/site.webmanifest">
    <meta name="theme-color" content="#263147">
    <!-- apple web app title  -->
    <meta name="apple-mobile-web-app-title" content="<?php echo $page_title; ?>">
    <!-- hreflang Tag  -->
    <link rel="alternate" hreflang="en-us" href="<?php echo $canonical_url; ?>">
    <link rel="alternate" hreflang="en-au" href="<?php echo $canonical_url; ?>">
    <link rel="alternate" hreflang="en-ca" href="<?php echo $canonical_url; ?>">
    <link rel="alternate" hreflang="en-gb" href="<?php echo $canonical_url; ?>">
    <link rel="alternate" hreflang="x-default" href="<?php echo $canonical_url; ?>">
    <!-- Style CSS -->
    <?php echo '<style>'; include "css/style.css"; echo '</style>';?>
    <?php echo '<style>'; include "css/source.css"; echo '</style>';?>
    <!-- Banner Image Preload -->
    <?php if (isset($preload_image) && $preload_image): ?>
    <link rel="preload" as="image" href="<?php echo $preload_image; ?>" fetchpriority="high">
    <?php endif; ?>
    <!-- Schema Engine Include -->
    <?php include 'schema.php'; ?>
  </head>
  <body>
   <div class="cookie-container hide">
      <p class="cookie-message">
         We use cookies to make your experience better, please read our<a href="https://www.cadservicesindia.com/privacy-policy.php" title="Privacy Policy"> Privacy Policy.</a>
      </p>
      <div class="agree-button">
         <button>Ok</button>
      </div>
   </div>
   <div class="maindiv">
   <header>
      <div class="logo"><a title="CAD Services India Header Logo" href="https://www.cadservicesindia.com/"><img title="CAD Services India Header Logo" src="images/logo.webp" alt="Logo" width="104" height="72"></a></div>
      <div class="headermenu">
         <nav>
            <label for="drop" class="toggle tog"><img title="CAD Services India Header Logo" src="images/menu.svg" width="35" height="100%" alt="menu"></label>
            <input type="checkbox" id="drop" />
            <ul class="menu">
               <li><a title="Home" href="https://www.cadservicesindia.com/">Home</a></li>
               <li><a title="About Us" href="https://www.cadservicesindia.com/about-us.php">About Us</a></li>
               <li>
                  <label for="drop-1" class="toggle">Services</label>
                  <a title="Services" href="#" class="dcm">Services</a>
                  <input type="checkbox" id="drop-1"/>
                  <ul>
                     <li><a title="Drafting Services" href="https://www.cadservicesindia.com/drafting-services.php">Drafting Services</a></li>
                     <li><a title="Architectural Drafting Services" href="https://www.cadservicesindia.com/architectural-drafting-services.php">Architectural Drafting Services</a></li>
                     <li><a title="Structural CAD Services" href="https://www.cadservicesindia.com/structural-drafting-services.php">Structural CAD Services</a></li>
                     <li><a title="MEP CAD Services" href="https://www.cadservicesindia.com/mep-drafting-services.php">MEP CAD Services</a></li>
                     <li><a title="Construction Documentation" href="https://www.cadservicesindia.com/construction-documentation-services.php">Construction Documentation</a></li>
                     <li><a title="BIM Services" href="https://www.cadservicesindia.com/bim-services.php">BIM Services</a></li>
                     <li><a title="Scan to BIM Services" href="https://www.cadservicesindia.com/scan-to-bim-services.php">Scan to BIM Services</a></li>
                     <li><a title="3D Rendering Services" href="https://www.cadservicesindia.com/3d-rendering-services.php">3D Rendering Services</a></li>
                  </ul>
               </li>
               <li>
               <li>
                  <label for="drop-2" class="toggle">Projects</label>
                  <a title="Portfolio" href="#" class="dcm">Portfolio</a>
                  <input type="checkbox" id="drop-2"/>
                  <ul>
                     <li><a title="Drafting Samples" href="https://www.cadservicesindia.com/drafting-sample.php">Drafting Samples</a></li>
                     <li><a title="BIM Samples" href="https://www.cadservicesindia.com/bim-sample.php">BIM Samples</a></li>
                     <li><a title="Scan to BIM Samples" href="https://www.cadservicesindia.com/scan-to-bim-sample.php">Scan to BIM Samples</a></li>
                     <li><a title="3D Rendering Samples" href="https://www.cadservicesindia.com/3d-rendering-sample.php">3D Rendering Samples</a></li>
                     <li><a title="MEP CAD Samples" href="https://www.cadservicesindia.com/mep-drafting-sample.php">MEP CAD Samples</a></li>
                     <li><a title="Architectural Drafting Samples" href="https://www.cadservicesindia.com/architectural-drafting-sample.php">Architectural Drafting Samples</a></li>    
                     <li><a title="Revit Family Samples" href="https://www.cadservicesindia.com/revit-family-creation-sample.php">Revit Family Samples</a></li>
                     <li><a title="Construction Documentation Sample" href="https://www.cadservicesindia.com/construction-documentation-sample.php">Construction Documentation Sample</a></li>
                  </ul>
               </li>
               <li><a title="Blog" href="https://www.cadservicesindia.com/blog/">Blog</a></li>
               <li><a title="Contact" href="https://www.cadservicesindia.com/contact-us.php">Contact</a></li>
            </ul>
         </nav>
      </div>
   </header>

 