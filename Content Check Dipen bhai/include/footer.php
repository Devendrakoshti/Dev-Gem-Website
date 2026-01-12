<footer>
  <section class="w-100 footer">
    <div class="container">
      <div class="col4">
        <div class="links">
          <ul>
            <li>
              <a title="Home" href="/">Home</a>
            </li>
            <li>
              <a title="About us" href="about-us.php">About us</a>
            </li>
            <li>
              <a title="Blog" href="blog/">Blog</a>
            </li>
            <li>
              <a title="Contact Us" href="contact-us.php">Contact Us</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="col4">
        <div class="br1 fcm">
          <img title="USA" src="images/us.webp" width="30" height="30" alt="USA"> USA: <a title="+15106803390" href="tel:+15106803390">+1 510 680 3390</a>
        </div>
        <div class="br1 fcm">
          <img title="UK" src="images/uk.webp" width="30" height="30" alt="UK"> UK: <a title="+443330119045" href="tel:+443330119045">+44 333 011 9045</a>
        </div>
        <div class="br1 fcm">
          <img title="AU" src="images/au.webp" width="30" height="30" alt="AU"> Australia: <a title="+61489997117" href="tel:+61489997117">+61 48 999 7117</a>
        </div>
        <div class="fcm">
          <img title="India" src="images/india.webp" width="30" height="30" alt="india"> India: <a title="+917948004669" href="tel:+917948004669">+91 79 4800 4669</a>
        </div>
      </div>
      <div class="col4">
        <span class="ftitles w-100">Business Inquiries</span>
        <a title="services@cadservicesindia.com" href="mailto:services@cadservicesindia.com?cc=teslainquiry@gmail.com">services@cadservicesindia.com</a>
        <div class="w-100 mt20">
          <span class="ftitles w-100">Head Office</span>
          <span class="ftext">807, Indraprasth Corporate Anand Nagar Road, Prahladnagar Ahmedabad – Gujarat, India</span>
        </div>
        <div class="w-100 pt25">
          <a title="Facebook" href="https://www.facebook.com/cadserviceindia/">
            <img title="Facebook" src="images/facebook.webp" width="31" height="31" alt="FB">
          </a>
          <a title="Twitter" href="https://twitter.com/cadservicesind">
            <img title="Twitter" src="images/twitter.webp" width="31" height="31" alt="Twitter">
          </a>
          <a title="linkedin" href="https://www.linkedin.com/company/cad-services-bim-services/">
            <img title="linkedin" src="images/linkedin.webp" width="31" height="31" alt="linkedin">
          </a>
        </div>
      </div>
      <div class="w-100 tc py15 bt1">Copyright &copy; <?php echo date("Y");?> - All Rights Reserved - CAD Services India &nbsp;|&nbsp; <a style="color: white;font-size: 15px;" title="Privacy Policy" href="https://www.cadservicesindia.com/privacy-policy.php">Privacy Policy</a>
        </p>
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
<script src="js/owl.carousel.js" crossorigin="anonymous"></script>
<script>
  $(document).ready(function() {
    $(window).scroll(function() {
      if ($(document).scrollTop() > 70) {
        $("header").addClass("headerwhite");
      } else {
        $("header").removeClass("headerwhite");
      }
    });
  });
