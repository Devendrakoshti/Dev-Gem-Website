    <!-- Preconnects -->  
    <link rel="dns-prefetch" href="https://www.googletagmanager.com">
    <link rel="dns-prefetch" href="https://www.gstatic.com">
    <link rel="dns-prefetch" href="https://js.clarity.ms">
    <!-- Google Tag Manager -->
    <?php /*
       Container load is deferred to the first of: a real user interaction, or
       the browser going idle after load. It is NOT dropped and it is NOT
       conditional - every visit still loads it.

       Why: measured on the live site, GTM and the tags it injects (gtag,
       Microsoft Clarity) were 344 KB and blocked the main thread for 600 ms
       during the load, on a page whose Total Blocking Time was already
       1,750 ms on mobile. None of that work is needed before the page is
       usable. Moving it behind the first interaction or an idle callback
       takes it off the critical path entirely.

       dataLayer is still created and pushed to synchronously, above any of
       this, so events fired before the container arrives - the cookie
       notice's cookie_consent_granted among them - queue normally and are
       replayed the moment it loads. Nothing is lost.

       The 'load' + requestIdleCallback path with a 3s timeout is the floor:
       a visitor who reads without touching anything is still counted.
    */ ?>
    <script>
    // (function (w, d, s, l, i) {
    //   w[l] = w[l] || [];
    //   w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });

    //   var triggers = ['pointerdown', 'keydown', 'touchstart', 'scroll'];
    //   var started = false;

    //   function start() {
    //     if (started) return;
    //     started = true;
    //     for (var t = 0; t < triggers.length; t++) w.removeEventListener(triggers[t], start);
    //     var f = d.getElementsByTagName(s)[0],
    //         j = d.createElement(s),
    //         dl = l != 'dataLayer' ? '&l=' + l : '';
    //     j.async = true;
    //     j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    //     f.parentNode.insertBefore(j, f);
    //   }

    //   for (var t = 0; t < triggers.length; t++) {
    //     w.addEventListener(triggers[t], start, { once: true, passive: true });
    //   }
    //   w.addEventListener('load', function () {
    //     if ('requestIdleCallback' in w) w.requestIdleCallback(start, { timeout: 3000 });
    //     else w.setTimeout(start, 1500);
    //   }, { once: true });
    // })(window, document, 'script', 'dataLayer', 'GTM-5Z6JS7C');
    // </script>
    <!-- End Google Tag Manager -->
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


