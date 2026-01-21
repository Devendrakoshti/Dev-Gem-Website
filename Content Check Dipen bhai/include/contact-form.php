<div class="w100">

  <form method="post" name="contactform" action="https://www.cadservicesindia.com/form-submission.php">
    <div class="row">
      <div class="col-md-6">
        <div class="input-group mb-3">
          <input type="text" name="name" class="form-control" id="exampleInputEmail1"
            placeholder="Enter Your Full Name">
        </div>
      </div>
      <div class="col-md-6">
        <div class="input-group mb-3">
          <input type="email" name="email" class="form-control" id="exampleInputPassword1"
            placeholder="Enter Your Email Address">
        </div>
      </div>
      <div class="col-md-6">
        <div class="input-group mb-3">
          <input type="text" name="phone" class="form-control" id="exampleInputPassword2"
            placeholder="Enter Your Phone Number">
          <input type="hidden" name="s_key">
          <input type="hidden" name="s_val">
          <input type="hidden" name="google_value" value="">
        </div>
      </div>
      <div class="col-md-6">
        <div class="input-group mb-3">
          <select class="form-control" name="country" id="exampleInputPassword3">
            <option>United States</option>
            <option>Canada</option>
            <option>Australia</option>
            <option>United Kingdom</option>
            <option>UAE</option>
            <option>India</option>
            <option>Other</option>
          </select>
        </div>
      </div>
      <div class="input-group mb-3">
        <textarea class="form-control" name="message" id="exampleInputmessage" placeholder="Your Message"></textarea>
      </div>
      <div class="w100" style="padding: 5px;">
        <div id="rc-imageselect" style="width: 100%; float: left;">
          <div class="g-recaptcha" data-sitekey="6LfHbxUpAAAAAOf1lo3ASpMG-ipUPiKBv03JCeG6"></div>
        </div>
      </div>
      <div class="input-group mb-3"
        style="display: flex;flex-direction: row;flex-wrap: nowrap;align-items: flex-start;">
        <input style="margin-top: 6px;" type="checkbox" id="vehicle1" name="vehicle1" value="Bike" required>
        <label style="text-align: left;margin-left: 10px;" for="vehicle1">By checking this box; I understand and agree
          to be communicated for the said and mentioned purpose of business and/ or service provision by the domain
          owner.</label>
      </div>
      <div class="input-group mb-3">
        <button type="submit" name="Submit" value="Submit" class="btn submit_btn">Submit</button>
        <input type="hidden" name="ip" value='' />
        <input type="hidden" name="curpage" value='' />
      </div>
    </div>
  </form>

</div>