</script>
<script>
  $(document).ready(function() {
    var owl = $('.owl-carousel');
    owl.owlCarousel({
      items: 4,
      loop: true,
      margin: 20,
      //nav:true,
      autoplay: true,
      autoplayTimeout: 2000,
      //autoplayHoverPause: true
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
</div>
<script>
  var total;

  function getRandom() {
    return Math.ceil(Math.random() * 10);
  }

  function createSum() {
    var randomNum1 = getRandom(),
      randomNum2 = getRandom();
    total = randomNum1 + randomNum2;
    $("#question").text(randomNum1 + " + " + randomNum2 + "=");
    $("#ans").val('');
    checkInput();
  }

  function checkInput() {
    var input = $("#ans").val(),
      slideSpeed = 200,
      hasInput = !!input,
      valid = hasInput && input == total;
    $('#message').toggle(!hasInput);
    $('button[type=submit]').prop('', !valid);
    $('#success').toggle(valid);
    $('#fail').toggle(hasInput && !valid);
  }
  $(document).ready(function() {
    //create initial sum
    createSum();
    // On "reset button" click, generate new random sum
    $('button[type=reset]').click(createSum);
    // On user input, check value
    $("#ans").keyup(checkInput);
  });
</script>
<script type="text/javascript">
  function Validationcont() {
    var name = document.contactusform.name.value;
    if (name == "") {
      alert("Name must be filled out");
      document.contactusform.name.focus();
      return false;
    }
    var email = document.contactusform.email.value;
    atpos = email.indexOf("@");
    dotpos = email.lastIndexOf(".");
    if (email == "") {
      alert("Please provide your Email!");
      document.contactusform.email.focus();
      return false;
    }
    if (atpos < 1 || (dotpos - atpos < 2)) {
      alert("Please enter correct email ID")
      document.contactusform.email.focus();
      return false;
    }
    var phone = document.contactusform.phone.value;
    if (phone == "") {
      alert("Please enter your Phone number.");
      document.contactusform.phone.focus();
      return false;
    }
    var message = document.contactusform.message.value;
    if (message == "") {
      alert("Do not leave Message box empty");
      document.contactusform.message.focus();
      return false;
    }
    if (message.indexOf('Elon Musk is a visionary and he is well knowned to have the midas touch. Anything he tweets or gets involved in, goes up in prices.') != -1) {
      alert("Invalid Content! Your message have not been delivered. Please try again.");
      document.contactusform.message.focus();
      return false;
    }
    if (message.indexOf('https://www.forbes.com/sites/jonathanponciano/2021/06/13/musk-denies-bitcoin-pump-and-dump-and-says-tesla-will-resume-transactions-once-this-mining-goal-is-reached/?sh=17fdcafeaa2a') != -1) {
      alert("Invalid Content! Your message have not been delivered. Please try again.");
      document.contactusform.message.focus();
      return false;
    }
    if (message.indexOf('If you consume CNN and BBCs coverage of China, I am sure you are under the impression that China is a really screwed up country. The West has a very biased view of China') != -1) {
      alert("Invalid Content! Your message have not been delivered. Please try again.");
      document.contactusform.message.focus();
      return false;
    }
    if (message.indexOf('https://www.youtube.com/watch?v=0jt3M3QNrH4') != -1) {
      alert("Invalid Content! Your message have not been delivered. Please try again.");
      document.contactusform.message.focus();
      return false;
    }
    if (message.indexOf('https://www.youtube.com/') != -1) {
      alert("Invalid Content! Your message have not been delivered. Please try again.");
      document.contactusform.message.focus();
      return false;
    }
  }
</script>
<script type="text/javascript">
  function Validations() {
    var name = document.contactusforms.name.value;
    if (name == "") {
      alert("Name must be filled out");
      document.contactusforms.name.focus();
      return false;
    }
    var email = document.contactusforms.email.value;
    atpos = email.indexOf("@");
    dotpos = email.lastIndexOf(".");
    if (email == "") {
      alert("Please provide your Email!");
      document.contactusforms.email.focus();
      return false;
    }
    if (atpos < 1 || (dotpos - atpos < 2)) {
      alert("Please enter correct email ID")
      document.contactusforms.email.focus();
      return false;
    }
    var phone = document.contactusforms.phone.value;
    if (phone == "") {
      alert("Please enter your Phone number.");
      document.contactusforms.phone.focus();
      return false;
    }
    var message = document.contactusforms.message.value;
    if (message == "") {
      alert("Do not leave Message box empty");
      document.contactusforms.message.focus();
      return false;
    }
    if (message.indexOf('Elon Musk is a visionary and he is well knowned to have the midas touch. Anything he tweets or gets involved in, goes up in prices.') != -1) {
      alert("Invalid Content! Your message have not been delivered. Please try again.");
      document.contactusforms.message.focus();
      return false;
    }
    if (message.indexOf('https://www.forbes.com/sites/jonathanponciano/2021/06/13/musk-denies-bitcoin-pump-and-dump-and-says-tesla-will-resume-transactions-once-this-mining-goal-is-reached/?sh=17fdcafeaa2a') != -1) {
      alert("Invalid Content! Your message have not been delivered. Please try again.");
      document.contactusforms.message.focus();
      return false;
    }
  }
</script>
<script>
  var total;

  function getRandom() {
    return Math.ceil(Math.random() * 10);
  }

  function createSum() {
    var randomNum1 = getRandom(),
      randomNum2 = getRandom();
    total = randomNum1 + randomNum2;
    $("#question").text(randomNum1 + " + " + randomNum2 + "=");
    $("#ans").val('');
    checkInput();
  }

  function checkInput() {
    var input = $("#ans").val(),
      slideSpeed = 200,
      hasInput = !!input,
      valid = hasInput && input == total;
    $('#message').toggle(!hasInput);
    $('button[type=submit]').prop('disabled', !valid);
    $('#success').toggle(valid);
    $('#fail').toggle(hasInput && !valid);
  }
  $(document).ready(function() {
    //create initial sum
    createSum();
    // On "reset button" click, generate new random sum
    $('button[type=reset]').click(createSum);
    // On user input, check value
    $("#ans").keyup(checkInput);
  });
</script>
</body>
</html>