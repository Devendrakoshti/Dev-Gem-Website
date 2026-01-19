<form method="post" name="contactform" action="form-submition.php">
  <div class="row g-4">
    <div class="col-md-6 position-relative">
      <div class="input-icon position-relative">
        <i class="fa-solid fa-user"></i>
        <div class="form-floating">
          <input required type="text" name="name" id="name" placeholder="Your Name" class="form-control" />
          <label for="name">Your Name</label>
        </div>
      </div>
    </div>
    <div class="col-md-6 position-relative">
      <div class="input-icon position-relative">
        <i class="fa-solid fa-envelope"></i>
        <div class="form-floating">
          <input required type="email" name="email" id="email" placeholder="E-mail" class="form-control" />
          <label for="email">E-mail</label>
        </div>
      </div>
    </div>
    <div class="col-md-6 position-relative">
      <div class="input-icon position-relative">
        <i class="fa-solid fa-phone"></i>
        <div class="form-floating">
          <input required type="text" name="phone" id="phone" placeholder="Phone No" class="form-control" />
          <label for="phone">Phone No</label>
        </div>
      </div>
    </div>
    <div class="col-md-6 position-relative">
      <div class="input-icon position-relative">
        <i class="fa-solid fa-earth-asia"></i>
        <div class="form-floating">
          <select required aria-label="country" name="country" id="country" class="form-select">
            <option value="">Select Country</option>
            <option>United States</option>
            <option>Canada</option>
            <option>Australia</option>
            <option>United Kingdom</option>
            <option>UAE</option>
            <option>India</option>
            <option>Other</option>
          </select>
          <label for="country">Country</label>
        </div>
      </div>
    </div>
    <div class="col-12 position-relative">
      <div class="input-icon position-relative textarea-icon">
        <i class="fa-solid fa-comment-dots"></i>
        <div class="form-floating">
          <textarea required name="message" id="message" placeholder="Message" class="form-control" style="height: 100px;"></textarea>
          <label for="message">Message</label>
        </div>
      </div>
    </div>
    <div class="col-lg-12">
      <div class="d-flex align-items-center flex-wrap gap-3">
        <button type="submit" name="Submit" value="Submit" title="Submit" class="btn-primary">Submit <span>
            <svg id="Layer_1" enableBackground="new 0 0 100 100" height="40" viewBox="0 0 100 100" fill="#f70629" width="40" xmlns="http://www.w3.org/2000/svg">
              <path d="m50 10.75c-18.266 0-34.562 13.129-38.383 31.007-1.909 8.933-.623 18.432 3.636 26.515 4.099 7.779 10.819 14.066 18.859 17.629 8.363 3.707 17.964 4.353 26.754 1.825 8.48-2.438 15.999-7.789 21.118-14.972 10.703-15.017 9.272-36.111-3.32-49.567-7.38-7.886-17.862-12.437-28.664-12.437zm18.829 41.347-10.7 10.958c-2.709 2.775-6.991-1.429-4.293-4.191l5.399-5.529h-25.586c-1.817 0-3.333-1.517-3.333-3.333s1.517-3.333 3.333-3.333h25.458l-5.506-5.505c-2.736-2.736 1.506-6.979 4.242-4.243l10.961 10.96c1.162 1.161 1.173 3.041.025 4.216z" />
            </svg>
          </span>
        </button>
        <div class="g-recaptcha" data-sitekey="6LcSPU8sAAAAAH1V4iD4wF786NGItGqCRRRYFLBw"></div>
      </div>
    </div>
  </div>
</form>
<script>
    !function(){let c=!1;const t=document.querySelector('form[name="contactform"]');function e(){if(!c){c=!0;var t=document.createElement("script");t.src="https://www.google.com/recaptcha/api.js",t.async=!0,t.defer=!0,document.body.appendChild(t)}}t&&["click","focus","touchstart"].forEach((function(c){t.addEventListener(c,e,{once:!0,capture:!0})}))}();
</script>