<template>
  <div>
      <mainLayout></mainLayout>
      <header>
		<div class="container">
			<div class="row py-3">
				<div class="col">
					<h2 class="mb-0">{{$t("mainmenu.label.history.work")}}</h2>
				</div>
				
				<div class="col text-right align-self-center">
					
					<p class="gps-active m-0" v-if="Global.gpsStatus == 1"><svg height="18" width="18" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m8.828125 282.484375h45.902344c12.0625 91.066406 83.71875 162.722656 174.785156 174.785156v45.902344c.015625 4.871094 3.960937 8.8125 8.828125 8.828125h35.3125c4.867188-.015625 8.8125-3.957031 8.828125-8.828125v-45.902344c91.066406-12.0625 162.722656-83.71875 174.785156-174.785156h45.902344c4.871094-.015625 8.8125-3.960937 8.828125-8.828125v-35.3125c-.015625-4.867188-3.957031-8.8125-8.828125-8.828125h-45.902344c-12.0625-91.066406-83.71875-162.722656-174.785156-174.785156v-45.902344c-.015625-4.871094-3.960937-8.8125-8.828125-8.828125h-35.3125c-4.867188.015625-8.8125 3.957031-8.828125 8.828125v45.902344c-91.066406 12.0625-162.722656 83.71875-174.785156 174.785156h-45.902344c-4.871094.015625-8.8125 3.960937-8.828125 8.828125v35.3125c.015625 4.867188 3.957031 8.8125 8.828125 8.828125zm247.171875-176.554687c82.878906 0 150.070312 67.191406 150.070312 150.070312s-67.191406 150.070312-150.070312 150.070312-150.070312-67.191406-150.070312-150.070312c.117187-82.832031 67.238281-149.953125 150.070312-150.070312zm0 0"/><path d="m326.621094 256c0 39.003906-31.617188 70.621094-70.621094 70.621094s-70.621094-31.617188-70.621094-70.621094 31.617188-70.621094 70.621094-70.621094 70.621094 31.617188 70.621094 70.621094zm0 0"/></svg> GPS</p>
					
					<p class="gps-inactive m-0" v-if="Global.gpsStatus == 0"><svg height="18" width="18" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m8.828125 282.484375h45.902344c12.0625 91.066406 83.71875 162.722656 174.785156 174.785156v45.902344c.015625 4.871094 3.960937 8.8125 8.828125 8.828125h35.3125c4.867188-.015625 8.8125-3.957031 8.828125-8.828125v-45.902344c91.066406-12.0625 162.722656-83.71875 174.785156-174.785156h45.902344c4.871094-.015625 8.8125-3.960937 8.828125-8.828125v-35.3125c-.015625-4.867188-3.957031-8.8125-8.828125-8.828125h-45.902344c-12.0625-91.066406-83.71875-162.722656-174.785156-174.785156v-45.902344c-.015625-4.871094-3.960937-8.8125-8.828125-8.828125h-35.3125c-4.867188.015625-8.8125 3.957031-8.828125 8.828125v45.902344c-91.066406 12.0625-162.722656 83.71875-174.785156 174.785156h-45.902344c-4.871094.015625-8.8125 3.960937-8.828125 8.828125v35.3125c.015625 4.867188 3.957031 8.8125 8.828125 8.828125zm247.171875-176.554687c82.878906 0 150.070312 67.191406 150.070312 150.070312s-67.191406 150.070312-150.070312 150.070312-150.070312-67.191406-150.070312-150.070312c.117187-82.832031 67.238281-149.953125 150.070312-150.070312zm0 0"/><path d="m326.621094 256c0 39.003906-31.617188 70.621094-70.621094 70.621094s-70.621094-31.617188-70.621094-70.621094 31.617188-70.621094 70.621094-70.621094 70.621094 31.617188 70.621094 70.621094zm0 0"/></svg> GPS</p>
					
					
				</div>
				
			</div>
		</div>
    </header>

	<div class="main-content mb-5 pb-3">
		<div class="container">
			
			<div class="select-date">
				<form>
					<div class="form-group">
						<label for="select-history-range">{{$t("history.label.select.date")}}</label>
						<div class="input-group">
							<input type="text" name="daterange" class="form-control text-center" id="select-history-range" aria-describedby="History range" readonly />
							<div class="input-group-prepend">
								<button @click.prevent="getClaimByCondition();" class="btn btn-primary btn-search" type="submit"><svg viewBox="0 0 24 24" width="24" height="24" stroke="#ffffff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></button>
							  </div>
						  </div>
					</div>
				</form>
			</div>

      <blockquote class="blockquote">
          <p
            class="text-center lead"
            style="color: #ccc"
            v-if="claimAr.length == 0"
          >
            {{$t("history.label.no.found")}}
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
            <p>
              <span class="strong">{{ $t("history.label.end.time") }} : </span
              >{{ claim.survEndDate | moment("D/M/Y HH:mm:ss") }}
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
              <p><span class="strong">{{$t("modal.policy.dt.label.main.driver")}} : </span>{{(claim.policyDetail.mainDriverame?claim.policyDetail.mainDriverName:$t("label.no.registered.data"))}}</p>
              <p><span class="strong">{{$t("modal.policy.dt.list.item.label.car.asset")}} : </span>{{(claim.policyDetail.assetName?claim.policyDetail.assetName:$t("label.no.registered.data"))}}</p>
              <p><span class="strong">{{$t("modal.policy.dt.list.item.label.car.plate")}} : </span>{{(claim.policyDetail.carPlateNumberC?claim.policyDetail.chassisNumberC:$t("label.no.registered.data"))}}</p>
              <p><span class="strong">{{$t("surveyform.label.thirdparty.chassisno")}} : </span>{{(claim.policyDetail.carplateNumberC?claim.policyDetail.carplateNumberC:$t("label.no.registered.data"))}}</p>
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
               <div v-if="claim.policyDetail.driverPlan">
                  <p><span class="strong">{{$t("modal.policy.dt.driver")}}</span> {{claim.policyDetail.driverPlan}}</p>
               </div>

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
              
              </div>
              
            </div>

            <div class="card-button mt-3">
              <button
                class="btn btn-policy px-2"
                :class="claim.claimnumberc_sfid?'':'mr-3'"
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
                v-if="claim.claimnumberc_sfid!=null"
                class="btn btn-policy px-2"
                @click="openSurveyForm(claim)"
                type="button"
                style="font-size: 9px!important;">
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
                  class="feather feather-clipboard"
                >
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                </svg>Report
              </button>

              <button
                type="button"
                class="btn btn-primary btn-lg btn-accept strong"
                :class="claim.claimnumberc_sfid?'':'w-75'"
                data-toggle="modal"
                data-target="#modal-accept-case-1"
                @click="openuploadFile(claim)"
                style="font-size: 18px; width: 65%!important;"
              >
                {{ $t("file.upload.label") }}
              </button>
            </div>
          </div>
        </div>

		</div>  <!-- end container -->
	</div>  <!-- end main -->
	  
  </div>
