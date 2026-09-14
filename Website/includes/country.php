<?php
/* ─────────────────────────────────────────────────────────────────────────────
   Set $local_seo_service on the page BEFORE including this file.
   e.g.  $local_seo_service = 'BIM Modelling Services';
   Defaults to 'BIM & CAD Services' if not set.
   ───────────────────────────────────────────────────────────────────────────── */
$lseo   = isset($local_seo_service) ? $local_seo_service : 'BIM & CAD Services';
$lseo_e = htmlspecialchars($lseo, ENT_QUOTES, 'UTF-8');
?>
<section class="section-lg lsec-root" aria-labelledby="lsec-heading" data-service-name="<?php echo $lseo_e; ?>">
  <div class="country-mn">
    <div class="row justify-content-around align-items-start">
      <div class="col-lg-6">
        <div class="h-100 text-black p-2 p-sm-3">
          <h2 class="fw-bold border-bottom pb-3">We deliver <?php echo $lseo_e; ?> across the UK</h2>
          <div class="lsec-list-col">
            <!-- Country tab buttons -->
            <div class="lsec-tabs mb-4" role="tablist" aria-label="Filter cities by country">
              <button class="lsec-tab" role="tab" aria-selected="true" aria-controls="lsec-panel-england" data-tab="england" id="lsec-tab-england">
                <!-- England: St George's Cross -->
                <svg class="lsec-tab-flag" viewBox="0 0 16 12" aria-hidden="true" focusable="false">
                  <rect width="16" height="12" fill="#fff" />
                  <rect x="6.5" width="3" height="12" fill="#cf142b" />
                  <rect y="4.5" width="16" height="3" fill="#cf142b" />
                </svg> England
              </button>
              <button class="lsec-tab" role="tab" aria-selected="false" aria-controls="lsec-panel-scotland" data-tab="scotland" id="lsec-tab-scotland">
                <!-- Scotland: Saltire (St Andrew's Cross) -->
                <svg class="lsec-tab-flag" viewBox="0 0 16 12" aria-hidden="true" focusable="false">
                  <rect width="16" height="12" fill="#003399" />
                  <line x1="0" y1="0" x2="16" y2="12" stroke="#fff" stroke-width="4" stroke-linecap="square" />
                  <line x1="16" y1="0" x2="0" y2="12" stroke="#fff" stroke-width="4" stroke-linecap="square" />
                </svg> Scotland
              </button>
              <button class="lsec-tab" role="tab" aria-selected="false" aria-controls="lsec-panel-wales" data-tab="wales" id="lsec-tab-wales">
                <!-- Wales: Y Ddraig Goch (Red Dragon) -->
                <svg class="lsec-tab-flag" viewBox="0 0 16 12" aria-hidden="true" focusable="false">
                  <rect width="16" height="12" fill="#fff" />
                  <rect y="6" width="16" height="6" fill="#00ab39" />
                  <path d="M4,1 C3,2 2.5,3.5 3.5,4.5 C2,5 1.5,6.5 3,7 L3,8.5 L4.5,9 L5,10 L7.5,10.5 L10,10 L10.5,9 L12,8.5 L12,7 C13.5,6.5 13,5 11.5,4.5 C12.5,3.5 12,2 11,1.5 L9.5,1 L8,0.5 L6.5,1 Z" fill="#cf142b" />
                  <path d="M3,3 L1,1.5 L3,2" fill="#cf142b" />
                  <path d="M13,3 L15,1.5 L13,2" fill="#cf142b" />
                </svg> Wales
              </button>
              <button class="lsec-tab" role="tab" aria-selected="false" aria-controls="lsec-panel-nireland" data-tab="nireland" id="lsec-tab-nireland">
                <!-- N. Ireland: Union Jack -->
                <svg class="lsec-tab-flag" viewBox="0 0 16 12" aria-hidden="true" focusable="false">
                  <rect width="16" height="12" fill="#012169" />
                  <line x1="0" y1="0" x2="16" y2="12" stroke="#fff" stroke-width="4.5" stroke-linecap="square" />
                  <line x1="16" y1="0" x2="0" y2="12" stroke="#fff" stroke-width="4.5" stroke-linecap="square" />
                  <line x1="0" y1="0" x2="5" y2="4" stroke="#cf142b" stroke-width="2" />
                  <line x1="11" y1="8" x2="16" y2="12" stroke="#cf142b" stroke-width="2" />
                  <line x1="16" y1="0" x2="11" y2="4" stroke="#cf142b" stroke-width="2" />
                  <line x1="5" y1="8" x2="0" y2="12" stroke="#cf142b" stroke-width="2" />
                  <rect x="6.5" width="3" height="12" fill="#fff" />
                  <rect y="4.5" width="16" height="3" fill="#fff" />
                  <rect x="7" width="2" height="12" fill="#cf142b" />
                  <rect y="5" width="16" height="2" fill="#cf142b" />
                </svg> N. Ireland
              </button>
            </div>
            <!-- /lsec-tabs -->
            <!-- Tab panels — ALL city phrases are always in the DOM for crawlers -->
            <div class="lsec-tab-panels">
              <!-- ENGLAND panel -->
              <div class="lsec-tab-panel is-active" id="lsec-panel-england" role="tabpanel" aria-labelledby="lsec-tab-england" data-country="england">
                <ul class="lsec-city-grid" role="list">
                  <li>
                    <button class="lsec-city-btn" data-city-id="london" data-country="england" data-phrase="<?php echo $lseo_e; ?> London" aria-label="<?php echo $lseo_e; ?> London">
                      <span class="lsec-city-dot" aria-hidden="true"></span>London <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> London</span>
                    </button>
                  </li>
                  <li>
                    <button class="lsec-city-btn" data-city-id="birmingham" data-country="england" data-phrase="<?php echo $lseo_e; ?> Birmingham" aria-label="<?php echo $lseo_e; ?> Birmingham">
                      <span class="lsec-city-dot" aria-hidden="true"></span>Birmingham <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> Birmingham</span>
                    </button>
                  </li>
                  <li>
                    <button class="lsec-city-btn" data-city-id="manchester" data-country="england" data-phrase="<?php echo $lseo_e; ?> Manchester" aria-label="<?php echo $lseo_e; ?> Manchester">
                      <span class="lsec-city-dot" aria-hidden="true"></span>Manchester <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> Manchester</span>
                    </button>
                  </li>
                  <li>
                    <button class="lsec-city-btn" data-city-id="liverpool" data-country="england" data-phrase="<?php echo $lseo_e; ?> Liverpool" aria-label="<?php echo $lseo_e; ?> Liverpool">
                      <span class="lsec-city-dot" aria-hidden="true"></span>Liverpool <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> Liverpool</span>
                    </button>
                  </li>
                  <li>
                    <button class="lsec-city-btn" data-city-id="leeds" data-country="england" data-phrase="<?php echo $lseo_e; ?> Leeds" aria-label="<?php echo $lseo_e; ?> Leeds">
                      <span class="lsec-city-dot" aria-hidden="true"></span>Leeds <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> Leeds</span>
                    </button>
                  </li>
                  <li>
                    <button class="lsec-city-btn" data-city-id="sheffield" data-country="england" data-phrase="<?php echo $lseo_e; ?> Sheffield" aria-label="<?php echo $lseo_e; ?> Sheffield">
                      <span class="lsec-city-dot" aria-hidden="true"></span>Sheffield <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> Sheffield</span>
                    </button>
                  </li>
                  <li>
                    <button class="lsec-city-btn" data-city-id="bristol" data-country="england" data-phrase="<?php echo $lseo_e; ?> Bristol" aria-label="<?php echo $lseo_e; ?> Bristol">
                      <span class="lsec-city-dot" aria-hidden="true"></span>Bristol <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> Bristol</span>
                    </button>
                  </li>
                  <li>
                    <button class="lsec-city-btn" data-city-id="newcastle-upon-tyne" data-country="england" data-phrase="<?php echo $lseo_e; ?> Newcastle upon Tyne" aria-label="<?php echo $lseo_e; ?> Newcastle upon Tyne">
                      <span class="lsec-city-dot" aria-hidden="true"></span>Newcastle <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> Newcastle upon Tyne</span>
                    </button>
                  </li>
                  <li>
                    <button class="lsec-city-btn" data-city-id="nottingham" data-country="england" data-phrase="<?php echo $lseo_e; ?> Nottingham" aria-label="<?php echo $lseo_e; ?> Nottingham">
                      <span class="lsec-city-dot" aria-hidden="true"></span>Nottingham <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> Nottingham</span>
                    </button>
                  </li>
                  <li>
                    <button class="lsec-city-btn" data-city-id="leicester" data-country="england" data-phrase="<?php echo $lseo_e; ?> Leicester" aria-label="<?php echo $lseo_e; ?> Leicester">
                      <span class="lsec-city-dot" aria-hidden="true"></span>Leicester <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> Leicester</span>
                    </button>
                  </li>
                  <li>
                    <button class="lsec-city-btn" data-city-id="coventry" data-country="england" data-phrase="<?php echo $lseo_e; ?> Coventry" aria-label="<?php echo $lseo_e; ?> Coventry">
                      <span class="lsec-city-dot" aria-hidden="true"></span>Coventry <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> Coventry</span>
                    </button>
                  </li>
                  <li>
                    <button class="lsec-city-btn" data-city-id="bradford" data-country="england" data-phrase="<?php echo $lseo_e; ?> Bradford" aria-label="<?php echo $lseo_e; ?> Bradford">
                      <span class="lsec-city-dot" aria-hidden="true"></span>Bradford <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> Bradford</span>
                    </button>
                  </li>
                  <li>
                    <button class="lsec-city-btn" data-city-id="southampton" data-country="england" data-phrase="<?php echo $lseo_e; ?> Southampton" aria-label="<?php echo $lseo_e; ?> Southampton">
                      <span class="lsec-city-dot" aria-hidden="true"></span>Southampton <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> Southampton</span>
                    </button>
                  </li>
                  <li>
                    <button class="lsec-city-btn" data-city-id="portsmouth" data-country="england" data-phrase="<?php echo $lseo_e; ?> Portsmouth" aria-label="<?php echo $lseo_e; ?> Portsmouth">
                      <span class="lsec-city-dot" aria-hidden="true"></span>Portsmouth <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> Portsmouth</span>
                    </button>
                  </li>
                  <li>
                    <button class="lsec-city-btn" data-city-id="plymouth" data-country="england" data-phrase="<?php echo $lseo_e; ?> Plymouth" aria-label="<?php echo $lseo_e; ?> Plymouth">
                      <span class="lsec-city-dot" aria-hidden="true"></span>Plymouth <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> Plymouth</span>
                    </button>
                  </li>
                  <li>
                    <button class="lsec-city-btn" data-city-id="oxford" data-country="england" data-phrase="<?php echo $lseo_e; ?> Oxford" aria-label="<?php echo $lseo_e; ?> Oxford">
                      <span class="lsec-city-dot" aria-hidden="true"></span>Oxford <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> Oxford</span>
                    </button>
                  </li>
                  <li>
                    <button class="lsec-city-btn" data-city-id="cambridge" data-country="england" data-phrase="<?php echo $lseo_e; ?> Cambridge" aria-label="<?php echo $lseo_e; ?> Cambridge">
                      <span class="lsec-city-dot" aria-hidden="true"></span>Cambridge <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> Cambridge</span>
                    </button>
                  </li>
                  <li>
                    <button class="lsec-city-btn" data-city-id="york" data-country="england" data-phrase="<?php echo $lseo_e; ?> York" aria-label="<?php echo $lseo_e; ?> York">
                      <span class="lsec-city-dot" aria-hidden="true"></span>York <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> York</span>
                    </button>
                  </li>
                  <li>
                    <button class="lsec-city-btn" data-city-id="brighton-and-hove" data-country="england" data-phrase="<?php echo $lseo_e; ?> Brighton and Hove" aria-label="<?php echo $lseo_e; ?> Brighton and Hove">
                      <span class="lsec-city-dot" aria-hidden="true"></span>Brighton <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> Brighton and Hove</span>
                    </button>
                  </li>
                  <li>
                    <button class="lsec-city-btn" data-city-id="norwich" data-country="england" data-phrase="<?php echo $lseo_e; ?> Norwich" aria-label="<?php echo $lseo_e; ?> Norwich">
                      <span class="lsec-city-dot" aria-hidden="true"></span>Norwich <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> Norwich</span>
                    </button>
                  </li>
                  <li>
                    <button class="lsec-city-btn" data-city-id="exeter" data-country="england" data-phrase="<?php echo $lseo_e; ?> Exeter" aria-label="<?php echo $lseo_e; ?> Exeter">
                      <span class="lsec-city-dot" aria-hidden="true"></span>Exeter <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> Exeter</span>
                    </button>
                  </li>
                  <li>
                    <button class="lsec-city-btn" data-city-id="bath" data-country="england" data-phrase="<?php echo $lseo_e; ?> Bath" aria-label="<?php echo $lseo_e; ?> Bath">
                      <span class="lsec-city-dot" aria-hidden="true"></span>Bath <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> Bath</span>
                    </button>
                  </li>
                  <li>
                    <button class="lsec-city-btn" data-city-id="canterbury" data-country="england" data-phrase="<?php echo $lseo_e; ?> Canterbury" aria-label="<?php echo $lseo_e; ?> Canterbury">
                      <span class="lsec-city-dot" aria-hidden="true"></span>Canterbury <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> Canterbury</span>
                    </button>
                  </li>
                  <li>
                    <button class="lsec-city-btn" data-city-id="chester" data-country="england" data-phrase="<?php echo $lseo_e; ?> Chester" aria-label="<?php echo $lseo_e; ?> Chester">
                      <span class="lsec-city-dot" aria-hidden="true"></span>Chester <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> Chester</span>
                    </button>
                  </li>
                  <li>
                    <button class="lsec-city-btn" data-city-id="durham" data-country="england" data-phrase="<?php echo $lseo_e; ?> Durham" aria-label="<?php echo $lseo_e; ?> Durham">
                      <span class="lsec-city-dot" aria-hidden="true"></span>Durham <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> Durham</span>
                    </button>
                  </li>
                  <li>
                    <button class="lsec-city-btn" data-city-id="lincoln" data-country="england" data-phrase="<?php echo $lseo_e; ?> Lincoln" aria-label="<?php echo $lseo_e; ?> Lincoln">
                      <span class="lsec-city-dot" aria-hidden="true"></span>Lincoln <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> Lincoln</span>
                    </button>
                  </li>
                  <li>
                    <button class="lsec-city-btn" data-city-id="salisbury" data-country="england" data-phrase="<?php echo $lseo_e; ?> Salisbury" aria-label="<?php echo $lseo_e; ?> Salisbury">
                      <span class="lsec-city-dot" aria-hidden="true"></span>Salisbury <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> Salisbury</span>
                    </button>
                  </li>
                  <li>
                    <button class="lsec-city-btn" data-city-id="wells" data-country="england" data-phrase="<?php echo $lseo_e; ?> Wells" aria-label="<?php echo $lseo_e; ?> Wells">
                      <span class="lsec-city-dot" aria-hidden="true"></span>Wells <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> Wells</span>
                    </button>
                  </li>
                  <li>
                    <button class="lsec-city-btn" data-city-id="winchester" data-country="england" data-phrase="<?php echo $lseo_e; ?> Winchester" aria-label="<?php echo $lseo_e; ?> Winchester">
                      <span class="lsec-city-dot" aria-hidden="true"></span>Winchester <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> Winchester</span>
                    </button>
                  </li>
                  <li>
                    <button class="lsec-city-btn" data-city-id="worcester" data-country="england" data-phrase="<?php echo $lseo_e; ?> Worcester" aria-label="<?php echo $lseo_e; ?> Worcester">
                      <span class="lsec-city-dot" aria-hidden="true"></span>Worcester <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> Worcester</span>
                    </button>
                  </li>
                </ul>
              </div>
              <!-- SCOTLAND panel -->
              <div class="lsec-tab-panel" id="lsec-panel-scotland" role="tabpanel" aria-labelledby="lsec-tab-scotland" data-country="scotland">
                <ul class="lsec-city-grid" role="list">
                  <li>
                    <button class="lsec-city-btn" data-city-id="edinburgh" data-country="scotland" data-phrase="<?php echo $lseo_e; ?> Edinburgh" aria-label="<?php echo $lseo_e; ?> Edinburgh">
                      <span class="lsec-city-dot" aria-hidden="true"></span>Edinburgh <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> Edinburgh</span>
                    </button>
                  </li>
                  <li>
                    <button class="lsec-city-btn" data-city-id="glasgow" data-country="scotland" data-phrase="<?php echo $lseo_e; ?> Glasgow" aria-label="<?php echo $lseo_e; ?> Glasgow">
                      <span class="lsec-city-dot" aria-hidden="true"></span>Glasgow <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> Glasgow</span>
                    </button>
                  </li>
                  <li>
                    <button class="lsec-city-btn" data-city-id="aberdeen" data-country="scotland" data-phrase="<?php echo $lseo_e; ?> Aberdeen" aria-label="<?php echo $lseo_e; ?> Aberdeen">
                      <span class="lsec-city-dot" aria-hidden="true"></span>Aberdeen <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> Aberdeen</span>
                    </button>
                  </li>
                  <li>
                    <button class="lsec-city-btn" data-city-id="dundee" data-country="scotland" data-phrase="<?php echo $lseo_e; ?> Dundee" aria-label="<?php echo $lseo_e; ?> Dundee">
                      <span class="lsec-city-dot" aria-hidden="true"></span>Dundee <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> Dundee</span>
                    </button>
                  </li>
                  <li>
                    <button class="lsec-city-btn" data-city-id="inverness" data-country="scotland" data-phrase="<?php echo $lseo_e; ?> Inverness" aria-label="<?php echo $lseo_e; ?> Inverness">
                      <span class="lsec-city-dot" aria-hidden="true"></span>Inverness <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> Inverness</span>
                    </button>
                  </li>
                  <li>
                    <button class="lsec-city-btn" data-city-id="stirling" data-country="scotland" data-phrase="<?php echo $lseo_e; ?> Stirling" aria-label="<?php echo $lseo_e; ?> Stirling">
                      <span class="lsec-city-dot" aria-hidden="true"></span>Stirling <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> Stirling</span>
                    </button>
                  </li>
                  <li>
                    <button class="lsec-city-btn" data-city-id="perth" data-country="scotland" data-phrase="<?php echo $lseo_e; ?> Perth" aria-label="<?php echo $lseo_e; ?> Perth">
                      <span class="lsec-city-dot" aria-hidden="true"></span>Perth <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> Perth</span>
                    </button>
                  </li>
                  <li>
                    <button class="lsec-city-btn" data-city-id="dunfermline" data-country="scotland" data-phrase="<?php echo $lseo_e; ?> Dunfermline" aria-label="<?php echo $lseo_e; ?> Dunfermline">
                      <span class="lsec-city-dot" aria-hidden="true"></span>Dunfermline <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> Dunfermline</span>
                    </button>
                  </li>
                </ul>
              </div>
              <!-- WALES panel -->
              <div class="lsec-tab-panel" id="lsec-panel-wales" role="tabpanel" aria-labelledby="lsec-tab-wales" data-country="wales">
                <ul class="lsec-city-grid" role="list">
                  <li>
                    <button class="lsec-city-btn" data-city-id="cardiff" data-country="wales" data-phrase="<?php echo $lseo_e; ?> Cardiff" aria-label="<?php echo $lseo_e; ?> Cardiff">
                      <span class="lsec-city-dot" aria-hidden="true"></span>Cardiff <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> Cardiff</span>
                    </button>
                  </li>
                  <li>
                    <button class="lsec-city-btn" data-city-id="swansea" data-country="wales" data-phrase="<?php echo $lseo_e; ?> Swansea" aria-label="<?php echo $lseo_e; ?> Swansea">
                      <span class="lsec-city-dot" aria-hidden="true"></span>Swansea <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> Swansea</span>
                    </button>
                  </li>
                  <li>
                    <button class="lsec-city-btn" data-city-id="newport" data-country="wales" data-phrase="<?php echo $lseo_e; ?> Newport" aria-label="<?php echo $lseo_e; ?> Newport">
                      <span class="lsec-city-dot" aria-hidden="true"></span>Newport <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> Newport</span>
                    </button>
                  </li>
                  <li>
                    <button class="lsec-city-btn" data-city-id="bangor" data-country="wales" data-phrase="<?php echo $lseo_e; ?> Bangor" aria-label="<?php echo $lseo_e; ?> Bangor">
                      <span class="lsec-city-dot" aria-hidden="true"></span>Bangor <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> Bangor</span>
                    </button>
                  </li>
                  <li>
                    <button class="lsec-city-btn" data-city-id="st-asaph" data-country="wales" data-phrase="<?php echo $lseo_e; ?> St Asaph" aria-label="<?php echo $lseo_e; ?> St Asaph">
                      <span class="lsec-city-dot" aria-hidden="true"></span>St Asaph <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> St Asaph</span>
                    </button>
                  </li>
                  <li>
                    <button class="lsec-city-btn" data-city-id="st-davids" data-country="wales" data-phrase="<?php echo $lseo_e; ?> St Davids" aria-label="<?php echo $lseo_e; ?> St Davids">
                      <span class="lsec-city-dot" aria-hidden="true"></span>St Davids <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> St Davids</span>
                    </button>
                  </li>
                  <li>
                    <button class="lsec-city-btn" data-city-id="wrexham" data-country="wales" data-phrase="<?php echo $lseo_e; ?> Wrexham" aria-label="<?php echo $lseo_e; ?> Wrexham">
                      <span class="lsec-city-dot" aria-hidden="true"></span>Wrexham <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> Wrexham</span>
                    </button>
                  </li>
                </ul>
              </div>
              <!-- NORTHERN IRELAND panel -->
              <div class="lsec-tab-panel" id="lsec-panel-nireland" role="tabpanel" aria-labelledby="lsec-tab-nireland" data-country="nireland">
                <ul class="lsec-city-grid" role="list">
                  <li>
                    <button class="lsec-city-btn" data-city-id="belfast" data-country="nireland" data-phrase="<?php echo $lseo_e; ?> Belfast" aria-label="<?php echo $lseo_e; ?> Belfast">
                      <span class="lsec-city-dot" aria-hidden="true"></span>Belfast <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> Belfast</span>
                    </button>
                  </li>
                  <li>
                    <button class="lsec-city-btn" data-city-id="derry-londonderry" data-country="nireland" data-phrase="<?php echo $lseo_e; ?> Derry/Londonderry" aria-label="<?php echo $lseo_e; ?> Derry/Londonderry">
                      <span class="lsec-city-dot" aria-hidden="true"></span>Derry <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> Derry/Londonderry</span>
                    </button>
                  </li>
                  <li>
                    <button class="lsec-city-btn" data-city-id="lisburn" data-country="nireland" data-phrase="<?php echo $lseo_e; ?> Lisburn" aria-label="<?php echo $lseo_e; ?> Lisburn">
                      <span class="lsec-city-dot" aria-hidden="true"></span>Lisburn <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> Lisburn</span>
                    </button>
                  </li>
                  <li>
                    <button class="lsec-city-btn" data-city-id="newry" data-country="nireland" data-phrase="<?php echo $lseo_e; ?> Newry" aria-label="<?php echo $lseo_e; ?> Newry">
                      <span class="lsec-city-dot" aria-hidden="true"></span>Newry <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> Newry</span>
                    </button>
                  </li>
                  <li>
                    <button class="lsec-city-btn" data-city-id="armagh" data-country="nireland" data-phrase="<?php echo $lseo_e; ?> Armagh" aria-label="<?php echo $lseo_e; ?> Armagh">
                      <span class="lsec-city-dot" aria-hidden="true"></span>Armagh <span class="lsec-sr-only"> — <?php echo $lseo_e; ?> Armagh</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <!-- /lsec-tab-panels -->
          </div>
        </div>
      </div>
      <div class="col-xl-6 d-none d-xl-block">
        <div class="mep-section">
          <div class="lsec-caption" aria-live="polite" aria-atomic="true">
            <span class="lsec-caption-text" id="lsec-caption-text"> Hover or focus a city to see the full service phrase </span>
          </div>
          <svg class="lsec-map" viewBox="0 65 420 530" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="lsec-map-title lsec-map-desc" preserveAspectRatio="xMidYMid meet">
            <title id="lsec-map-title">Map of the United Kingdom showing <?php echo $lseo_e; ?> locations</title>
            <desc id="lsec-map-desc">Interactive UK map divided into England, Scotland, Wales, and Northern Ireland, with a glowing dot for each city served.</desc>
            <rect width="420" height="600" fill="rgba(10,37,64,0.0)" rx="6" />
            <!-- Scotland -->
            <path class="lsec-region" id="lsec-region-scotland" d="M 254,246 249,240 228,232 211,238 187,234 178,228 198,235 215,223 222,224 230,219 220,214 221,209 203,214 233,202 238,191 246,184 256,158 264,149 262,140 255,135 213,137 198,134 171,142 166,148 155,147 163,146 172,137 160,138 174,135 181,127 161,126 171,125 174,119 207,98 212,80 199,79 198,82 172,83 155,90 155,86 150,84 143,91 145,85 132,81 124,95 127,102 116,103 120,112 114,113 127,125 117,122 119,125 112,126 106,123 106,130 99,127 103,135 99,139 109,145 98,143 97,150 99,156 113,152 102,158 107,161 104,167 110,171 100,172 105,177 98,177 95,183 100,185 96,191 82,193 94,196 92,201 104,205 127,187 106,218 105,223 107,219 109,221 109,230 104,237 107,235 104,240 109,249 99,276 109,274 113,256 118,248 114,235 131,221 120,233 119,244 123,245 124,238 132,243 136,226 138,229 142,223 138,236 141,236 139,231 158,243 137,239 136,253 147,265 130,291 131,299 127,293 124,299 137,315 134,305 138,302 157,313 157,300 174,308 180,301 190,301 190,294 212,295 233,275 247,268 242,257 254,246 Z"><title>Scotland</title></path>
            <!-- England -->
            <path class="lsec-region" id="lsec-region-england" d="M 228,492 239,485 228,496 227,501 215,506 213,518 182,515 165,518 165,527 159,530 152,528 150,542 140,553 135,554 135,557 131,556 130,563 121,572 104,579 104,586 112,581 124,590 129,586 129,577 132,580 140,575 142,569 165,570 164,560 168,569 185,576 194,565 191,563 195,548 199,552 219,545 236,554 238,551 253,554 258,551 254,546 273,546 282,542 277,534 290,542 290,539 293,542 300,539 305,545 329,540 348,545 370,533 378,535 379,528 395,520 394,511 397,507 375,509 369,508 375,505 369,503 367,507 361,506 366,502 328,501 344,499 355,503 359,498 375,495 363,492 376,492 376,486 367,487 378,483 378,480 381,484 388,481 391,474 381,473 390,473 387,470 392,474 402,465 410,443 407,427 391,416 360,413 353,424 339,417 351,406 352,401 344,383 325,370 309,371 326,368 334,374 343,374 329,353 334,346 323,339 314,325 291,316 286,319 290,317 289,312 275,285 271,262 254,246 242,257 247,268 212,291 209,298 203,298 203,300 198,302 188,323 201,341 205,338 205,347 213,340 214,345 220,341 222,346 218,351 220,355 213,358 212,366 221,369 210,379 215,390 224,393 217,394 212,386 206,389 225,416 215,414 208,418 208,424 215,428 209,439 214,439 205,445 216,450 209,466 215,476 219,475 229,481 228,492 Z"><title>England</title></path>
            <!-- Wales -->
            <path class="lsec-region" id="lsec-region-wales" d="M 210,396 201,391 189,395 178,392 179,394 165,399 158,410 143,420 143,424 152,424 156,418 169,417 167,423 172,428 168,435 176,438 171,440 164,455 120,476 127,481 122,487 125,489 134,488 127,489 134,494 158,484 160,490 171,488 160,496 179,493 191,506 200,507 228,493 229,481 219,475 215,476 209,466 216,450 205,445 214,439 209,439 215,428 208,424 208,418 215,414 225,416 215,403 217,401 210,396 Z"><title>Wales</title></path>
            <!-- Northern Ireland -->
            <path class="lsec-region" id="lsec-region-nireland" d="M 92,291 85,281 51,283 47,291 33,293 27,309 12,312 20,317 8,321 2,327 15,340 27,346 38,346 43,340 42,333 48,328 58,341 64,342 65,350 76,346 90,351 96,339 109,336 109,331 104,331 104,319 109,322 111,333 114,324 108,313 94,315 103,306 91,295 92,291 Z"><title>Northern Ireland</title></path>
            <!-- England markers -->
            <g class="lsec-marker" id="m-london" data-city-id="london" data-country="england" role="button" aria-label="<?php echo $lseo_e; ?> London"><title><?php echo $lseo_e; ?> London</title><circle class="lsec-marker-pulse" cx="333" cy="499" /><circle class="lsec-marker-dot" cx="333" cy="499" /></g>
            <g class="lsec-marker" id="m-birmingham" data-city-id="birmingham" data-country="england" role="button" aria-label="<?php echo $lseo_e; ?> Birmingham"><title><?php echo $lseo_e; ?> Birmingham</title><circle class="lsec-marker-pulse" cx="260" cy="442" /><circle class="lsec-marker-dot" cx="260" cy="442" /></g>
            <g class="lsec-marker" id="m-manchester" data-city-id="manchester" data-country="england" role="button" aria-label="<?php echo $lseo_e; ?> Manchester"><title><?php echo $lseo_e; ?> Manchester</title><circle class="lsec-marker-pulse" cx="245" cy="383" /><circle class="lsec-marker-dot" cx="245" cy="383" /></g>
            <g class="lsec-marker" id="m-liverpool" data-city-id="liverpool" data-country="england" role="button" aria-label="<?php echo $lseo_e; ?> Liverpool"><title><?php echo $lseo_e; ?> Liverpool</title><circle class="lsec-marker-pulse" cx="214" cy="388" /><circle class="lsec-marker-dot" cx="214" cy="388" /></g>
            <g class="lsec-marker" id="m-leeds" data-city-id="leeds" data-country="england" role="button" aria-label="<?php echo $lseo_e; ?> Leeds"><title><?php echo $lseo_e; ?> Leeds</title><circle class="lsec-marker-pulse" cx="274" cy="365" /><circle class="lsec-marker-dot" cx="274" cy="365" /></g>
            <g class="lsec-marker" id="m-sheffield" data-city-id="sheffield" data-country="england" role="button" aria-label="<?php echo $lseo_e; ?> Sheffield"><title><?php echo $lseo_e; ?> Sheffield</title><circle class="lsec-marker-pulse" cx="277" cy="389" /><circle class="lsec-marker-dot" cx="277" cy="389" /></g>
            <g class="lsec-marker" id="m-bristol" data-city-id="bristol" data-country="england" role="button" aria-label="<?php echo $lseo_e; ?> Bristol"><title><?php echo $lseo_e; ?> Bristol</title><circle class="lsec-marker-pulse" cx="231" cy="503" /><circle class="lsec-marker-dot" cx="231" cy="503" /></g>
            <g class="lsec-marker" id="m-newcastle" data-city-id="newcastle-upon-tyne" data-country="england" role="button" aria-label="<?php echo $lseo_e; ?> Newcastle upon Tyne"><title><?php echo $lseo_e; ?> Newcastle upon Tyne</title><circle class="lsec-marker-pulse" cx="271" cy="295" /><circle class="lsec-marker-dot" cx="271" cy="295" /></g>
            <g class="lsec-marker" id="m-nottingham" data-city-id="nottingham" data-country="england" role="button" aria-label="<?php echo $lseo_e; ?> Nottingham"><title><?php echo $lseo_e; ?> Nottingham</title><circle class="lsec-marker-pulse" cx="290" cy="415" /><circle class="lsec-marker-dot" cx="290" cy="415" /></g>
            <g class="lsec-marker" id="m-leicester" data-city-id="leicester" data-country="england" role="button" aria-label="<?php echo $lseo_e; ?> Leicester"><title><?php echo $lseo_e; ?> Leicester</title><circle class="lsec-marker-pulse" cx="291" cy="433" /><circle class="lsec-marker-dot" cx="291" cy="433" /></g>
            <g class="lsec-marker" id="m-coventry" data-city-id="coventry" data-country="england" role="button" aria-label="<?php echo $lseo_e; ?> Coventry"><title><?php echo $lseo_e; ?> Coventry</title><circle class="lsec-marker-pulse" cx="275" cy="447" /><circle class="lsec-marker-dot" cx="275" cy="447" /></g>
            <g class="lsec-marker" id="m-bradford" data-city-id="bradford" data-country="england" role="button" aria-label="<?php echo $lseo_e; ?> Bradford"><title><?php echo $lseo_e; ?> Bradford</title><circle class="lsec-marker-pulse" cx="265" cy="365" /><circle class="lsec-marker-dot" cx="265" cy="365" /></g>
            <g class="lsec-marker" id="m-southampton" data-city-id="southampton" data-country="england" role="button" aria-label="<?php echo $lseo_e; ?> Southampton"><title><?php echo $lseo_e; ?> Southampton</title><circle class="lsec-marker-pulse" cx="280" cy="535" /><circle class="lsec-marker-dot" cx="280" cy="535" /></g>
            <g class="lsec-marker" id="m-portsmouth" data-city-id="portsmouth" data-country="england" role="button" aria-label="<?php echo $lseo_e; ?> Portsmouth"><title><?php echo $lseo_e; ?> Portsmouth</title><circle class="lsec-marker-pulse" cx="293" cy="540" /><circle class="lsec-marker-dot" cx="293" cy="540" /></g>
            <g class="lsec-marker" id="m-plymouth" data-city-id="plymouth" data-country="england" role="button" aria-label="<?php echo $lseo_e; ?> Plymouth"><title><?php echo $lseo_e; ?> Plymouth</title><circle class="lsec-marker-pulse" cx="167" cy="566" /><circle class="lsec-marker-dot" cx="167" cy="566" /></g>
            <g class="lsec-marker" id="m-oxford" data-city-id="oxford" data-country="england" role="button" aria-label="<?php echo $lseo_e; ?> Oxford"><title><?php echo $lseo_e; ?> Oxford</title><circle class="lsec-marker-pulse" cx="286" cy="485" /><circle class="lsec-marker-dot" cx="286" cy="485" /></g>
            <g class="lsec-marker" id="m-cambridge" data-city-id="cambridge" data-country="england" role="button" aria-label="<?php echo $lseo_e; ?> Cambridge"><title><?php echo $lseo_e; ?> Cambridge</title><circle class="lsec-marker-pulse" cx="342" cy="458" /><circle class="lsec-marker-dot" cx="342" cy="458" /></g>
            <g class="lsec-marker" id="m-york" data-city-id="york" data-country="england" role="button" aria-label="<?php echo $lseo_e; ?> York"><title><?php echo $lseo_e; ?> York</title><circle class="lsec-marker-pulse" cx="293" cy="355" /><circle class="lsec-marker-dot" cx="293" cy="355" /></g>
            <g class="lsec-marker" id="m-brighton" data-city-id="brighton-and-hove" data-country="england" role="button" aria-label="<?php echo $lseo_e; ?> Brighton and Hove"><title><?php echo $lseo_e; ?> Brighton and Hove</title><circle class="lsec-marker-pulse" cx="332" cy="540" /><circle class="lsec-marker-dot" cx="332" cy="540" /></g>
            <g class="lsec-marker" id="m-norwich" data-city-id="norwich" data-country="england" role="button" aria-label="<?php echo $lseo_e; ?> Norwich"><title><?php echo $lseo_e; ?> Norwich</title><circle class="lsec-marker-pulse" cx="391" cy="434" /><circle class="lsec-marker-dot" cx="391" cy="434" /></g>
            <g class="lsec-marker" id="m-exeter" data-city-id="exeter" data-country="england" role="button" aria-label="<?php echo $lseo_e; ?> Exeter"><title><?php echo $lseo_e; ?> Exeter</title><circle class="lsec-marker-pulse" cx="192" cy="546" /><circle class="lsec-marker-dot" cx="192" cy="546" /></g>
            <g class="lsec-marker" id="m-bath" data-city-id="bath" data-country="england" role="button" aria-label="<?php echo $lseo_e; ?> Bath"><title><?php echo $lseo_e; ?> Bath</title><circle class="lsec-marker-pulse" cx="240" cy="507" /><circle class="lsec-marker-dot" cx="240" cy="507" /></g>
            <g class="lsec-marker" id="m-canterbury" data-city-id="canterbury" data-country="england" role="button" aria-label="<?php echo $lseo_e; ?> Canterbury"><title><?php echo $lseo_e; ?> Canterbury</title><circle class="lsec-marker-pulse" cx="382" cy="513" /><circle class="lsec-marker-dot" cx="382" cy="513" /></g>
            <g class="lsec-marker" id="m-chester" data-city-id="chester" data-country="england" role="button" aria-label="<?php echo $lseo_e; ?> Chester"><title><?php echo $lseo_e; ?> Chester</title><circle class="lsec-marker-pulse" cx="219" cy="400" /><circle class="lsec-marker-dot" cx="219" cy="400" /></g>
            <g class="lsec-marker" id="m-durham" data-city-id="durham" data-country="england" role="button" aria-label="<?php echo $lseo_e; ?> Durham"><title><?php echo $lseo_e; ?> Durham</title><circle class="lsec-marker-pulse" cx="272" cy="307" /><circle class="lsec-marker-dot" cx="272" cy="307" /></g>
            <g class="lsec-marker" id="m-lincoln" data-city-id="lincoln" data-country="england" role="button" aria-label="<?php echo $lseo_e; ?> Lincoln"><title><?php echo $lseo_e; ?> Lincoln</title><circle class="lsec-marker-pulse" cx="315" cy="398" /><circle class="lsec-marker-dot" cx="315" cy="398" /></g>
            <g class="lsec-marker" id="m-salisbury" data-city-id="salisbury" data-country="england" role="button" aria-label="<?php echo $lseo_e; ?> Salisbury"><title><?php echo $lseo_e; ?> Salisbury</title><circle class="lsec-marker-pulse" cx="264" cy="525" /><circle class="lsec-marker-dot" cx="264" cy="525" /></g>
            <g class="lsec-marker" id="m-wells" data-city-id="wells" data-country="england" role="button" aria-label="<?php echo $lseo_e; ?> Wells"><title><?php echo $lseo_e; ?> Wells</title><circle class="lsec-marker-pulse" cx="228" cy="517" /><circle class="lsec-marker-dot" cx="228" cy="517" /></g>
            <g class="lsec-marker" id="m-winchester" data-city-id="winchester" data-country="england" role="button" aria-label="<?php echo $lseo_e; ?> Winchester"><title><?php echo $lseo_e; ?> Winchester</title><circle class="lsec-marker-pulse" cx="284" cy="526" /><circle class="lsec-marker-dot" cx="284" cy="526" /></g>
            <g class="lsec-marker" id="m-worcester" data-city-id="worcester" data-country="england" role="button" aria-label="<?php echo $lseo_e; ?> Worcester"><title><?php echo $lseo_e; ?> Worcester</title><circle class="lsec-marker-pulse" cx="246" cy="459" /><circle class="lsec-marker-dot" cx="246" cy="459" /></g>
            <!-- Scotland markers -->
            <g class="lsec-marker" id="m-edinburgh" data-city-id="edinburgh" data-country="scotland" role="button" aria-label="<?php echo $lseo_e; ?> Edinburgh"><title><?php echo $lseo_e; ?> Edinburgh</title><circle class="lsec-marker-pulse" cx="206" cy="238" /><circle class="lsec-marker-dot" cx="206" cy="238" /></g>
            <g class="lsec-marker" id="m-glasgow" data-city-id="glasgow" data-country="scotland" role="button" aria-label="<?php echo $lseo_e; ?> Glasgow"><title><?php echo $lseo_e; ?> Glasgow</title><circle class="lsec-marker-pulse" cx="163" cy="244" /><circle class="lsec-marker-dot" cx="163" cy="244" /></g>
            <g class="lsec-marker" id="m-aberdeen" data-city-id="aberdeen" data-country="scotland" role="button" aria-label="<?php echo $lseo_e; ?> Aberdeen"><title><?php echo $lseo_e; ?> Aberdeen</title><circle class="lsec-marker-pulse" cx="251" cy="168" /><circle class="lsec-marker-dot" cx="251" cy="168" /></g>
            <g class="lsec-marker" id="m-dundee" data-city-id="dundee" data-country="scotland" role="button" aria-label="<?php echo $lseo_e; ?> Dundee"><title><?php echo $lseo_e; ?> Dundee</title><circle class="lsec-marker-pulse" cx="215" cy="208" /><circle class="lsec-marker-dot" cx="215" cy="208" /></g>
            <g class="lsec-marker" id="m-inverness" data-city-id="inverness" data-country="scotland" role="button" aria-label="<?php echo $lseo_e; ?> Inverness"><title><?php echo $lseo_e; ?> Inverness</title><circle class="lsec-marker-pulse" cx="164" cy="148" /><circle class="lsec-marker-dot" cx="164" cy="148" /></g>
            <g class="lsec-marker" id="m-stirling" data-city-id="stirling" data-country="scotland" role="button" aria-label="<?php echo $lseo_e; ?> Stirling"><title><?php echo $lseo_e; ?> Stirling</title><circle class="lsec-marker-pulse" cx="175" cy="228" /><circle class="lsec-marker-dot" cx="175" cy="228" /></g>
            <g class="lsec-marker" id="m-perth" data-city-id="perth" data-country="scotland" role="button" aria-label="<?php echo $lseo_e; ?> Perth"><title><?php echo $lseo_e; ?> Perth</title><circle class="lsec-marker-pulse" cx="196" cy="212" /><circle class="lsec-marker-dot" cx="196" cy="212" /></g>
            <g class="lsec-marker" id="m-dunfermline" data-city-id="dunfermline" data-country="scotland" role="button" aria-label="<?php echo $lseo_e; ?> Dunfermline"><title><?php echo $lseo_e; ?> Dunfermline</title><circle class="lsec-marker-pulse" cx="195" cy="231" /><circle class="lsec-marker-dot" cx="195" cy="231" /></g>
            <!-- Wales markers -->
            <g class="lsec-marker" id="m-cardiff" data-city-id="cardiff" data-country="wales" role="button" aria-label="<?php echo $lseo_e; ?> Cardiff"><title><?php echo $lseo_e; ?> Cardiff</title><circle class="lsec-marker-pulse" cx="207" cy="501" /><circle class="lsec-marker-dot" cx="207" cy="501" /></g>
            <g class="lsec-marker" id="m-swansea" data-city-id="swansea" data-country="wales" role="button" aria-label="<?php echo $lseo_e; ?> Swansea"><title><?php echo $lseo_e; ?> Swansea</title><circle class="lsec-marker-pulse" cx="175" cy="493" /><circle class="lsec-marker-dot" cx="175" cy="493" /></g>
            <g class="lsec-marker" id="m-newport" data-city-id="newport" data-country="wales" role="button" aria-label="<?php echo $lseo_e; ?> Newport"><title><?php echo $lseo_e; ?> Newport</title><circle class="lsec-marker-pulse" cx="214" cy="495" /><circle class="lsec-marker-dot" cx="214" cy="495" /></g>
            <g class="lsec-marker" id="m-bangor" data-city-id="bangor" data-country="wales" role="button" aria-label="<?php echo $lseo_e; ?> Bangor"><title><?php echo $lseo_e; ?> Bangor</title><circle class="lsec-marker-pulse" cx="167" cy="398" /><circle class="lsec-marker-dot" cx="167" cy="398" /></g>
            <g class="lsec-marker" id="m-st-asaph" data-city-id="st-asaph" data-country="wales" role="button" aria-label="<?php echo $lseo_e; ?> St Asaph"><title><?php echo $lseo_e; ?> St Asaph</title><circle class="lsec-marker-pulse" cx="196" cy="397" /><circle class="lsec-marker-dot" cx="196" cy="397" /></g>
            <g class="lsec-marker" id="m-st-davids" data-city-id="st-davids" data-country="wales" role="button" aria-label="<?php echo $lseo_e; ?> St Davids"><title><?php echo $lseo_e; ?> St Davids</title><circle class="lsec-marker-pulse" cx="121" cy="478" /><circle class="lsec-marker-dot" cx="121" cy="478" /></g>
            <g class="lsec-marker" id="m-wrexham" data-city-id="wrexham" data-country="wales" role="button" aria-label="<?php echo $lseo_e; ?> Wrexham"><title><?php echo $lseo_e; ?> Wrexham</title><circle class="lsec-marker-pulse" cx="214" cy="409" /><circle class="lsec-marker-dot" cx="214" cy="409" /></g>
            <!-- Northern Ireland markers -->
            <g class="lsec-marker" id="m-belfast" data-city-id="belfast" data-country="nireland" role="button" aria-label="<?php echo $lseo_e; ?> Belfast"><title><?php echo $lseo_e; ?> Belfast</title><circle class="lsec-marker-pulse" cx="93" cy="318" /><circle class="lsec-marker-dot" cx="93" cy="318" /></g>
            <g class="lsec-marker" id="m-derry" data-city-id="derry-londonderry" data-country="nireland" role="button" aria-label="<?php echo $lseo_e; ?> Derry/Londonderry"><title><?php echo $lseo_e; ?> Derry/Londonderry</title><circle class="lsec-marker-pulse" cx="37" cy="294" /><circle class="lsec-marker-dot" cx="37" cy="294" /></g>
            <g class="lsec-marker" id="m-lisburn" data-city-id="lisburn" data-country="nireland" role="button" aria-label="<?php echo $lseo_e; ?> Lisburn"><title><?php echo $lseo_e; ?> Lisburn</title><circle class="lsec-marker-pulse" cx="88" cy="322" /><circle class="lsec-marker-dot" cx="88" cy="322" /></g>
            <g class="lsec-marker" id="m-newry" data-city-id="newry" data-country="nireland" role="button" aria-label="<?php echo $lseo_e; ?> Newry"><title><?php echo $lseo_e; ?> Newry</title><circle class="lsec-marker-pulse" cx="76" cy="342" /><circle class="lsec-marker-dot" cx="76" cy="342" /></g>
            <g class="lsec-marker" id="m-armagh" data-city-id="armagh" data-country="nireland" role="button" aria-label="<?php echo $lseo_e; ?> Armagh"><title><?php echo $lseo_e; ?> Armagh</title><circle class="lsec-marker-pulse" cx="64" cy="332" /><circle class="lsec-marker-dot" cx="64" cy="332" /></g>
          </svg>
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

  const tipbox   = root.querySelector('.lsec-tipbox');
  const cityBtns = root.querySelectorAll('.lsec-city-btn');
  const markers  = root.querySelectorAll('.lsec-marker');
  const tabs     = root.querySelectorAll('.lsec-tab');
  const panels   = root.querySelectorAll('.lsec-tab-panel');

  const btnById    = {};
  const markerById = {};

  cityBtns.forEach(b => { if (b.dataset.cityId) btnById[b.dataset.cityId]   = b; });
  markers.forEach(m  => { if (m.dataset.cityId) markerById[m.dataset.cityId] = m; });

  function showTip(phrase, el) {
    if (!tipbox || !phrase) return;
    tipbox.textContent = phrase;
    const r = el.getBoundingClientRect();
    tipbox.style.left = (r.left + r.width / 2) + 'px';
    tipbox.style.top  = (r.top - 8) + 'px';
    tipbox.classList.add('is-visible');
  }

  function hideTip() {
    if (tipbox) tipbox.classList.remove('is-visible');
  }

  function activateCity(cityId) {
    deactivateCity();
    const btn    = btnById[cityId];
    const marker = markerById[cityId];
    if (btn)    btn.classList.add('is-active');
    if (marker) marker.classList.add('is-active');
  }

  function deactivateCity() {
    cityBtns.forEach(b => b.classList.remove('is-active'));
    markers.forEach(m  => m.classList.remove('is-active'));
    hideTip();
  }

  cityBtns.forEach(btn => {
    const id = btn.dataset.cityId;
    if (!id) return;
    btn.addEventListener('mouseenter', () => activateCity(id));
    btn.addEventListener('mouseleave', () => deactivateCity());
    btn.addEventListener('focus',      () => activateCity(id));
    btn.addEventListener('blur',       () => deactivateCity());
    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activateCity(id); }
    });
    btn.addEventListener('touchend', e => { e.preventDefault(); activateCity(id); });
  });

  markers.forEach(marker => {
    const id = marker.dataset.cityId;
    if (!id) return;
    marker.setAttribute('tabindex', '0');
    marker.addEventListener('mouseenter', () => {
      activateCity(id);
      const btn = btnById[id];
      if (btn) showTip(btn.dataset.phrase, marker);
    });
    marker.addEventListener('mouseleave', () => deactivateCity());
    marker.addEventListener('focus', () => {
      activateCity(id);
      const btn = btnById[id];
      if (btn) showTip(btn.dataset.phrase, marker);
    });
    marker.addEventListener('blur', () => deactivateCity());
    marker.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateCity(id);
        const btn = btnById[id];
        if (btn) { showTip(btn.dataset.phrase, marker); btn.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }
      }
    });
    marker.addEventListener('touchend', e => {
      e.preventDefault();
      activateCity(id);
      const btn = btnById[id];
      if (btn) showTip(btn.dataset.phrase, marker);
    });
  });

  function activateTab(tabEl) {
    if (!tabEl) return;
    const country = tabEl.dataset.tab;
    tabs.forEach(t => {
      const isThis = t === tabEl;
      t.setAttribute('aria-selected', isThis ? 'true' : 'false');
      t.classList.toggle('is-active', isThis);
    });
    panels.forEach(p  => p.classList.toggle('is-active', p.dataset.country === country));
    markers.forEach(m => m.classList.toggle('is-dimmed', m.dataset.country !== country));
    deactivateCity();
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

  document.addEventListener('click', e => { if (!root.contains(e.target)) deactivateCity(); });
  window.addEventListener('scroll', hideTip, { passive: true });

  if (tabs.length) activateTab(tabs[0]);
})();
</script>
<?php unset($lseo, $lseo_e); ?>