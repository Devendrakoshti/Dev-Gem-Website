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
    <?php
    $_clean_canonical = (!empty($canonical_url) && $canonical_url !== 'index.php') ? ltrim($canonical_url, '/') : '';
    $_full_canonical = (isset($canonical_url) && preg_match('~^https?://~i', $canonical_url)) ? $canonical_url : rtrim($base_url, '/') . '/' . $_clean_canonical;
    if ($_clean_canonical === '') {
        $_full_canonical = rtrim($base_url, '/') . '/';
    }
    $_full_og_image = '';
    if (!empty($og_image)) {
        $_full_og_image = preg_match('~^https?://~i', $og_image) ? $og_image : rtrim($base_url, '/') . '/' . ltrim($og_image, '/');
    }
    ?>
    <link rel="canonical" href="<?php echo htmlspecialchars($_full_canonical, ENT_QUOTES, 'UTF-8'); ?>">
    <link rel="alternate" hreflang="en" href="<?php echo htmlspecialchars($_full_canonical, ENT_QUOTES, 'UTF-8'); ?>">
    <!-- Full of Og & Twitter Card Details -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="<?php echo htmlspecialchars($_full_canonical, ENT_QUOTES, 'UTF-8'); ?>">
    <meta property="og:title" content="<?php echo htmlspecialchars($page_title, ENT_QUOTES, 'UTF-8'); ?>">
    <meta property="og:description" content="<?php echo htmlspecialchars($page_desc, ENT_QUOTES, 'UTF-8'); ?>">
    <?php if (!empty($_full_og_image)): ?>
    <meta property="og:image" content="<?php echo htmlspecialchars($_full_og_image, ENT_QUOTES, 'UTF-8'); ?>">
    <meta property="og:image:width" content="<?php echo htmlspecialchars($og_width ?? '1200', ENT_QUOTES, 'UTF-8'); ?>" />
    <meta property="og:image:height" content="<?php echo htmlspecialchars($og_height ?? '630', ENT_QUOTES, 'UTF-8'); ?>" />
    <?php endif; ?>
    <meta property="og:site_name" content="GEM Gujarat">
    <meta property="og:logo" content="https://www.gemgujarat.in/images/gem-gujarat-logo.webp">
    <meta property="og:locale" content="en_IN">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="<?php echo htmlspecialchars($_full_canonical, ENT_QUOTES, 'UTF-8'); ?>">
    <meta name="twitter:title" content="<?php echo htmlspecialchars($page_title, ENT_QUOTES, 'UTF-8'); ?>">
    <meta name="twitter:description" content="<?php echo htmlspecialchars($page_desc, ENT_QUOTES, 'UTF-8'); ?>">
    <?php if (!empty($_full_og_image)): ?>
    <meta name="twitter:image" content="<?php echo htmlspecialchars($_full_og_image, ENT_QUOTES, 'UTF-8'); ?>">
    <?php endif; ?>   
    <!-- Vendor CSS -->
    <!-- Main CSS -->
    <!-- Schema Rendering -->
    <?php render_schema(); ?>
   <!-- Style CSS --> 
   <?php echo '<style>'; include "./css/source.css"; echo '</style>';?>
     <?php echo '<style>'; include "./css/style.css"; echo '</style>';?> 
</head>
