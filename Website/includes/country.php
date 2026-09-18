
<?php
/* ─────────────────────────────────────────────────────────────────────────────
   Set $local_seo_service on the page BEFORE including this file.
   e.g.  $local_seo_service = 'GeM Registration Services';
   Defaults to 'GeM Services' if not set.
   ───────────────────────────────────────────────────────────────────────────── */
$lseo   = isset($local_seo_service) ? $local_seo_service : 'GeM Services';
$lseo_e = htmlspecialchars($lseo, ENT_QUOTES, 'UTF-8');
?>

<section class="section-lg lsec-root" aria-labelledby="lsec-heading" data-service-name="<?php echo $lseo_e; ?>">
  <div class="container">
    <!-- Section Heading & Full Width State Tabs -->
    <div class="row">
      <div class="col-12">
        <div class="text-black mb-4">
          <h2 class="fw-bold border-bottom pb-3 mb-4" id="lsec-heading">We deliver <?php echo $lseo_e; ?> across India</h2>
          
          <!-- State Tab Buttons - Full Width -->
          <div class="lsec-tabs-wrapper mb-4">
            <div class="lsec-tabs" role="tablist" aria-label="Filter cities by state">
              <button class="lsec-tab is-active" role="tab" aria-selected="true" aria-controls="lsec-panel-gujarat" data-tab="gujarat" id="lsec-tab-gujarat">Gujarat</button>
              <button class="lsec-tab" role="tab" aria-selected="false" aria-controls="lsec-panel-maharashtra" data-tab="maharashtra" id="lsec-tab-maharashtra">Maharashtra</button>
              <button class="lsec-tab" role="tab" aria-selected="false" aria-controls="lsec-panel-karnataka" data-tab="karnataka" id="lsec-tab-karnataka">Karnataka</button>
              <button class="lsec-tab" role="tab" aria-selected="false" aria-controls="lsec-panel-tamil-nadu" data-tab="tamil-nadu" id="lsec-tab-tamil-nadu">Tamil Nadu</button>
              <button class="lsec-tab" role="tab" aria-selected="false" aria-controls="lsec-panel-uttar-pradesh" data-tab="uttar-pradesh" id="lsec-tab-uttar-pradesh">Uttar Pradesh</button>
              <button class="lsec-tab" role="tab" aria-selected="false" aria-controls="lsec-panel-rajasthan" data-tab="rajasthan" id="lsec-tab-rajasthan">Rajasthan</button>
              <button class="lsec-tab" role="tab" aria-selected="false" aria-controls="lsec-panel-madhya-pradesh" data-tab="madhya-pradesh" id="lsec-tab-madhya-pradesh">Madhya Pradesh</button>
              <button class="lsec-tab" role="tab" aria-selected="false" aria-controls="lsec-panel-west-bengal" data-tab="west-bengal" id="lsec-tab-west-bengal">West Bengal</button>
              <button class="lsec-tab" role="tab" aria-selected="false" aria-controls="lsec-panel-haryana" data-tab="haryana" id="lsec-tab-haryana">Haryana</button>
              <button class="lsec-tab" role="tab" aria-selected="false" aria-controls="lsec-panel-punjab" data-tab="punjab" id="lsec-tab-punjab">Punjab</button>
              <button class="lsec-tab" role="tab" aria-selected="false" aria-controls="lsec-panel-kerala" data-tab="kerala" id="lsec-tab-kerala">Kerala</button>
              <button class="lsec-tab" role="tab" aria-selected="false" aria-controls="lsec-panel-bihar" data-tab="bihar" id="lsec-tab-bihar">Bihar</button>
              <button class="lsec-tab" role="tab" aria-selected="false" aria-controls="lsec-panel-jharkhand" data-tab="jharkhand" id="lsec-tab-jharkhand">Jharkhand</button>
              <button class="lsec-tab" role="tab" aria-selected="false" aria-controls="lsec-panel-odisha" data-tab="odisha" id="lsec-tab-odisha">Odisha</button>
              <button class="lsec-tab" role="tab" aria-selected="false" aria-controls="lsec-panel-uttarakhand" data-tab="uttarakhand" id="lsec-tab-uttarakhand">Uttarakhand</button>
              <button class="lsec-tab" role="tab" aria-selected="false" aria-controls="lsec-panel-other-states" data-tab="other-states" id="lsec-tab-other-states">Other States &amp; UTs</button>
            </div>
          </div>
          <!-- /lsec-tabs -->
        </div>
      </div>
    </div>

    <!-- 2 Columns Layout: Left col-lg-6 for Cities, Right col-lg-6 for Placeholder Image -->
    <div class="row align-items-stretch g-4">
      <!-- Left Column: Active State Tab Cities Panel -->
      <div class="col-lg-6">
        <div class="lsec-tab-panels bg-white p-4 rounded-4 border shadow-sm h-100">
          
          <!-- Gujarat (15 Cities) -->
          <div class="lsec-tab-panel is-active" id="lsec-panel-gujarat" role="tabpanel" aria-labelledby="lsec-tab-gujarat" data-country="gujarat">
            <div class="d-flex align-items-center justify-content-between border-bottom pb-2 mb-3">
              <h4 class="fw-bold text-dark m-0 d-flex align-items-center gap-2">
                <i class="fa fa-map-marker-alt text-danger"></i>
                <span>Major Cities in Gujarat</span>
              </h4>
              <span class="badge bg-light text-dark border">15 Cities</span>
            </div>
            <ul class="lsec-city-grid" role="list">
              <li><button class="lsec-city-btn" data-city-id="ahmedabad" data-country="gujarat" data-phrase="<?php echo $lseo_e; ?> in Ahmedabad" aria-label="<?php echo $lseo_e; ?> in Ahmedabad"><span class="lsec-city-dot" aria-hidden="true"></span>Ahmedabad<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Ahmedabad</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="surat" data-country="gujarat" data-phrase="<?php echo $lseo_e; ?> in Surat" aria-label="<?php echo $lseo_e; ?> in Surat"><span class="lsec-city-dot" aria-hidden="true"></span>Surat<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Surat</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="vadodara" data-country="gujarat" data-phrase="<?php echo $lseo_e; ?> in Vadodara" aria-label="<?php echo $lseo_e; ?> in Vadodara"><span class="lsec-city-dot" aria-hidden="true"></span>Vadodara<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Vadodara</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="rajkot" data-country="gujarat" data-phrase="<?php echo $lseo_e; ?> in Rajkot" aria-label="<?php echo $lseo_e; ?> in Rajkot"><span class="lsec-city-dot" aria-hidden="true"></span>Rajkot<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Rajkot</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="gandhinagar" data-country="gujarat" data-phrase="<?php echo $lseo_e; ?> in Gandhinagar" aria-label="<?php echo $lseo_e; ?> in Gandhinagar"><span class="lsec-city-dot" aria-hidden="true"></span>Gandhinagar<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Gandhinagar</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="bhavnagar" data-country="gujarat" data-phrase="<?php echo $lseo_e; ?> in Bhavnagar" aria-label="<?php echo $lseo_e; ?> in Bhavnagar"><span class="lsec-city-dot" aria-hidden="true"></span>Bhavnagar<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Bhavnagar</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="jamnagar" data-country="gujarat" data-phrase="<?php echo $lseo_e; ?> in Jamnagar" aria-label="<?php echo $lseo_e; ?> in Jamnagar"><span class="lsec-city-dot" aria-hidden="true"></span>Jamnagar<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Jamnagar</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="junagadh" data-country="gujarat" data-phrase="<?php echo $lseo_e; ?> in Junagadh" aria-label="<?php echo $lseo_e; ?> in Junagadh"><span class="lsec-city-dot" aria-hidden="true"></span>Junagadh<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Junagadh</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="anand" data-country="gujarat" data-phrase="<?php echo $lseo_e; ?> in Anand" aria-label="<?php echo $lseo_e; ?> in Anand"><span class="lsec-city-dot" aria-hidden="true"></span>Anand<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Anand</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="bharuch" data-country="gujarat" data-phrase="<?php echo $lseo_e; ?> in Bharuch" aria-label="<?php echo $lseo_e; ?> in Bharuch"><span class="lsec-city-dot" aria-hidden="true"></span>Bharuch<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Bharuch</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="vapi" data-country="gujarat" data-phrase="<?php echo $lseo_e; ?> in Vapi" aria-label="<?php echo $lseo_e; ?> in Vapi"><span class="lsec-city-dot" aria-hidden="true"></span>Vapi<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Vapi</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="mehsana" data-country="gujarat" data-phrase="<?php echo $lseo_e; ?> in Mehsana" aria-label="<?php echo $lseo_e; ?> in Mehsana"><span class="lsec-city-dot" aria-hidden="true"></span>Mehsana<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Mehsana</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="morbi" data-country="gujarat" data-phrase="<?php echo $lseo_e; ?> in Morbi" aria-label="<?php echo $lseo_e; ?> in Morbi"><span class="lsec-city-dot" aria-hidden="true"></span>Morbi<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Morbi</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="gandhidham" data-country="gujarat" data-phrase="<?php echo $lseo_e; ?> in Gandhidham" aria-label="<?php echo $lseo_e; ?> in Gandhidham"><span class="lsec-city-dot" aria-hidden="true"></span>Gandhidham<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Gandhidham</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="ankleshwar" data-country="gujarat" data-phrase="<?php echo $lseo_e; ?> in Ankleshwar" aria-label="<?php echo $lseo_e; ?> in Ankleshwar"><span class="lsec-city-dot" aria-hidden="true"></span>Ankleshwar<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Ankleshwar</span></button></li>
            </ul>
          </div>

          <!-- Maharashtra (14 Cities) -->
          <div class="lsec-tab-panel" id="lsec-panel-maharashtra" role="tabpanel" aria-labelledby="lsec-tab-maharashtra" data-country="maharashtra">
            <div class="d-flex align-items-center justify-content-between border-bottom pb-2 mb-3">
              <h4 class="fw-bold text-dark m-0 d-flex align-items-center gap-2">
                <i class="fa fa-map-marker-alt text-danger"></i>
                <span>Major Cities in Maharashtra</span>
              </h4>
              <span class="badge bg-light text-dark border">14 Cities</span>
            </div>
            <ul class="lsec-city-grid" role="list">
              <li><button class="lsec-city-btn" data-city-id="mumbai" data-country="maharashtra" data-phrase="<?php echo $lseo_e; ?> in Mumbai" aria-label="<?php echo $lseo_e; ?> in Mumbai"><span class="lsec-city-dot" aria-hidden="true"></span>Mumbai<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Mumbai</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="pune" data-country="maharashtra" data-phrase="<?php echo $lseo_e; ?> in Pune" aria-label="<?php echo $lseo_e; ?> in Pune"><span class="lsec-city-dot" aria-hidden="true"></span>Pune<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Pune</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="nagpur" data-country="maharashtra" data-phrase="<?php echo $lseo_e; ?> in Nagpur" aria-label="<?php echo $lseo_e; ?> in Nagpur"><span class="lsec-city-dot" aria-hidden="true"></span>Nagpur<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Nagpur</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="nashik" data-country="maharashtra" data-phrase="<?php echo $lseo_e; ?> in Nashik" aria-label="<?php echo $lseo_e; ?> in Nashik"><span class="lsec-city-dot" aria-hidden="true"></span>Nashik<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Nashik</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="thane" data-country="maharashtra" data-phrase="<?php echo $lseo_e; ?> in Thane" aria-label="<?php echo $lseo_e; ?> in Thane"><span class="lsec-city-dot" aria-hidden="true"></span>Thane<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Thane</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="navi-mumbai" data-country="maharashtra" data-phrase="<?php echo $lseo_e; ?> in Navi Mumbai" aria-label="<?php echo $lseo_e; ?> in Navi Mumbai"><span class="lsec-city-dot" aria-hidden="true"></span>Navi Mumbai<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Navi Mumbai</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="chhatrapati-sambhajinagar" data-country="maharashtra" data-phrase="<?php echo $lseo_e; ?> in Aurangabad Sambhajinagar" aria-label="<?php echo $lseo_e; ?> in Aurangabad Sambhajinagar"><span class="lsec-city-dot" aria-hidden="true"></span>Aurangabad / Sambhajinagar<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Aurangabad Sambhajinagar</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="solapur" data-country="maharashtra" data-phrase="<?php echo $lseo_e; ?> in Solapur" aria-label="<?php echo $lseo_e; ?> in Solapur"><span class="lsec-city-dot" aria-hidden="true"></span>Solapur<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Solapur</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="kolhapur" data-country="maharashtra" data-phrase="<?php echo $lseo_e; ?> in Kolhapur" aria-label="<?php echo $lseo_e; ?> in Kolhapur"><span class="lsec-city-dot" aria-hidden="true"></span>Kolhapur<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Kolhapur</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="amravati" data-country="maharashtra" data-phrase="<?php echo $lseo_e; ?> in Amravati" aria-label="<?php echo $lseo_e; ?> in Amravati"><span class="lsec-city-dot" aria-hidden="true"></span>Amravati<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Amravati</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="vasai-virar" data-country="maharashtra" data-phrase="<?php echo $lseo_e; ?> in Vasai Virar" aria-label="<?php echo $lseo_e; ?> in Vasai Virar"><span class="lsec-city-dot" aria-hidden="true"></span>Vasai-Virar<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Vasai Virar</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="satara" data-country="maharashtra" data-phrase="<?php echo $lseo_e; ?> in Satara" aria-label="<?php echo $lseo_e; ?> in Satara"><span class="lsec-city-dot" aria-hidden="true"></span>Satara<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Satara</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="jalgaon" data-country="maharashtra" data-phrase="<?php echo $lseo_e; ?> in Jalgaon" aria-label="<?php echo $lseo_e; ?> in Jalgaon"><span class="lsec-city-dot" aria-hidden="true"></span>Jalgaon<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Jalgaon</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="sangli" data-country="maharashtra" data-phrase="<?php echo $lseo_e; ?> in Sangli" aria-label="<?php echo $lseo_e; ?> in Sangli"><span class="lsec-city-dot" aria-hidden="true"></span>Sangli<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Sangli</span></button></li>
            </ul>
          </div>

          <!-- Karnataka (7 Cities) -->
          <div class="lsec-tab-panel" id="lsec-panel-karnataka" role="tabpanel" aria-labelledby="lsec-tab-karnataka" data-country="karnataka">
            <div class="d-flex align-items-center justify-content-between border-bottom pb-2 mb-3">
              <h4 class="fw-bold text-dark m-0 d-flex align-items-center gap-2">
                <i class="fa fa-map-marker-alt text-danger"></i>
                <span>Major Cities in Karnataka</span>
              </h4>
              <span class="badge bg-light text-dark border">7 Cities</span>
            </div>
            <ul class="lsec-city-grid" role="list">
              <li><button class="lsec-city-btn" data-city-id="bengaluru" data-country="karnataka" data-phrase="<?php echo $lseo_e; ?> in Bengaluru" aria-label="<?php echo $lseo_e; ?> in Bengaluru"><span class="lsec-city-dot" aria-hidden="true"></span>Bengaluru<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Bengaluru</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="mysuru" data-country="karnataka" data-phrase="<?php echo $lseo_e; ?> in Mysuru" aria-label="<?php echo $lseo_e; ?> in Mysuru"><span class="lsec-city-dot" aria-hidden="true"></span>Mysuru<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Mysuru</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="mangaluru" data-country="karnataka" data-phrase="<?php echo $lseo_e; ?> in Mangaluru" aria-label="<?php echo $lseo_e; ?> in Mangaluru"><span class="lsec-city-dot" aria-hidden="true"></span>Mangaluru<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Mangaluru</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="hubballi" data-country="karnataka" data-phrase="<?php echo $lseo_e; ?> in Hubballi" aria-label="<?php echo $lseo_e; ?> in Hubballi"><span class="lsec-city-dot" aria-hidden="true"></span>Hubballi<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Hubballi</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="belagavi" data-country="karnataka" data-phrase="<?php echo $lseo_e; ?> in Belagavi" aria-label="<?php echo $lseo_e; ?> in Belagavi"><span class="lsec-city-dot" aria-hidden="true"></span>Belagavi<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Belagavi</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="kalaburagi" data-country="karnataka" data-phrase="<?php echo $lseo_e; ?> in Kalaburagi" aria-label="<?php echo $lseo_e; ?> in Kalaburagi"><span class="lsec-city-dot" aria-hidden="true"></span>Kalaburagi<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Kalaburagi</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="davanagere" data-country="karnataka" data-phrase="<?php echo $lseo_e; ?> in Davanagere" aria-label="<?php echo $lseo_e; ?> in Davanagere"><span class="lsec-city-dot" aria-hidden="true"></span>Davanagere<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Davanagere</span></button></li>
            </ul>
          </div>

          <!-- Tamil Nadu (10 Cities) -->
          <div class="lsec-tab-panel" id="lsec-panel-tamil-nadu" role="tabpanel" aria-labelledby="lsec-tab-tamil-nadu" data-country="tamil-nadu">
            <div class="d-flex align-items-center justify-content-between border-bottom pb-2 mb-3">
              <h4 class="fw-bold text-dark m-0 d-flex align-items-center gap-2">
                <i class="fa fa-map-marker-alt text-danger"></i>
                <span>Major Cities in Tamil Nadu</span>
              </h4>
              <span class="badge bg-light text-dark border">10 Cities</span>
            </div>
            <ul class="lsec-city-grid" role="list">
              <li><button class="lsec-city-btn" data-city-id="chennai" data-country="tamil-nadu" data-phrase="<?php echo $lseo_e; ?> in Chennai" aria-label="<?php echo $lseo_e; ?> in Chennai"><span class="lsec-city-dot" aria-hidden="true"></span>Chennai<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Chennai</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="coimbatore" data-country="tamil-nadu" data-phrase="<?php echo $lseo_e; ?> in Coimbatore" aria-label="<?php echo $lseo_e; ?> in Coimbatore"><span class="lsec-city-dot" aria-hidden="true"></span>Coimbatore<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Coimbatore</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="madurai" data-country="tamil-nadu" data-phrase="<?php echo $lseo_e; ?> in Madurai" aria-label="<?php echo $lseo_e; ?> in Madurai"><span class="lsec-city-dot" aria-hidden="true"></span>Madurai<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Madurai</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="tiruppur" data-country="tamil-nadu" data-phrase="<?php echo $lseo_e; ?> in Tiruppur" aria-label="<?php echo $lseo_e; ?> in Tiruppur"><span class="lsec-city-dot" aria-hidden="true"></span>Tiruppur<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Tiruppur</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="salem" data-country="tamil-nadu" data-phrase="<?php echo $lseo_e; ?> in Salem" aria-label="<?php echo $lseo_e; ?> in Salem"><span class="lsec-city-dot" aria-hidden="true"></span>Salem<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Salem</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="tiruchirappalli" data-country="tamil-nadu" data-phrase="<?php echo $lseo_e; ?> in Tiruchirappalli" aria-label="<?php echo $lseo_e; ?> in Tiruchirappalli"><span class="lsec-city-dot" aria-hidden="true"></span>Tiruchirappalli<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Tiruchirappalli</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="tirunelveli" data-country="tamil-nadu" data-phrase="<?php echo $lseo_e; ?> in Tirunelveli" aria-label="<?php echo $lseo_e; ?> in Tirunelveli"><span class="lsec-city-dot" aria-hidden="true"></span>Tirunelveli<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Tirunelveli</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="erode" data-country="tamil-nadu" data-phrase="<?php echo $lseo_e; ?> in Erode" aria-label="<?php echo $lseo_e; ?> in Erode"><span class="lsec-city-dot" aria-hidden="true"></span>Erode<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Erode</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="vellore" data-country="tamil-nadu" data-phrase="<?php echo $lseo_e; ?> in Vellore" aria-label="<?php echo $lseo_e; ?> in Vellore"><span class="lsec-city-dot" aria-hidden="true"></span>Vellore<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Vellore</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="nagercoil" data-country="tamil-nadu" data-phrase="<?php echo $lseo_e; ?> in Nagercoil" aria-label="<?php echo $lseo_e; ?> in Nagercoil"><span class="lsec-city-dot" aria-hidden="true"></span>Nagercoil<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Nagercoil</span></button></li>
            </ul>
          </div>

          <!-- Uttar Pradesh (17 Cities) -->
          <div class="lsec-tab-panel" id="lsec-panel-uttar-pradesh" role="tabpanel" aria-labelledby="lsec-tab-uttar-pradesh" data-country="uttar-pradesh">
            <div class="d-flex align-items-center justify-content-between border-bottom pb-2 mb-3">
              <h4 class="fw-bold text-dark m-0 d-flex align-items-center gap-2">
                <i class="fa fa-map-marker-alt text-danger"></i>
                <span>Major Cities in Uttar Pradesh</span>
              </h4>
              <span class="badge bg-light text-dark border">17 Cities</span>
            </div>
            <ul class="lsec-city-grid" role="list">
              <li><button class="lsec-city-btn" data-city-id="lucknow" data-country="uttar-pradesh" data-phrase="<?php echo $lseo_e; ?> in Lucknow" aria-label="<?php echo $lseo_e; ?> in Lucknow"><span class="lsec-city-dot" aria-hidden="true"></span>Lucknow<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Lucknow</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="kanpur" data-country="uttar-pradesh" data-phrase="<?php echo $lseo_e; ?> in Kanpur" aria-label="<?php echo $lseo_e; ?> in Kanpur"><span class="lsec-city-dot" aria-hidden="true"></span>Kanpur<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Kanpur</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="noida" data-country="uttar-pradesh" data-phrase="<?php echo $lseo_e; ?> in Noida" aria-label="<?php echo $lseo_e; ?> in Noida"><span class="lsec-city-dot" aria-hidden="true"></span>Noida<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Noida</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="ghaziabad" data-country="uttar-pradesh" data-phrase="<?php echo $lseo_e; ?> in Ghaziabad" aria-label="<?php echo $lseo_e; ?> in Ghaziabad"><span class="lsec-city-dot" aria-hidden="true"></span>Ghaziabad<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Ghaziabad</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="agra" data-country="uttar-pradesh" data-phrase="<?php echo $lseo_e; ?> in Agra" aria-label="<?php echo $lseo_e; ?> in Agra"><span class="lsec-city-dot" aria-hidden="true"></span>Agra<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Agra</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="varanasi" data-country="uttar-pradesh" data-phrase="<?php echo $lseo_e; ?> in Varanasi" aria-label="<?php echo $lseo_e; ?> in Varanasi"><span class="lsec-city-dot" aria-hidden="true"></span>Varanasi<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Varanasi</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="meerut" data-country="uttar-pradesh" data-phrase="<?php echo $lseo_e; ?> in Meerut" aria-label="<?php echo $lseo_e; ?> in Meerut"><span class="lsec-city-dot" aria-hidden="true"></span>Meerut<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Meerut</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="prayagraj" data-country="uttar-pradesh" data-phrase="<?php echo $lseo_e; ?> in Prayagraj" aria-label="<?php echo $lseo_e; ?> in Prayagraj"><span class="lsec-city-dot" aria-hidden="true"></span>Prayagraj<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Prayagraj</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="aligarh" data-country="uttar-pradesh" data-phrase="<?php echo $lseo_e; ?> in Aligarh" aria-label="<?php echo $lseo_e; ?> in Aligarh"><span class="lsec-city-dot" aria-hidden="true"></span>Aligarh<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Aligarh</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="bareilly" data-country="uttar-pradesh" data-phrase="<?php echo $lseo_e; ?> in Bareilly" aria-label="<?php echo $lseo_e; ?> in Bareilly"><span class="lsec-city-dot" aria-hidden="true"></span>Bareilly<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Bareilly</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="moradabad" data-country="uttar-pradesh" data-phrase="<?php echo $lseo_e; ?> in Moradabad" aria-label="<?php echo $lseo_e; ?> in Moradabad"><span class="lsec-city-dot" aria-hidden="true"></span>Moradabad<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Moradabad</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="gorakhpur" data-country="uttar-pradesh" data-phrase="<?php echo $lseo_e; ?> in Gorakhpur" aria-label="<?php echo $lseo_e; ?> in Gorakhpur"><span class="lsec-city-dot" aria-hidden="true"></span>Gorakhpur<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Gorakhpur</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="mathura" data-country="uttar-pradesh" data-phrase="<?php echo $lseo_e; ?> in Mathura" aria-label="<?php echo $lseo_e; ?> in Mathura"><span class="lsec-city-dot" aria-hidden="true"></span>Mathura<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Mathura</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="muzaffarnagar" data-country="uttar-pradesh" data-phrase="<?php echo $lseo_e; ?> in Muzaffarnagar" aria-label="<?php echo $lseo_e; ?> in Muzaffarnagar"><span class="lsec-city-dot" aria-hidden="true"></span>Muzaffarnagar<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Muzaffarnagar</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="firozabad" data-country="uttar-pradesh" data-phrase="<?php echo $lseo_e; ?> in Firozabad" aria-label="<?php echo $lseo_e; ?> in Firozabad"><span class="lsec-city-dot" aria-hidden="true"></span>Firozabad<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Firozabad</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="saharanpur" data-country="uttar-pradesh" data-phrase="<?php echo $lseo_e; ?> in Saharanpur" aria-label="<?php echo $lseo_e; ?> in Saharanpur"><span class="lsec-city-dot" aria-hidden="true"></span>Saharanpur<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Saharanpur</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="jhansi" data-country="uttar-pradesh" data-phrase="<?php echo $lseo_e; ?> in Jhansi" aria-label="<?php echo $lseo_e; ?> in Jhansi"><span class="lsec-city-dot" aria-hidden="true"></span>Jhansi<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Jhansi</span></button></li>
            </ul>
          </div>

          <!-- Rajasthan (8 Cities) -->
          <div class="lsec-tab-panel" id="lsec-panel-rajasthan" role="tabpanel" aria-labelledby="lsec-tab-rajasthan" data-country="rajasthan">
            <div class="d-flex align-items-center justify-content-between border-bottom pb-2 mb-3">
              <h4 class="fw-bold text-dark m-0 d-flex align-items-center gap-2">
                <i class="fa fa-map-marker-alt text-danger"></i>
                <span>Major Cities in Rajasthan</span>
              </h4>
              <span class="badge bg-light text-dark border">8 Cities</span>
            </div>
            <ul class="lsec-city-grid" role="list">
              <li><button class="lsec-city-btn" data-city-id="jaipur" data-country="rajasthan" data-phrase="<?php echo $lseo_e; ?> in Jaipur" aria-label="<?php echo $lseo_e; ?> in Jaipur"><span class="lsec-city-dot" aria-hidden="true"></span>Jaipur<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Jaipur</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="jodhpur" data-country="rajasthan" data-phrase="<?php echo $lseo_e; ?> in Jodhpur" aria-label="<?php echo $lseo_e; ?> in Jodhpur"><span class="lsec-city-dot" aria-hidden="true"></span>Jodhpur<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Jodhpur</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="kota" data-country="rajasthan" data-phrase="<?php echo $lseo_e; ?> in Kota" aria-label="<?php echo $lseo_e; ?> in Kota"><span class="lsec-city-dot" aria-hidden="true"></span>Kota<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Kota</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="udaipur" data-country="rajasthan" data-phrase="<?php echo $lseo_e; ?> in Udaipur" aria-label="<?php echo $lseo_e; ?> in Udaipur"><span class="lsec-city-dot" aria-hidden="true"></span>Udaipur<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Udaipur</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="ajmer" data-country="rajasthan" data-phrase="<?php echo $lseo_e; ?> in Ajmer" aria-label="<?php echo $lseo_e; ?> in Ajmer"><span class="lsec-city-dot" aria-hidden="true"></span>Ajmer<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Ajmer</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="bikaner" data-country="rajasthan" data-phrase="<?php echo $lseo_e; ?> in Bikaner" aria-label="<?php echo $lseo_e; ?> in Bikaner"><span class="lsec-city-dot" aria-hidden="true"></span>Bikaner<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Bikaner</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="alwar" data-country="rajasthan" data-phrase="<?php echo $lseo_e; ?> in Alwar" aria-label="<?php echo $lseo_e; ?> in Alwar"><span class="lsec-city-dot" aria-hidden="true"></span>Alwar<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Alwar</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="bharutpur" data-country="rajasthan" data-phrase="<?php echo $lseo_e; ?> in Bharatpur" aria-label="<?php echo $lseo_e; ?> in Bharatpur"><span class="lsec-city-dot" aria-hidden="true"></span>Bharatpur<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Bharatpur</span></button></li>
            </ul>
          </div>

          <!-- Madhya Pradesh (7 Cities) -->
          <div class="lsec-tab-panel" id="lsec-panel-madhya-pradesh" role="tabpanel" aria-labelledby="lsec-tab-madhya-pradesh" data-country="madhya-pradesh">
            <div class="d-flex align-items-center justify-content-between border-bottom pb-2 mb-3">
              <h4 class="fw-bold text-dark m-0 d-flex align-items-center gap-2">
                <i class="fa fa-map-marker-alt text-danger"></i>
                <span>Major Cities in Madhya Pradesh</span>
              </h4>
              <span class="badge bg-light text-dark border">7 Cities</span>
            </div>
            <ul class="lsec-city-grid" role="list">
              <li><button class="lsec-city-btn" data-city-id="indore" data-country="madhya-pradesh" data-phrase="<?php echo $lseo_e; ?> in Indore" aria-label="<?php echo $lseo_e; ?> in Indore"><span class="lsec-city-dot" aria-hidden="true"></span>Indore<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Indore</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="bhopal" data-country="madhya-pradesh" data-phrase="<?php echo $lseo_e; ?> in Bhopal" aria-label="<?php echo $lseo_e; ?> in Bhopal"><span class="lsec-city-dot" aria-hidden="true"></span>Bhopal<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Bhopal</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="gwalior" data-country="madhya-pradesh" data-phrase="<?php echo $lseo_e; ?> in Gwalior" aria-label="<?php echo $lseo_e; ?> in Gwalior"><span class="lsec-city-dot" aria-hidden="true"></span>Gwalior<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Gwalior</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="jabalpur" data-country="madhya-pradesh" data-phrase="<?php echo $lseo_e; ?> in Jabalpur" aria-label="<?php echo $lseo_e; ?> in Jabalpur"><span class="lsec-city-dot" aria-hidden="true"></span>Jabalpur<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Jabalpur</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="ujjain" data-country="madhya-pradesh" data-phrase="<?php echo $lseo_e; ?> in Ujjain" aria-label="<?php echo $lseo_e; ?> in Ujjain"><span class="lsec-city-dot" aria-hidden="true"></span>Ujjain<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Ujjain</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="sagar" data-country="madhya-pradesh" data-phrase="<?php echo $lseo_e; ?> in Sagar" aria-label="<?php echo $lseo_e; ?> in Sagar"><span class="lsec-city-dot" aria-hidden="true"></span>Sagar<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Sagar</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="satna" data-country="madhya-pradesh" data-phrase="<?php echo $lseo_e; ?> in Satna" aria-label="<?php echo $lseo_e; ?> in Satna"><span class="lsec-city-dot" aria-hidden="true"></span>Satna<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Satna</span></button></li>
            </ul>
          </div>

          <!-- West Bengal (6 Cities) -->
          <div class="lsec-tab-panel" id="lsec-panel-west-bengal" role="tabpanel" aria-labelledby="lsec-tab-west-bengal" data-country="west-bengal">
            <div class="d-flex align-items-center justify-content-between border-bottom pb-2 mb-3">
              <h4 class="fw-bold text-dark m-0 d-flex align-items-center gap-2">
                <i class="fa fa-map-marker-alt text-danger"></i>
                <span>Major Cities in West Bengal</span>
              </h4>
              <span class="badge bg-light text-dark border">6 Cities</span>
            </div>
            <ul class="lsec-city-grid" role="list">
              <li><button class="lsec-city-btn" data-city-id="kolkata" data-country="west-bengal" data-phrase="<?php echo $lseo_e; ?> in Kolkata" aria-label="<?php echo $lseo_e; ?> in Kolkata"><span class="lsec-city-dot" aria-hidden="true"></span>Kolkata<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Kolkata</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="howrah" data-country="west-bengal" data-phrase="<?php echo $lseo_e; ?> in Howrah" aria-label="<?php echo $lseo_e; ?> in Howrah"><span class="lsec-city-dot" aria-hidden="true"></span>Howrah<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Howrah</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="durgapur" data-country="west-bengal" data-phrase="<?php echo $lseo_e; ?> in Durgapur" aria-label="<?php echo $lseo_e; ?> in Durgapur"><span class="lsec-city-dot" aria-hidden="true"></span>Durgapur<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Durgapur</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="asansol" data-country="west-bengal" data-phrase="<?php echo $lseo_e; ?> in Asansol" aria-label="<?php echo $lseo_e; ?> in Asansol"><span class="lsec-city-dot" aria-hidden="true"></span>Asansol<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Asansol</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="siliguri" data-country="west-bengal" data-phrase="<?php echo $lseo_e; ?> in Siliguri" aria-label="<?php echo $lseo_e; ?> in Siliguri"><span class="lsec-city-dot" aria-hidden="true"></span>Siliguri<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Siliguri</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="kharagpur" data-country="west-bengal" data-phrase="<?php echo $lseo_e; ?> in Kharagpur" aria-label="<?php echo $lseo_e; ?> in Kharagpur"><span class="lsec-city-dot" aria-hidden="true"></span>Kharagpur<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Kharagpur</span></button></li>
            </ul>
          </div>

          <!-- Haryana (7 Cities) -->
          <div class="lsec-tab-panel" id="lsec-panel-haryana" role="tabpanel" aria-labelledby="lsec-tab-haryana" data-country="haryana">
            <div class="d-flex align-items-center justify-content-between border-bottom pb-2 mb-3">
              <h4 class="fw-bold text-dark m-0 d-flex align-items-center gap-2">
                <i class="fa fa-map-marker-alt text-danger"></i>
                <span>Major Cities in Haryana</span>
              </h4>
              <span class="badge bg-light text-dark border">7 Cities</span>
            </div>
            <ul class="lsec-city-grid" role="list">
              <li><button class="lsec-city-btn" data-city-id="gurugram" data-country="haryana" data-phrase="<?php echo $lseo_e; ?> in Gurugram" aria-label="<?php echo $lseo_e; ?> in Gurugram"><span class="lsec-city-dot" aria-hidden="true"></span>Gurugram<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Gurugram</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="faridabad" data-country="haryana" data-phrase="<?php echo $lseo_e; ?> in Faridabad" aria-label="<?php echo $lseo_e; ?> in Faridabad"><span class="lsec-city-dot" aria-hidden="true"></span>Faridabad<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Faridabad</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="panipat" data-country="haryana" data-phrase="<?php echo $lseo_e; ?> in Panipat" aria-label="<?php echo $lseo_e; ?> in Panipat"><span class="lsec-city-dot" aria-hidden="true"></span>Panipat<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Panipat</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="hisar" data-country="haryana" data-phrase="<?php echo $lseo_e; ?> in Hisar" aria-label="<?php echo $lseo_e; ?> in Hisar"><span class="lsec-city-dot" aria-hidden="true"></span>Hisar<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Hisar</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="rohtak" data-country="haryana" data-phrase="<?php echo $lseo_e; ?> in Rohtak" aria-label="<?php echo $lseo_e; ?> in Rohtak"><span class="lsec-city-dot" aria-hidden="true"></span>Rohtak<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Rohtak</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="sonipat" data-country="haryana" data-phrase="<?php echo $lseo_e; ?> in Sonipat" aria-label="<?php echo $lseo_e; ?> in Sonipat"><span class="lsec-city-dot" aria-hidden="true"></span>Sonipat<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Sonipat</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="karnal" data-country="haryana" data-phrase="<?php echo $lseo_e; ?> in Karnal" aria-label="<?php echo $lseo_e; ?> in Karnal"><span class="lsec-city-dot" aria-hidden="true"></span>Karnal<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Karnal</span></button></li>
            </ul>
          </div>

          <!-- Punjab (7 Cities) -->
          <div class="lsec-tab-panel" id="lsec-panel-punjab" role="tabpanel" aria-labelledby="lsec-tab-punjab" data-country="punjab">
            <div class="d-flex align-items-center justify-content-between border-bottom pb-2 mb-3">
              <h4 class="fw-bold text-dark m-0 d-flex align-items-center gap-2">
                <i class="fa fa-map-marker-alt text-danger"></i>
                <span>Major Cities in Punjab</span>
              </h4>
              <span class="badge bg-light text-dark border">7 Cities</span>
            </div>
            <ul class="lsec-city-grid" role="list">
              <li><button class="lsec-city-btn" data-city-id="ludhiana" data-country="punjab" data-phrase="<?php echo $lseo_e; ?> in Ludhiana" aria-label="<?php echo $lseo_e; ?> in Ludhiana"><span class="lsec-city-dot" aria-hidden="true"></span>Ludhiana<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Ludhiana</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="amritsar" data-country="punjab" data-phrase="<?php echo $lseo_e; ?> in Amritsar" aria-label="<?php echo $lseo_e; ?> in Amritsar"><span class="lsec-city-dot" aria-hidden="true"></span>Amritsar<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Amritsar</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="jalandhar" data-country="punjab" data-phrase="<?php echo $lseo_e; ?> in Jalandhar" aria-label="<?php echo $lseo_e; ?> in Jalandhar"><span class="lsec-city-dot" aria-hidden="true"></span>Jalandhar<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Jalandhar</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="patiala" data-country="punjab" data-phrase="<?php echo $lseo_e; ?> in Patiala" aria-label="<?php echo $lseo_e; ?> in Patiala"><span class="lsec-city-dot" aria-hidden="true"></span>Patiala<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Patiala</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="bathinda" data-country="punjab" data-phrase="<?php echo $lseo_e; ?> in Bathinda" aria-label="<?php echo $lseo_e; ?> in Bathinda"><span class="lsec-city-dot" aria-hidden="true"></span>Bathinda<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Bathinda</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="mohali" data-country="punjab" data-phrase="<?php echo $lseo_e; ?> in Mohali" aria-label="<?php echo $lseo_e; ?> in Mohali"><span class="lsec-city-dot" aria-hidden="true"></span>Mohali<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Mohali</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="pathankot" data-country="punjab" data-phrase="<?php echo $lseo_e; ?> in Pathankot" aria-label="<?php echo $lseo_e; ?> in Pathankot"><span class="lsec-city-dot" aria-hidden="true"></span>Pathankot<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Pathankot</span></button></li>
            </ul>
          </div>

          <!-- Kerala (7 Cities) -->
          <div class="lsec-tab-panel" id="lsec-panel-kerala" role="tabpanel" aria-labelledby="lsec-tab-kerala" data-country="kerala">
            <div class="d-flex align-items-center justify-content-between border-bottom pb-2 mb-3">
              <h4 class="fw-bold text-dark m-0 d-flex align-items-center gap-2">
                <i class="fa fa-map-marker-alt text-danger"></i>
                <span>Major Cities in Kerala</span>
              </h4>
              <span class="badge bg-light text-dark border">7 Cities</span>
            </div>
            <ul class="lsec-city-grid" role="list">
              <li><button class="lsec-city-btn" data-city-id="kochi" data-country="kerala" data-phrase="<?php echo $lseo_e; ?> in Kochi" aria-label="<?php echo $lseo_e; ?> in Kochi"><span class="lsec-city-dot" aria-hidden="true"></span>Kochi<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Kochi</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="thiruvananthapuram" data-country="kerala" data-phrase="<?php echo $lseo_e; ?> in Thiruvananthapuram" aria-label="<?php echo $lseo_e; ?> in Thiruvananthapuram"><span class="lsec-city-dot" aria-hidden="true"></span>Thiruvananthapuram<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Thiruvananthapuram</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="kozhikode" data-country="kerala" data-phrase="<?php echo $lseo_e; ?> in Kozhikode" aria-label="<?php echo $lseo_e; ?> in Kozhikode"><span class="lsec-city-dot" aria-hidden="true"></span>Kozhikode<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Kozhikode</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="thrissur" data-country="kerala" data-phrase="<?php echo $lseo_e; ?> in Thrissur" aria-label="<?php echo $lseo_e; ?> in Thrissur"><span class="lsec-city-dot" aria-hidden="true"></span>Thrissur<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Thrissur</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="kollam" data-country="kerala" data-phrase="<?php echo $lseo_e; ?> in Kollam" aria-label="<?php echo $lseo_e; ?> in Kollam"><span class="lsec-city-dot" aria-hidden="true"></span>Kollam<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Kollam</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="kannur" data-country="kerala" data-phrase="<?php echo $lseo_e; ?> in Kannur" aria-label="<?php echo $lseo_e; ?> in Kannur"><span class="lsec-city-dot" aria-hidden="true"></span>Kannur<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Kannur</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="alappuzha" data-country="kerala" data-phrase="<?php echo $lseo_e; ?> in Alappuzha" aria-label="<?php echo $lseo_e; ?> in Alappuzha"><span class="lsec-city-dot" aria-hidden="true"></span>Alappuzha<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Alappuzha</span></button></li>
            </ul>
          </div>

          <!-- Bihar (6 Cities) -->
          <div class="lsec-tab-panel" id="lsec-panel-bihar" role="tabpanel" aria-labelledby="lsec-tab-bihar" data-country="bihar">
            <div class="d-flex align-items-center justify-content-between border-bottom pb-2 mb-3">
              <h4 class="fw-bold text-dark m-0 d-flex align-items-center gap-2">
                <i class="fa fa-map-marker-alt text-danger"></i>
                <span>Major Cities in Bihar</span>
              </h4>
              <span class="badge bg-light text-dark border">6 Cities</span>
            </div>
            <ul class="lsec-city-grid" role="list">
              <li><button class="lsec-city-btn" data-city-id="patna" data-country="bihar" data-phrase="<?php echo $lseo_e; ?> in Patna" aria-label="<?php echo $lseo_e; ?> in Patna"><span class="lsec-city-dot" aria-hidden="true"></span>Patna<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Patna</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="gaya" data-country="bihar" data-phrase="<?php echo $lseo_e; ?> in Gaya" aria-label="<?php echo $lseo_e; ?> in Gaya"><span class="lsec-city-dot" aria-hidden="true"></span>Gaya<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Gaya</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="muzaffarpur" data-country="bihar" data-phrase="<?php echo $lseo_e; ?> in Muzaffarpur" aria-label="<?php echo $lseo_e; ?> in Muzaffarpur"><span class="lsec-city-dot" aria-hidden="true"></span>Muzaffarpur<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Muzaffarpur</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="bhagalpur" data-country="bihar" data-phrase="<?php echo $lseo_e; ?> in Bhagalpur" aria-label="<?php echo $lseo_e; ?> in Bhagalpur"><span class="lsec-city-dot" aria-hidden="true"></span>Bhagalpur<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Bhagalpur</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="darbhanga" data-country="bihar" data-phrase="<?php echo $lseo_e; ?> in Darbhanga" aria-label="<?php echo $lseo_e; ?> in Darbhanga"><span class="lsec-city-dot" aria-hidden="true"></span>Darbhanga<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Darbhanga</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="purnia" data-country="bihar" data-phrase="<?php echo $lseo_e; ?> in Purnia" aria-label="<?php echo $lseo_e; ?> in Purnia"><span class="lsec-city-dot" aria-hidden="true"></span>Purnia<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Purnia</span></button></li>
            </ul>
          </div>

          <!-- Jharkhand (7 Cities) -->
          <div class="lsec-tab-panel" id="lsec-panel-jharkhand" role="tabpanel" aria-labelledby="lsec-tab-jharkhand" data-country="jharkhand">
            <div class="d-flex align-items-center justify-content-between border-bottom pb-2 mb-3">
              <h4 class="fw-bold text-dark m-0 d-flex align-items-center gap-2">
                <i class="fa fa-map-marker-alt text-danger"></i>
                <span>Major Cities in Jharkhand</span>
              </h4>
              <span class="badge bg-light text-dark border">7 Cities</span>
            </div>
            <ul class="lsec-city-grid" role="list">
              <li><button class="lsec-city-btn" data-city-id="ranchi" data-country="jharkhand" data-phrase="<?php echo $lseo_e; ?> in Ranchi" aria-label="<?php echo $lseo_e; ?> in Ranchi"><span class="lsec-city-dot" aria-hidden="true"></span>Ranchi<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Ranchi</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="jamshedpur" data-country="jharkhand" data-phrase="<?php echo $lseo_e; ?> in Jamshedpur" aria-label="<?php echo $lseo_e; ?> in Jamshedpur"><span class="lsec-city-dot" aria-hidden="true"></span>Jamshedpur<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Jamshedpur</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="dhanbad" data-country="jharkhand" data-phrase="<?php echo $lseo_e; ?> in Dhanbad" aria-label="<?php echo $lseo_e; ?> in Dhanbad"><span class="lsec-city-dot" aria-hidden="true"></span>Dhanbad<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Dhanbad</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="bokaro" data-country="jharkhand" data-phrase="<?php echo $lseo_e; ?> in Bokaro" aria-label="<?php echo $lseo_e; ?> in Bokaro"><span class="lsec-city-dot" aria-hidden="true"></span>Bokaro<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Bokaro</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="deoghar" data-country="jharkhand" data-phrase="<?php echo $lseo_e; ?> in Deoghar" aria-label="<?php echo $lseo_e; ?> in Deoghar"><span class="lsec-city-dot" aria-hidden="true"></span>Deoghar<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Deoghar</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="hazaribagh" data-country="jharkhand" data-phrase="<?php echo $lseo_e; ?> in Hazaribagh" aria-label="<?php echo $lseo_e; ?> in Hazaribagh"><span class="lsec-city-dot" aria-hidden="true"></span>Hazaribagh<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Hazaribagh</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="ramgarh" data-country="jharkhand" data-phrase="<?php echo $lseo_e; ?> in Ramgarh" aria-label="<?php echo $lseo_e; ?> in Ramgarh"><span class="lsec-city-dot" aria-hidden="true"></span>Ramgarh<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Ramgarh</span></button></li>
            </ul>
          </div>

          <!-- Odisha (6 Cities) -->
          <div class="lsec-tab-panel" id="lsec-panel-odisha" role="tabpanel" aria-labelledby="lsec-tab-odisha" data-country="odisha">
            <div class="d-flex align-items-center justify-content-between border-bottom pb-2 mb-3">
              <h4 class="fw-bold text-dark m-0 d-flex align-items-center gap-2">
                <i class="fa fa-map-marker-alt text-danger"></i>
                <span>Major Cities in Odisha</span>
              </h4>
              <span class="badge bg-light text-dark border">6 Cities</span>
            </div>
            <ul class="lsec-city-grid" role="list">
              <li><button class="lsec-city-btn" data-city-id="bhubaneswar" data-country="odisha" data-phrase="<?php echo $lseo_e; ?> in Bhubaneswar" aria-label="<?php echo $lseo_e; ?> in Bhubaneswar"><span class="lsec-city-dot" aria-hidden="true"></span>Bhubaneswar<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Bhubaneswar</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="cuttack" data-country="odisha" data-phrase="<?php echo $lseo_e; ?> in Cuttack" aria-label="<?php echo $lseo_e; ?> in Cuttack"><span class="lsec-city-dot" aria-hidden="true"></span>Cuttack<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Cuttack</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="rourkela" data-country="odisha" data-phrase="<?php echo $lseo_e; ?> in Rourkela" aria-label="<?php echo $lseo_e; ?> in Rourkela"><span class="lsec-city-dot" aria-hidden="true"></span>Rourkela<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Rourkela</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="berhampur" data-country="odisha" data-phrase="<?php echo $lseo_e; ?> in Berhampur" aria-label="<?php echo $lseo_e; ?> in Berhampur"><span class="lsec-city-dot" aria-hidden="true"></span>Berhampur<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Berhampur</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="sambalpur" data-country="odisha" data-phrase="<?php echo $lseo_e; ?> in Sambalpur" aria-label="<?php echo $lseo_e; ?> in Sambalpur"><span class="lsec-city-dot" aria-hidden="true"></span>Sambalpur<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Sambalpur</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="balasore" data-country="odisha" data-phrase="<?php echo $lseo_e; ?> in Balasore" aria-label="<?php echo $lseo_e; ?> in Balasore"><span class="lsec-city-dot" aria-hidden="true"></span>Balasore<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Balasore</span></button></li>
            </ul>
          </div>

          <!-- Uttarakhand (6 Cities) -->
          <div class="lsec-tab-panel" id="lsec-panel-uttarakhand" role="tabpanel" aria-labelledby="lsec-tab-uttarakhand" data-country="uttarakhand">
            <div class="d-flex align-items-center justify-content-between border-bottom pb-2 mb-3">
              <h4 class="fw-bold text-dark m-0 d-flex align-items-center gap-2">
                <i class="fa fa-map-marker-alt text-danger"></i>
                <span>Major Cities in Uttarakhand</span>
              </h4>
              <span class="badge bg-light text-dark border">6 Cities</span>
            </div>
            <ul class="lsec-city-grid" role="list">
              <li><button class="lsec-city-btn" data-city-id="dehradun" data-country="uttarakhand" data-phrase="<?php echo $lseo_e; ?> in Dehradun" aria-label="<?php echo $lseo_e; ?> in Dehradun"><span class="lsec-city-dot" aria-hidden="true"></span>Dehradun<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Dehradun</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="haridwar" data-country="uttarakhand" data-phrase="<?php echo $lseo_e; ?> in Haridwar" aria-label="<?php echo $lseo_e; ?> in Haridwar"><span class="lsec-city-dot" aria-hidden="true"></span>Haridwar<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Haridwar</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="haldwani" data-country="uttarakhand" data-phrase="<?php echo $lseo_e; ?> in Haldwani" aria-label="<?php echo $lseo_e; ?> in Haldwani"><span class="lsec-city-dot" aria-hidden="true"></span>Haldwani<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Haldwani</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="roorkee" data-country="uttarakhand" data-phrase="<?php echo $lseo_e; ?> in Roorkee" aria-label="<?php echo $lseo_e; ?> in Roorkee"><span class="lsec-city-dot" aria-hidden="true"></span>Roorkee<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Roorkee</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="rishikesh" data-country="uttarakhand" data-phrase="<?php echo $lseo_e; ?> in Rishikesh" aria-label="<?php echo $lseo_e; ?> in Rishikesh"><span class="lsec-city-dot" aria-hidden="true"></span>Rishikesh<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Rishikesh</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="kashipur" data-country="uttarakhand" data-phrase="<?php echo $lseo_e; ?> in Kashipur" aria-label="<?php echo $lseo_e; ?> in Kashipur"><span class="lsec-city-dot" aria-hidden="true"></span>Kashipur<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Kashipur</span></button></li>
            </ul>
          </div>

          <!-- Other States & UTs (16 Cities) -->
          <div class="lsec-tab-panel" id="lsec-panel-other-states" role="tabpanel" aria-labelledby="lsec-tab-other-states" data-country="other-states">
            <div class="d-flex align-items-center justify-content-between border-bottom pb-2 mb-3">
              <h4 class="fw-bold text-dark m-0 d-flex align-items-center gap-2">
                <i class="fa fa-map-marker-alt text-danger"></i>
                <span>Major Cities in Other States &amp; UTs</span>
              </h4>
              <span class="badge bg-light text-dark border">16 Cities</span>
            </div>
            <ul class="lsec-city-grid" role="list">
              <li><button class="lsec-city-btn" data-city-id="delhi" data-country="other-states" data-phrase="<?php echo $lseo_e; ?> in Delhi" aria-label="<?php echo $lseo_e; ?> in Delhi"><span class="lsec-city-dot" aria-hidden="true"></span>Delhi (Delhi)<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Delhi</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="hyderabad" data-country="other-states" data-phrase="<?php echo $lseo_e; ?> in Hyderabad" aria-label="<?php echo $lseo_e; ?> in Hyderabad"><span class="lsec-city-dot" aria-hidden="true"></span>Hyderabad (Telangana)<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Hyderabad</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="visakhapatnam" data-country="other-states" data-phrase="<?php echo $lseo_e; ?> in Visakhapatnam" aria-label="<?php echo $lseo_e; ?> in Visakhapatnam"><span class="lsec-city-dot" aria-hidden="true"></span>Visakhapatnam (Andhra Pradesh)<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Visakhapatnam</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="vijayawada" data-country="other-states" data-phrase="<?php echo $lseo_e; ?> in Vijayawada" aria-label="<?php echo $lseo_e; ?> in Vijayawada"><span class="lsec-city-dot" aria-hidden="true"></span>Vijayawada (Andhra Pradesh)<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Vijayawada</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="raipur" data-country="other-states" data-phrase="<?php echo $lseo_e; ?> in Raipur" aria-label="<?php echo $lseo_e; ?> in Raipur"><span class="lsec-city-dot" aria-hidden="true"></span>Raipur (Chhattisgarh)<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Raipur</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="bhilai" data-country="other-states" data-phrase="<?php echo $lseo_e; ?> in Bhilai" aria-label="<?php echo $lseo_e; ?> in Bhilai"><span class="lsec-city-dot" aria-hidden="true"></span>Bhilai (Chhattisgarh)<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Bhilai</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="guwahati" data-country="other-states" data-phrase="<?php echo $lseo_e; ?> in Guwahati" aria-label="<?php echo $lseo_e; ?> in Guwahati"><span class="lsec-city-dot" aria-hidden="true"></span>Guwahati (Assam)<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Guwahati</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="chandigarh" data-country="other-states" data-phrase="<?php echo $lseo_e; ?> in Chandigarh" aria-label="<?php echo $lseo_e; ?> in Chandigarh"><span class="lsec-city-dot" aria-hidden="true"></span>Chandigarh<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Chandigarh</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="puducherry" data-country="other-states" data-phrase="<?php echo $lseo_e; ?> in Puducherry" aria-label="<?php echo $lseo_e; ?> in Puducherry"><span class="lsec-city-dot" aria-hidden="true"></span>Puducherry<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Puducherry</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="agartala" data-country="other-states" data-phrase="<?php echo $lseo_e; ?> in Agartala" aria-label="<?php echo $lseo_e; ?> in Agartala"><span class="lsec-city-dot" aria-hidden="true"></span>Agartala (Tripura)<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Agartala</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="shillong" data-country="other-states" data-phrase="<?php echo $lseo_e; ?> in Shillong" aria-label="<?php echo $lseo_e; ?> in Shillong"><span class="lsec-city-dot" aria-hidden="true"></span>Shillong (Meghalaya)<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Shillong</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="imphal" data-country="other-states" data-phrase="<?php echo $lseo_e; ?> in Imphal" aria-label="<?php echo $lseo_e; ?> in Imphal"><span class="lsec-city-dot" aria-hidden="true"></span>Imphal (Manipur)<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Imphal</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="dimapur" data-country="other-states" data-phrase="<?php echo $lseo_e; ?> in Dimapur" aria-label="<?php echo $lseo_e; ?> in Dimapur"><span class="lsec-city-dot" aria-hidden="true"></span>Dimapur (Nagaland)<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Dimapur</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="aizawl" data-country="other-states" data-phrase="<?php echo $lseo_e; ?> in Aizawl" aria-label="<?php echo $lseo_e; ?> in Aizawl"><span class="lsec-city-dot" aria-hidden="true"></span>Aizawl (Mizoram)<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Aizawl</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="itanagar" data-country="other-states" data-phrase="<?php echo $lseo_e; ?> in Itanagar" aria-label="<?php echo $lseo_e; ?> in Itanagar"><span class="lsec-city-dot" aria-hidden="true"></span>Itanagar (Arunachal Pradesh)<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Itanagar</span></button></li>
              <li><button class="lsec-city-btn" data-city-id="gangtok" data-country="other-states" data-phrase="<?php echo $lseo_e; ?> in Gangtok" aria-label="<?php echo $lseo_e; ?> in Gangtok"><span class="lsec-city-dot" aria-hidden="true"></span>Gangtok (Sikkim)<span class="lsec-sr-only"> — <?php echo $lseo_e; ?> in Gangtok</span></button></li>
            </ul>
          </div>

        </div>
      </div>

      <!-- Right Column: Placeholder Image -->
      <div class="col-lg-6">
        <div class="lsec-image-wrapper h-100 p-0 rounded-4 overflow-hidden border shadow-sm bg-light d-flex align-items-center justify-content-center">
          <img src="https://placehold.co/600x420/f8fafc/0f1c3f?text=Placeholder+Image" alt="<?php echo $lseo_e; ?>" class="img-fluid w-100 h-100 object-fit-cover" />
        </div>
      </div>
    </div>
  </div>