</template>

<script>
import Global from "./GlobalVariable";
import Service from "./Service";
import mainLayout from "./mainLayout";
var before7date = new Date();
before7date.setDate(before7date.getDate() - 7);

export default {
	mixins:[Service],
	name:'history',
data(){
	return{
		Global:Global,
		startDate:before7date,
		endDate:new Date(),
		claimAr:[]
	}
},
methods:{
  openSurveyForm: function(claim) {
      var vm = this
      vm.$set(Global,"case_obj",claim);
      vm.$set(Global,"claimObject",claim);
      vm.$router.push('/surveyorform')
    },
	 DisplayCaseType: function(caseType) {
         var vm = this;
         switch (caseType) {
            case '1':
               return vm.$t('mainmenu.label.report.an.accident');
               break;
            case '2':
               return vm.$t('mainmenu.label.car.breakdown');
               break;
            case '4':
               return vm.$t('mainmenu.label.follow.up');
               break;
            case '3':
               return vm.$t('mainmenu.label.video.survey');
               break;
            default:
               return vm.$t('mainmenu.label.no.type');
         }
      },
	getLabelCardCaseType: function (caseType) {
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
    getCardCaseType: function (caseType) {
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
	collapsePolicy:function(claim,index){
       var vm = this;

       if(claim.policyDetail){
          $('#collapse-policy-case-'+index).collapse('toggle');
       }else{
          $('#processing').modal('show');
         var formData = new FormData();
         formData.append('sfid', claim.policyNumberC);
         formData.append("vid", claim.id);
         vm.axios
            .post(Global.claimBackend + 'getPolicyBySfid', formData)
            .then(function(response) {
               $('#processing').modal('hide');
               if (response && response.data.code && response.data.code == 'OK') {
                  vm.$set(vm.claimAr[index],"policyDetail",response.data.data);
                  // claim.policyDetail = JSON.parse(response.data.data);
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


                  setTimeout(function(){$('#collapse-policy-case-'+index).collapse('show')}, 150);
                  // vm.policyObj =[{modelFamilyC:"Vios", yearOfManufactureC:"2016", contractname:"1000-00914642", makeC:"Toyota", chassisNumberC:null, carPlateNumberC:"4e3ert", endDateC:"2020-04-08", carPlateProvinceC:null, status:"Activated"}]
               }
            })
            .catch(error => {
               $('#processing').modal('hide');
            });
       }
    },
	 getClaimByCondition: function() {
         $('#processing').modal('show');
         var vm = this;
         var formData = new FormData();
         var userObj = JSON.parse(localStorage.getItem('user_obj'));
         formData.append('status', "'Completed'");
         formData.append('surveyorId', userObj.surveyorAccountC);
         var startDate = new Date(vm.startDate);
         var sMonth = ('0' + (startDate.getMonth() + 1).toString()).slice(-2);
         var sDay = ('0' + startDate.getDate().toString()).slice(-2);
         var sYear = startDate.getFullYear();
         var startDateStr = sYear + '-' + sMonth + '-' + sDay + ' 00:00:01';
         formData.append('surveyStartDate', startDateStr);
         var endDate = new Date(vm.endDate);
         var eMonth = ('0' + (endDate.getMonth() + 1).toString()).slice(-2);
         var eDay = ('0' + endDate.getDate().toString()).slice(-2);
         var eYear = endDate.getFullYear();
         var endDateStr = eYear + '-' + eMonth + '-' + eDay + ' 23:59:59';
         formData.append('surveyEndDate', endDateStr);
         vm.axios
            .post(Global.claimBackend + 'getClaimByConditions', formData)
            .then(function(response) {
               $('#processing').modal('hide');
               if (response.status - 0 == 200) {
                  if (response.data && response.data.code && response.data.code == 'OK') {
                     vm.claimAr = JSON.parse(response.data.data);
                  } else {
                     vm.claimAr = [];
                  }
               } else {
                  vm.claimAr = [];
               }
            })
            .catch(error => {
               $('#processing').modal('hide');
               vm.checkErrorExpire(error, function(flagExpire) {});
            });
	  },
	   openuploadFile: function(claimObject){
      console.log("claimObject",claimObject);
         var vm = this
         Global.claimObject = claimObject
		vm.$router.push("/fileupload");

      },
},
components:{
    mainLayout
},
mounted(){
	var vm = this;

	vm.checkTokenForHttp(function() {
		 vm.getClaimByCondition();
      });


	/*Initial daterangepicker for history calendar */
	$(function() {
		$('input[name="daterange"]').daterangepicker({
		opens: 'left'
		}, function(start, end, label) {
			vm.startDate = new Date(start);
			vm.endDate = new Date(end);
		});
	});




}
}
</script>

<style>

</style>