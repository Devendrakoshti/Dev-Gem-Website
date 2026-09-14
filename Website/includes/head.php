<!-- Page-specific CSS bundle; global style.css remains as safe fallback. -->
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
    <!-- Google Tag Manager Includ -->
     <?php require_once __DIR__ . '/google-tag-manager.php'; ?>
    <!-- Banner Image Preload -->
     <!-- Banner Image Preload --> <?php if (isset($preload_image) && $preload_image): ?>
    <link rel="preload" as="image" href="<?php echo $preload_image; ?>" fetchpriority="high"> <?php endif; ?>   
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
    <!-- hreflang: one English site serving US, GB and AU. x-default resolves to the en-US page. -->
<!-- <?php $_hreflang_url = htmlspecialchars($canonical_url, ENT_QUOTES, 'UTF-8'); ?> -->
    <link rel="alternate" hreflang="en" href="<?php echo $canonical_url; ?>">
    <!-- <link rel="alternate" hreflang="en-gb" href="<?php echo $_hreflang_url; ?>">
    <link rel="alternate" hreflang="en-au" href="<?php echo $_hreflang_url; ?>">
    <link rel="alternate" hreflang="en-ca" href="<?php echo $_hreflang_url; ?>">
    <link rel="alternate" hreflang="x-default" href="<?php echo $_hreflang_url; ?>"> -->
    <!-- Full of Og & Twitter Card Details -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="<?php echo htmlspecialchars($canonical_url); ?>">
    <meta property="og:title" content="<?php echo htmlspecialchars($page_title, ENT_QUOTES, 'UTF-8'); ?>">
    <meta property="og:description" content="<?php echo htmlspecialchars($page_desc, ENT_QUOTES, 'UTF-8'); ?>">
    <meta property="og:image" content="<?php echo htmlspecialchars($og_image, ENT_QUOTES, 'UTF-8'); ?>">
    <meta property="og:image:width" content="<?php echo htmlspecialchars($og_width, ENT_QUOTES, 'UTF-8'); ?>" />
    <meta property="og:image:height" content="<?php echo htmlspecialchars($og_height, ENT_QUOTES, 'UTF-8'); ?>" />
    <meta property="og:image:type" content="image/webp" />
    <meta property="og:site_name" content="Tesla Mechanical Designs">
    <meta property="og:logo" content="https://www.teslamechanicaldesigns.com/images/tesla-mechanical-designs-logo.svg">
    <meta property="og:locale" content="en">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="<?php echo htmlspecialchars($canonical_url); ?>">
    <meta name="twitter:title" content="<?php echo htmlspecialchars($page_title, ENT_QUOTES, 'UTF-8'); ?>">
    <meta name="twitter:description" content="<?php echo htmlspecialchars($page_desc, ENT_QUOTES, 'UTF-8'); ?>">
    <meta name="twitter:image" content="<?php echo htmlspecialchars($og_image, ENT_QUOTES, 'UTF-8'); ?>">
    <meta name="twitter:site" content="@teslamechd">   
    <!-- Vendor CSS -->
    <!-- Main CSS -->
    <!-- Schema Rendering -->
    <?php render_schema(); ?>
   <!-- Style CSS --> 
   <?php echo '<style>'; include "./css/source.css"; echo '</style>';?>
     <?php echo '<style>'; include "./css/style.css"; echo '</style>';?> 
</head>
