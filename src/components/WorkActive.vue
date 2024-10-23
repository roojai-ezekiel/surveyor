<style scope>
.complete-info {
  height: 90vh !important;
}
</style>
<template>
  <div>
    <mainLayout/>
	<header class="bg-secondary py-1 fixed-top">
		<button  @click="$router.back()" type="button" class="btn p-2 text-white position-absolute"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg></button>
		<div class="text-center py-2">
			<p class="mb-0 text-white">{{ $t("history.label.caseid") }} : {{ claimId }} </p>
		</div>
	</header>
	  
	<div class="main-content" style="padding-top: 50px;">
		<div v-if="case_obj.status != 'Arrived'" id="map" class="map-accepted" style="height: 80vh;" >
		</div>
		<div class="accepted-case-info bg-white" :class="{'fixed-bottom': case_obj.status != 'Arrived','complete-info':case_obj.status == 'Arrived'}">
			<div class="container bg-white py-3">

        <!-- accordion accept -->
				<div class="accordion" id="accordionAccepted">
					<div class="accordion-header" id="headingOne">
						<div class="row">
							<div class="col-9">
								<p class="d-inline-block px-3 py-1 strong" :class="getLabelCardCaseType(case_obj.caseType)">{{ DisplayCaseType(case_obj.caseType) }}</p>
								<p class="strong" v-if="case_obj.status != 'Arrived'">{{ duration }} ( {{ distance }} )</p>
							</div>
							<div class="col-3 text-right">
								<button v-if="Expand&&case_obj.status != 'Arrived'" type="button" class="btn btn-collapse" data-toggle="collapse" data-target="#collapseAccepted" aria-expanded="true" aria-controls="collapseAccepted">
									<svg  viewBox="0 0 24 24" width="24" height="24" stroke="#353b48" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
										<polyline points="6 9 12 15 18 9"></polyline>
									</svg> hide
									
								</button>
								<button v-if="!Expand&&case_obj.status != 'Arrived'" type="button" class="btn btn-collapse" data-toggle="collapse" data-target="#collapseAccepted" aria-expanded="true" aria-controls="collapseAccepted">
									<svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-up">
										<polyline points="18 15 12 9 6 15"></polyline>
									</svg>show	
								</button>
							</div>
						</div>
					</div>
				
					<div id="collapseAccepted" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionAccepted">
						<div class="accordion-body">
							<hr style="margin:.5rem;">
              <div v-if="case_obj.status == 'Assigned' || case_obj.status == 'Accepted'">

							<p><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map-pin"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>{{ case_obj.reqLocaName }}</p>
							<p><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>  {{ case_obj.createdDate | moment("D/M/Y HH:mm:ss")}} </p>
							<p ><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>  {{ case_obj.appointmentTimeC | moment("D/M/Y HH:mm:ss")}} </p> 
							

							<div class="row mt-3">
								<div class="col">
									<button @click="callPhone()" type="button" class="btn btn-secondary btn-block py-2" data-toggle="modal" href="#callcustomermodal" data-target="#callcustomermodal">
										<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-phone">
										<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z">
											</path>
										</svg>{{custPhoneNumber}}
									</button>
								</div>
								<div class="col">
									<button type="button" class="btn btn-primary btn-block strong py-2"   href="#completemodal" data-toggle="modal" data-target="#completemodal">{{ $t("realtimemap.label.arrive") }}</button>
								</div>
							</div>
              </div>

              <div v-if="case_obj.status == 'Arrived'">
                <div id="map-complete-detail">
                  <p><span class="strong">{{ $t("modal.policy.dt.list.item.label.policy.number") }} : </span>{{ Global.claimObject.contractname ? Global.claimObject.contractname : "-" }}</p>
                  <p><span class="strong">{{ $t("modal.policy.dt.label.policy.holder.phone") }} : </span>{{ case_obj.custPhoneNumber }}  <button @click="callPhone()" type="button" class="btn btn-outline-primary btn-sm py-0 px-2 ml-2" data-toggle="modal" data-target="#callcustomermodal" href="#callcustomermodal">{{ $t("realtimemap.label.call") }}</button></p> 
                  <p><span class="strong">{{ $t("realtimemap.label.customer.location") }} : </span>{{ case_obj.reqLocaName }} </p>
                  <p><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>  {{ custObj.createdDate | moment("D/M/Y HH:mm:ss")}} </p>
                  <p><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>  {{ custObj.appointmentTimeC | moment("D/M/Y HH:mm:ss")}} </p> 
                </div>
                
                <div class="row mt-3" :class="{'fixed-bottom': case_obj.status == 'Arrived'}">
                  <div class="col-6">
                    <button v-if="Global.claimObject.claimnumberc_sfid" @click="openSurveyForm()" type="button" class="btn btn-secondary btn-block py-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clipboard">
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                      </svg> {{ $t("realtimemap.label.survey.report") }}</button>
                  </div>
                  <div class="col-6">
                    <button @click="takePhoto()" type="button" class="btn bg-secondary btn-block py-2 text-white"><svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1" style="position: relative;top:-2px;"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg> {{ $t("file.upload.take.photo") }}</button>
                  </div>
                  <div class="col-12">
                    <button  type="button" class="btn bg-success btn-block btn-lg text-white strong py-2 mt-3"  href="#completemodal" data-toggle="modal" data-target="#completemodal">{{ $t("realtimemap.label.complete") }}</button>
                  </div>
                </div>
              </div>

						</div>
					</div>


				</div>

          

        
			
			</div>  <!-- end container -->
		</div> <!-- end accepted-case-info -->

    <!-- modal confirm address -->
        <div class="modal fade" id="completemodal" tabindex="-1" role="dialog" aria-labelledby="completemodalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <button type="button" class="close text-right px-2" data-dismiss="modal" aria-label="Close">x</button>
                    <div class="modal-body">
                        
                        <h5 class="text-center strong">{{ $t("modal.label.confirm.address") }}</h5>
                          <div class="form-group px-3">
                            <label class="f-size10">&nbsp;
                              {{$t("realtimemap.label.google.map.and.location.details")}}
                            </label>
                            <textarea v-if="currentAdress" class="form-control" v-model="currentAdress"></textarea>
                            <span v-if="!currentAdress" class="accept-start-point" style="color: red !important;">{{ $t("modal.label.no.address") }} 
                              <a v-if="case_obj.status != 'Arrived'" @click.prevent="getCurrentAddrManual()" class="text-primary" style="color: orange !important; text-decoration: underline;">{{ $t("modal.label.refresh.address") }}</a>
                              <a v-else @click.prevent="getCurrentAddrManualWithOutMap()" class="text-primary" style="color: orange !important; text-decoration: underline;">{{ $t("modal.label.refresh.address") }}</a>
                            </span>
                              
                          </div>     
                          
                          <div class="btn-group my-3 w-100" role="group" aria-label="">
                            <button type="button" id="btn-cancel-case" data-dismiss="modal" class="btn w-50 mr-2 bg-white border-secondary rounded strong">{{ $t("mainmenu.label.cancel") }}</button>
                            <button v-if="case_obj.status == 'Assigned' || case_obj.status == 'Accepted'" @click="updateClaimStatus('Arrived')"  type="button" id="btn-complete" class="btn w-50 bg-primary px-4 text-white rounded strong">{{ $t("mainmenu.label.ok") }}</button>
                            <button v-if="case_obj.status == 'Arrived'" @click="updateClaimStatus('Completed')"  type="button" id="btn-complete" class="btn w-50 bg-primary px-4 text-white rounded strong">{{ $t("realtimemap.label.complete") }}</button>
                          </div>
        
                    </div>
                </div>
            </div>
				</div>	
	</div>  <!-- end main -->
  </div>
