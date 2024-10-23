<style>
</style>

<template>
  <div>
    <header class="bg-secondary py-1 fixed-top">
      <div class="row">
         <div class="col-3">
      <button
        type="button"
        class="btn p-2 text-white position-absolute"
        @click="$router.back()"
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
          class="feather feather-arrow-left"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      </div>
      <div class="col-6 text-center py-2">
        <p class="mb-0 text-white">{{ $t("realtimemap.label.survey.report") }}</p>
      </div>
      <div class="col-3 text-right">
				<button @click="takePhoto()" type="button" class="btn text-white"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg></button>
			</div>
      </div>
     
    </header>
    <mainLayout />
    <div class="main-content" style="padding-top: 50px;">
      <div class="container py-3" style="height: 93vh;">
        <div class="tab-bar text-center">
          <div class="btn-group">
            <ul class="nav nav-pills" id="pills-tab" role="tablist">
              <li class="nav-item">
                <button
                  class="nav-link btn-nav-report" 
                  :class="{'active':Global.currentTab == 1}"
                  id="incident-tab"
                  @click="openTab(1)"
                  role="tab"
                  aria-controls="incident"
                  aria-selected="true"
                >
                  1
                </button>
              </li>
              <li class="nav-item">
                <button
                  class="nav-link btn-nav-report"
                  :class="{'active':Global.currentTab == 2}"
                  id="accident-tab"
                  @click="openTab(2)"
                  role="tab"
                  aria-controls="accident"
                  aria-selected="false"
                >
                  2
                </button>
              </li>
              <li class="nav-item">
                <button
                  class="nav-link btn-nav-report"
                  :class="{'active':Global.currentTab == 3}"
                  id="vehicle-tab"
                  @click="openTab(3)"
                  role="tab"
                  aria-controls="vehicle"
                  aria-selected="false"
                >
                  3
                </button>
              </li>
              <li class="nav-item">
                <button
                  class="nav-link btn-nav-report"
                  :class="{'active':Global.currentTab == 4}"
                  id="injury-tab"
                  @click="openTab(4)"
                  role="tab"
                  aria-controls="injury"
                  aria-selected="false"
                >
                  4
                </button>
              </li>
              <li class="nav-item">
                <button
                  class="nav-link btn-nav-report"
                  :class="{'active':Global.currentTab == 5}"
                  id="third-party-tab"
                  @click="openTab(5)"
                  role="tab"
                  aria-controls="third-party"
                  aria-selected="false"
                >
                  5
                </button>
              </li>
              <li class="nav-item">
                <button
                  class="nav-link btn-nav-report"
                  :class="{'active':Global.currentTab == 6}"
                  id="preview-tab"
                  @click="openTab(6)"
                  role="tab"
                  aria-controls="preview"
                  aria-selected="false"
                >
                  {{ $t("surveyform.btn.preview") }}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div class="tab-content my-3" id="pills-tabContent" style="height: 69vh; overflow-y: scroll;">
          <form>
            <Tab1 v-if="Global.currentTab == 1" />
            <Tab2 v-if="Global.currentTab == 2" />
            <Tab3 v-if="Global.currentTab == 3" />
            <Tab4 v-if="Global.currentTab == 4" />
            <Tab5 v-if="Global.currentTab == 5" />
            <Tab6 v-if="Global.currentTab == 6" />
          </form>
        </div>
        <div class="tab-control mt-4">
            <div class="row justify-content-center">
              <div class="col-6" v-if="Global.currentTab != 1">
                <button
                  @click="nextPrev(-1)"
                  type="button"
                  id="next-prev-5"
                  class="btn btn-outline-next btn-block"
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
                    class="feather feather-arrow-left"
                  >
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                  </svg>
                  {{ $t("surveyform.btn.prev") }}
                </button>
              </div>
              <div class="col-6" v-if="Global.currentTab != 6">
                <button
                  @click="nextPrev(1)"
                  type="button"
                  id="next-tab-1"
                  class="btn btn-outline-next btn-block"
                >
                  {{ $t("surveyform.btn.next") }}
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
                    class="feather feather-arrow-right"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
              <div class="col-6" v-if="Global.currentTab == 6">
                <button
                  type="button"
                  id="btn-complete"
                  class="btn btn-success btn-block"
                  @click="ClickComplete()"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    stroke="#ffffff"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="css-i6dzq1"
                  >
                    <path
                      d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"
                    ></path>
                    <polyline points="17 21 17 13 7 13 7 21"></polyline>
                    <polyline points="7 3 7 8 15 8"></polyline>
                  </svg>
                  {{ $t("realtimemap.label.complete") }}
                </button>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import Global from "./GlobalVariable";
