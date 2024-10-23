<template>
  <div>
    <div
      class="tab-pane fade active show"
      id="vehicle"
      role="tabpanel"
      aria-labelledby="vehicle-tab"
    >
      <h5 class="text-center">{{ $t("surveyform.label.insured.vehicle") }}</h5>

      <div class="form-group">
        <div class="row">
          <div class="col-7">
            <p class="mb-0">{{ $t("surveyform.label.is.car.drivable") }}</p>
          </div>
          <div class="col-5 text-right">
            <input
              class="radio-inline-input-y"
              type="radio"
              name="drivable"
              id="vehicle-drivable-y"
              v-model="Global.InsuredVehicle.Drivable"
              value="Yes"
            />
            <label
              class="radio-inline-label-y py-1 mb-0"
              for="vehicle-drivable-y"
              >{{ $t("surveyform.choice.yes") }}</label
            >

            <input
              class="radio-inline-input-n"
              type="radio"
              name="drivable"
              id="vehicle-drivable-n"
              v-model="Global.InsuredVehicle.Drivable"
              value="No"
            />
            <label
              class="radio-inline-label-n py-1 mb-0"
              for="vehicle-drivable-n"
              >{{ $t("surveyform.choice.no") }}</label
            >
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row">
          <div class="col-7">
            <p class="mb-0">{{ $t("surveyform.label.car.camera.install") }}</p>
          </div>
          <div class="col-5 text-right">
            <input
              class="radio-inline-input-y"
              type="radio"
              name="camera-install"
              id="vehicle-camera-install-y"
              v-model="Global.InsuredVehicle.CameraInstall"
              value="Yes"
              disabled
            />
            <label
              class="radio-inline-label-y py-1 mb-0"
              for="vehicle-camera-install-y"
              >{{$t("surveyform.choice.yes")}}</label
            >
            <input
              class="radio-inline-input-n"
              type="radio"
              name="camera-install"
              id="vehicle-camera-install-n"
              v-model="Global.InsuredVehicle.CameraInstall"
              value="No"
              disabled
            />
            <label
              class="radio-inline-label-n py-1 mb-0"
              for="vehicle-camera-install-n"
              >{{ $t("surveyform.choice.no") }}</label
            >
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row my-2">
          <div class="col-7">
            <p class="mb-0">{{ $t("surveyform.label.car.camera.working") }}</p>
          </div>

          <div class="col-5 text-right">
            <input
              class="radio-inline-input-y"
              type="radio"
              name="camera-work"
              id="vehicle-camera-work-y"
              v-model ="Global.InsuredVehicle.CameraWork"
              value="Yes"
            />
            <label
              class="radio-inline-label-y py-1 mb-0"
              for="vehicle-camera-work-y"
              >{{$t("surveyform.choice.yes")}}</label
            >
            <input
              class="radio-inline-input-n"
              type="radio"
              name="camera-work"
              id="vehicle-camera-work-n"
              v-model ="Global.InsuredVehicle.CameraWork"
              value="No"
            />
            <label
              class="radio-inline-label-n py-1 mb-0"
              for="vehicle-camera-work-n"
              >{{ $t("surveyform.choice.no") }}</label
            >
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row my-2">
          <div class="col-7">
            <p class="mb-0">{{$t("surveyform.label.car.at.garage")}}</p>
          </div>

          <div class="col-5 text-right">
            <input
              class="radio-inline-input-y"
              type="radio"
              name="garage"
              id="vehicle-garage-y"
              v-model="Global.InsuredVehicle.CarAtGarage"
              value="Yes"
            />
            <label class="radio-inline-label-y py-1 mb-0" for="vehicle-garage-y"
              >{{$t("surveyform.choice.yes")}}</label
            >
            <input
              class="radio-inline-input-n"
              type="radio"
              name="garage"
              id="vehicle-garage-n"
              v-model="Global.InsuredVehicle.CarAtGarage"
              value="No"
            />
            <label class="radio-inline-label-n py-1 mb-0" for="vehicle-garage-n"
              >{{ $t("surveyform.choice.no") }}</label
            >
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="vehicel-odometor">{{ $t("surveyform.label.odometer.reading") }}</label>
        <input id="vehicel-odometor" class="form-control" type="number" v-model="Global.InsuredVehicle.Odometer" />
      </div>

      <div class="form-group">
        <label for="vehicel-garage-dealer">{{ $t("surveyform.label.garage.dealer") }}</label>
        <input  v-model="Global.InsuredVehicle.GarageDealer" id="vehicel-garage-dealer" class="form-control" type="text" />
      </div>

      <h5 class="text-center mt-5">{{ $t("surveyform.label.vehicle.damage") }}</h5>
      <div v-if="Global.InsuredVehicle.VehicleDamage.length == 0" class="text-center">{{ $t("surveyform.no.damage.added")}}</div>

      <ol id="vehicle-damage-list" class="pl-3">
        <li v-for="dam in Global.InsuredVehicle.VehicleDamage" :key="dam.Damage" style="position: relative;">
          {{ dam.Damage }} <span class="badge badge-primary">{{dam.Level}}</span>
          <button
            type="button"
            class="btn btn-link text-danger py-0"
            style="position: absolute; right: 5px"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#dc3545"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-x"
              @click="delDamge(dam.id)"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </li>
      </ol>

      <div class="text-center mt-4">
        <button
          type="button"
          class="btn btn-secondary w-50"
          @click="openModalAddDamge"
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
            class="feather feather-plus"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          {{$t("surveyform.label.header.add.damage")}}
        </button>
      </div>


      <h5 class="text-center mt-5">{{$t("claim.scenarios")}}</h5>
      <p v-if="!Global.Accident_ScenarioC" class="text-center">{{$t("no.scenario.selected")}}</p>
      <div id="claim-scenario" class="text-center" v-if="Global.Accident_ScenarioC">
        <!-- <img class="img-fluid scenario-img mb-2" :src="'assets/img/secario/cs-'+(Global.Accident_ScenarioC.name.split('_'))[1]+'.png'" alt="claim scenario"> -->
        <img class="img-fluid scenario-img mb-2" :src="loadImgforScenario(Global.Accident_ScenarioC.name+'.png')" alt="claim scenario">
        <p class="scenario-label"><small>{{ $i18n.locale == "th" ? Global.Accident_ScenarioC.th_label__c : Global.Accident_ScenarioC.en_label__c}}</small></p>
      </div>
      <div class="text-center">
        <button type="button" class="btn btn-secondary w-50" data-toggle="modal" data-target="#claim-scenario-modal">{{$t("scene.select")}}</button>
      </div>



      <!-- add-damage Modal -->
      <div
        class="modal fade"
        id="add-damage"
        tabindex="-3"
        role="dialog"
        aria-labelledby="add-damageLabel"
        aria-hidden="true"
        data-backdrop="static"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-body py-4">
  
              <button
                type="button"
                class="close px-2 text-primary"
                data-dismiss="modal"
                aria-label="Close"
                style="position: relative; top: -20px; right: -10px"
                
              >
                x
              </button>

              <h5 class="text-center">{{ $t("surveyform.label.vehicle.damage") }}</h5>
              <label for="browser">{{ $t("surveyform.search.select") }}</label>

              <input
                list="browsers"
                name="browser"
                id="browser"
                placeholder="Damage keyword..."
                class="form-control"
                v-model="Global.SearchKeyword.DamageKeyword"
              />
            
              <div class="text-center my-3">
                <button  v-on:click="damageSearchClick()" type="button" class="btn btn-primary w-50">
                  {{ $t("surveyform.search.select") }}
                </button>
              </div>
              <div v-if="showLoad" class="text-center">{{ $t("surveyform.loading.list") }}</div>

              <div class="list-group pl-3" style="overflow-y: scroll; height: 80vh;">
                <li v-for="(dam,index) in Global.DamageSearchList" :key="dam.Damage" v-bind:style="{'background-color': (index%2==0?'':'#FFF4DC')}" v-on:click="damageListitemClick(dam)">
                  {{ dam.namec }} <span class="badge badge-primary">{{dam.typec}}</span>
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--  claim scenario Modal -->
						<div class="modal fade" id="claim-scenario-modal" tabindex="-1" role="dialog" aria-labelledby="claim-scenarioLabel" aria-hidden="true">
							<div class="modal-dialog modal-dialog-scrollable" role="document">
								<div class="modal-content">
									<div class="modal-header border-0">
										<h5 class="modal-title text-center">{{ $t("claim.scenarios") }}</h5>
										<button type="button" class="close px-2 text-primary" data-dismiss="modal" aria-label="Close">x</button>
									</div>
									<div class="modal-body px-3">

										<div v-if="!Global.flagScenarioLoading" class="accordion" id="accordion-scenario">
											<div class="card">
												<div class="card-header" id="heading-1">
													<button class="btn btn-link btn-block collapsed" type="button" data-toggle="collapse" data-target="#collapse-1" aria-expanded="false" aria-controls="collapse-1">Intersection / ทางแยก</button>
												</div>
												<div id="collapse-1" class="collapse" aria-labelledby="heading-1" data-parent="#accordion-scenario">
													<div class="card-body p-0">
														<ul id="list-scenario" class="list-group" >
															<li v-for="(item,index) in Global.AccidentScenario.slice(0,11)" :key="item.name" @click="sceneActive=item.name" :class="{'active':sceneActive==item.name}" class="list-group-item list-group-item-action py-2 px-3 text-center" >
																<!-- <img class="img-fluid scenario-img mb-2" :src="'assets/img/secario/cs-'+(index+1)+'.png'" :alt="'claim scenario '+(index+1)"> -->
																<img class="img-fluid scenario-img mb-2" :src="loadImgforScenario('Scenario_'+(index+1)+'.png')" :alt="'claim scenario '+(index+1)">
																<p><small>{{$i18n.locale== "th"? item.th_label__c : item.en_label__c}}</small></p>
															</li>
                              <li v-for="(item,index) in Global.AccidentScenario.slice(26,29)" :key="item.name" @click="sceneActive=item.name" :class="{'active':sceneActive==item.name}" class="list-group-item list-group-item-action py-2 px-3 text-center">
																<!-- <img class="img-fluid scenario-img mb-2" :src="'assets/img/secario/cs-'+(index+27)+'.png'" :alt="'claim scenario '+(index+27)"> -->
                                <img class="img-fluid scenario-img mb-2" :src="loadImgforScenario('Scenario_'+(index+27)+'.png')" :alt="'claim scenario '+(index+27)">
																<p><small>{{$i18n.locale== "th"? item.th_label__c : item.en_label__c}}</small></p>
															</li>
															
														</ul>
													</div>
												</div>
											</div>

											<div class="card">
												<div class="card-header" id="heading-2">
													<button class="btn btn-link btn-block collapsed" type="button" data-toggle="collapse" data-target="#collapse-2" aria-expanded="false" aria-controls="collapse-2">Straight / ทางตรง</button>
												</div>
												<div id="collapse-2" class="collapse" aria-labelledby="heading-2" data-parent="#accordion-scenario">
													<div class="card-body p-0">
														<ul id="list-scenario" class="list-group">
														<li v-for="(item,index) in Global.AccidentScenario.slice(13,21)" :key="item.name" @click="sceneActive=item.name" :class="{'active':sceneActive==item.name}" class="list-group-item list-group-item-action py-2 px-3 text-center" >
                              <!-- <img class="img-fluid scenario-img mb-2" :src="'assets/img/secario/cs-'+(index+14)+'.png'" :alt="'claim scenario '+(index+14)"> -->
                              <img class="img-fluid scenario-img mb-2" :src="loadImgforScenario('Scenario_'+(index+14)+'.png')" :alt="'claim scenario '+(index+14)">
                              <p><small>{{$i18n.locale== "th"? item.th_label__c : item.en_label__c}}</small></p>
														</li>
														<li v-for="(item,index) in Global.AccidentScenario.slice(24,26)" :key="item.name" @click="sceneActive=item.name" :class="{'active':sceneActive==item.name}" class="list-group-item list-group-item-action py-2 px-3 text-center" >
                              <!-- <img class="img-fluid scenario-img mb-2" :src="'assets/img/secario/cs-'+(index+25)+'.png'" :alt="'claim scenario '+(index+25)"> -->
                              <img class="img-fluid scenario-img mb-2" :src="loadImgforScenario('Scenario_'+(index+25)+'.png')" :alt="'claim scenario '+(index+25)">
                              <p><small>{{$i18n.locale== "th"? item.th_label__c : item.en_label__c}}</small></p>
														</li>
														<li v-for="(item,index) in Global.AccidentScenario.slice(30,35)" :key="item.name" @click="sceneActive=item.name" :class="{'active':sceneActive==item.name}" class="list-group-item list-group-item-action py-2 px-3 text-center" >
                              <!-- <img class="img-fluid scenario-img mb-2" :src="'assets/img/secario/cs-'+(index+31)+'.png'" :alt="'claim scenario '+(index+31)"> -->
                              <img class="img-fluid scenario-img mb-2" :src="loadImgforScenario('Scenario_'+(index+31)+'.png')" :alt="'claim scenario '+(index+31)">
                              <p><small>{{$i18n.locale== "th"? item.th_label__c : item.en_label__c}}</small></p>
														</li>
														</ul>
													</div>
												</div>
											</div>
											
											<div class="card">
												<div class="card-header" id="heading-3">
												  <button class="btn btn-link btn-block collapsed" type="button" data-toggle="collapse" data-target="#collapse-3" aria-expanded="false" aria-controls="collapse-3">Roundabout / วงเวียน</button>
												</div>
												<div id="collapse-3" class="collapse" aria-labelledby="heading-3" data-parent="#accordion-scenario">
													<div class="card-body p-0">
														<ul id="list-scenario" class="list-group">
															<li v-for="(item,index) in Global.AccidentScenario.slice(11,13)" :key="item.name" @click="sceneActive=item.name" :class="{'active':sceneActive==item.name}" class="list-group-item list-group-item-action py-2 px-3 text-center" >
                              <!-- <img class="img-fluid scenario-img mb-2" :src="'assets/img/secario/cs-'+(index+12)+'.png'" :alt="'claim scenario '+(index+12)"> -->
                              <img class="img-fluid scenario-img mb-2" :src="loadImgforScenario('Scenario_'+(index+12)+'.png')" :alt="'claim scenario '+(index+12)">
                              <p><small>{{$i18n.locale== "th"? item.th_label__c : item.en_label__c}}</small></p>
														</li>
														</ul>
													</div>
												</div>
											</div>
											  
											<div class="card">
												<div class="card-header" id="heading-4">
												  <button class="btn btn-link btn-block collapsed" type="button" data-toggle="collapse" data-target="#collapse-4" aria-expanded="false" aria-controls="collapse-4">Parking / ลานจอดรถ</button>
												</div>
												<div id="collapse-4" class="collapse" aria-labelledby="heading-4" data-parent="#accordion-scenario">
													<div class="card-body p-0">
														<ul id="list-scenario" class="list-group">
														<li v-for="(item,index) in Global.AccidentScenario.slice(21,24)" :key="item.name" @click="sceneActive=item.name" :class="{'active':sceneActive==item.name}" class="list-group-item list-group-item-action py-2 px-3 text-center" >
                              <!-- <img class="img-fluid scenario-img mb-2" :src="'assets/img/secario/cs-'+(index+22)+'.png'" :alt="'claim scenario '+(index+22)"> -->
                              <img class="img-fluid scenario-img mb-2" :src="loadImgforScenario('Scenario_'+(index+22)+'.png')" :alt="'claim scenario '+(index+22)">
                              <p><small>{{$i18n.locale== "th"? item.th_label__c : item.en_label__c}}</small></p>
														</li>
                            <li v-for="(item,index) in Global.AccidentScenario.slice(29,30)" :key="item.name" @click="sceneActive=item.name" :class="{'active':sceneActive==item.name}" class="list-group-item list-group-item-action py-2 px-3 text-center" >
                              <!-- <img class="img-fluid scenario-img mb-2" :src="'assets/img/secario/cs-'+(index+30)+'.png'" :alt="'claim scenario '+(index+30)"> -->
                              <img class="img-fluid scenario-img mb-2" :src="loadImgforScenario('Scenario_'+(index+30)+'.png')" :alt="'claim scenario '+(index+30)">
                              <p><small>{{$i18n.locale== "th"? item.th_label__c : item.en_label__c}}</small></p>
														</li>
														</ul>
													</div>
												</div>
											</div>
											  
											<div class="card">
												<div class="card-header" id="heading-5">
												  <button class="btn btn-link btn-block collapsed" type="button" data-toggle="collapse" data-target="#collapse-5" aria-expanded="false" aria-controls="collapse-5">Other / อื่นๆ</button>
												</div>
												<div id="collapse-5" class="collapse" aria-labelledby="heading-5" data-parent="#accordion-scenario">
													<div class="card-body p-0">
														<ul id="list-scenario" class="list-group">
															<li v-for="(item,index) in Global.AccidentScenario.slice(35,38)" :key="item.name" @click="sceneActive=item.name" :class="{'active':sceneActive==item.name}" class="list-group-item list-group-item-action py-2 px-3 text-center" >
                              <!-- <img class="img-fluid scenario-img mb-2" :src="'assets/img/secario/cs-'+(index+36)+'.png'" :alt="'claim scenario '+(index+36)"> -->
                              <img class="img-fluid scenario-img mb-2" :src="loadImgforScenario('Scenario_'+(index+36)+'.png')" :alt="'claim scenario '+(index+36)">
                              <p><small>{{$i18n.locale== "th"? item.th_label__c : item.en_label__c}}</small></p>
														</li>
														</ul>
													</div>
												</div>
											</div>
										</div>

                    <p v-else class="text-center">Loading...</p>

										
									</div>
									<div class="modal-footer justify-content-center border-0">
										<button type="button" @click="sceneAddClick()" class="btn btn-primary w-50"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> {{$t("scene.add")}}</button>
									</div>
								</div>
							</div>
						</div>
    </div>
  </div>
