const { PurgeCSS } = require("purgecss");
const fs = require("fs");

// Load only used Font Awesome icons
// const usedIcons = require("./used-fa-icons.json");



// ✅ Load only used Owl Carousel classes
// const usedOwl = require("./used-owl-classes.json");


async function cleanCSS() {
  const result = await new PurgeCSS().purge({
    // 🔍 Files to scan
    content: [
      "./**/*.php",
      "./**/*.html",
      "./js/**/*.js"
    ],

    // 🎯 OLD For Cleaning BIG CSS FILE
    css: ["./css/source-old.css"],

    // 🛡️ SAFELIST (ONLY WHAT IS USED)
    safelist: [
      // Bootstrap JS classes
      "show",
      "active",
      "fade",
      "collapse",
      "collapsing",
      "dropdown-menu",
      "dropdown-item",
      "dropdown-toggle",
      "modal",
      "modal-backdrop",
      "offcanvas",
      "offcanvas-backdrop",

      // Font Awesome (only used icons)
      

      // Owl Carousel (only used classes)
      
    ],

    // 🧩 Pattern-based safety
    safelistPatterns: [
      /^btn-/,
      /^col-/,
      /^row$/,
      /^container/,
      /^navbar/,
      /^nav-/,
      /^dropdown/,
      /^modal-/,
      /^carousel-/,
      /^text-/,
      /^bg-/,
      /^d-/
    ]
  });

  if (!result || result.length === 0) {
    console.error("❌ No CSS returned. Check paths!");
    return;
  }

  fs.writeFileSync(
    // New Clean Css File
    "./css/source.css",
    result[0].css
  );

  console.log("✅ CSS cleaned successfully (FA + Owl only used classes kept)");
}

cleanCSS();



