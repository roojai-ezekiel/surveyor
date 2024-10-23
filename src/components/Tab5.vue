<template>
  <div>
      <div class="tab-pane fade active show" id="third-party" role="tabpanel" aria-labelledby="third-party-tab">
						<h5 class="text-center">{{ $t("surveyform.button.add.thirdparty") }}</h5>
						
						<div class="accordion" id="accordionThirdparty">
							<div class="card" v-for="person in Global.TPList" :key="person.index">
							  <div class="card-header p-1" id="heading-third-party-1">
								  <button class="btn btn-link btn-block btn-third-party text-left collapsed" type="button" data-toggle="collapse" data-target="#collapse-third-party-1" aria-expanded="true" aria-controls="collapse-third-party-1">
									{{ person.Driver.firstname }} {{ person.Driver.lastname }}<svg viewBox="0 0 24 24" width="24" height="24" stroke="#353b48" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1 float-right"><polyline points="18 15 12 9 6 15"></polyline></svg>
								  </button>
							  </div>
						  
							  <div id="collapse-third-party-1" class="collapse" aria-labelledby="headingOne" data-parent="#accordionThirdparty">
								<div class="card-body">
									<p><strong>{{ $t("surveyform.label.thirdparty.name") }}</strong></p>
									<p><span class="strong">{{ $t("surveyform.label.ic.passport") }} : </span> {{ person.Driver.ID }} </p>
									<p><span class="strong">{{ $t("surveyform.label.firstname") }} : </span>{{ person.Driver.firstname }}</p>
									<p><span class="strong">{{ $t("surveyform.label.lastname") }} : </span>{{ person.Driver.lastname }}</p>
									<p><span class="strong">{{ $t("surveyform.label.phone") }} : </span>{{ person.Driver.Phone }}</p>
									<p><span class="strong">{{ $t("surveyform.label.email")}} : </span>{{ person.Driver.Email }}</p>
									<p><span class="strong">{{ $t("surveyform.label.lang") }} : </span>{{ person.Driver.prefLang }}</p>
									<hr>
									<p><strong>{{ $t("surveyform.label.thirdparty.vehicledetail") }}</strong></p>
									<p><span class="strong">{{ $t("surveyform.label.thirdparty.make") }} : </span>{{ person.Vehicle.make }}</p>
									<p><span class="strong">{{ $t("surveyform.label.thirdparty.model") }} : </span>{{ person.Vehicle.model }}</p>
									<p><span class="strong">{{ $t("surveyform.label.thirdparty.carplate") }} : </span>{{ person.Vehicle.carplate }}</p>
									<p><span class="strong">{{ $t("surveyform.label.thirdparty.province") }} : </span>{{ person.Vehicle.carprovince }}</p>
									<p><span class="strong">{{ $t( "surveyform.label.thirdparty.chassisno") }} : </span>{{ person.Vehicle.chassisno }}</p>
									<p><span class="strong">{{ $t("surveyform.label.thirdparty.insurecompany") }} : </span>{{ person.Vehicle.insurecompany }}</p>
									<p><span class="strong">{{ $t("surveyform.label.thirdparty.plantype") }} : </span>{{ person.Vehicle.plantype }}</p>
									<hr>
									<p><strong>3. {{ $t("surveyform.label.vehicle.damage") }}</strong></p>
									<p><span class="strong">{{ $t("surveyform.label.thirdparty.iscardamage") }} : </span>{{ person.VehicleDamage.isCarDamage }}</p>
									<p>
										<ul id="vehicle-damage-list" class="pl-3" v-for="(dmg,index) in person.VehicleDamage.Damages" :key="index">
											<li>{{ dmg.Damage }} <span class="badge badge-primary">{{ dmg.Level }}</span></li>
										</ul>
									</p>
									<p><span class="strong">{{ $t("surveyform.tp.label.liability") }} : </span>{{ person.VehicleDamage.liability }}</p>
									<hr>
									<p><strong>4. {{ $t("surveyform.label.injury.property") }}</strong></p>
									<p><span class="strong">{{ $t("surveyform.label.thirdparty.tppropdamage") }} : </span>{{ person.InjuryProperty.isPropDam }}</p>
									<p><span class="strong">{{ $t("surveyform.label.thirdparty.tpinsure") }} : </span>{{ person.InjuryProperty.TPinsure }}</p>
									<p><span class="strong">{{ $t("surveyform.label.thirdparty.tpdamagedetail") }} : </span>{{ person.InjuryProperty.TPDamDetail }}</p>
									<p><span class="strong">{{ $t("surveyform.label.number.passenger") }} : </span>{{ person.InjuryProperty.NumberPassenger }}</p>
									<p><span class="strong">{{ $t("surveyform.label.thirdparty.anyinjuerd") }} : </span>{{ person.InjuryProperty.anyInjury }}</p>
									<p><span class="strong">{{ $t("surveyform.label.thirdparty.injuredname") }} : </span>{{ person.InjuryProperty.InjuredName }}</p>
									<p><span class="strong">{{ $t("surveyform.label.thirdparty.injuredrelation") }} : </span>{{ person.InjuryProperty.InjuredRelation }}</p>
									<p><span class="strong">{{ $t("surveyform.label.thirdparty.injureddetail") }} : </span>{{ person.InjuryProperty.InjuredDetail }}</p>

									<div class="text-center">
										<button type="button" id="btn-del-third" class="btn btn-outline-primary" @click="DelThisThirdParty(person)">{{ $t("surveyform.tp.remove") }}</button>
									</div>
								</div>
							  </div>
							</div>
						</div>

						<div class="section-add-third-party mt-4">
							<button class="btn btn-primary btn-block" type="button" data-toggle="collapse" data-target="#collapse-add-third-party" aria-expanded="false" aria-controls="collapse-add-third-party">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> {{ $t("surveyform.button.add.thirdparty") }}
							</button>
							<!-- collapse-add-third-party -->
							<div id="collapse-add-third-party" class="my-3 collapse" >
								<div class="card card-body">
										
									<h5>{{ $t("surveyform.label.thirdparty.name") }}</h5>
										
									<div class="form-group">
										<label for="driver-ic-passport">{{ $t("surveyform.label.ic.passport") }}</label>
										<div class="input-group">
											<input type="text" id="driver-ic-passport" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" maxlength="13" class="form-control" aria-label="IC/Passport" aria-describedby="button-addon2" v-model="Global.TP.Driver.ID">
											<div class="input-group-append">
											  <button @click="accountTpSearchClick" class="btn btn-secondary btn-search" type="button"  id="button-addon2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search mb-1"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></button>
											</div>
										</div>
									</div>
									
									<div class="form-group">
										<label for="third-party-first-name">{{ $t("surveyform.label.firstname") }}</label>
										<input type="text" class="form-control" id="third-party-first-name" v-model="Global.TP.Driver.firstname" :disabled="Global.isDisableTP">
									</div>
									
									<div class="form-group">
										<label for="third-party-last-name">{{ $t("surveyform.label.lastname") }}</label>
										<input type="text" class="form-control" id="third-party-last-name" v-model="Global.TP.Driver.lastname" :disabled="Global.isDisableTP">
									</div>
									
									<div class="form-group">
										<label for="third-party-mobile-no">{{ $t("surveyform.label.phone") }}</label>
										<input type="number" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" maxlength="10" class="form-control" id="third-party-mobile-no" v-model="Global.TP.Driver.Phone" :disabled="Global.isPhoneTPDisable">
									</div>
									
									<div class="form-group">
										<label for="third-party-email">{{ $t("surveyform.label.email")}}</label>
										<input type="email" class="form-control" id="third-party-email" v-model="Global.TP.Driver.Email" :disabled="Global.isEmailTPDisable">
									</div>
									<div class="form-group">
										<label for="driver-preferred-language">{{ $t("surveyform.label.lang") }}</label>
										<div class="custom-control custom-radio py-2">
											<input type="radio" id="third-party-language-th" name="third-party-preferred-language" class="custom-control-input" v-model="Global.TP.Driver.prefLang" :disabled="Global.isDisableTP" value="TH">
											<label class="custom-control-label" for="third-party-language-th"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><path fill="#f0f0f0" d="M0 85.334h512V426.66H0z"/><path fill="#0052b4" d="M0 194.056h512v123.882H0z"/><g fill="#d80027"><path d="M0 85.334h512v54.522H0zM0 372.143h512v54.522H0z"/></g></svg> ภาษาไทย</label>
										</div>
										<div class="custom-control custom-radio py-2">
											<input type="radio" id="third-party-language-en" name="third-party-preferred-language" class="custom-control-input" v-model="Global.TP.Driver.prefLang" :disabled="Global.isDisableTP" value="EN">
											<label class="custom-control-label" for="third-party-language-en"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><path fill="#f0f0f0" d="M0 85.333h512V426.67H0z"/><path fill="#d80027" d="M288 85.33h-64v138.666H0v64h224v138.666h64V287.996h224v-64H288z"/><g fill="#0052b4"><path d="M393.785 315.358L512 381.034v-65.676zM311.652 315.358L512 426.662v-31.474l-143.693-79.83zM458.634 426.662l-146.982-81.664v81.664z"/></g><path fill="#f0f0f0" d="M311.652 315.358L512 426.662v-31.474l-143.693-79.83z"/><path fill="#d80027" d="M311.652 315.358L512 426.662v-31.474l-143.693-79.83z"/><g fill="#0052b4"><path d="M90.341 315.356L0 365.546v-50.19zM200.348 329.51v97.151H25.491z"/></g><path fill="#d80027" d="M143.693 315.358L0 395.188v31.474l200.348-111.304z"/><g fill="#0052b4"><path d="M118.215 196.634L0 130.958v65.676zM200.348 196.634L0 85.33v31.474l143.693 79.83zM53.366 85.33l146.982 81.664V85.33z"/></g><path fill="#f0f0f0" d="M200.348 196.634L0 85.33v31.474l143.693 79.83z"/><path fill="#d80027" d="M200.348 196.634L0 85.33v31.474l143.693 79.83z"/><g fill="#0052b4"><path d="M421.659 196.636L512 146.446v50.19zM311.652 182.482V85.331h174.857z"/></g><path fill="#d80027" d="M368.307 196.634L512 116.804V85.33L311.652 196.634z"/></svg> English</label>
										</div>
									</div>
									
									<h5 class="mt-5">{{ $t("surveyform.label.thirdparty.vehicledetail") }}</h5>
										
									<div class="form-group">
										<label for="third-party-vehicle-car-make">{{ $t("surveyform.label.thirdparty.make") }}</label>
										<input class="form-control" type="text" id="third-party-vehicle-car-make" v-model="Global.TP.Vehicle.make">
									</div>
										
									<div class="form-group">
										<label for="third-party-vehicle-car-model">{{ $t("surveyform.label.thirdparty.model") }} </label>
										<input class="form-control" type="text" id="third-party-vehicle-car-model" v-model="Global.TP.Vehicle.model">
									</div>
										
									<div class="form-group">
										<label for="third-party-vehicle-car-plate">{{ $t("surveyform.label.thirdparty.carplate") }}</label>
										<input class="form-control" type="text" id="third-party-vehicle-car-plate" v-model="Global.TP.Vehicle.carplate">
									</div>
									
									<div class="form-group">
										<label for="third-party-vehicle-province">{{ $t("surveyform.label.thirdparty.province") }}</label>
										<input class="form-control" type="text" id="third-party-vehicle-province" v-model="Global.TP.Vehicle.carprovince">
									</div>
									
									<div class="form-group">
										<label for="third-party-vehicle-chassis">{{ $t( "surveyform.label.thirdparty.chassisno") }}</label>
										<input class="form-control" type="text" id="third-party-vehicle-chassis" v-model="Global.TP.Vehicle.chassisno">
									</div>
									
									<div class="form-group">
										<label for="driver-ic-passport">{{ $t("surveyform.label.thirdparty.tpinsure") }}</label>
										<div class="input-group">
											<input type="text" id="third-party-insurance" class="form-control" aria-label="InsuranceCompany" aria-describedby="button-addon2" v-model="Global.TP.Vehicle.insurecompany" disabled>
											<div class="input-group-append">
											  <button class="btn btn-secondary btn-search" type="button" @click="openCompanySearch"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search mb-1"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></button>
											</div>
										</div>
									</div>
										
									<div class="form-group">
										<label for="third-party-insurance-plan">{{ $t("modal.policy.dt.list.item.label.plan.type") }}</label>
										<select for="third-party-insurance-plan" class="custom-select" v-model="Global.TP.Vehicle.plantype">
											<option selected value="">{{ $t("surveyform.pls.select") }}</option>
											<option v-for="item in Global.PlanTypeSelection" :key="item.val" :value="item.val">{{$t(item.desc)}}</option>
										</select>
									</div>
										
									<h5 class="mt-5">3. {{ $t("surveyform.label.vehicle.damage") }}</h5>
										
									<div class="form-group">
										<div class="row">
											<div class="col-7 pr-0">
												<p class="mb-0">{{ $t("surveyform.label.thirdparty.iscardamage") }}</p>
											</div>
											<div class="col-5 pl-0 text-right">
												<input class="radio-inline-input-y" type="radio" name="third-party-car-damage" id="third-party-car-damage-y" v-model="Global.TP.VehicleDamage.isCarDamage" value="Yes">
												<label class="radio-inline-label-y py-1 mb-0" for="third-party-car-damage-y">Yes</label>
												<input class="radio-inline-input-n" type="radio" name="third-party-car-damage" id="third-party-car-damage-n" v-model="Global.TP.VehicleDamage.isCarDamage" value="No">
												<label class="radio-inline-label-n py-1 mb-0" for="third-party-car-damage-n">No</label>
											</div>
										</div>
									</div>

									<ol id="vehicle-damage-list" class="pl-3" v-for="item in Global.TP.VehicleDamage.Damages" :key="item.index">
										<li>{{ item.Damage }} <span class="badge badge-primary">{{ item.Level }}</span>
											<button  type="button" @click="delDamge(item.id)" class="btn btn-link text-danger py-0" style="position: absolute;right: 5px;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc3545" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
										</li>
									</ol>
										
									<div class="text-center mb-3" v-if="Global.TP.VehicleDamage.isCarDamage == 'Yes'">
										<button  @click="openModalAddDamge" type="button" class="btn btn-secondary btn-sm w-50" data-toggle="modal" data-target="#third-party-add-damage"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>{{ $t("surveyform.label.header.add.damage") }}</button>
									</div>

									<div class="form-group">
										<label for="third-party-driver-is">{{ $t("surveyform.tp.label.liability") }}</label>
										<select id="third-party-driver-is" class="custom-select" v-model="Global.TP.VehicleDamage.liability">
											<option selected value="">{{ $t("surveyform.pls.select") }}</option>
											<option v-for="item in Global.TPLiabilitySelection" :key="item.val" :value="item.val">{{item.desc}}</option>
										</select>
									</div>
									
									<h5 class="mt-5">4. {{ $t("surveyform.label.injury.property") }}</h5>
									
									<div class="form-group">
										<div class="row">
											<div class="col-7 pr-0">
												<p class="mb-0">{{ $t("surveyform.label.thirdparty.tppropdamage") }}</p>
											</div>
											<div class="col-5 pl-0 text-right">
												<input class="radio-inline-input-y" type="radio" name="TP-property" id="TP-property-y" v-model="Global.TP.InjuryProperty.isPropDam" value="Yes">
												<label class="radio-inline-label-y py-1 mb-0" for="TP-property-y">{{ $t("surveyform.choice.yes") }}</label>
												<input class="radio-inline-input-n" type="radio" name="TP-property" id="TP-property-n" v-model="Global.TP.InjuryProperty.isPropDam" value="No">
												<label class="radio-inline-label-n py-1 mb-0" for="TP-property-n">{{ $t("surveyform.choice.no") }}</label>
											</div>
										</div>
									</div>
							
									<div id="TP-case">
										<div class="form-group">
											<label for="third-party-tp-insurance">{{ $t("surveyform.label.thirdparty.tpinsure") }}</label>
											<input id="third-party-tp-insurance" class="form-control" type="text" v-model="Global.TP.InjuryProperty.TPinsure" :disabled="Global.TP.InjuryProperty.isPropDam != 'Yes'"> 									
										</div>
										
										<div class="form-group">
											<label for="third-party-tp-damage-detail">{{ $t("surveyform.label.thirdparty.tpdamagedetail") }}</label>
											<input id="third-party-tp-damage-detail" class="form-control" type="text" v-model="Global.TP.InjuryProperty.TPDamDetail" :disabled="Global.TP.InjuryProperty.isPropDam != 'Yes'"> 	
										</div>  
									</div>

									<div class="form-group">
											<label for="third-party-number-passenger">{{ $t("surveyform.label.number.passenger") }}</label>
											<input id="third-party-number-passenger" class="form-control" type="number" v-model="Global.TP.InjuryProperty.NumberPassenger"> 	
										</div>
									
									<div class="form-group mt-4">
										<div class="row">
											<div class="col-7 pr-0">
												<p class="mb-0">{{ $t("surveyform.label.thirdparty.anyinjuerd") }}</p>
											</div>
											<div class="col-5 pl-0 text-right">
												<input class="radio-inline-input-y" type="radio" name="Any-injury" id="Any-injury-y" v-model="Global.TP.InjuryProperty.anyInjury" value="Yes">
												<label class="radio-inline-label-y py-1 mb-0" for="Any-injury-y">{{ $t("surveyform.choice.yes") }}</label>
												<input class="radio-inline-input-n" type="radio" name="Any-injury" id="Any-injury-n" v-model="Global.TP.InjuryProperty.anyInjury" value="No">
												<label class="radio-inline-label-n py-1 mb-0" for="Any-injury-n">{{ $t("surveyform.choice.no") }}</label>
											</div>
										</div>
									</div>
										
									<div id="Any-injury-case">
										<div class="form-group">
											<label for="third-party-any-injured-name">{{ $t("surveyform.label.injured.name") }}</label>
											<input id="third-party-any-injured-name" class="form-control" type="text" v-model="TPInjuredName" disabled> 	
										</div>
										
										<div class="form-group">
											<label for="third-party-any-injured-relations">{{ $t( "surveyform.label.injured.relation") }}</label>
											<select id="third-party-any-injured-relations" class="custom-select" v-model="Global.TP.InjuryProperty.InjuredRelation">
												<!-- <option selected value="">{{ $t("surveyform.pls.select") }}</option> -->
												<option  v-for="item in Global.TP_RelationSelection" :key="item.val" :value="item.val">{{item.desc}}</option>
											</select>
										</div>
										
										<div class="form-group">
											<label for="third-party-any-injured-detail">{{ $t("surveyform.label.thirdparty.injureddetail") }}</label>
											<textarea id="third-party-any-injured-detail" type="text" class="form-control" v-model="Global.TP.InjuryProperty.InjuredDetail" :disabled="Global.TP.InjuryProperty.anyInjury != 'Yes'"></textarea>
										</div>
									</div>
									
									<div class="btn-group my-3 w-100" role="group" aria-label="">
										<button type="button" id="btn-cancel-third" class="btn btn-outline-secondary w-50 mr-2"  data-toggle="collapse" data-target="#collapse-add-third-party" aria-expanded="false" aria-controls="collapse-add-third-party">{{ $t("mainmenu.label.cancel") }}</button>
										<button @click="AddTP()" type="button" id="btn-add-third" class="btn btn-primary strong w-50">{{ $t("surveyform.button.add.thirdparty") }}</button>
									</div>
									
									
								</div>
							</div>
						</div>
					
	  <!-- add-damage Modal -->
      <div class="modal fade" id="add-damage" tabindex="-3" role="dialog" aria-labelledby="add-damageLabel" aria-hidden="true" data-backdrop="static">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-body py-4">
              <button type="button" class="close px-2 text-primary" data-dismiss="modal" aria-label="Close" style="position: relative; top: -20px; right: -10px">
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
                v-model="Global.SearchKeyword.TpDamageKeyword"
              />
            
              <div class="text-center my-3">
                <button  v-on:click="damageSearchClick()" type="button" class="btn btn-primary w-50">
                  {{ $t("surveyform.search.select") }}
                </button>
              </div>
              <div v-if="showLoad" class="text-center">{{ $t("surveyform.loading.list") }}</div>

              <div class="list-group pl-3" style="overflow-y: scroll; height: 80vh;">
                <li v-for="(dam,index) in Global.TP_DamageSearchList" :key="dam.Damage" v-bind:style="{'background-color': (index%2==0?'':'#FFF4DC')}" v-on:click="damageListitemClick(dam)">
                  {{ dam.namec }} <span class="badge badge-primary">{{dam.typec}}</span>
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>

	   <!-- search-company Modal -->

	   <div class="modal fade" id="search-company" tabindex="-3" role="dialog" aria-labelledby="search-companyLabel" aria-hidden="true" data-backdrop="static">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-body py-4">
              <button type="button" class="close px-2 text-primary" data-dismiss="modal" aria-label="Close" style="position: relative; top: -20px; right: -10px">
                x
              </button>

              <h5 class="text-center">{{ $t("surveyform.label.thirdparty.insurecompany") }}</h5>
              <label for="browser">{{ $t("surveyform.search.select") }}</label>

              <input
                list="browsers"
                name="browser"
                id="browser"
                placeholder="Damage keyword..."
                class="form-control"
                v-model="Global.SearchKeyword.CompanyKeyword"
              />
            
              <div class="text-center my-3">
                <button  v-on:click="companySearchClick()" type="button" class="btn btn-primary w-50">
                  {{ $t("surveyform.search.select") }}
                </button>
              </div>
              <div v-if="showLoad" class="text-center">{{ $t("surveyform.loading.list") }}</div>

              <div class="list-group pl-3" style="overflow-y: scroll; height: 80vh;">
                <li v-for="(comp,index) in Global.CompanyList" :key="comp.id" v-bind:style="{'background-color': (index%2==0?'':'#FFF4DC')}" v-on:click="useThisCompany(comp)">
                  {{ comp.name }}
                </li>
              </div>
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
	  showLoad: false
    };
  },
  methods: {
	   validateSearchID: function() {
      var vm = this;
      if (!Global.TP.Driver.ID) {
        // vm.sweetError(vm.$t("validate.word.error"), vm.$t("validate.id.card"));
        return false
      }
      return true
    },
	  accountTpSearchClick: function() {
      var vm = this;
      // vm.isEnableTp = false
      if (vm.validateSearchID()) {
        $('#processing').modal('show');
        var formData = new FormData();
        formData.append("ic_passport", Global.TP.Driver.ID);
        this.axios
          .post(Global.claimBackend + "getAccontDetailById", formData)
          .then(function(response) {
            
            if (response && response.data.code && response.data.code == "OK") {
              $('#processing').modal('hide');
              let res_data = response.data.data[0];
              vm.$set(Global, 'isDisableTP', true);
            //   vm.sweetSuccess(vm.$t("surveyform.success"),vm.$t("surveyform.warn.success.account.search"))
              vm.$set(Global.TP.Driver, 'sfAccountId', res_data.sfid);
              vm.$set(Global.TP.Driver, 'firstname', res_data.firstname);
			  vm.$set(Global.TP.Driver, 'lastname', res_data.lastname);
			  if(!res_data.phone){
                vm.$set(Global, 'isPhoneTPDisable',false);
              }else{
                vm.$set(Global, 'isPhoneTPDisable',true);
                vm.$set(Global.TP.Driver, 'Phone', res_data.phone);
              }
			  
			  if(!res_data.email){
                vm.$set(Global, 'isEmailTPDisable',false);
              }else{
                vm.$set(Global, 'isEmailTPDisable',true);
                vm.$set(Global.TP.Driver, 'Email', res_data.email);
              }
              
              vm.$set(Global.TP.Driver, 'prefLang', res_data.preflang);
              vm.$set(Global.TP.InjuryProperty, 'InjuredName', res_data.name);
			   
			//   Global.TP.Driver.sfAccountId = res_data.sfid
            //   Global.TP.Driver.firstname = res_data.firstname
            //   Global.TP.Driver.lastname = res_data.lastname
            //   Global.TP.Driver.Phone = res_data.phone
            //   Global.TP.Driver.Email = res_data.email
            //   Global.TP.Driver.prefLang = res_data.preflang
            //   Global.TP.InjuryProperty.InjuredName = res_data.name
            } else {
              $('#processing').modal('hide');
              vm.$set(Global, 'isDisableTP', false);
              vm.$set(Global, 'isPhoneTPDisable', false);
              vm.$set(Global, 'isEmailTPDisable', false);
			  
			  vm.$set(Global.TP.Driver, 'sfAccountId', "");
              vm.$set(Global.TP.Driver, 'firstname', "");
              vm.$set(Global.TP.Driver, 'lastname', "");
              vm.$set(Global.TP.Driver, 'Phone', "");
              vm.$set(Global.TP.Driver, 'Email', "");
              vm.$set(Global.TP.Driver, 'prefLang', "");
              vm.$set(Global.TP.InjuryProperty, 'InjuredName', "");
            //   Global.TP.Driver.sfAccountId = ""
            //   Global.TP.Driver.firstname = ""
            //   Global.TP.Driver.lastname = ""
            //   Global.TP.Driver.Phone = ""
            //   Global.TP.Driver.Email = ""
            //   Global.TP.Driver.prefLang = null
            //   Global.TP.InjuryProperty.InjuredName = ""
            //   vm.sweetError(vm.$t("surveyform.warn.error"), vm.$t("surveyform.warn.error.account.search"));
            }
          })
          .catch(error => {
            $('#processing').modal('hide');
            // vm.sweetError(vm.$t("surveyform.warn.error"), "Something wrong with internet!");
            console.log("getAccontDetailById Exception:", error);
          });
      }
    },
	validateCompanyKeyword: function(){
      var vm = this;
      if (Global.SearchKeyword.CompanyKeyword.length < 1) {
        // vm.sweetError(vm.$t("validate.word.error"), vm.$t("validate.company.keyword"));
        return false
      }
      return true
	},
	validateDamageKeyword: function() {
      var vm = this;
      if (!Global.SearchKeyword.TpDamageKeyword) {
        // vm.sweetError(vm.$t("validate.word.error"), vm.$t("validate.damage.keyword"));
        return false
      }
      return true
    },
    DelThisThirdParty: function (TP) {
      Global.TPList = Global.TPList.filter((person) => {
        return person.Driver.ID !== TP.Driver.ID;
      });
	},
	openCompanySearch: function(){
      var vm = this
      Global.SearchKeyword.CompanyKeyword = ''
      Global.CompanyList = []
      $("#search-company").modal("show");
	},
	companySearchClick:function (){
      var vm = this 
      if(vm.validateCompanyKeyword()){
        vm.showLoad = true;
        var formData = new FormData();
        let keyword = Global.SearchKeyword.CompanyKeyword.toUpperCase()
        formData.append("CompanyKeyword", keyword);
        this.axios
          .post(Global.claimBackend + "getCompanyByKeyword", formData)
          .then(function(response) {
            vm.showLoad = false;
            if (response && response.data.code && response.data.code == "OK") {
              Global.CompanyList = response.data.data;
            } else {
              Global.CompanyList = [];
            }
          })
          .catch(error => {
            vm.showLoad = false;
            console.log("getCompanyByKeyword Exception:", error);
          });
      }
	},
	useThisCompany:function (comp){
      Global.TP.Vehicle.insurecompany = comp.value
      $("#search-company").modal("hide");
	},
	openModalAddDamge: function(){
      $("#add-damage").modal('show');
      Global.TP_DamageSearchList = [];
      Global.SearchKeyword.TpDamageKeyword = "";
	},
	damageSearchClick: function() {
      var vm = this;
      if (vm.validateDamageKeyword()) {
        vm.showLoad = true;
        var formData = new FormData();
        formData.append("searchKeywordDamage", Global.SearchKeyword.TpDamageKeyword.toLowerCase());
        vm.axios
          .post(Global.claimBackend + "getAutomobilePart", formData)
          .then(function(response) {
            vm.showLoad = false;
            if (response && response.data.code && response.data.code == "OK") {
              Global.TP_DamageSearchList = response.data.data;
              // vm.policyList =[{modelFamilyC:"Vios", yearOfManufactureC:"2016", contractname:"1000-00914642", makeC:"Toyota", chassisNumberC:null, carPlateNumberC:"4e3ert", endDateC:"2020-04-08", carPlateProvinceC:null, status:"Activated"}]
            } else {
              Global.TP_DamageSearchList = [];
            }
          })
          .catch(error => {
            vm.showLoad = false;
            console.log("getAutomobilePart Exception:", error);
          });
      }
	},
	damageListitemClick: function(dam){
      var vm = this;
      Global.TP.VehicleDamage.Damages.push({
            id: dam.id,
            Damage: dam.namec,
            Level: dam.typec
          });
      $("#add-damage").modal("hide");
	},
	 delDamge: function(dam) {
      var vm = this;
      Global.TP.VehicleDamage.Damages = Global.TP.VehicleDamage.Damages.filter(
          obj => {
            return obj.id !== dam;
          }
        );
        $("#add-damage").modal("hide");
	},
	 validateTPContactData: function(){
      var vm = this
      let stringTelling = ""

      if(!Global.TP.Driver.ID){
        stringTelling += vm.$t("validate.contact.id") + '<br>'
      }
      if(!Global.TP.Driver.firstname || !Global.TP.Driver.lastname){
        stringTelling += vm.$t("validate.contact.name") + '<br>'
      }
      if(!Global.TP.Driver.Phone){
        stringTelling += vm.$t("validate.contact.phone") + '<br>'
      }

      if(stringTelling){
        vm.$swal({
                  title: vm.$t("validate.word.error"),
                  type: 'warning',
                  html: stringTelling
                }).then(value => {if(value){$('#pills-tabContent').animate({scrollTop:$('#third-party-first-name').offset().top})}})
        return false
      }else{
        return true
      }
    },
	AddTP:function(){
	  var vm = this
	  if(vm.validateTPContactData()){
		let s = JSON.stringify(Global.TP)
		let newTP = JSON.parse(s)
		vm.$set(Global.TPList, Global.TPList.length, newTP)
		vm.clearTPinput();
		$("#collapse-add-third-party").collapse('hide');
	  }
	},
	clearTPinput:function(){
		var vm = this;
		Global.TP = {
			Driver: {
			firstname: "",
			lastname: "",
			ID: "",
			Phone: "",
			Email: "",
			prefLang: null,
			sfAccountId: "",
			},
			Vehicle: {
			make: "",
			model: "",
			carplate: "",
			carprovince: "",
			chassisno: "",
			insurecompany: "",
			plantype: "",
			},
			VehicleDamage: {
			isCarDamage: 'No',
			Damages: [],
			liability: "",
			},
			InjuryProperty: {
			isPropDam: 'No',
			TPinsure: "",
			TPDamDetail: "",
			anyInjury: 'No',
			InjuredName: "",
			InjuredRelation: "",
			InjuredDetail: "",
			}
		}
	}
  },
  computed:{
	  TPInjuredName: function(){
      var vm = this
      if(Global.TP.InjuryProperty.anyInjury){
        Global.TP.InjuryProperty.InjuredName =  Global.TP.Driver.firstname +' '+ Global.TP.Driver.lastname
        return Global.TP.Driver.firstname +' '+ Global.TP.Driver.lastname 
      }else{
        return ''
      }
    },
  },
  watch: {
	  'Global.TP.Driver.ID':{
      handler: function(newVal, oldVal){
        var vm = this
        if(newVal != oldVal && oldVal != ""){
          vm.$set(Global, 'isDisableTP', true);
          vm.$set(Global, 'isPhoneTPDisable', true);
          vm.$set(Global, 'isEmailTPDisable', true);
          vm.$set(Global.TP.Driver, 'sfAccountId', "");
          vm.$set(Global.TP.Driver, 'firstname', "");
          vm.$set(Global.TP.Driver, 'lastname', "");
          vm.$set(Global.TP.Driver, 'prefLang', "");
          vm.$set(Global.TP.Driver, 'Phone', "");
          vm.$set(Global.TP.Driver, 'Email', "");
        }
      },
      deep: true
    },
  },
};
</script>

<style>
</style>