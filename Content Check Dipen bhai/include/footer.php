<footer>
  <section class="w-100 footer">
    <div class="container">
      <div class="col4">
        <div class="links">
          <ul>
            <li>
              <a title="Home" href="https://www.cadservicesindia.com/">Home</a>
            </li>
            <li>
              <a title="About us" href="https://www.cadservicesindia.com/about-us.php">About us</a>
            </li>
            <li>
              <a title="Blog" href="https://www.cadservicesindia.com/blog/">Blog</a>
            </li>
            <li>
              <a title="Contact Us" href="https://www.cadservicesindia.com/contact-us.php">Contact Us</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="col4">
        <div class="br1 fcm">
          <img title="USA" src="https://www.cadservicesindia.com/images/us.webp" width="30" height="30" loading="lazy"
            alt="USA"> USA: <a title="+15106803390" href="tel:+15106803390">+1 510 680 3390</a>
        </div>
        <div class="br1 fcm">
          <img title="UK" src="https://www.cadservicesindia.com/images/uk.webp" width="30" height="30" loading="lazy"
            alt="UK"> UK: <a title="+443330119045" href="tel:+443330119045">+44 333 011 9045</a>
        </div>
        <div class="br1 fcm">
          <img title="AU" src="https://www.cadservicesindia.com/images/au.webp" width="30" height="30" loading="lazy"
            alt="AU"> Australia: <a title="+61489997117" href="tel:+61489997117">+61 48 999 7117</a>
        </div>
        <div class="fcm">
          <img title="India" src="https://www.cadservicesindia.com/images/india.webp" width="30" height="30"
            loading="lazy" alt="india"> India: <a title="+917948004669" href="tel:+917948004669">+91 79 4800 4669</a>
        </div>
      </div>
      <div class="col4">
        <span class="ftitles w-100">Business Inquiries</span>
        <a title="services@cadservicesindia.com"
          href="mailto:services@cadservicesindia.com?cc=teslainquiry@gmail.com">services@cadservicesindia.com</a>
        <div class="w-100 mt20">
          <span class="ftitles w-100">Head Office</span>
          <span class="ftext">807, Indraprasth Corporate Anand Nagar Road, Prahladnagar Ahmedabad - Gujarat,
            India</span>
        </div>
        <div class="w-100 pt25">
          <a title="Facebook" href="https://www.facebook.com/cadserviceindia/">
            <img title="Facebook" src="https://www.cadservicesindia.com/images/facebook.webp" width="31" height="31"
              loading="lazy" alt="FB">
          </a>
          <a title="Twitter" href="https://x.com/CADServicesInd">
            <img title="Twitter" src="https://www.cadservicesindia.com/images/twitter.webp" width="31" height="31"
              loading="lazy" alt="Twitter">
          </a>
          <a title="linkedin" href="https://www.linkedin.com/company/cad-services-bim-services/">
            <img title="linkedin" src="https://www.cadservicesindia.com/images/linkedin.webp" width="31" height="31"
              loading="lazy" alt="linkedin">
          </a>
        </div>
      </div>
      <div class="w-100 tc py15 bt1">Copyright &copy; <?php echo date("Y"); ?> - All Rights Reserved - CAD Services
        India &nbsp;|&nbsp; <a style="color: white;font-size: 15px;" title="Privacy Policy"
          href="https://www.cadservicesindia.com/privacy-policy.php">Privacy Policy</a>
      </div>
    </div>
  </section>
</footer>
<script>
  const cookieContainer = document.querySelector(".cookie-container");
  const agreeBtn = document.querySelector(".agree-button");
  // Check if a cookie is set to determine if the user has already accepted cookies
  const cookiesAccepted = document.cookie.includes("cookiesAccepted=true");
  if (!cookiesAccepted) {
    // Display the cookie banner if the user hasn't accepted cookies yet
    setTimeout(() => {
      cookieContainer.classList.remove("hide");
    }, 1000);
  }

  function hideCookieBanner() {
    // Hide the cookie banner
    cookieContainer.classList.add("hide");
    // Set a cookie to remember that the user accepted cookies
    document.cookie = "cookiesAccepted=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
    // Remove the event listener to prevent further clicks
    agreeBtn.removeEventListener("click", hideCookieBanner);
  }
  agreeBtn.addEventListener("click", hideCookieBanner);
</script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js" crossorigin="anonymous"></script>
<script src="https://www.google.com/recaptcha/api.js" async defer></script>
<script src="js/owl.carousel.js" crossorigin="anonymous"></script>
<script>
  $(document).ready(function () {
    var owl = $('.owl-carousel');
    owl.owlCarousel({
      items: 4,
      loop: true,
      margin: 20,
      autoplay: true,
      autoplayTimeout: 3500,
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
          nav: true
        },
        768: {
          items: 2,
          nav: false
        },
        1000: {
          items: 4,
          nav: true
        }
      }
    });
  })
</script>