</template>

<script>
import Global from "./GlobalVariable";
import Service from "./Service";
import mainLayout from "./mainLayout";
export default {
  mixins: [Service],
  name: "WorkActive",
  data() {
    return {
      Global: Global,
      Expand: true,
      custObj: {},
      surveyorObj: {},
      distance: "",
      duration: "",
      flagFullScrn: false,
      custPhoneNumber: "",
      claimId: "",
      currentAdress: "",
      flagTimer: true,
      userObj: {},
      case_obj: Global.claimObjSelect
    };
  },
  components: {
    mainLayout
  },
  methods: {
    sweetError: function(title, message) {
      this.$swal(title, message, "error").then(value => {
        return false;
      });
    },
    takePhoto: function() {
      var vm = this;
      navigator.camera.getPicture(vm.onTakePhotoSuccess, vm.onTakePhotoFail, {
        quality: 100,
        destinationType: Camera.DestinationType.FILE_URI,
        saveToPhotoAlbum: true
      });
    },
    onTakePhotoSuccess: function(imageURI) {
      var vm = this;
      vm.takePhoto();
    },
    onTakePhotoFail: function(message) {
      var vm = this;
      if (message != "No Image Selected") {
        vm.sweetError(vm.$t("surveyform.warn.error"), message);
      }
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
    getCurrentAddrManual: function() {
      $("#processing").modal("show");
      var vm = this;
      navigator.geolocation.getCurrentPosition(
        position => {
          vm.surveyorObj.sLastLat = position.coords.latitude;
          vm.surveyorObj.sLastLng = position.coords.longitude;
          vm.renderRealtimeSurvToMap(vm.surveyorObj);
          if (vm.custObj && vm.custObj.lastLat) {
            vm.getRoute();
          } else {
            var markerPoint = getLatLng(
              position.coords.latitude,
              position.coords.longitude
            );
            map.setCenter(markerPoint);
          }
          try {
            var google_map_pos = new google.maps.LatLng(
              vm.surveyorObj.sLastLat,
              vm.surveyorObj.sLastLng
            );
            /* Use Geocoder to get address */
            var google_maps_geocoder = new google.maps.Geocoder();
            google_maps_geocoder.geocode(
              {
                latLng: google_map_pos
              },
              function(results, status) {
                $("#processing").modal("hide");
                if (status == google.maps.GeocoderStatus.OK && results[0]) {
                  if (results.length > 1) {
                    //At index 0 have number xx/xx blah blah USER NOT USE
                    vm.currentAdress = results[1].formatted_address;
                  } else {
                    //IF HAVE length = 1 Usefull index 0 have number xx/xx blah blah USER NOT USE
                    vm.currentAdress = results[0].formatted_address;
                  }
                }
              }
            );
          } catch (e) {
            $("#processing").modal("hide");
            vm.currentAdress = "";
            console.log("!!!Exception getCurrentAddrManual", e);
            // hideLoading();
          }
        },
        error => {
          vm.currentAdress = "";
          $("#processing").modal("hide");
          console.log("Warning!!! Please Check GPS!!");
        },
        {
          maximumAge: 0,
          timeout: 5000,
          enableHighAccuracy: true
        }
      );
    },
    getCurrentLocation: function() {
      var vm = this;
      navigator.geolocation.getCurrentPosition(
        position => {
          if (vm.flagTimer) {
            $("#processing").modal("hide");
            vm.surveyorObj.sLastLat = position.coords.latitude;
            vm.surveyorObj.sLastLng = position.coords.longitude;
            vm.renderRealtimeSurvToMap(vm.surveyorObj);
            vm.focusMarker(vm.surveyorObj, false);
            // vm.renderRealtimeCustToMap(position.coords);
            if (vm.custObj && vm.custObj.reqLat) {
              vm.getRoute();
            } else {
              var markerPoint = getLatLng(
                position.coords.latitude,
                position.coords.longitude
              );
              map.setCenter(markerPoint);
            }
            try {
              var google_map_pos = new google.maps.LatLng(
                vm.surveyorObj.sLastLat,
                vm.surveyorObj.sLastLng
              );
              /* Use Geocoder to get address */
              var google_maps_geocoder = new google.maps.Geocoder();
              google_maps_geocoder.geocode(
                {
                  latLng: google_map_pos
                },
                function(results, status) {
                  $("#processing").modal("hide");
                  if (status == google.maps.GeocoderStatus.OK && results[0]) {
                    if (results.length > 1) {
                      //At index 0 have number xx/xx blah blah USER NOT USE
                      vm.surveyorObj.sLastLocaName =
                        results[1].formatted_address;
                      vm.currentAdress = results[1].formatted_address;
                    } else {
                      //IF HAVE length = 1 Usefull index 0 have number xx/xx blah blah USER NOT USE
                      vm.surveyorObj.sLastLocaName =
                        results[0].formatted_address;
                      vm.currentAdress = results[0].formatted_address;
                    }
                    vm.updateLocation();
                  }
                }
              );
            } catch (e) {
              $("#processing").modal("hide");
              vm.currentAdress = "";
              console.log("!!!Exception getCurrentLocation", e);
            }
          }
        },
        error => {
          $("#processing").modal("hide");
          console.log("getCurrentLocation!!! Please Check GPS!!");
        },
        {
          maximumAge: 0,
          timeout: 7000,
          enableHighAccuracy: true
        }
      );
    },
    getCurrentAddrManualWithOutMap: function() {
      console.log("BEGIN getCurrentAddrManualWithOutMap");
      $("#processing").modal("show");
      var vm = this;
      navigator.geolocation.getCurrentPosition(
        position => {
          vm.surveyorObj.sLastLat = position.coords.latitude;
          vm.surveyorObj.sLastLng = position.coords.longitude;
          try {
            var google_map_pos = new google.maps.LatLng(
              vm.surveyorObj.sLastLat,
              vm.surveyorObj.sLastLng
            );
            /* Use Geocoder to get address */
            var google_maps_geocoder = new google.maps.Geocoder();
            google_maps_geocoder.geocode(
              {
                latLng: google_map_pos
              },
              function(results, status) {
                $("#processing").modal("hide");
                if (status == google.maps.GeocoderStatus.OK && results[0]) {
                  if (results.length > 1) {
                    //At index 0 have number xx/xx blah blah USER NOT USE
                    vm.currentAdress = results[1].formatted_address;
                  } else {
                    //IF HAVE length = 1 Usefull index 0 have number xx/xx blah blah USER NOT USE
                    vm.currentAdress = results[0].formatted_address;
                  }
                }
              }
            );
          } catch (e) {
            $("#processing").modal("hide");
            vm.currentAdress = "";
            console.log("!!!Exception getCurrentAddrManual", e);
          }
        },
        error => {
          $("#processing").modal("hide");
          vm.currentAdress = "";
          console.log("Warning!!! Please Check GPS!!");
        },
        {
          maximumAge: 0,
          timeout: 5000,
          enableHighAccuracy: true
        }
      );
    },
    updateLocation: function(locatinObj) {
      var vm = this;
      var formData = new FormData();
      formData.append("id", vm.userObj.id);
      formData.append("sLastLat", vm.surveyorObj.sLastLat);
      formData.append("sLastLng", vm.surveyorObj.sLastLng);
      formData.append("sLastLocaName", vm.surveyorObj.sLastLocaName);
      this.axios
        .post(Global.claimBackend + "updateLocation", formData)
        .then(function(response) {
          if (
            response.status - 0 == 200 &&
            response.data &&
            response.data.code == "OK"
          ) {
            if (vm.flagTimer) {
              vm.startRealtime();
            }
          }
        })
        .catch(error => {
          console.log("!!ERROR updateLocation", error);
          vm.checkErrorExpire(error, function(flagLogin) {});
        });
    },
    renderRealtimeCustToMap: function(objLocation) {
      var vm = this;
      vm.clearMarker(Global.markerCustObj);
      var icon_url = "assets/images/surveyor/map/cus-pin.png";
      var tag =
        '<div class="row-manual" style="width:150px;">' +
        '<div class="col-manual" style="width:150px;">' +
        '<span class="f-size9"><i class="fas fa-exclamation-triangle"></i>: ' +
        objLocation.caseTypeName +
        "</span><br>" +
        '<span class="f-size9"><i class="fas fa-car"></i>: ' +
        objLocation.carLicense +
        "</span><br>" +
        '<span class="f-size9"><i class="fas fa-clock"></i>: ' +
        objLocation.createdDate +
        "</span><br>" +
        '<span class="f-size9"><i class="fas fa-mobile-alt"></i>: ' +
        objLocation.custPhoneNumber +
        "</span><br>" +
        '<span class="f-size9"><i class="fas fa-map-marker-alt"></i>: ' +
        objLocation.reqLocaName +
        "</span>" +
        "</div></div>";
      var lat = isNaN(objLocation["reqLat"]) ? 0 : objLocation["reqLat"];
      var lng = isNaN(objLocation["reqLng"]) ? 0 : objLocation["reqLng"];
      var markerPoint = getLatLng(lat, lng);
      var markerIcon = getIconCenterPoint(icon_url, 22, 32);
      var markerOpt = {
        position: markerPoint,
        map: map,
        icon: markerIcon,
        zIndex: 5
      };
      var marker = new google.maps.Marker(markerOpt);
      var info = new google.maps.InfoWindow({
        content:
          '<div style="font-size:12px; text-align:left;">' + tag + "</div>"
      });
      Global.markerCustObj = {
        marker: marker,
        info: info
      };
      google.maps.event.addListener(marker, "click", function() {
        info.open(map, marker);
        map.setCenter(markerPoint);
      });
    },
    focusMarker: function(row_data, flagCenter) {
      var lat = isNaN(row_data["sLastLat"]) ? 0 : row_data["sLastLat"];
      var lng = isNaN(row_data["sLastLng"]) ? 0 : row_data["sLastLng"];
      var icon_url = "assets/images/surveyor/map/focus2.gif";
      var tag = "";
      if (Global.focusMarker) {
        Global.focusMarker.setMap(null);
      }
      var focus_point = getLatLng(lat, lng);
      var focus_icon = getIconCenterPoint(icon_url, 40, 40);
      var focus_opt = {
        map: map,
        position: focus_point,
        icon: focus_icon,
        zIndex: 2,
        optimized: false
      };
      Global.focusMarker = new google.maps.Marker(focus_opt);
      var focusInfo = new google.maps.InfoWindow({
        content:
          '<div style="font-size:12px; text-align:left">' + tag + "</div>"
      });
      google.maps.event.addListener(Global.focusMarker, "click", function() {
        focusInfo.open(map, Global.focusMarker);
      });
      if (flagCenter) {
        map.setCenter(focus_point);
      }
    },
    startRealtime: function() {
      console.log("startRealtime");
      var vm = this;
      var frequency = localStorage.getItem("frequency") - 0;
      setTimeout(() => {
        if (vm.flagTimer) {
          vm.getCurrentLocation();
        }
      }, frequency * 1000);
    },
    clearMarker: function(markerObj) {
      if (markerObj && markerObj.marker) {
        markerObj.marker.setMap(null);
      }
    },
    closeInfo: function(markerObj) {
      if (markerObj.info) {
        markerObj.info.close();
      }
    },
    renderRealtimeSurvToMap: function(objLocation) {
      var vm = this;
      vm.clearMarker(Global.markerSurvObj);
      var icon_url = "assets/images/surveyor/map/ser-pin.png";
      var tag = "<br>";
      var lat = isNaN(objLocation["sLastLat"]) ? 0 : objLocation["sLastLat"];
      var lng = isNaN(objLocation["sLastLng"]) ? 0 : objLocation["sLastLng"];
      var markerPoint = getLatLng(lat, lng);
      var markerIcon = getIconCenterPoint(icon_url, 20, 60);
      var markerOpt = {
        position: markerPoint,
        map: map,
        icon: markerIcon,
        zIndex: 5
      };
      var marker = new google.maps.Marker(markerOpt);
      var info = new google.maps.InfoWindow({
        content:
          '<div style="font-size:12px; text-align:left;">' + tag + "</div>"
      });
      Global.markerSurvObj = {
        marker: marker,
        info: info
      };
      google.maps.event.addListener(marker, "click", function() {
        info.open(map, marker);
        map.setCenter(markerPoint);
      });
    },
    getRoute: function() {
      try {
        //Clear route map
        if (Global.directionsDisplay) {
          Global.directionsDisplay.setMap(null);

          //new to add route map
          Global.directionsDisplay = new google.maps.DirectionsRenderer({
            suppressMarkers: true,
            preserveViewport: true
          });
        } else {
          //new to add route map
          Global.directionsDisplay = new google.maps.DirectionsRenderer({
            suppressMarkers: true
          });
        }
        Global.directionsDisplay.setMap(map);
        var vm = this;
        Global.directionsService.route(
          {
            origin: new google.maps.LatLng({
              lat: vm.surveyorObj.sLastLat,
              lng: vm.surveyorObj.sLastLng
            }),
            destination: new google.maps.LatLng({
              lat: vm.custObj.reqLat,
              lng: vm.custObj.reqLng
            }),
            travelMode: "DRIVING",
            optimizeWaypoints: true,
            avoidFerries: true,
            avoidHighways: true,
            avoidTolls: true
          },
          function(response, status) {
            if (status === "OK") {
              var bounds = response.routes[0].bounds;
              google.maps.event.addListener(
                Global.directionsDisplay,
                "directions_changed",
                function() {
                  new google.maps.LatLng(
                    bounds.getCenter().lat(),
                    bounds.getCenter().lng()
                  );
                  var icon_url = "static/img/map/marker_motor_mini.png";
                  var markerPoint = getLatLng(
                    bounds.getCenter().lat() - 0,
                    bounds.getCenter().lng() - 0
                  );
                  var distance = response.routes[0].legs[0].distance.text;
                  var duration = response.routes[0].legs[0].duration.text;
                  vm.distance = distance;
                  vm.duration = duration;
                  getIconCenterPoint(icon_url, 22, 32);
                  map.setCenter(markerPoint);
                  var markerOpt = {
                    position: markerPoint,
                    map: map,
                    icon: {
                      path: google.maps.SymbolPath.CIRCLE,
                      scale: 0
                    },
                    // label: distance,
                    zIndex: 5
                  };
                  var marker = new google.maps.Marker(markerOpt);
                  var info = new google.maps.InfoWindow({
                    content:
                      '<i class="fas fa-car"></i> <span class="f-size12" style="color:green"><b>' +
                      duration +
                      '</b></span><br><span class="f-size10">' +
                      distance +
                      "</span>"
                  });
                  // info.open(map, marker);
                  Global.markerRoute = {
                    marker: marker,
                    info: info
                  };
                  setTimeout(() => {
                    google.maps.event.trigger(map, "resize");
                  }, 500);
                }
              );
              Global.directionsDisplay.setDirections(response);
            } else {
              console.log("Route Direction!!! Please Check GPS");
            }
          }
        );
      } catch (e) {
        console.log("!!!Exception Route Direction", e);
      }
    },
    validateFormConf: function(statusId) {
      var vm = this;
      var msgValidate = "";
      if (!vm.currentAdress) {
        msgValidate += "Location details";
      }
      if (msgValidate == "") {
        return true;
      } else {
        this.$swal("Please Enter Data!!!", msgValidate, "error");
        return false;
      }
    },
    updateClaimStatus: function(status) {
      var vm = this;
      var user_obj = localStorage.getItem("user_obj")
        ? JSON.parse(localStorage.getItem("user_obj"))
        : "";
      if (vm.validateFormConf()) {
        $("#processing").modal("show");
        // var case_obj = JSON.parse(localStorage.getItem("case_obj"));
        var case_obj = vm.case_obj;
        var formData = new FormData();
        formData.append("claimId", case_obj.id);
        formData.append("status", status);
        formData.append("surveyorRemark", "");
        formData.append(
          "survEndLat",
          vm.surveyorObj.sLastLat ? vm.surveyorObj.sLastLat : 0
        );
        formData.append(
          "survEndLng",
          vm.surveyorObj.sLastLng ? vm.surveyorObj.sLastLng : 0
        );

        formData.append("survEndAddress", vm.currentAdress);
        formData.append("fcmToken", localStorage.getItem("fcm_token"));
        formData.append("surveyorId", user_obj.id);

        vm.axios
          .post(Global.claimBackend + "updateClaimStatus", formData)
          .then(function(response) {
            $("#processing").modal("hide");
            if (
              response.status == 200 &&
              response.data &&
              response.data.code == "OK"
            ) {
              if (status == "Completed") {
                vm.flagTimer = false;
                // localStorage.setItem("case_obj", "");
                vm.$set(Global, "claimObjSelect", {});
                vm.case_obj = {};
                vm.$swal(
                  vm.$t("mainmenu.label.warning.save"),
                  vm.$t("mainmenu.label.warning.save.complete"),
                  "success"
                ).then(ok => {
                  if (ok) {
                    $("#completemodal").modal("hide");
                    vm.$router.push("/mainmenu");
                  }
                });
                // if (localStorage.getItem("user_obj")) {
              } else {
                let resp_str = response.data.data;
                let resp_obj = JSON.parse(resp_str);
                vm.$set(Global, "claimObjSelect", resp_obj);
                // vm.$set(Global,"claimObjSelect",resp_obj);
                vm.case_obj = resp_obj;
                // vm.case_obj.status = status;
                // var case_obj = JSON.parse(localStorage.getItem("case_obj"));
                // case_obj.status = status;
                // localStorage.setItem("case_obj", JSON.stringify(resp_obj));
                vm.$swal(
                  vm.$t("mainmenu.label.warning.save"),
                  vm.$t("mainmenu.label.warning.save.complete"),
                  "success"
                ).then(ok => {
                  if (ok) {
                    $("#completemodal").modal("hide");
                  }
                });
              }

              // } else {
              //   vm.$router.push("/");
              // }
            } else {
              vm.$swal(
                vm.$t("mainmenu.label.warning.save"),
                vm.$t("mainmenu.label.warning.save.error"),
                "errors"
              );
            }
          })
          .catch(error => {
            $("#processing").modal("hide");
            console.log("!!ERROR updateClaimStatus", error);
            vm.checkErrorExpire(error, function(flagExpire) {});
          });
      }
    },
    openSurveyForm: function() {
      var vm = this;
      vm.flagTimer = false;
      Global.case_obj = vm.custObj;
      vm.$router.push("/surveyorform");
    },
    callPhone: function() {
      var vm = this;
      $("#processing").modal("show");
      setTimeout(() => {
        window.plugins.CallNumber.callNumber(
          onSuccess,
          onError,
          vm.custPhoneNumber,
          false
        );
      }, 500);

      function onSuccess(result) {
        $("#processing").modal("hide");
        console.log("Success:" + result);
      }

      function onError(result) {
        $("#processing").modal("hide");
        console.log("Error:" + result);
      }
    },
    getCurrentAddrManual: function() {
      $("#processing").modal("show");
      var vm = this;
      navigator.geolocation.getCurrentPosition(
        position => {
          vm.surveyorObj.sLastLat = position.coords.latitude;
          vm.surveyorObj.sLastLng = position.coords.longitude;
          try {
            var google_map_pos = new google.maps.LatLng(
              vm.surveyorObj.sLastLat,
              vm.surveyorObj.sLastLng
            );
            /* Use Geocoder to get address */
            var google_maps_geocoder = new google.maps.Geocoder();
            google_maps_geocoder.geocode(
              {
                latLng: google_map_pos
              },
              function(results, status) {
                // console.log("Get Address results::", results);
                $("#processing").modal("hide");
                if (status == google.maps.GeocoderStatus.OK && results[0]) {
                  if (results.length > 1) {
                    //At index 0 have number xx/xx blah blah USER NOT USE
                    vm.currentAdress = results[1].formatted_address;
                  } else {
                    //IF HAVE length = 1 Usefull index 0 have number xx/xx blah blah USER NOT USE
                    vm.currentAdress = results[0].formatted_address;
                  }
                }
              }
            );
          } catch (e) {
            $("#processing").modal("hide");
            vm.currentAdress = "";
            console.log("!!!Exception getCurrentAddrManual", e);
          }
          vm.renderRealtimeSurvToMap(vm.surveyorObj);
          if (vm.custObj && vm.custObj.lastLat) {
            vm.getRoute();
          } else {
            var markerPoint = getLatLng(
              position.coords.latitude,
              position.coords.longitude
            );
            map.setCenter(markerPoint);
          }
        },
        error => {
          $("#processing").modal("hide");
          vm.currentAdress = "";
          console.log("Warning!!! Please Check GPS!!");
        },
        {
          maximumAge: 0,
          timeout: 5000,
          enableHighAccuracy: true
        }
      );
    }
  },
  computed: {
    DisplayAppointment: function() {
      var vm = this;
      if (vm.case_obj.appointmentTimeC) {
        return new Date(Date.parse(vm.case_obj.appointmentTimeC) + 25200000);
      } else {
        return null;
      }
    },
    DisaplayCreatDate: function() {
      var vm = this;
      if (vm.case_obj.createdDate) {
        return new Date(Date.parse(vm.case_obj.createdDate) + 25200000);
      } else {
        return null;
      }
    }
  },
  mounted() {
    console.log("!!WorkActive");
    /* The case received from getClaimByCondition is different from updateClaimStatus */
    var vm = this;
    $("#collapseAccepted").on("hidden.bs.collapse", function() {
      vm.Expand = false;
    });
    $("#collapseAccepted").on("shown.bs.collapse", function() {
      vm.Expand = true;
    });

    $("#completemodal").on("shown.bs.modal", function() {
      // vm.flagTimer = false;
      if (vm.case_obj.status != "Arrived") {
        vm.getCurrentAddrManual();
      } else {
        vm.getCurrentAddrManualWithOutMap();
      }
    });

    var vm = this;
    vm.userObj = JSON.parse(localStorage.getItem("user_obj"));
    vm.custObj = vm.case_obj;
    vm.checkTokenForHttp(function() {
      if (vm.case_obj.status != "Arrived") {
        vm.getCurrentLocation();
        Global.directionsService = new google.maps.DirectionsService();
        LoadGmap(); //**Mobile
        map.setZoom(9); //**Mobile
        //IF Location from inform have value
        if (
          Global.claimObjSelect.reqLat &&
          Global.claimObjSelect.reqLat - 0 > 0
        ) {
          console.log("renderRealtimeCustToMap");
          vm.renderRealtimeCustToMap(vm.custObj);
        }
      }
    });

    // vm.case_obj = case_obj;
    vm.custPhoneNumber = vm.case_obj.custPhoneNumber;
    vm.claimId = vm.case_obj.id;
    vm.setUnlockScreen();
  }
};
</script>