import mainLayout from "./mainLayout";
import Service from "./Service";
import Tab1 from "./Tab1";
import Tab2 from "./Tab2";
import Tab3 from "./Tab3";
import Tab4 from "./Tab4";
import Tab5 from "./Tab5";
import Tab6 from "./Tab6";

export default {
  mixins:[Service],
  name:'SurveyorForm',
  data() {
    return {
      Global: Global,
    };
  },
  components: {
    Tab1,
    Tab2,
    Tab3,
    Tab4,
    Tab5,
    Tab6,
    mainLayout
  },
  methods: {
    sweetError: function (title, message) {
      this.$swal(title, message, "error").then((value) => {
        return false;
      });
    },
    takePhoto: function () {
      var vm = this;
      navigator.camera.getPicture(vm.onTakePhotoSuccess, vm.onTakePhotoFail, {
        quality: 100,
        destinationType: Camera.DestinationType.FILE_URI,
        saveToPhotoAlbum: true
      });
    },
    onTakePhotoSuccess: function(imageURI){
      var vm = this;
      vm.takePhoto()
    },
    onTakePhotoFail: function(message){
      var vm = this;
      if(message != 'No Image Selected'){
        vm.sweetError(vm.$t("surveyform.warn.error"),message)
      }
    },
    random_id: function(prefix) {
      return prefix + '-' + (
        Number(String(Math.random()).slice(2)) + 
        Date.now() + 
        Math.round(performance.now())
      ).toString(36);
    },
     isThaiId:function (input){
      if(input && input.length == 13){
        return true
      }
      return false
    },
     genJSONforAPI: function (){
      var vm = this

      var surveyData_ = {
        "inspectionData":{},
        "contactData": [],
        "damageData": [],
        "thirdPartyData" : []
      }
      vm.$set(Global,"surveyData",surveyData_);


      var contactData = Global.surveyData.contactData
      var damageData = Global.surveyData.damageData
      var thirdPartyData = Global.surveyData.thirdPartyData

      // var str_case_obj = localStorage.getItem("case_obj")
      // var claimObj = JSON.parse(str_case_obj)
      
      var claimObj = Global.claimObject


      var inspectionData_ = {
        "id": claimObj.case_sfid,
        "claim_number__c" : claimObj.claimnumberc_sfid,
        "car_camera_is_working__c" : Global.InsuredVehicle.CameraWork,
        "car_is_at_wrokshop__c" : Global.InsuredVehicle.CarAtGarage,
        "car_is_drivable__c" : Global.InsuredVehicle.Drivable,
        "garage_dealer__c" : Global.InsuredVehicle.GarageDealer,
        "claim_cause_type__c" : Global.AccDetail.CauseType,
        "claim_incident_type__c" : Global.AccDetail.IncidentType,
        "incident_driver__c" : Global.Driver.sfAccountId,
        "liability__c" : Global.AccDetail.Liability,
        "Inspection_remarks__c" : Global.AccDetail.InvestRemark,
        "Number_of_passenger__c" : Global.InjuryProperty.NumberPassenger,
        "Odometer_reading__c" : Global.InsuredVehicle.Odometer,	
        "Others_Excess__c" : Global.OtherExcess,
        "Remarks__c" : Global.RemarkExcess,
        "Suspected_fraud__c" : Global.Fraud.SuspectedFraud,
        "Fraud_Comment__c" : Global.Fraud.FraudComment,
        "Internal_Comment__c" : Global.Fraud.InternalComment,
        "Notify_Related_People__c" : Global.NotifyRelated,
        "Accident_Scenario__c": Global.Accident_ScenarioC?Global.Accident_ScenarioC.sfid:null
      }
      vm.$set(Global.surveyData,"inspectionData",inspectionData_)

    
      const insuredId = vm.random_id('CNT')
      contactData.push({
        "referenceNumber": insuredId,
        "sfAccountId": Global.Driver.sfAccountId, 
        "thaiIdNumber": vm.isThaiId(Global.Driver.ID)?Global.Driver.ID:null,
        "passPortNumber": vm.isThaiId(Global.Driver.ID)?null:Global.Driver.ID,
        "firstName": Global.Driver.firstname,
        "lastName": Global.Driver.lastname,
        "phoneNumber":  Global.Driver.Phone,
        "driverLicenseNumber" : Global.Driver.DrivingLicense,
        "driverLicenseType" : Global.Driver.DrivingLicenseType,
        "email": Global.Driver.Email,
        "prefLang" : Global.Driver.prefLang?Global.Driver.prefLang:null
      })

      const tpId_insure = vm.random_id('TP')
      thirdPartyData.push({
        "contactDataReferenceNumber": insuredId,
        "referenceNumber": tpId_insure,
        "data" : {
          "name" : claimObj.sfid,
          "claim__c" : claimObj.claimnumberc_sfid,
          "is_tp_driver_injured__c" : Global.InjuryProperty.DriverInjured,
          "is_tp_vehicle_damage__c" : Global.InsuredVehicle.Drivable,
          "vehicle_inspection__c" : claimObj.sfid,
          "relationship__c" : Global.InjuryProperty.InjuredRelation,
          "tp_injury_description__c" : Global.InjuryProperty.InjuredDetail,
          "is_tp_insured__c" : "Yes",
          "tp_car_make__c" : null,
          "tp_car_model__c" : null,
          "tp_vehicle__c" : null,
          "tp_car_plate_province__c" : null,
          "tp_chassis_no__c" : null,
          "tp_claim_number__c" : null,
          "tp_driver_name__c" : null,
          "tp_insurance_company__c" : null,
          "tp_policy_expiry_date__c" : null,
          "tp_policy_no__c" : null,
          "tp_policy_type__c" : null,
          "tp_property_damage__c" : null,
          "tp_property_descriptioin__c" : null,
          "tp_property_insurance_company__c" : null,
          "liability__c" : null,
          "Number_of_passenger__c" : Global.InjuryProperty.NumberPassenger
        }
      })

      Global.InsuredVehicle.VehicleDamage.forEach((dam) => {
        damageData.push({
          "damageId":dam.id,
          "thirdPartyReferenceNumber": null
        })
      })

      Global.TPList.forEach((person) => {
        const contact_TpId = vm.random_id('CNT')
        contactData.push({
        "referenceNumber": contact_TpId,
        "sfAccountId":  person.Driver.sfAccountId, 
        "thaiIdNumber": vm.isThaiId(person.Driver.ID)?person.Driver.ID:null,
        "passPortNumber": vm.isThaiId(person.Driver.ID)?null:person.Driver.ID,
        "firstName": person.Driver.firstname,
        "lastName": person.Driver.lastname,
        "phoneNumber":  person.Driver.Phone,
        "email": person.Driver.Email,
        "prefLang" : person.Driver.prefLang?person.Driver.prefLang:null
        })

        const tpId = vm.random_id("TP")
        thirdPartyData.push({
          "contactDataReferenceNumber": contact_TpId,
          "referenceNumber": tpId,
          "data" : {
            "name" : null,
            "claim__c" : null,
            "is_tp_driver_injured__c" : person.InjuryProperty.anyInjury,
            "is_tp_vehicle_damage__c" : person.VehicleDamage.isCarDamage,
            "vehicle_inspection__c" : null,
            "relationship__c" : person.InjuryProperty.InjuredRelation,
            "tp_injury_description__c" : person.InjuryProperty.InjuredDetail,
            "is_tp_insured__c" : null,
            "tp_car_make__c" : person.Vehicle.make,
            "tp_car_model__c" : person.Vehicle.model,
            "tp_vehicle__c" : person.Vehicle.carplate,
            "tp_car_plate_province__c" : person.Vehicle.carprovince,
            "tp_chassis_no__c" : person.Vehicle.chassisno,
            "tp_claim_number__c" : null,
            "tp_driver_name__c" : null,
            "tp_insurance_company__c" : person.Vehicle.insurecompany,
            "tp_policy_expiry_date__c" : null,
            "tp_policy_no__c" : null,
            "tp_policy_type__c" : person.Vehicle.plantype,
            "tp_property_damage__c" :  person.InjuryProperty.isPropDam,
            "tp_property_descriptioin__c" : person.InjuryProperty.TPDamDetail,
            "tp_property_insurance_company__c" : person.InjuryProperty.TPinsure,
            "liability__c" : person.VehicleDamage.liability,
            "Number_of_passenger__c" : person.InjuryProperty.NumberPassenger
          }
        })

        person.VehicleDamage.Damages.forEach(dam => {
          damageData.push({
            "damageId":dam.id,
            "thirdPartyReferenceNumber": tpId 
          })
        })
      })

      let obj = JSON.stringify(Global.surveyData)
      let ret_Obj = JSON.parse(obj)

      return ret_Obj
    },
    submitSurveyAPI: function(params){
      var vm = this;
        $('#processing').modal('show');
        var formData = new FormData();
        formData.append("surveyData", params);
        this.axios
          .post(Global.claimBackend + "submitSurveyForm", formData)
          .then(function (response) {
            $('#processing').modal('hide');
            if (
              response &&
              response.data.result 
            ) {
              vm.$swal(vm.$t("surveyform.success"), vm.$t("surveyform.submit.saved"), "success").then(value => {
                vm.updateClaimStatus("Completed")
              });
            } else {
              vm.$swal('Error','cannot submit surveyor form',"error");

            }

          })
          .catch(error => {
            console.log("submitSurveyForm Exception:", error);
            $('#processing').modal('hide');
            vm.sweetError(vm.$t("surveyform.warn.error" ),vm.$t("surveyform.submit.fail")+error)
          });
    },
    ClickComplete:function (){
      var vm = this;
      let obj = vm.genJSONforAPI();
      const param_to_send = JSON.stringify(obj)
      vm.submitSurveyAPI(param_to_send)
    },
    validateData:function(){
      var vm = this;
      var msg = '';
      if(!Global.Driver.ID){
        msg += vm.$t("validate.contact.id") + '<br>'
      }
      if(!Global.Driver.firstname || !Global.Driver.lastname){
        msg += vm.$t("validate.contact.name") + '<br>';
      }
      if(!Global.Driver.Phone){
        msg += vm.$t("validate.contact.phone") + '<br>'
      }

      if(!msg){
        return true;
      }else{
         vm.$swal({
                  title: vm.$t("validate.word.error"),
                  type: 'warning',
                  html: msg
                }).then(value=> {if(value){
                  return false;
                }})
        
      }
    },
    nextPrev: function (step) {
      var vm = this;
      if(vm.validateData()){
        if (step > 0) {
          Global.currentTab += 1;
        } else {
         Global.currentTab -= 1;
        }
      }else{
        Global.currentTab = 1;
        return false
      }
  },
  openTab:function (n){
    var vm = this;
    if(vm.validateData()){
      Global.currentTab = n;
    }else{
      Global.currentTab = 1;
      return false
    }
  },
	  getClaimDetailBysfid: function (claimsfid) {
    var vm = this;
        $('#processing').modal('show');
        var formData = new FormData();
        formData.append("claimid", claimsfid);
        this.axios
          .post(Global.claimBackend + "getClaimDetailBysfid", formData)
          .then(function (response) {
            
            if (
              response &&
              response.data.code &&
              response.data.code == "OK"
            ) {
              
              let claimObject = Global.claimObject
              
              var claimDetailData = response.data.data[0];

              // localStorage.setItem("claimDetailData",vm.claimDetailData)
              // vm.$set(Global.Driver, 'sfAccountId', claimDetailData.accountid);
              vm.$set(Global.Driver, 'sfAccountId', claimDetailData.accountid);
              vm.$set(Global.Driver, 'firstname', claimDetailData.main_driver_first_name);
              vm.$set(Global.Driver, 'lastname', claimDetailData.main_driver_last_name);
              vm.$set(Global.Driver, 'ID', claimDetailData.thai_identification_number__c?claimDetailData.thai_identification_number__c:claimDetailData.contact_individual_passport_number__c);
              vm.$set(Global.Driver, 'prefLang', claimDetailData.preflang);
              if(!claimDetailData.personmobilephone){
                vm.$set(Global, 'isPhoneDisable',false);
              }else{
                vm.$set(Global, 'isPhoneDisable',true);
                 vm.$set(Global.Driver, 'Phone', claimDetailData.personmobilephone);
              }
              
              if(!claimDetailData.personemail){
                vm.$set(Global, 'isEmailDisable',false);
              }else{
                vm.$set(Global, 'isEmailDisable',true);
                vm.$set(Global.Driver, 'Email', claimDetailData.personemail);
              }

              vm.$set(Global.InsuredVehicle, 'CameraInstall', claimDetailData.car_camera_installed__c);
              vm.$set(Global.InsuredVehicle, 'Odometer', claimDetailData.odometer_reading__c);

              vm.$set(Global.AccDetail, 'CauseType', claimDetailData.claim_cause_type__c);
              vm.$set(Global.AccDetail, 'IncidentType', claimDetailData.claim_incident_type__c);
              vm.$set(Global.AccDetail, 'Liability', claimDetailData.liability__c);

              vm.$set(Global.InjuryProperty, 'InjuredName', claimDetailData.incident_driver);
              vm.$set(Global.InjuryProperty, 'DriverInjured', claimDetailData.injury__c);

              vm.$set(Global, 'Deductible', claimObject.policyDeductibleC);


            //   vm.InsuredVehicle.CameraInstall = vm.claimDetailData.car_camera_installed__c == "Yes"?true:false
            //   vm.AccDetail.CauseType = vm.claimDetailData.claim_cause_type__c
            //   vm.AccDetail.IncidentType = vm.claimDetailData.claim_incident_type__c
            //   vm.AccDetail.Liability = vm.claimDetailData.liability__c
            //   vm.Deductible = claimObject.policyDeductibleC
            //   vm.InsuredVehicle.Odometer = claimObject.odometerReadingC
            //   vm.InjuryProperty.InjuredName = vm.claimDetailData.incident_driver
            //   vm.InjuryProperty.DriverInjured = vm.claimDetailData.injury__c == "Yes"?true:false

            //   console.log("!!Driver", JSON.stringify(vm.Driver));
            //   console.log("!!InsuredVehicle", JSON.stringify(vm.InsuredVehicle));
            //   console.log("!!AccDetail", JSON.stringify(vm.AccDetail));
            //   console.log("!!InjuryProperty", JSON.stringify(vm.InjuryProperty));
              $('#processing').modal('hide');
              vm.$forceUpdate() 
            } else {
              $('#processing').modal('hide');
              vm.$set(Global, 'isDisable',false);
              vm.$set(Global, 'isEmailDisable',false);
              vm.$set(Global, 'isPhoneDisable',false);
            //   vm.claimDetailData = {}
            }

          })
          .catch(error => {
            $('#processing').modal('hide');
            console.log("getClaimDetailBysfid Exception:", error);
          });
    },
    updateClaimStatus: function(status) {
      var vm = this;
      var user_obj = localStorage.getItem("user_obj")
        ? JSON.parse(localStorage.getItem("user_obj"))
        : "";
        $('#processing').modal('show');
        // var case_obj = JSON.parse(localStorage.getItem("case_obj"));
        var case_obj = Global.claimObject;
        var formData = new FormData();
        formData.append("claimId", case_obj.id);
        formData.append("status", status);
        formData.append("surveyorRemark", "");
        formData.append(
          "survEndLat",
          Global.survEndLat ? Global.survEndLat : 0
        );
        formData.append(
          "survEndLng",
          Global.survEndLng ? Global.survEndLng : 0
        );

        formData.append("survEndAddress", Global.survEndAddress);
        formData.append("fcmToken", localStorage.getItem("fcm_token"));
        formData.append("surveyorId", user_obj.id);

        vm.axios
          .post(Global.claimBackend + "updateClaimStatus", formData)
          .then(function(response) {
            $('#processing').modal('hide');
            if (
              response.status == 200 &&
              response.data &&
              response.data.code == "OK"
            ) {
              if (status == "Completed") {
                localStorage.setItem("case_obj", "");
                localStorage.setItem("claimDetailData", "");
                vm.$router.push("/mainmenu");
              } 
            } else {
              vm.$swal(
                vm.$t("mainmenu.label.warning.save"),
                vm.$t("mainmenu.label.warning.save.error"),
                "error"
              );
            }
          })
          .catch(error => {
            $('#processing').modal('hide');
            console.log("!!ERROR updateClaimStatus", error);
          });
    },
    getAccidentScenario(){
      var vm = this;
      if(Global.AccidentScenario.length == 0){
        try {
            vm.axios.post(Global.claimBackend + "getAccidentScenario").then((r) => {
            if(r.status == 200 && r.data && r.data.code == "OK"){
              vm.$set(Global,"flagScenarioLoading",false)
              vm.$set(Global,"AccidentScenario",JSON.parse(JSON.stringify(r.data.data)))
            }else{
            /* Show nothing whem call fail */
            }
          })
        } catch(e) {
          console.log('EXCEPTION! getAccidentScenario:: ',e)
        }
        
      }else{
        console.log('Has AccidentScenario already')
        vm.$set(Global,"flagScenarioLoading",false)
      }
    },
    ClearReportGlobal: function(){
      var vm = this;
      vm.$set(Global,"surveyData",{inspectionData: {},contactData: [],damageData: [],thirdPartyData: [],})
      vm.$set(Global,"InsuredVehicle",{Drivable: 'No',VehicleDamage: [],Odometer: 0,CameraInstall: 'No',CameraWork: 'No',CarAtGarage: 'No',GarageDealer: '',})
      vm.$set(Global,"InjuryProperty",{DriverInjured: 'No',InjuredName: '',InjuredRelation: 'Insured Driver',InjuredDetail: ''})
      vm.$set(Global,"Fraud",{SuspectedFraud: false,InternalComment: "",FraudComment: "",})
      vm.$set(Global,"addDamage",'')
      vm.$set(Global,"addInjure",{Name: "",Relations: "",Detail: "",})
      vm.$set(Global,"NotifyRelated",false)
      vm.$set(Global,"Deductible",'')
      vm.$set(Global,"OtherExcess",'')
      vm.$set(Global,"RemarkExcess",'')
      vm.$set(Global,"AccidentScenario",[])
      vm.$set(Global,"flagScenarioLoading",true)
      vm.$set(Global,"Accident_ScenarioC",null)

    }
  },
  mounted() {
	  var vm = this;
    if(Global.claimObject){
      let claimObject = Global.claimObject
      // console.log('I am from claimObject >>> ',claimObject)
      vm.survEndLat = claimObject.surveyorArrivedLat
      vm.survEndLng = claimObject.surveyorArrivedLng
      vm.survEndAddress = claimObject.surveyorArrivedAddress
      if(claimObject.claimnumberc_sfid){
        vm.getClaimDetailBysfid(claimObject.claimnumberc_sfid)
      }else{
        console.log('ไม่มีเลขเคลม')
        vm.$swal(vm.$t("surveyform.warn.error"),vm.$t("surveyform.warn.getdata"),"error")
        vm.$router.push("/workactive");
      }
    }else{
      // console.log('No, it hasn\'t case_obj')
      console.log('ไม่มีเคสออบเจค')
      vm.$swal(vm.$t("surveyform.warn.error"),vm.$t("surveyform.warn.getdata"),"error")
      vm.$router.push("/workactive");
    }
    
    $('#claim-scenario-modal').on('show.bs.modal',function (e){
      vm.getAccidentScenario()
    });

    if(Global.flagScenarioLoading == true){
      vm.getAccidentScenario();
    }
  },
  created(){
    var vm=this;
    vm.getAccidentScenario()
    vm.ClearReportGlobal();
  },
  computed:{
    IncTypeSelectionfiltering: function() {
      var currentCusType = Global.AccDetail.CauseType;
      if (currentCusType) {
        return Global.IncidentTypeSelection[currentCusType];
      }else{
        return null
      }
    },
    
    DisplayTPLiability: function(){
      let selectedVal = Global.TP.VehicleDamage.liability;
      if (selectedVal) {
        let filterList = Global.LiabilitySelection.filter(item => item.val === selectedVal);
        return filterList[0]["desc"]
      }else{
        return null
      }
    },
    // TPInjuredName: function(){
    //   var vm = this
    //   if(vm.TP.InjuryProperty.anyInjury){
    //     Global.TP.InjuryProperty.InjuredName =  Global.TP.Driver.firstname +' '+ Global.TP.Driver.lastname
    //     return Global.TP.Driver.firstname +' '+ Global.TP.Driver.lastname 
    //   }else{
    //     return ''
    //   }
    // },
    DisplayPlanType: function(){
      if(Global.TP.Vehicle.plantype){
        let filtered = Global.PlanTypeSelection.filter(item => item.val === Global.TP.Vehicle.plantype)
        return this.$t(filtered[0].desc)
      }else{
        return null
      }
    },
    
  },
  watch: {
    
    'Global.Driver.firstname': {
      handler:function(newVal,oldVal){
        var vm = this
        Global.InjuryProperty.InjuredName = Global.Driver.firstname +' '+ Global.Driver.lastname;
    },
      deep: true
    },
    'Global.Driver.lastname': {
      handler:function(newVal,oldVal){
        var vm = this
        Global.InjuryProperty.InjuredName = Global.Driver.firstname +' '+ Global.Driver.lastname;
    },
      deep: true
    },
    'Global.Fraud':{
      handler: function(newVal, oldVal){
        var vm = this
        if(Global.Fraud.SuspectedFraud != true){
          Global.Fraud.FraudComment = null
          Global.Fraud.InternalComment = null
        }
      },
      deep: true
    },
    'Global.InjuryProperty':{
      handler: function(newVal,oldVal){
        var vm = this
        if(Global.InjuryProperty.DriverInjured != 'Yes'){
          Global.InjuryProperty.InjuredDetail = null
        }
      },
      deep: true
    }, 
    'Global.TP':{
      handler: function(newVal,oldVal){
        var vm = this
        if(Global.TP.InjuryProperty.anyInjury != 'Yes'){
          Global.TP.InjuryProperty.InjuredDetail = null
        }

        if(Global.TP.InjuryProperty.isPropDam != 'Yes'){
          Global.TP.InjuryProperty.TPinsure = null
          Global.TP.InjuryProperty.TPDamDetail = null
        }
      },
      deep: true
    }, 
     
  }
};
</script>

