<script>
import Global from "./GlobalVariable";

export default {
  data() {
    return {
      isScenarioUpdate:false
    }
  },
  methods: {
    openErrorMessageModal: function (msg, title) {
      var vm = this;
      var msgSplit = msg.split(",");
      var message = "<ul>";
      for (var i = 0; i < msgSplit.length; i++)
        message += "<li>" + msgSplit[i] + "</li>";
      message += "</ul>";
      $("#error-modal-title").html(title || vm.$t("label.label.found.error"));
      $("#errMsg").html(message);
      $("#errmsgModal").modal("show");
    },
    getFormData: function () {
      var formData = new FormData();
      return formData;
    },
    checkGpsOpen: function (callb) {
      var vm = this;
      var callback = callb;
      if (device.platform == "Android") {
        checkGpsAndroid();
      } else {
        checkGpsIos();
      }

      function checkGpsAndroid() {
        cordova.plugins.diagnostic.getLocationMode(function (locationMode) {
          if (
            locationMode ==
            cordova.plugins.diagnostic.locationMode.HIGH_ACCURACY
          ) {
            console.log("High accuracy");
            callback(true);
          } else if (
            locationMode ==
            cordova.plugins.diagnostic.locationMode.BATTERY_SAVING
          ) {
            console.log("Battery saving");
            vm.$swal("Battery saving!", "Battery is Low.", "error");
            callback(false);
          } else if (
            locationMode == cordova.plugins.diagnostic.locationMode.DEVICE_ONLY
          ) {
            console.log("Device only");
            vm.$swal("Device!", "Device only.", "error");
            callback(false);
          } else if (
            locationMode == cordova.plugins.diagnostic.locationMode.LOCATION_OFF
          ) {
            console.log("Location off");
            vm.$swal({
              title: "Use location?",
              html:
                '<div class="row-manual al-left">This app want to change your device settings. <i class="fas fa-map-marker"></i></div>',
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              cancelButtonText: "NO",
              confirmButtonText: "YES",
            }).then((result) => {
              cordova.plugins.diagnostic.switchToLocationSettings();
              callback(false);
            });
          }
        });
      }

      function checkGpsIos() {
        cordova.plugins.diagnostic.getLocationAuthorizationStatus(function (
          status
        ) {
          switch (status) {
            case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
              console.log("!!Permission not requested");
              cordova.plugins.diagnostic.requestLocationAuthorization(
                checkGpsIos,
                onError
              );
              callback(false);
              break;
            case cordova.plugins.diagnostic.permissionStatus.DENIED:
              console.log("!!Permission denied");
              navigator.notification.confirm(
                // cordova-plugin-dialogs
                "!!The app has been denied permission to use location but requires it because blah.\nWould you like to open the Settings page to manually allow location for the app?",
                function (i) {
                  if (i === 1) {
                    navigator.notification.alert(
                      '!!The Settings page for the app will now open. Select "Location" and set it to "Always" then return to this app via the Home screen',
                      cordova.plugins.diagnostic.switchToSettings,
                      "!!Opening Settings page"
                    );
                  }
                },
                "!!Location permission is required",
                ["Yes", "No"]
              );
              callback(false);
              break;
            case cordova.plugins.diagnostic.permissionStatus.GRANTED:
              console.log("!!Permission granted always");
              callback(true);
              break;
          }
        },
        onError);

        function onError(error) {
          console.error("The following error occurred: " + error);
        }
      }
    },
    loginAuth: function (callBack) {
      var vm = this;
      var dt = new Date().getTime();
      var uuid = 'xxxxxxxxxxxxxx-*-xxxxxxxxxxxxx'.replace(/[x]/g, function(c) { var r = (dt + Math.random()*16)%16 | 0; return (c=='x' ? r :(r&0x3|0x8)).toString(16); });
      $("#processing").modal("show");
      var vm = this;
        let authData = vm.CryptoJS.AES.encrypt(uuid.replace("*",Global.username), dt.toString()).toString() + "-" +
                       vm.CryptoJS.AES.encrypt(uuid.replace("*",Global.password), dt.toString()).toString() + "-" +
                       vm.CryptoJS.AES.encrypt(dt.toString(), dt.toString())+ "-" + dt.toString();
         vm.axios.post(Global.claimBackend + 'login', {
               upscec: btoa(authData),
               env: "mobile"
        })
        .then(function (response) {
          $("#processing").modal("hide");
          if (response.status == "200") {
            if (response.data && response.data.access_token) {
              localStorage.setItem("access_token", response.data.access_token);
              localStorage.setItem("token_type", response.data.token_type);
              vm.axios.defaults.headers.common["Authorization"] =
                response.data.token_type + " " + response.data.access_token;
              
              vm.getSystemConfByCondition(callBack);
              
            } else {
              vm.$swal("Server is not provide token", "", "error").then(
                (value) => {
                  callBack(false);
                }
              );
            }
          } else {
            $("#processing").modal("hide");
            vm.$swal("Error Server", "", "error").then((value) => {
              callBack(false);
            });
          }
        })
        .catch((error) => {
          $("#processing").modal("hide");
          if (
            error &&
            (error.toString().search("Network Error") > -1 ||
              error.toString().search("Network Error") > -1)
          ) {
            vm.$swal(
              vm.$t("mainmenu.label.warning"),
              vm.$t("mainmenu.label.check.internet"),
              "error"
            ).then((value) => {
              callBack(false);
            });
          } else {
            callBack(false);
          }
        });
    },
    downloadImgScenario:function() {
      var vm = this;
       $("#processing").modal("show");
      vm.axios
        .post(Global.claimBackend + "downloadClaimScenario")
        .then(res=>{
           $("#processing").modal("hide");
           if (res.data && res.data.code == "OK" && res.data.data){
             var imagesArr = JSON.stringify(res.data.data);
             localStorage.setItem("ScenarioImages",imagesArr)
           }
           return;
        }).catch(function (error) {
          console.log("error donwloadImgScenario", error);
          $("#processing").modal("hide");
          return;
        });
    },
    getSystemConfByCondition: function (callBack) {
      var vm = this;
      var formData = new FormData();
      formData.append("category", "claim-surveyor-app");
      vm.axios
        .post(Global.claimBackend + "getSystemConfByCondition", formData)
        .then(function (response) {
          console.log("1.Sys@",response.data);
          console.log("2.Sys@",response.data.data);
          if (
            response.data &&
            response.data.code == "OK" &&
            response.data.data
          ) {
            var confAr = JSON.parse(response.data.data);
            // var confDat = confAr[0];
            $.each(confAr, function (index, obj) {
              if (obj.name == "frequency") {
                localStorage.setItem("frequency", obj.value);
              }
              if (obj.name == "frequency-no-case") {
                localStorage.setItem("frequency-no-case", obj.value);
              }
              if (obj.name == "version-code") {
                localStorage.setItem("version-code", obj.value);
              }
              if (obj.name == "url-google-play-store") {
                localStorage.setItem("url-google-play-store", obj.value);
              }
              if (obj.name == "SightCallApiKey") {
                localStorage.setItem("SightCallApiKey", obj.value);
              }
              if (obj.name == "RoojaiDocUsername") {
                localStorage.setItem("RoojaiDocUsername", obj.value);
              }
              if (obj.name == "RoojaiDocPass") {
                localStorage.setItem("RoojaiDocPass", obj.value);
              }
              if (obj.name == "img-version"){
                let currentVersion = localStorage.getItem("img-version")
                if(currentVersion &&currentVersion!=obj.value){
                  // vm.isScenarioUpdate = true
                  // if(isScenarioUpdate){
                    vm.downloadImgScenario()
                    localStorage.setItem("img-version", obj.value);
                  // }
                }else if(!currentVersion){
                    localStorage.setItem("img-version", obj.value);
                    vm.downloadImgScenario()
                }
                
              }
            });
          }
         
          callBack(true);
        })
        .catch(function (error) {
          console.log("error getSystemConfByCondition", error);
          $("#processing").modal("hide");
          vm.checkErrorExpire(error, function (flagLogin) {
            if (flagLogin) {
              vm.getSystemConfByCondition();
            }
          });
        });
    },
    checkErrorExpire: function (error, callback) {
      var vm = this;
      if (error.response && error.response.status == 401) {
        localStorage.setItem("token_type", "");
        localStorage.setItem("access_token", "");
        localStorage.setItem("user_obj", "");
        vm.$router.replace("/");
        // window.location.assign("/")
        // vm.loginAuth(function(flagLogin) {
        //   callback(flagLogin);
        // });
      } else {
        if (
          error &&
          (error.toString().search("Network Error") > -1 ||
            error.toString().search("Network Error") > -1)
        ) {
          vm.$swal(
            vm.$t("mainmenu.label.warning"),
            vm.$t("mainmenu.label.check.internet"),
            "error"
          ).then((value) => {
            callback(false);
          });
        } else {
          callback(false);
        }
      }
    },
    checkTokenForHttp: function (callBack) {
      var vm = this;
      if (localStorage.getItem("access_token") && localStorage.getItem("token_type")) 
      {
        vm.axios.defaults.headers.common["Authorization"] =
          localStorage.getItem("token_type") +
          " " +
          localStorage.getItem("access_token");
        callBack();
      } else {
        vm.$router.replace("/");
      }
    },
    setUnlockScreen: function (flagUnlock) {
      document.addEventListener(
        "deviceready",
        function () {
          console.log("start set unlock screen!!");
          // alert("Start unlock");
          window.screenLocker.unlock(successCallback, errorCallback);
        },
        false
      );
      var successCallback = function () {
        console.log("screen unlock success");
      };

      var errorCallback = function (e) {
        console.log("error: " + e);
      };
    },
    trickerToSurveyorAppsData: function (processStatus, callBack) {
      var vm = this;
      var formData = new FormData();
      var fcmIdC = localStorage.getItem("fcm_token");
      var encryptedCustomerId = localStorage.getItem("encryptedCustomerId");
      formData.append("processStatus", processStatus);
      formData.append("deviceIdC", device.uuid);
      
      //send svSessionId for update sfid to surveyor session info later to support sf doesn't generate yet!
      if(localStorage.getItem('user_obj')){
        var userObj = JSON.parse(localStorage.getItem('user_obj'));
        formData.append("svSessionId", userObj.id);
      }


      if (processStatus == "first_time_second_time") {
        formData.append("name", device.manufacturer);
        formData.append("deviceManufacturerC", device.manufacturer);
        formData.append("deviceModelC", device.model);
        formData.append("deviceOsNameC", device.platform);
        formData.append("fcmIdC", fcmIdC);
        formData.append("deviceOsVersionC", device.version);
        formData.append("appVersionC", Global.versionApp);
        
      } else if (processStatus == "login") {
        formData.append(
          "name",
          Global.surveyorName + "/" + device.manufacturer
          // Global.surveyorName + "/" + "xSasdadxadsa"
        );
        formData.append("activeDeviceFlagC", "yes");
        formData.append("lastLoginDateC",new Date())
        formData.append("firstLoginDateC",new Date())
        formData.append("encryptedCustomerId", encryptedCustomerId);
      }
      vm.axios
        .post(Global.claimBackend + "saveSurveyorAppData", formData)
        .then(function (response) {
          $("#processing").modal("hide");
          if (
            response.status == 200 &&
            response.data &&
            response.data.code == "OK"
          ) {
            var surveyorAppDataObj = response.data.data;
            Global.surveyAppDataId = surveyorAppDataObj.id;
            localStorage.setItem(
              "surveyorHerokuExternalIdC",
              surveyorAppDataObj.herokuExternalIdC
            );
            callBack(true);
          } else {
            callBack(false);
            localStorage.setItem("surveyorHerokuExternalIdC", "");
          }
        })
        .catch((error) => {
          callBack(false);
          $("#processing").modal("hide");
        });
    },
    openSightCall: function (param) {
      var vm = this;
      if(localStorage.getItem("SightCallApiKey")){
        let key = localStorage.getItem("SightCallApiKey")
         window.open("sightcall://rtcc/prod?sightcall="+ key +"&displayname=" +param,"_system","location=yes");
      }else{
        vm.getSystemConfByCondition(false)
        vm.openSightCall(param)
      }
     
    },
    changeLocale: function (input, label) {
      var vm = this;
      if (label) {
        vm.$swal({
          // title: "Do you want to change language to " + label + " ?",
          html:
            '<div class="f-size12"><b>Do you want to change language to ' +
            label +
            " ? </b></div>",
          //   '<div class="row-manual al-left">This Case is Complete.</div>',
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "NO",
          confirmButtonText: "YES",
        }).then(function (json_data) {
          if(json_data.hasOwnProperty('value')){
            vm.$i18n.locale = input;
            localStorage.setItem("locale", input);
          }else{
            return false;
          }
          
        });
      } else {
        vm.$i18n.locale = input;
        localStorage.setItem("locale", input);
      }
    },
    getCurrentDate: function () {
      var vm = this;
      moment().locale("th");

      var weekday = vm.getWeekday(moment().isoWeekday());
      var date = moment().format("DD");
      var month = vm.getMonthText(moment().month());
      var year;
      if (vm._i18n.locale == "th") {
        year = moment().add(543, "year").format("YYYY");
      } else {
        year = moment().format("YYYY");
      }

      return weekday + " " + date + " " + month + " " + year;
    },
    getWeekday:function(num){
      var vm = this;
      switch(num){
        case 1: 
          if(vm._i18n.locale == "th"){
            return "วันจันทร์ที่ "
          }else{
            return "Monday "
          }
          break;
        case 2: 
          if(vm._i18n.locale == "th"){
            return "วันอังคารที่ "
          }else{
            return "Tuesday "
          }
          break;
        case 3: 
          if(vm._i18n.locale == "th"){
            return "วันพุธที่ "
          }else{
            return "Wednesday "
          }
          break;
        case 4: 
          if(vm._i18n.locale == "th"){
            return "วันพฤหัสบดีที่ "
          }else{
            return "Thurseday "
          }
          break;
        case 5: 
          if(vm._i18n.locale == "th"){
            return "วันศุกร์ที่ "
          }else{
            return "Friday "
          }
          break;
        case 6: 
          if(vm._i18n.locale == "th"){
            return "วันเสาร์ที่ "
          }else{
            return "Saturday "
          }
          break;
        case 7: 
          if(vm._i18n.locale == "th"){
            return "วันอาทิตย์ ที่ "
          }else{
            return "Sunday "
          }
          break;
      }
    },
    getMonthText(num){
      var vm = this;
      num = num +1;
      if(vm._i18n.locale == "th"){
        switch(num){
          case 1: return "มกราคม"; break;
          case 2: return "กุมพาพันธุ์"; break;
          case 3: return "มีนาคม"; break;
          case 4: return "เมษายน"; break;
          case 5: return "พฤษภาคม"; break;
          case 6: return "มิถุนายน"; break;
          case 7: return "กรกฎาคม"; break;
          case 8: return "สิงหาคม"; break;
          case 9: return "กันยายน"; break;
          case 10: return "ตุลาคม"; break;
          case 11: return "พฤศจิกายน"; break;
          case 12: return "ธันวาคม"; break;
        }
      }else{
        switch(num){
          case 1: return "January"; break;
          case 2: return "February"; break;
          case 3: return "March"; break;
          case 4: return "April"; break;
          case 5: return "May"; break;
          case 6: return "June"; break;
          case 7: return "July"; break;
          case 8: return "August"; break;
          case 9: return "September"; break;
          case 10: return "October"; break;
          case 11: return "November"; break;
          case 12: return "December"; break;
        }
      }
    },
     updateSurveyLocation: function() {
         var vm = this;
         var formData = new FormData();
         var userObj = JSON.parse(localStorage.getItem('user_obj'));
         formData.append('id', userObj.id);
         formData.append('sLastLat', Global.surveyorObj.sLastLat);
         formData.append('sLastLng', Global.surveyorObj.sLastLng);
         formData.append('sLastLocaName', Global.currentAdress);
         this.axios
            .post(Global.claimBackend + 'updateLocation', formData)
            .then(function(response) {
               if (response.status && response.status - 0 == 200 && response.data && response.data.code == 'OK') {
                  var resObj = JSON.parse(response.data.data);
                  Global.lastUpdate = resObj.lastUpdate;
                  if (Global.flagTimerSendLocation) {
                  }
               }
            })
            .catch(error => {
               console.log('!!ERROR updateSurveyLocation', error);
            });
      },
    getDistanceFromRoute: function () {
      var vm = this;
      var directionsService = new google.maps.DirectionsService();
      var directionsDisplay = new google.maps.DirectionsRenderer({
        suppressMarkers: true,
        preserveViewport: true,
      });
      directionsService.route(
        {
          origin: new google.maps.LatLng({
            lat: Global.claimObjSelect.reqLat,
            lng: Global.claimObjSelect.reqLng,
          }),
          destination: new google.maps.LatLng({
            lat: Global.surveyorObj.sLastLat,
            lng: Global.surveyorObj.sLastLng,
          }),
          travelMode: "DRIVING",
          optimizeWaypoints: true,
          avoidFerries: true,
          avoidHighways: true,
          avoidTolls: true,
        },
        function (response, status) {
          if (status === "OK") {
            var bounds = response.routes[0].bounds;
            google.maps.event.addListener(
              directionsDisplay,
              "directions_changed",
              function () {
                new google.maps.LatLng(
                  bounds.getCenter().lat(),
                  bounds.getCenter().lng()
                );
                getLatLng(
                  bounds.getCenter().lat() - 0,
                  bounds.getCenter().lng() - 0
                );
                var distance = (
                  response.routes[0].legs[0].distance.value / 1000
                ).toFixed(3);
                var duration = (
                  response.routes[0].legs[0].duration.value / 60
                ).toFixed(3);
                vm.$set(Global,"approxDistance",distance);
                vm.$set(Global,"approxTime",duration);
                
              }
            );
            directionsDisplay.setDirections(response);
          } else {
            console.log("Route Direction!!! Please Check GPS");
            // vm.$swal("Warning!!!", "Please Check GPS!!", "error");
            // window.alert('Directions request failed due to ' + status);
          }
        }
      );
    },
    getCurrentAddressManual: function () {
      var vm = this;
      navigator.geolocation.getCurrentPosition(
        (position) => {
          vm.$set(Global.surveyorObj,"sLastLat",position.coords.latitude);
          vm.$set(Global.surveyorObj,"sLastLng",position.coords.longitude);

          try {
            var google_map_pos = new google.maps.LatLng(
              Global.surveyorObj.sLastLat,
              Global.surveyorObj.sLastLng
            );
            /* Use Geocoder to get address */
            var google_maps_geocoder = new google.maps.Geocoder();
            google_maps_geocoder.geocode(
              {
                latLng: google_map_pos,
              },
              function (results, status) {
                if (status == google.maps.GeocoderStatus.OK && results[0]) {
                  vm.getDistanceFromRoute();
                  if (results.length > 1) {
                    //At index 0 have number xx/xx blah blah USER NOT USE
                    vm.$set(Global,"currentAdress",results[1].formatted_address);
                  } else {
                    //IF HAVE length = 1 Usefull index 0 have number xx/xx blah blah USER NOT USE
                    vm.$set(Global,"currentAdress",results[0].formatted_address);
                  }
                  vm.$set(Global,"gpsStatus","1")
                } else {
                  vm.$set(Global,"gpsStatus","0")
                }
              }
            );
          } catch (e) {
            console.log("!!!Exception getCurrentAddressManual", e);
            vm.$set(Global,"currentAdress","");
            vm.$set(Global,"gpsStatus","0")
          }
        },
        (error) => {
          console.log("Warning!!! Please Check GPS!!");
          vm.$set(Global,"gpsStatus","0")
          vm.$set(Global,"currentAdress","");
        },
        {
          maximumAge: 0,
          timeout: 5000,
          enableHighAccuracy: true,
        }
      );
    },
    getLocationToUpdate: function () {
      var vm = this;
      navigator.geolocation.getCurrentPosition(
        (position) => {
          vm.$set(Global.surveyorObj,"sLastLat",position.coords.latitude);
          vm.$set(Global.surveyorObj,"sLastLng",position.coords.longitude);

          try {
            var google_map_pos = new google.maps.LatLng(
              Global.surveyorObj.sLastLat,
              Global.surveyorObj.sLastLng
            );
            /* Use Geocoder to get address */
            var google_maps_geocoder = new google.maps.Geocoder();
            google_maps_geocoder.geocode(
              {
                latLng: google_map_pos,
              },
              function (results, status) {
                if (status == google.maps.GeocoderStatus.OK && results[0]) {
                  if (results.length > 1) {
                    //At index 0 have number xx/xx blah blah USER NOT USE
                    vm.$set(Global,"currentAdress",results[1].formatted_address);
                  } else {
                    //IF HAVE length = 1 Usefull index 0 have number xx/xx blah blah USER NOT USE
                    vm.$set(Global,"currentAdress",results[0].formatted_address);
                  }
                  vm.$set(Global,"gpsStatus","1")
                  vm.updateSurveyLocation();
                } else {
                  vm.$set(Global,"gpsStatus","0")
                }
              }
            );
          } catch (e) {
            console.log("!!!Exception getLocationToUpdate", e);
            $('#processing').modal('hide');
             vm.$set(Global,"gpsStatus","0")
          }
        },
        (error) => {
          $('#processing').modal('hide');
          console.log("Warning!!! Please Check GPS to realtime!!");
          vm.$set(Global,"gpsStatus","0")
        },
        {
          maximumAge: 0,
          timeout: 7000,
          enableHighAccuracy: true,
        }
      );
    }
  },
  mounted() {
    // alert("Test");
    //if no value to set default
    if (!localStorage.getItem("frequency")) {
      localStorage.setItem("frequency", Global.defaultFrequency);
    }
    if (!localStorage.getItem("frequency-no-case")) {
      localStorage.setItem("frequency-no-case", Global.defaultFrequencyNoCase);
    }
    var vm = this;
    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
      document.addEventListener("backbutton", onBackKeyDown, false); //Listen to the User clicking on the back button
    }

    function onBackKeyDown(e) {
      e.preventDefault();
      navigator.notification.confirm(
        vm.$t("mainmenu.label.do.you.need.to.exit"),
        onConfirm,
        vm.$t("mainmenu.label.confirm"),
        vm.$t("mainmenu.label.ok") + "," + vm.$t("mainmenu.label.cancel")
      );
      // Prompt the user with the choice
    }

    function handleOpenURL(url) {
      console.log("received url: " + url);
    }
  },
};
</script>
