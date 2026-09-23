    <!-- Preconnects -->  
    <link rel="dns-prefetch" href="https://www.googletagmanager.com">
    <link rel="dns-prefetch" href="https://www.gstatic.com">
    <link rel="dns-prefetch" href="https://js.clarity.ms">
    <!-- Google Tag Manager -->
    
    <!-- End Google Tag Manager -->
   <!-- Favicon & App Icons -->
    <!-- Basic Favicon -->
    <link rel="icon" type="image/x-icon" href="https://www.gemgujarat.in/images/favicon/favicon.ico">
    <!-- Standard PNG Favicons -->
    <link rel="icon" type="image/png" sizes="16x16" href="https://www.gemgujarat.in/images/favicon/favicon-16x16.png">
    <link rel="icon" type="image/png" sizes="32x32" href="https://www.gemgujarat.in/images/favicon/favicon-32x32.png">
    <!-- Apple Touch Icon -->
    <link rel="apple-touch-icon" sizes="180x180" href="https://www.gemgujarat.in/images/favicon/apple-touch-icon.png">
    <!-- Android / PWA -->
    <link rel="manifest" href="https://www.gemgujarat.in/images/favicon/site.webmanifest">
    <link rel="icon" type="image/png" sizes="192x192" href="https://www.gemgujarat.in/images/favicon/android-chrome-192x192.png">
    <link rel="icon" type="image/png" sizes="512x512" href="https://www.gemgujarat.in/images/favicon/android-chrome-512x512.png">
    <!-- For Web App Background -->
    <meta name="theme-color" content="#f70629">   
    <!-- apple web app title  -->
    <?php $head_title = (isset($page_title) && !empty($page_title))
        ? $page_title
        : (function_exists('get_the_title') ? get_the_title() : '');

    $head_url = (isset($canonical_url) && !empty($canonical_url))
        ? $canonical_url
        : (function_exists('get_permalink') ? get_permalink() : '');
    ?>
    <!-- apple web app title  -->
    <meta name="apple-mobile-web-app-title" content="<?php echo htmlspecialchars($head_title, ENT_QUOTES, 'UTF-8'); ?>">