</section>

<script>
(function () {
  'use strict';

  const root = document.querySelector('.lsec-root');
  if (!root) return;

  const tabs     = root.querySelectorAll('.lsec-tab');
  const panels   = root.querySelectorAll('.lsec-tab-panel');
  const cityBtns = root.querySelectorAll('.lsec-city-btn');

  function activateTab(tabEl) {
    if (!tabEl) return;
    const stateKey = tabEl.dataset.tab;
    tabs.forEach(t => {
      const isThis = t === tabEl;
      t.setAttribute('aria-selected', isThis ? 'true' : 'false');
      t.classList.toggle('is-active', isThis);
    });
    
    // Switch active panel
    panels.forEach(p => p.classList.toggle('is-active', p.dataset.country === stateKey));
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => activateTab(tab));
    tab.addEventListener('keydown', e => {
      const list = [...tabs];
      const idx  = list.indexOf(tab);
      let target = null;
      if (e.key === 'ArrowRight') target = list[(idx + 1) % list.length];
      if (e.key === 'ArrowLeft')  target = list[(idx - 1 + list.length) % list.length];
      if (e.key === 'Home')       target = list[0];
      if (e.key === 'End')        target = list[list.length - 1];
      if (target) { e.preventDefault(); target.focus(); activateTab(target); }
    });
  });

  cityBtns.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      cityBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
    });
    btn.addEventListener('mouseleave', () => {
      btn.classList.remove('is-active');
    });
    btn.addEventListener('focus', () => {
      cityBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
    });
    btn.addEventListener('blur', () => {
      btn.classList.remove('is-active');
    });
  });

  if (tabs.length) activateTab(tabs[0]);
})();
</script>
<?php unset($lseo, $lseo_e); ?>