<template>
  <div>
    <mainLayout></mainLayout>
    <header>
      <div class="container">
        <div class="row py-3">
          <div class="col">
            <h1 class="mb-1">{{ $t("main.menu.today") }}</h1>
            <p class="mb-0 strong" style="color: #82909e">
              {{ getCurrentDate() }}
            </p>
          </div>

          <div class="col text-right">
            <p class="gps-active" v-if="Global.gpsStatus == 1">
              <svg
                height="18"
                width="18"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m8.828125 282.484375h45.902344c12.0625 91.066406 83.71875 162.722656 174.785156 174.785156v45.902344c.015625 4.871094 3.960937 8.8125 8.828125 8.828125h35.3125c4.867188-.015625 8.8125-3.957031 8.828125-8.828125v-45.902344c91.066406-12.0625 162.722656-83.71875 174.785156-174.785156h45.902344c4.871094-.015625 8.8125-3.960937 8.828125-8.828125v-35.3125c-.015625-4.867188-3.957031-8.8125-8.828125-8.828125h-45.902344c-12.0625-91.066406-83.71875-162.722656-174.785156-174.785156v-45.902344c-.015625-4.871094-3.960937-8.8125-8.828125-8.828125h-35.3125c-4.867188.015625-8.8125 3.957031-8.828125 8.828125v45.902344c-91.066406 12.0625-162.722656 83.71875-174.785156 174.785156h-45.902344c-4.871094.015625-8.8125 3.960937-8.828125 8.828125v35.3125c.015625 4.867188 3.957031 8.8125 8.828125 8.828125zm247.171875-176.554687c82.878906 0 150.070312 67.191406 150.070312 150.070312s-67.191406 150.070312-150.070312 150.070312-150.070312-67.191406-150.070312-150.070312c.117187-82.832031 67.238281-149.953125 150.070312-150.070312zm0 0"
                />
                <path
                  d="m326.621094 256c0 39.003906-31.617188 70.621094-70.621094 70.621094s-70.621094-31.617188-70.621094-70.621094 31.617188-70.621094 70.621094-70.621094 70.621094 31.617188 70.621094 70.621094zm0 0"
                />
              </svg>
              GPS
            </p>

            <p class="gps-inactive" v-if="Global.gpsStatus == 0">
              <svg
                height="18"
                width="18"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m8.828125 282.484375h45.902344c12.0625 91.066406 83.71875 162.722656 174.785156 174.785156v45.902344c.015625 4.871094 3.960937 8.8125 8.828125 8.828125h35.3125c4.867188-.015625 8.8125-3.957031 8.828125-8.828125v-45.902344c91.066406-12.0625 162.722656-83.71875 174.785156-174.785156h45.902344c4.871094-.015625 8.8125-3.960937 8.828125-8.828125v-35.3125c-.015625-4.867188-3.957031-8.8125-8.828125-8.828125h-45.902344c-12.0625-91.066406-83.71875-162.722656-174.785156-174.785156v-45.902344c-.015625-4.871094-3.960937-8.8125-8.828125-8.828125h-35.3125c-4.867188.015625-8.8125 3.957031-8.828125 8.828125v45.902344c-91.066406 12.0625-162.722656 83.71875-174.785156 174.785156h-45.902344c-4.871094.015625-8.8125 3.960937-8.828125 8.828125v35.3125c.015625 4.867188 3.957031 8.8125 8.828125 8.828125zm247.171875-176.554687c82.878906 0 150.070312 67.191406 150.070312 150.070312s-67.191406 150.070312-150.070312 150.070312-150.070312-67.191406-150.070312-150.070312c.117187-82.832031 67.238281-149.953125 150.070312-150.070312zm0 0"
                />
                <path
                  d="m326.621094 256c0 39.003906-31.617188 70.621094-70.621094 70.621094s-70.621094-31.617188-70.621094-70.621094 31.617188-70.621094 70.621094-70.621094 70.621094 31.617188 70.621094 70.621094zm0 0"
                />
              </svg>
              GPS
            </p>

            <button
              type="button"
              id="btn-refresh"
              class="btn btn-sm bg-white btn-refresh"
              @click="getClaimByCondition(true);"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-refresh-cw"
                style="position: relative; top: -2px"
              >
                <polyline points="23 4 23 10 17 10"></polyline>
                <polyline points="1 20 1 14 7 14"></polyline>
                <path
                  d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"
                ></path>
              </svg>
              {{ $t("mainmenu.label.refresh") }}
            </button>
          </div>
        </div>
      </div>
    </header>
    <div id="dashboard" class="main-content mb-5 pb-1">
      <div class="container">
        <blockquote class="blockquote">
          <p
            class="text-center lead"
            style="color: #ccc"
            v-if="claimAr.length == 0"
          >
            {{$t("mainmenu.label.nocase")}}
          </p>
        </blockquote>

        <div
          class="card card-item mb-3"
          :class="getCardCaseType(claim.caseType)"
          v-for="(claim,index) in claimAr"
          :key="claim.id"
        >
          <div class="card-header py-2 bg-secondary">
            <div class="row">
              <div class="col align-self-center pl-2">
                <p
                  class="text-white mb-0 py-1 text-center"
                  :class="getLabelCardCaseType(claim.caseType)"
                >
                  {{ DisplayCaseType(claim.caseType) }}
                </p>
              </div>
              <div class="col text-right">
                <p class="small text-white mb-0">
                  {{$t("history.label.created.time")}}<br />
                  {{ claim.createdDate | moment("D/M/Y HH:mm:ss") }}
                </p>
              </div>
            </div>
          </div>
          <div class="card-body py-3">
            <p class="strong">{{ $t("history.label.caseid") }} : {{ claim.id }}</p>
            <p>
              <span class="strong">{{ $t("modal.policy.dt.list.item.label.policy.number") }}  : </span
              >{{ claim.contractname ? claim.contractname : "-" }}
            </p>
            <p>
              <span class="strong">{{ $t("modal.policy.dt.list.item.label.claim.number") }}  : </span
              >{{ claim.claimNumberC ? claim.claimNumberC : "-" }}
            </p>
            <p>
              <span class="strong">{{ $t("modal.policy.dt.label.policy.holder.phone") }} : </span> {{ claim.custPhoneNumber }}
            </p>
            <p>
              <span class="strong">{{ $t("realtimemap.label.customer.location") }} : </span> {{ claim.reqLocaName }}
            </p>
            <p>
              <span class="strong">{{ $t("history.label.appointment.time") }} : </span
              >{{ claim.appointmentTimeC | moment("D/M/Y HH:mm:ss") }}
            </p>

            <div class="collapse" :id="'collapse-policy-case-'+index">
              <div v-if="claim.policyDetail">
                <hr />
              <p class="strong">{{$t("modal.policy.dt.voluntary")}} {{claim.policyDetail.planTypeC?claim.policyDetail.planTypeC.split('/')[0]:'-'}}</p>
              <p><span class="strong">{{$t("modal.policy.dt.list.item.label.policy.number")}} :</span> {{claim.policyDetail.contractname}} <span :style="{'color':(claim.policyDetail.status=='Activated'?'#29CD00':'red')}">{{claim.policyDetail.status}}</span></p>
              <p>
                <span class="strong">{{ $t("modal.policy.dt.period") }} :</span> {{ claim.policyDetail.startDateC | moment("DD/MM/Y") }} - {{ claim.policyDetail.endDateC | moment("DD/MM/Y") }}
              </p>
              <p>
                <span class="strong">{{ $t("modal.policy.dt.list.item.label.excess")}} : </span> <small>฿</small> {{claim.policyDetail.planTypeC?claim.policyDetail.planTypeC.split('/')[1]:'-'}}
              </p>
              <p><span class="strong">{{$t("modal.policy.dt.driver")}} : </span>{{claim.policyDetail.planTypeC?claim.policyDetail.planTypeC.split('/')[3]:'-'}}</p>
              <p><span class="strong">{{$t("modal.policy.dt.fix")}} : </span>{{claim.policyDetail.planTypeC?claim.policyDetail.planTypeC.split('/')[2]:'-'}}</p>
              <p><span class="strong">{{$t("modal.policy.dt.label.policy.holder.name")}} : </span>{{claim.policyDetail.policyHolderName}}</p>
              <p><span class="strong">{{$t("modal.policy.dt.label.policy.holder.phone")}} : </span>{{claim.policyDetail.personmobilephone}}</p>
              <p><span class="strong">{{$t("modal.policy.dt.label.car.camera.installed")}} : </span>{{(claim.policyDetail.carCameraInstalledC?claim.policyDetail.carCameraInstalledC:$t("label.no.registered.data"))}}</p>
              <p><span class="strong">{{$t("modal.policy.dt.label.odometer.reading")}} : </span>{{(claim.policyDetail.odometerReadingC?claim.policyDetail.odometerReadingC:$t("label.no.registered.data"))}}</p>
              <p><span class="strong">{{$t("modal.policy.dt.label.main.driver")}} : </span>{{(claim.policyDetail.mainDriverName?claim.policyDetail.mainDriverName:$t("label.no.registered.data"))}}</p>
              <p><span class="strong">{{$t("modal.policy.dt.list.item.label.car.asset")}} : </span>{{(claim.policyDetail.assetName?claim.policyDetail.assetName:$t("label.no.registered.data"))}}</p>
              <p><span class="strong">{{$t("modal.policy.dt.list.item.label.car.plate")}} : </span>{{(claim.policyDetail.carPlateNumberC?claim.policyDetail.carPlateNumberC:$t("label.no.registered.data"))}}</p>
              <p><span class="strong">{{$t("surveyform.label.thirdparty.chassisno")}} : </span>{{(claim.policyDetail.chassisNumberC?claim.policyDetail.chassisNumberC:$t("label.no.registered.data"))}}</p>
              <p><span class="strong">{{$t("label.loss.date")}} : </span><span v-if="claim.policyDetail.claim_loss_date">{{claim.policyDetail.claim_loss_date | moment("DD/MM/Y")}}</span><span v-else>-</span></p>
              <p><span class="strong">{{$t("surveyform.label.cause.type")}} : </span>{{claim.policyDetail.claim_cause_type__c}}</p>
              <p><span class="strong">{{$t("label.incident.location")}} : </span>{{claim.policyDetail.incidentLocation}}</p>
              <p><span class="strong">{{$t("label.incident.drivers")}} : </span>{{claim.policyDetail.incident_driver}}</p>
              
              <div v-if="claim.accessoryDetails">
                    <hr />
                    <p><span class="strong">{{$t("mainmenu.label.accessory")}}</span></p>
                      <div v-for="accdt in claim.accessoryDetails" :key="accdt.sfid">
                        <p>{{accdt.values}}</p>
                      </div>
              </div>

               <hr />
               <!-- <div v-if="claim.policyDetail.driverPlan">
                  <p><span class="strong">{{$t("modal.policy.dt.driver")}}</span> {{claim.policyDetail.driverPlan}}</p>
               </div> -->

               <div v-if="claim.policyDetail.mainDriverName">
                  <p><span class="strong">{{$t("modal.policy.dt.label.main.driver")}}</span> {{claim.policyDetail.mainDriverName}}</p>
               </div>

              <div v-if="claim.policyDetail.driverPlan=='Named Driver'">
                <hr />
                <p class="strong">{{$t("modal.policy.dt.label.other.driver")}}</p>
                <div v-if="claim.drivers">
                    <div v-for="driver in claim.drivers" :key="driver.sfid">
                        <p>{{driver.driverName}}</p>
                    </div>
                </div>
              </div>

