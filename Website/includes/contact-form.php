<form method="post" name="contactform" action="https://www.gemgujarat.in/form-submition.php">
  <div class="row g-4">
    <div class="col-md-6 position-relative">
      <div class="input-icon position-relative">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
        <div class="form-floating">
          <input required type="text" name="name" id="name" placeholder="Your Name" class="form-control" />
          <label for="name">Your Name</label>
        </div>
      </div>
    </div>
    <div class="col-md-6 position-relative">
      <div class="input-icon position-relative">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
        <div class="form-floating">
          <input required type="email" name="email" id="email" placeholder="E-mail" class="form-control" />
          <label for="email">E-mail</label>
        </div>
      </div>
    </div>
    <div class="col-md-6 position-relative">
      <div class="input-icon position-relative">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
        <div class="form-floating">
          <input required type="text" name="phone" id="phone" placeholder="Phone No" class="form-control" />
          <label for="phone">Phone No</label>
        </div>
      </div>
    </div>
    <div class="col-md-6 position-relative">
      <div class="input-icon position-relative">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
        <div class="form-floating">
          <input required aria-label="country" name="country" id="country" class="form-control" />
          <label for="country">Country</label>
        </div>
      </div>
    </div>
    <div class="col-12 position-relative">
      <div class="input-icon position-relative textarea-icon">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>
        <div class="form-floating">
          <textarea required name="message" id="message" placeholder="Message" class="form-control" style="height: 100px;"></textarea>
          <label for="message">Message</label>
        </div>
      </div>
    </div>
    <div class="col-lg-12">
      <div class="d-flex align-items-center flex-wrap gap-3">
        <button type="submit" name="submit" value="Submit" title="Submit" class="btn-primary" disabled>Submit <span>
            <svg id="Layer_1" enableBackground="new 0 0 100 100" height="40" viewBox="0 0 100 100" fill="#f70629" width="40" xmlns="http://www.w3.org/2000/svg">
              <path d="m50 10.75c-18.266 0-34.562 13.129-38.383 31.007-1.909 8.933-.623 18.432 3.636 26.515 4.099 7.779 10.819 14.066 18.859 17.629 8.363 3.707 17.964 4.353 26.754 1.825 8.48-2.438 15.999-7.789 21.118-14.972 10.703-15.017 9.272-36.111-3.32-49.567-7.38-7.886-17.862-12.437-28.664-12.437zm18.829 41.347-10.7 10.958c-2.709 2.775-6.991-1.429-4.293-4.191l5.399-5.529h-25.586c-1.817 0-3.333-1.517-3.333-3.333s1.517-3.333 3.333-3.333h25.458l-5.506-5.505c-2.736-2.736 1.506-6.979 4.242-4.243l10.961 10.96c1.162 1.161 1.173 3.041.025 4.216z" />
            </svg>
          </span>
        </button>
        <div class="g-recaptcha" data-sitekey="6Lc0jMstAAAAAPFdcbM9QDjHLiGZgtwZAFqbmHAt" data-callback="onRecaptchaSuccess" data-expired-callback="onRecaptchaExpired" data-error-callback="onRecaptchaExpired"></div>
      </div>
    </div>
  </div>
</form>
<script>
    window.onRecaptchaSuccess = function(token) {
        document.querySelectorAll('form[name="contactform"] button[type="submit"]').forEach(function(btn) {
            btn.removeAttribute('disabled');
        });
    };

    window.onRecaptchaExpired = function() {
        document.querySelectorAll('form[name="contactform"] button[type="submit"]').forEach(function(btn) {
            btn.setAttribute('disabled', 'disabled');
        });
    };

    !function(){let c=!1;const t=document.querySelector('form[name="contactform"]');function e(){if(!c){c=!0;var t=document.createElement("script");t.src="https://www.google.com/recaptcha/api.js",t.async=!0,t.defer=!0,document.body.appendChild(t)}}t&&["click","focus","touchstart"].forEach((function(c){t.addEventListener(c,e,{once:!0,capture:!0})}))}();
</script>