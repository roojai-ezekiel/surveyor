
<style>
</style>
<template>
  <div class="main-content">
    <mainLayout></mainLayout>
    <div class="container">
      <div class="row" style="height: 100vh">
        <div class="col text-center mb-5">
          <form v-show="showFormPhone" class="mt-5">
            <img src="assets/img/roojai-logo.png" class="img-fluid mb-3" />
            <h3 class="text-secondary">{{ $t("login.label.surveyor") }}</h3>

            <div class="form-group text-secondary">
              <label for="phone-number">{{ $t("login.label.phone.number") }}</label>
              <input
                type="number"
                class="form-control text-center"
                id="phone-number"
                placeholder="08X XXX XXXX"
                maxlength="10"
                v-model="mobileNo"
              />
            </div>
            <button
              type="button"
              class="btn btn-primary btn-send-otp strong"
              @click="checkDataToCreateOTP()"
            >
              {{ $t("login.label.send.otp") }}
            </button>
          </form>
          <form v-show="!showFormPhone" class="mt-5">
            <img src="assets/img/roojai-logo.png" class="img-fluid mb-3" />
            <h3 class="text-secondary">{{ $t("login.label.surveyor") }}</h3>

            <div class="form-group text-secondary">
              <label for="otp-number"
                >{{$t("login.label.otp.code")}} ({{$t("login.label.ref.code")}} :
                <span class="strong">{{ refID }}</span> )</label
              >
              <input
                type="number"
                class="form-control text-center"
                id="otp-number"
                maxlength="6"
                v-model="otp"
              />
            </div>
            <button
              type="button"
              class="btn btn-primary btn-verify-otp strong"
              @click="prepareDataToVerify()"
            >
              {{$t("login.label.verify.otp")}}
            </button>
            <p class="text-secondary small mt-3">
              {{ $t("login.label.didnt.otp") }}
              <a @click="showFormPhone = true" class="text-primary">{{ $t("login.label.resent.otp") }}</a>
            </p>
          </form>
        </div>
      </div>

      <div class="fixed-bottom text-center py-3">
        <button
          type="button"
          class="btn btn-outline-primary d-block mb-3 mx-auto"
          @click="$router.push('/garagecall')"
        >
          {{ $t("workshop.page") }}
        </button>
        <button
          type="button"
          class="btn btn-link btn-sm text-secondary"
          @click="changeLocale('th', 'ไทย')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 512 512"
          >
            <path fill="#f0f0f0" d="M0 85.334h512V426.66H0z" />
            <path fill="#0052b4" d="M0 194.056h512v123.882H0z" />
            <g fill="#d80027">
              <path d="M0 85.334h512v54.522H0zM0 372.143h512v54.522H0z" />
            </g>
          </svg>
          ภาษาไทย
        </button>
        &nbsp;|&nbsp;
        <button
          type="button"
          class="btn btn-link btn-sm text-secondary"
          @click="changeLocale('en', 'English')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 512 512"
          >
            <path fill="#f0f0f0" d="M0 85.333h512V426.67H0z" />
            <path
              fill="#d80027"
              d="M288 85.33h-64v138.666H0v64h224v138.666h64V287.996h224v-64H288z"
            />
            <g fill="#0052b4">
              <path
                d="M393.785 315.358L512 381.034v-65.676zM311.652 315.358L512 426.662v-31.474l-143.693-79.83zM458.634 426.662l-146.982-81.664v81.664z"
              />
            </g>
            <path
              fill="#f0f0f0"
              d="M311.652 315.358L512 426.662v-31.474l-143.693-79.83z"
            />
            <path
              fill="#d80027"
              d="M311.652 315.358L512 426.662v-31.474l-143.693-79.83z"
            />
            <g fill="#0052b4">
              <path
                d="M90.341 315.356L0 365.546v-50.19zM200.348 329.51v97.151H25.491z"
              />
            </g>
            <path
              fill="#d80027"
              d="M143.693 315.358L0 395.188v31.474l200.348-111.304z"
            />
            <g fill="#0052b4">
              <path
                d="M118.215 196.634L0 130.958v65.676zM200.348 196.634L0 85.33v31.474l143.693 79.83zM53.366 85.33l146.982 81.664V85.33z"
              />
            </g>
            <path
              fill="#f0f0f0"
              d="M200.348 196.634L0 85.33v31.474l143.693 79.83z"
            />
            <path
              fill="#d80027"
              d="M200.348 196.634L0 85.33v31.474l143.693 79.83z"
            />
            <g fill="#0052b4">
              <path
                d="M421.659 196.636L512 146.446v50.19zM311.652 182.482V85.331h174.857z"
              />
            </g>
            <path
              fill="#d80027"
              d="M368.307 196.634L512 116.804V85.33L311.652 196.634z"
            />
          </svg>
          English
        </button>
      </div>
    </div>
    <!-- end container -->
  </div>
  <!-- end main -->