<!-- ******************************************* -->
              </div>

              
              


            </div>

            <div class="card-button mt-3">
              <button
                class="btn btn-policy px-2 mr-3"
                @click="collapsePolicy(claim,index)"
                type="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-shield"
                >
                  <path
                    d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                  ></path></svg
                >Policy
              </button>

              <button
                type="button"
                class="btn btn-primary btn-lg btn-accept w-75 strong"
                data-toggle="modal"
                data-target="#modal-accept-case-1"
                @click="showClaimCase(claim)"
              >
                {{ $t( "mainmenu.label.accept") }}
              </button>
            </div>
          </div>
        </div>

        <!--Accept Modal -->
        <div
          class="modal fade"
          id="modal-accept-case-1"
          tabindex="-1"
          role="dialog"
          aria-labelledby="modal-accept-case-1Label"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-body p-0">
                <div class="accept-map">
                  <iframe
                    :src="
                      'https://www.google.com/maps/embed/v1/place?key=' +Global.gmapKey+
                      '&q=' +
                      Global.claimObjSelect.reqLat +
                      ',' +
                      Global.claimObjSelect.reqLng
                    "
                    width="100%"
                    height="230"
                    frameborder="0"
                    style="border: 0"
                    allowfullscreen=""
                    aria-hidden="false"
                    tabindex="0"
                  ></iframe>
                </div>
                <div class="accept-info p-3" id="confirm-case">
                  <h5>{{ $t("modal.accept.case") }}: {{ Global.claimObjSelect.id }}</h5>
                  <p class="mb-1">
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      stroke="#003b71"
                      stroke-width="3"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="css-i6dzq1"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                    </svg>
                    <span class="accept-start-point">{{ Global.currentAdress }}</span>
                    <span v-if="!Global.currentAdress" class="accept-start-point" style="color: red !important;">{{ $t("modal.label.no.address") }} 
                      <a @click.prevent="getCurrentAddressManual()" class="text-primary" style="color: orange !important; text-decoration: underline;">{{ $t("modal.label.refresh.address") }}</a>
                    </span>
                  </p>
                  <p class="m-0" style="line-height: 0">
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      stroke="#3e6993"
                      stroke-width="3"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="css-i6dzq1"
                    >
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="12" cy="5" r="1"></circle>
                      <circle cx="12" cy="19" r="1"></circle>
                    </svg>
                  </p>
                  <p>
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      stroke="#ff5011"
                      stroke-width="3"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="css-i6dzq1"
                    >
                      <path
                        d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                      ></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span class="accept-end-point">{{
                      Global.claimObjSelect.reqLocaName
                    }}</span>
                  </p>
                  <p class="mb-0">
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      stroke="#003b71"
                      stroke-width="3"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="css-i6dzq1"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span class="accept-time"
                      >{{ Global.approxTime }} {{$t("login.label.minute")}} ( {{ Global.approxDistance }} {{$t("mainmenu.label.km")}} )</span
                    >
                  </p>
                </div>
              </div>

              <div class="modal-footer border-0">
                <button
                  type="button"
                  class="btn btn-outline-secondary btn-cancel"
                  data-dismiss="modal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-x"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                  {{$t("mainmenu.label.cancel")}}
                </button>

                <button
                  class="btn btn-get-direction"
                  @click="openMapinGoogle();"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    viewBox="0 0 512.001 512.001"
                  >
                    <path
                      d="M480.001 192v266.667a51.622 51.622 0 01-8.96 29.44 49.355 49.355 0 01-6.613 8.32L252.801 284.8l-7.467-7.467 145.707-145.707 9.173 5.76 74.667 45.44a10.817 10.817 0 015.12 9.174z"
                      fill="#cfd8dc"
                    />
                    <path
                      d="M391.041 131.627L237.868 284.8 26.241 496.427a49.304 49.304 0 01-6.613-8.32 51.622 51.622 0 01-8.96-29.44V117.333C10.668 87.878 34.546 64 64.001 64h213.333a12.66 12.66 0 015.547 1.493l98.987 60.373 9.173 5.761z"
                      fill="#4caf50"
                    />
                    <path
                      d="M464.428 496.427a49.036 49.036 0 01-8.32 6.613 51.607 51.607 0 01-29.44 8.96H64.001a51.607 51.607 0 01-29.44-8.96 49.086 49.086 0 01-8.32-6.613L237.868 284.8l7.467-7.467 7.467 7.467 211.626 211.627z"
                      fill="#2196f3"
                    />
                    <path
                      d="M471.041 488.107a46.81 46.81 0 01-14.933 14.933L237.868 284.8c-4.082-4.165-4.014-10.851.151-14.933 4.106-4.024 10.676-4.024 14.782 0l218.24 218.24z"
                      fill="#fafafa"
                    />
                    <path
                      d="M400.215 137.387L252.801 284.8 34.561 503.04a46.81 46.81 0 01-14.933-14.933l362.24-362.24 18.347 11.52z"
                      fill="#ffc107"
                    />
                    <g fill="#fafafa">
                      <path
                        d="M106.668 192c-23.564 0-42.667-19.103-42.667-42.667s19.103-42.667 42.667-42.667 42.667 19.103 42.667 42.667S130.232 192 106.668 192zm0-64c-11.782 0-21.333 9.551-21.333 21.333s9.551 21.333 21.333 21.333 21.333-9.551 21.333-21.333S118.45 128 106.668 128z"
                      />
                      <path
                        d="M149.335 128h-42.667c-5.891 0-10.667-4.776-10.667-10.667s4.776-10.667 10.667-10.667h42.667c5.891 0 10.667 4.776 10.667 10.667S155.226 128 149.335 128zM106.668 277.333c-26.342 3.08-50.193-15.778-53.273-42.12-.021-.182-.042-.364-.061-.546 0-19.947 18.944-33.408 56.363-40.149a30.035 30.035 0 01-3.029-13.184c0-5.891 4.776-10.667 10.667-10.667s10.667 4.776 10.667 10.667c0 4.843 4.416 9.429 11.669 16.448a51.2 51.2 0 0120.331 36.885c-.001 37.504-25.601 42.666-53.334 42.666zm18.773-63.616c-37.376 4.715-50.773 14.144-50.773 20.949 0 4.267 5.696 21.333 32 21.333 30.571 0 32-7.317 32-21.333 0-7.466-4.971-12.949-13.227-20.949z"
                      />
                    </g>
                    <path
                      d="M384.001 0C319.234.082 266.75 52.566 266.668 117.333c.035 6.445.671 12.873 1.899 19.2a114.426 114.426 0 0018.069 46.208c4.949 8.533 10.667 17.408 16.704 26.88a436.136 436.136 0 0170.208 165.845c1.172 5.773 6.803 9.503 12.576 8.331a10.667 10.667 0 008.331-8.331 436.136 436.136 0 0170.187-165.867c6.08-9.451 11.755-18.261 16.277-26.176a115.65 115.65 0 0018.475-46.699 105.12 105.12 0 001.941-19.392C501.252 52.566 448.769.082 384.001 0z"
                      fill="#f44336"
                    />
                    <circle
                      cx="384.001"
                      cy="117.333"
                      r="53.333"
                      fill="#c62828"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  class="btn btn-primary btn-lg btn-start w-75 strong"
                  @click="updateClaimStatus('Accepted')"
                >
                  {{$t("mainmenu.label.start") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end container -->
    </div>
    <!-- end main -->
  </div>
</template>

<script>
import Global from "./GlobalVariable";
import Service from "./Service";
import mainLayout from "./mainLayout";

export default {
  mixins: [Service],
  name: "mainmenu",
  data() {
    return {
      Global: Global,
      picProfile: "",
      name: "-",
      phone: "-",
      carLicense: "-",
      claimAr: [],
      surveyorRemark: "",
      currentAdress: "",
      statusWork: "",
      flagTimerRealt: true,
      flagTimerSendLocation: true,
      lastUpdate: "",
      gpsStatus: "",
      versionApp: Global.versionApp,
      frequency: 0,
      frequencyNoCase: 0,
      policyObj: {},
      policyDriveList: [],
      showLoadingMorePolicyDetails: false,
      flagShowMorePolicyDetails: false
    };
  },
  components: {
    mainLayout
  },
  methods: {
    collapsePolicy: function(claim, index) {
      var vm = this;
      try{
      if (claim.policyDetail) {
        $("#collapse-policy-case-" + index).collapse("toggle");
      } else {
        $("#processing").modal("show");
        var formData = new FormData();
        formData.append("sfid", claim.policyNumberC);
        formData.append("vid", claim.id);
        vm.axios
          .post(Global.claimBackend + "getPolicyBySfid", formData)
          .then(function(response) {
            $("#processing").modal("hide");
            console.log("response",response);
            console.log("!response.data",response.data);
            console.log(typeof response.data);
            console.log("!response.code",response.data.code);
            console.log("!response.data.accessoryDetails",response.data.accessoryDetails);
            console.log("!response.data.drivers",response.data.drivers);
            if (response && response.data.code && response.data.code == "OK") {
              vm.$set(
                vm.claimAr[index],
                "policyDetail",
                response.data.data
              );
              if(response.data.accessoryDetails){
                vm.$set(
                  vm.claimAr[index],
                  "accessoryDetails",
                  response.data.accessoryDetails
                );
              }
              
              if(response.data.drivers){
                vm.$set(
                  vm.claimAr[index],
                  "drivers",
                  response.data.drivers
                );
              }
              

              // claim.policyDetail = JSON.parse(response.data.data);
              setTimeout(function() {
                $("#collapse-policy-case-" + index).collapse("show");
              }, 150);
              // vm.policyObj =[{modelFamilyC:"Vios", yearOfManufactureC:"2016", contractname:"1000-00914642", makeC:"Toyota", chassisNumberC:null, carPlateNumberC:"4e3ert", endDateC:"2020-04-08", carPlateProvinceC:null, status:"Activated"}]
            }
          })
          .catch(error => {
            console.log("Exception error",error);
            $("#processing").modal("hide");
          });
      }
      }catch(e){
        console.log("Exception",e);
      }
    },
    openMapinGoogle: function() {
      var vm = this;
      var URL =
        "http://maps.google.co.th/maps?q=" +
        Global.claimObjSelect.reqLat +
        "," +
        Global.claimObjSelect.reqLng;
      window.open(URL, "_system", "location=yes");
    },
    getLabelCardCaseType: function(caseType) {
      switch (caseType) {
        case "1":
          return "card-report-accident-label";
          break;
        case "2":
          return "card-car-breakdown-label";
          break;
        case "3":
          return "card-video-survey-label";
          break;
        case "4":
          return "card-follow-up-label";
          break;
      }
    },
    getCardCaseType: function(caseType) {
      switch (caseType) {
        case "1":
          return "card-report-accident";
          break;
        case "2":
          return "card-car-breakdown";
          break;
        case "3":
          return "card-video-survey";
          break;
        case "4":
          return "card-follow-up";
          break;
      }
    },
    DisplayCaseType: function(caseType) {
      var vm = this;
      switch (caseType) {
        case "1":
          return vm.$t("history.label.report.an.accident");
          break;
        case "2":
          return vm.$t("history.label.car.breakdown");
          break;
        case "3":
          return vm.$t("mainmenu.label.video.survey");
          break;
        case "4":
          return vm.$t("mainmenu.label.follow.up");
          break;
        default:
          return vm.$t("mainmenu.label.no.type");
      }
    },
    validateFormConf: function(status) {
      var vm = this;
      var msgValidate = "";
      if (status == "Rejected") {
        if (!Global.surveyorRemark) {
          msgValidate += "Cause";
        }
      }

      if (!Global.currentAdress) {
        msgValidate += vm.$t("modal.error.location.data");
      }

      if (!Global.approxTime || !Global.approxDistance) {
        msgValidate += vm.$t("modal.error.approx.time");
      }

      if (msgValidate == "") {
        return true;
      } else {
        $("#processing").modal("hide");
        vm.$swal(vm.$t("modal.error.enter.data"), msgValidate, "error");
        return false;
      }
    },
    updateClaimStatus: function(status) {
      var vm = this;
      $("#processing").modal("show");
      var user_obj = localStorage.getItem("user_obj")
        ? JSON.parse(localStorage.getItem("user_obj"))
        : "";
      if (vm.validateFormConf(status)) {
        var formData = new FormData();
        formData.append("claimId", Global.claimObjSelect.id);
        formData.append("status", status);
        formData.append(
          "surveyorRemark",
          status == "Rejected" ? vm.surveyorRemark : ""
        );
        //if accept case
        if (status == "Accepted") {
          formData.append("survStartLat", Global.surveyorObj.sLastLat);
          formData.append("survStartLng", Global.surveyorObj.sLastLng);
          formData.append("survStartAddress", Global.currentAdress);
          formData.append("approxDistance", Global.approxDistance);
          formData.append("approxTime", Global.approxTime);
          formData.append("fcmToken", localStorage.getItem("fcm_token"));
          // formData.append("fcmToken", "FAKEFCMTOKEN");
          formData.append("surveyorId", user_obj.id);
        }
        vm.axios
          .post(Global.claimBackend + "updateClaimStatus", formData)
          .then(function(response) {
            $("#processing").modal("hide");
            if (
              response.status == 200 &&
              response.data &&
              response.data.code == "OK"
            ) {
              if (status == "Accepted") {
                $("#modal-accept-case-1").modal("hide");
                vm.flagTimerRealt = false;
                vm.getClaimByCondition();
                vm.$router.push("/workactive");
              }
            } else {
              vm.$set(Global, "claimObject", {});
              vm.$swal(response.data.code, response.data.message, "error");
            }
          })
          .catch(error => {
            $("#processing").modal("hide");
            vm.checkErrorExpire(error, function(flagLogin) {});
          });
      }
    },
    showClaimCase: function(claim) {
      var vm = this;
      vm.$set(Global, "claimObjSelect", claim);
      vm.$set(Global, "claimObject", claim);
      vm.getCurrentAddressManual();
      vm.currentAdress = "";
    },
    getClaimNoRealtime: function() {
      $("#processing").modal("show");
      var vm = this;
      var formData = new FormData();
      var userObj = JSON.parse(localStorage.getItem("user_obj"));
      formData.append("status", "'Assigned'");
      formData.append("surveyorId", userObj.surveyorAccountC);
      this.axios
        .post(Global.claimBackend + "getClaimByConditions", formData)
        .then(function(response) {
          $("#processing").modal("hide");
          //Check Flag Realtime
          if (vm.flagTimerRealt) {
            if (response.status - 0 == 200) {
              if (
                response.data &&
                response.data.code &&
                response.data.code == "OK"
              ) {
                var responseData = JSON.parse(response.data.data);
                // To prevent flashing data while get new case from response
                const oldClaims = new Set(vm.claimAr.map(({ id }) => id));
                const combined = [
                  ...vm.claimAr,
                  ...responseData.filter(({ id }) => !oldClaims.has(id))
                ];
                vm.claimAr = combined;
              } else {
                vm.claimAr = [];
              }
            } else {
              vm.claimAr = [];
            }
          }
        })
        .catch(error => {
          $("#processing").modal("hide");
        });
    },
    getClaimByCondition: function(flagNotShow) {
      if (!flagNotShow) {
        $("processing").modal("show");
      }
      var vm = this;
      var formData = new FormData();
      var userObj = JSON.parse(localStorage.getItem("user_obj"));
      formData.append("status", "'Assigned'");
      formData.append("surveyorId", userObj.surveyorAccountC);
      this.axios
        .post(Global.claimBackend + "getClaimByConditions", formData)
        .then(function(response) {
          $("processing").modal("hiide");
          //Check Flag Realtime
          if (vm.flagTimerRealt) {
            if (response.status - 0 == 200) {
              if (
                response.data &&
                response.data.code &&
                response.data.code == "OK"
              ) {
                var responseData = JSON.parse(response.data.data);

                // To prevent flashing data while get new case from response
                const oldClaims = new Set(vm.claimAr.map(({ id }) => id));
                const combined = [
                  ...vm.claimAr,
                  ...responseData.filter(({ id }) => !oldClaims.has(id))
                ];
                vm.claimAr = combined;
              } else {
                vm.claimAr = [];
              }
            } else {
              vm.claimAr = [];
            }
            vm.startGetCaseRealtime();
          }
        })
        .catch(error => {
          $("processing").modal("hiide");
        });
    },
    startGetCaseRealtime: function() {
      console.log("startGetCaseRealtime");
      var vm = this;
      var frequency = localStorage.getItem("frequency-no-case") - 0;
      Global.t = setTimeout(() => {
        if (vm.flagTimerRealt) {
          vm.getClaimByCondition(true);
        }
      }, frequency * 1000);
    }
  },
  mounted() {
    var vm = this;
    vm.checkTokenForHttp(function() {
      vm.frequency = localStorage.getItem("frequency");
      vm.frequencyNoCase = localStorage.getItem("frequency-no-case");
      vm.getClaimByCondition(false);
      vm.getLocationToUpdate();
      // });
      if (
        localStorage.getItem("version-code") &&
        localStorage.getItem("version-code") != Global.versionApp
      ) {
        $("#lbl_version").css({
          color: "#808080",
          "text-decoration": "line-through"
        });
      } else {
        $("#lbl_version").css({ color: "", "text-decoration": "" });
      }
    });
    //   $('#div_body_map').height(document.documentElement.clientHeight * (88 / 100));
    //   vm.setProfile();
    if (localStorage.getItem("case_obj")) {
      Global.flagBusyWork = true;
    } else {
      Global.flagBusyWork = false;
    }
    //   vm.setUnlockScreen();
  },
  beforeDestroy() {
    console.log("beforeDestroy!!! MainMenu");
    var vm = this;
    clearTimeout(Global.t);
  }
};
</script>

<style>
</style>