</template>

<script>
import Global from "./GlobalVariable.vue";
export default {
  data() {
    return {
      Global: Global,
      showLoad: false,
      sceneActive: null
    };
  },
  methods:{
    loadImgforScenario:function(_input){
      /* name format must be Scenario_1.png */
      var vm = this;
      var strImages = localStorage.getItem("ScenarioImages")
      var jsonImages = JSON.parse(strImages)
      var strReturn = '';
      if(strImages){
        strReturn = "data:image/png;base64," + jsonImages[_input]
        return strReturn
      }else if(!strImages){
        return 'assets/img/image-not-found.png'
      }
    },
    sceneAddClick:function(){
      var vm = this;
      if(vm.sceneActive){
        var chosen = Global.AccidentScenario.find(item => item.name === vm.sceneActive)
        vm.$set(Global,"Accident_ScenarioC",chosen)
        $('#claim-scenario-modal').modal('hide');
      }else{
         vm.$swal({
                  title: vm.$t("sceneActive.no.select"),
                  type: 'warning',
                  html: msg
         }).then(value=> {if(value){
                  return false;
          }})
      }
    },
    validateDamageKeyword: function() {
      var vm = this;
      if (!Global.SearchKeyword.DamageKeyword) {
        // vm.sweetError(vm.$t("validate.word.error"), vm.$t("validate.damage.keyword"));
        return false
      }
      return true
    },
    damageSearchClick: function() {
      var vm = this;
      if (vm.validateDamageKeyword()) {
        vm.showLoad = true;
        var formData = new FormData();
        formData.append("searchKeywordDamage", Global.SearchKeyword.DamageKeyword.toLowerCase());
        vm.axios
          .post(Global.claimBackend + "getAutomobilePart", formData)
          .then(function(response) {
            vm.showLoad = false;
            if (response && response.data.code && response.data.code == "OK") {
              Global.DamageSearchList = response.data.data;
              // vm.policyList =[{modelFamilyC:"Vios", yearOfManufactureC:"2016", contractname:"1000-00914642", makeC:"Toyota", chassisNumberC:null, carPlateNumberC:"4e3ert", endDateC:"2020-04-08", carPlateProvinceC:null, status:"Activated"}]
            } else {
              vm.DamageSearchList = "";
            }
          })
          .catch(error => {
            vm.showLoad = false;
            console.log("getAutomobilePart Exception:", error);
          });
      }
    },
    openModalAddDamge: function(){
      $("#add-damage").modal('show');
      Global.DamageSearchList = [];
      Global.SearchKeyword.DamageKeyword = "";
    },
    damageListitemClick: function(dam){
      var vm = this;
      Global.InsuredVehicle.VehicleDamage.push({
            id: dam.id,
            Damage: dam.namec,
            Level: dam.typec
          });
      $("#add-damage").modal("hide");
    },
    delDamge: function(dam) {
      var vm = this;
      Global.InsuredVehicle.VehicleDamage = Global.InsuredVehicle.VehicleDamage.filter(
          obj => {
            return obj.id !== dam;
          }
        );
        $("#add-damage").modal("hide");
    },
  }
};
</script>

<style>
</style>