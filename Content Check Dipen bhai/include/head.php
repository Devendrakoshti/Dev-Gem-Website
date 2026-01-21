<?php
include __DIR__ . '/config.php';
include __DIR__ . '/schema-engine.php';
?>
<!doctype html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />
    <!-- Preconnects -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="dns-prefetch" href="https://www.google.com">
    <link rel="dns-prefetch" href="https://googleads.g.doubleclick.net">
    <link rel="dns-prefetch" href="https://www.googletagmanager.com">
    <link rel="dns-prefetch" href="https://www.gstatic.com">
    <link rel="dns-prefetch" href="https://js.clarity.ms">
    <!-- Banner Image Preload -->
    <?php if (isset($preload_image) && $preload_image): ?>
        <link rel="preload" as="image" href="<?php echo htmlspecialchars($preload_image, ENT_QUOTES, 'UTF-8'); ?>" fetchpriority="high">
    <?php endif; ?>
    <!-- Google Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Barlow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap">
    <!-- Google Analytics 4 (GA4) js code -->
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-GTHFZCVWNB');
    </script>
    <!-- Meta Title & Description For All pages-->
    <title>
        <?php echo htmlspecialchars($page_title, ENT_QUOTES, 'UTF-8'); ?>
    </title>
    <meta name="description" content="<?php echo htmlspecialchars($page_desc, ENT_QUOTES, 'UTF-8'); ?>">
    <?php if (!empty($page_keywords)): ?>
        <meta name="keywords" content="<?php echo htmlspecialchars($page_keywords, ENT_QUOTES, 'UTF-8'); ?>">
    <?php endif; ?>
    <!-- index, follow Meta Code -->
    <meta name="robots" content="<?php echo htmlspecialchars($robots_meta ?? 'index, follow', ENT_QUOTES, 'UTF-8'); ?>" />
    <meta name="googlebot" content="<?php echo htmlspecialchars($googlebot_meta ?? 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1', ENT_QUOTES, 'UTF-8'); ?>" />
    <meta name="bingbot" content="<?php echo htmlspecialchars($bingbot_meta ?? 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1', ENT_QUOTES, 'UTF-8'); ?>" />
    <link rel="canonical" href="<?php echo htmlspecialchars($canonical_url, ENT_QUOTES, 'UTF-8'); ?>">
    <!-- Open Graph Tags -->
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="CAD Services India">
    <meta property="og:logo" content="<?php echo $base_url; ?>images/logo.svg">
    <meta property="og:title" content="<?php echo htmlspecialchars($page_title, ENT_QUOTES, 'UTF-8'); ?>">
    <meta property="og:description" content="<?php echo htmlspecialchars($page_desc, ENT_QUOTES, 'UTF-8'); ?>">
    <meta property="og:url" content="<?php echo htmlspecialchars($canonical_url, ENT_QUOTES, 'UTF-8'); ?>">
    <meta property="og:image" content="<?php echo htmlspecialchars($og_image, ENT_QUOTES, 'UTF-8'); ?>">
    <meta property="og:image:width" content="<?php echo htmlspecialchars($og_width, ENT_QUOTES, 'UTF-8'); ?>" />
    <meta property="og:image:height" content="<?php echo htmlspecialchars($og_height, ENT_QUOTES, 'UTF-8'); ?>" />
    <meta property="og:image:type" content="image/webp" />
    <!-- Twitter Card Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?php echo htmlspecialchars($page_title, ENT_QUOTES, 'UTF-8'); ?>">
    <meta name="twitter:description" content="<?php echo htmlspecialchars($page_desc, ENT_QUOTES, 'UTF-8'); ?>">
    <meta name="twitter:image" content="<?php echo htmlspecialchars($og_image, ENT_QUOTES, 'UTF-8'); ?>">
    <!-- Favicon & App Icons -->
    <link rel="android-chrome" type="image/png" sizes="192x192" href="<?php echo $base_url; ?>images/favicon/android-chrome-192x192.png">
    <link rel="android-chrome" type="image/png" sizes="512x512" href="<?php echo $base_url; ?>images/favicon/android-chrome-512x512.png">
    <link rel="apple-touch-icon" sizes="180x180" href="<?php echo $base_url; ?>images/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="<?php echo $base_url; ?>images/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="<?php echo $base_url; ?>images/favicon/favicon-16x16.png">
    <link rel="icon" type="image/x-icon" href="<?php echo $base_url; ?>images/favicon/favicon.ico">
    <link rel="manifest" href="<?php echo $base_url; ?>images/favicon/site.webmanifest">
    <meta name="theme-color" content="#263147">
    <!-- apple web app title  -->
    <meta name="apple-mobile-web-app-title" content="<?php echo htmlspecialchars($page_title, ENT_QUOTES, 'UTF-8'); ?>">
    <!-- hreflang Tag  -->
    <link rel="alternate" hreflang="en-us" href="<?php echo htmlspecialchars($canonical_url, ENT_QUOTES, 'UTF-8'); ?>">
    <link rel="alternate" hreflang="en-au" href="<?php echo htmlspecialchars($canonical_url, ENT_QUOTES, 'UTF-8'); ?>">
    <link rel="alternate" hreflang="en-ca" href="<?php echo htmlspecialchars($canonical_url, ENT_QUOTES, 'UTF-8'); ?>">
    <link rel="alternate" hreflang="en-gb" href="<?php echo htmlspecialchars($canonical_url, ENT_QUOTES, 'UTF-8'); ?>">
    <link rel="alternate" hreflang="x-default" href="<?php echo htmlspecialchars($canonical_url, ENT_QUOTES, 'UTF-8'); ?>">
    <!-- Style CSS: Hybrid Strategy -->
    <!-- External Bootstrap for Caching -->
    <link rel="stylesheet" href="<?php echo $base_url; ?>css/source.css">
    <!-- Inline Custom CSS for Critical Styling -->
    <style>
        <?php
        if (file_exists('css/style.css')) {
            include 'css/style.css';
        } elseif (file_exists('../css/style.css')) {
            include '../css/style.css';
        }
        ?>
    </style>
    <!-- Schema Rendering -->
    <?php render_schema(); ?>
</head>