</template>

<script>
import Global from "./GlobalVariable";
import Service from "./Service";
import mainLayout from "./mainLayout";

export default {
  mixins: [Service],
  name: "signin",
  data() {
    return {
      code: "",
      password: "",
      showFormPhone: true,
      mobileNo: "",
      refID: "",
      otp: "",
      lastLat: 0,
      lastLng: 0,
      lastLocaName: "",
      fcmToken: ""
    };
  },
  components: {
    mainLayout
  },
  methods: {
    forWorkShopClick: function() {
      var vm = this;
      vm.openPage("/workshop");
    },
    openPage: function(path) {
      this.$router.replace(path);
    },
    clickBtnLogin: function() {
      var vm = this;
      if (vm.validateFormLogin()) {
        vm.getLogin();
        // this.openPage("/home");
      }
    },
    validateFormLogin: function() {
      var msgValidate = "";
      if (!this.code) {
        msgValidate += " Surveyor Code";
      }
      if (!this.password) {
        msgValidate += (msgValidate == "" ? "" : ",") + " Password";
      }
      if (msgValidate != "") {
        this.$swal("Please Enter Data!!!", msgValidate, "error");
        return false;
      } else {
        return true;
      }
    },
    updateSurvByCondition: function(id, token, userObj) {
      var vm = this;
      $("#processing").modal("show");
      var formData = new FormData();
      formData.append("surveyorId", id);
      formData.append("fcmToken", token);
      this.axios
        .post(Global.claimBackend + "updateSurvByCondition", formData)
        .then(function(response) {
          $("#processing").modal("hide");
          $("#processing").modal("hide");
          if (response.status == "200") {
            if (response.data && response.data.code == "OK") {
              localStorage.setItem("fcm_token", token);
              localStorage.setItem("user_obj", userObj);
              vm.openPage("/mainmenu");
            } else {
              vm.$swal("Query Error", "", "error").then(value => {});
            }
          } else {
            vm.$swal("Error", "", "error").then(value => {});
          }
        })
        .catch(error => {
          $("#processing").modal("hide");
          vm.$swal("Warning!!!", "You is not Token to access!!", "error");
          vm.checkErrorExpire(error, function(flagLogin) {
            if (flagLogin) {
              vm.updateSurvByCondition();
            }
          });
        });
      // }
    },
    checkDataToCreateOTP: function() {
      var vm = this;
      $("#processing").modal("show");
      var formData = new FormData();
      formData.append("destination", vm.mobileNo);
      vm.axios
        .post(Global.claimBackend + "checkSurveyToGetOtp", formData)
        .then(function(response) {
          $("#processing").modal("hide");
          if (response.data && response.data.code == "OK") {
            vm.refID = "";
            vm.otp = "";
            var optData = JSON.parse(response.data.data);
            vm.refID = optData.model;
            vm.showFormPhone = false;
          } else {
            if (response.data.code == "NOT_FOUND") {
              vm.$swal(
                vm.$t("mainmenu.label.warning"),
                vm.$t("login.label.phone.not.found"),
                "error"
              );
            } else {
              if (response.data.minuteComing) {
                vm.$swal(
                  vm.$t("mainmenu.label.warning"),
                  vm.$t("login.label.you.can.login.after.minute") +
                    response.data.minuteComing +
                    vm.$t("login.label.minute"),
                  "error"
                );
              } else {
                // ERROR other message from server.
                vm.$swal(
                  vm.$t("mainmenu.label.warning"),
                  response.data.message,
                  "error"
                );
              }
            }
          }
        })
        .catch(error => {
          $("#processing").modal("hide");
          // vm.$swal("Warning!!!", "You is not generateMobileOTP!!", "error");
          vm.checkErrorExpire(error, function(flagLogin) {
            if (flagLogin) {
              vm.checkDataToCreateOTP();
            }
          });
        });
    },
    getFcmToken: function(callBack) {
      var vm = this;
      window.FirebasePlugin.getToken(
        function(token) {
          // console.log("fcm_token", token);
          vm.fcmToken = token;
          localStorage.setItem("fcm_token", token);
          callBack();
        },
        function(error) {
          $("#processing").modal("hide");
          vm.fcmToken = "-";
          vm.$swal("FCM TOKEN ERROR, Please check internet!!!", "", "error");
          callBack();
          console.log("fcm_token", error);
        }
      );
      // vm.fcmToken = "Testfcmtokenss";
    },
    verifyOtp: function() {
      var vm = this;
      var formData = new FormData();
      formData.append("refID", vm.refID);
      formData.append("otp", vm.otp);
      // formData.append('fcmToken', localStorage.getItem('fcm_token'));
      formData.append("destination", vm.mobileNo);
      formData.append("lastLat", vm.lastLat);
      formData.append("lastLng", vm.lastLng);
      formData.append("lastLocaName", vm.lastLocaName);
      // formData.append('versionApp', Global.versionApp);

      // formData.append("accessToken", localStorage.getItem("access_token"));
      formData.append("surveyAppDataId", Global.surveyAppDataId);
      $("#processing").modal("show");
      vm.axios
        .post(Global.claimBackend + "verifyOtpSurvey", formData)
        .then(function(response) {
          $("#processing").modal("hide");
          if (response.data && response.data.code == "OK") {
            // var user_obj = JSON.parse(user_obj_str);
            localStorage.setItem(
              "encryptedCustomerId",
              response.data.encryptedId
            );
            var userData = response.data.data;
            localStorage.setItem("user_obj", JSON.stringify(response.data.data));
            Global.surveyorName = userData.name;
            localStorage.setItem("fcm_token", vm.fcmToken);
            vm.trickerToSurveyorAppsData("login", function() {});
            vm.openPage("/mainmenu");
          } else {
            // vm.$swal(
            //   vm.$t("mainmenu.label.warning"),
            //   response.data && response.data.message
            //     ? response.data.message
            //     : "Error",
            //   "error"
            // );
            localStorage.setItem("user_obj", "");
            if (
              null != response.data.incorrectCount &&
              response.data.incorrectCount - 0 == 10
            ) {
              vm.$swal(
                vm.$t("mainmenu.label.warning"),
                vm.$t("login.label.email.req.over.limit") +
                  vm.$t("login.label.minute"),
                "error"
              ).then(function(result) {
                vm.refID = "";
                vm.showFormPhone = true;
              });
            } else {
              // vm.$swal("Warning Login!!!", response.data.message, "error");
              if (
                response.data.errorCode &&
                (response.data.errorCode == "001" ||
                  response.data.errorCode == "002")
              ) {
                vm.$swal(
                  vm.$t("mainmenu.label.warning"),
                  vm.$t("login.label.fails.verify.otp"),
                  "error"
                ).then(willOK => {
                  if (willOK) {
                    vm.showFormPhone = true;
                  }
                });
              } else {
                if (
                  response.data.incorrectCount &&
                  response.data.incorrectCount - 0 > 0
                ) {
                  if (response.data.incorrectCount - 0 >= 5) {
                    vm.$swal(
                      vm.$t("mainmenu.label.warning"),
                      vm.$t("login.label.you.have") +
                        (10 - response.data.incorrectCount - 0) +
                        vm.$t(
                          "login.label.times.for.wrong.otp.before.you.account.will.be.baned"
                        ),
                      "error"
                    );
                  } else {
                    vm.$swal(
                      vm.$t("mainmenu.label.warning"),
                      vm.$t("login.label.incorrect.verify.otp"),
                      "error"
                    );
                  }
                } else {
                  vm.$swal(
                    vm.$t("mainmenu.label.warning"),
                    response.data.message,
                    "error"
                  );
                }
              }
            }
          }
        })
        .catch(error => {
          vm.refID = "";
          $("#processing").modal("hide");
          vm.$swal(vm.$t("mainmenu.label.warning"), "", "error").then(
            value => {}
          );

          console.log("verifyOtp CATCH ERROR", error);
          vm.checkErrorExpire(error, function(flagLogin) {
            if (flagLogin) {
              vm.verifyOtp();
            }
          });
        });
    },
    getCurrentAddress: function(callback) {
      $("#processing").modal("show");
      var vm = this;
      navigator.geolocation.getCurrentPosition(
        position => {
          vm.lastLat = position.coords.latitude;
          vm.lastLng = position.coords.longitude;
          try {
            var google_map_pos = new google.maps.LatLng(vm.lastLat, vm.lastLng);
            /* Use Geocoder to get address */
            var google_maps_geocoder = new google.maps.Geocoder();
            google_maps_geocoder.geocode(
              {
                latLng: google_map_pos
              },
              function(results, status) {
                $("#processing").modal("hide");
                if (status == google.maps.GeocoderStatus.OK && results[0]) {
                  // vm.getDistanceFromRoute();
                  if (results.length > 1) {
                    //At index 0 have number xx/xx blah blah USER NOT USE
                    vm.lastLocaName = results[1].formatted_address;
                  } else {
                    //IF HAVE length = 1 Usefull index 0 have number xx/xx blah blah USER NOT USE
                    vm.lastLocaName = results[0].formatted_address;
                  }
                }
                callback();
              }
            );
          } catch (e) {
            vm.lastLocaName = "";
            console.log("!!!Exception getCurrentAddress", e);
            $("#processing").modal("hide");
            callback();
          }
        },
        error => {
          vm.lastLocaName = "";
          $("#processing").modal("hide");
          console.log("Warning!!! Please Check GPS!!");
          callback();
        },
        {
          maximumAge: 0,
          timeout: 5000,
          enableHighAccuracy: true
        }
      );
    },
    prepareDataToVerify: function() {
      var vm = this;
      $("#processing").modal("show");
      vm.getCurrentAddress(function() {
        vm.verifyOtp();
      });
    }
  },
  watch: {
    otp: function(val) {
      var vm = this;
      val = val.replace(/[^\d]/, "");
      if (val.length < 7) {
        vm.otp = val;
      } else {
        vm.otp = val.substring(0, 6);
      }
    },
    mobileNo: function(val) {
      var vm = this;
      val = val.replace(/[^\d]/, "");
      if (val.length < 11) {
        vm.mobileNo = val;
      } else {
        vm.mobileNo = val.substring(0, 10);
      }
    }
  },
  mounted() {
    console.log("!!Signing OTP");
    $(".wrapper-content").css({ "overflow-x": "hidden" });
    console.log("Mounting...");
    var vm = this;

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
      if (localStorage.getItem("user_obj")) {
        vm.openPage("/mainmenu");
      } else {
        vm.loginAuth(function(flagLogin) {
          if (flagLogin) {
            vm.checkGpsOpen(function() {});
            
            vm.getFcmToken(function() {
              vm.trickerToSurveyorAppsData("first_time_second_time", function() {});
            });

          }
        });
        vm.setUnlockScreen();

      }
    }
  },
  beforeCreate: function() {
    console.log("!!!beforeCreate");
  },
  created: function() {
    // setContentHeight();
    console.log("!!!created");
  }
};
</script>
