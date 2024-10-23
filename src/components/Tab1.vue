<template>
  <div>
    <div class="tab-pane fade active show" id="incident" role="tabpanel" aria-labelledby="incident-tab">
      <h5 class="text-center">{{$t("surveyform.label.incident.driver")}}</h5>

      <div class="form-group">
        <label for="driver-ic-passport">{{ $t("surveyform.label.ic.passport") }}</label>
        <div class="input-group mb-3">
          <input
            type="text"
            id="driver-ic-passport"
            class="form-control"
            aria-label="IC/Passport"
            aria-describedby="button-addon2"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
			      maxlength="13"
			      v-model="Global.Driver.ID"
          />
          <div class="input-group-append">
            <button
              class="btn btn-secondary btn-search"
              type="button"
              id="search-account"
              @click.prevent="accountSearchClick"
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
                class="feather feather-search mb-1"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="driver-first-name">{{ $t("surveyform.label.firstname") }}</label>
        <input type="text" class="form-control" id="driver-first-name" v-model="Global.Driver.firstname" :disabled = "Global.isDisable" />
      </div>

      <div class="form-group">
        <label for="driver-last-name">{{ $t("surveyform.label.lastname") }}</label>
        <input type="text" class="form-control" id="driver-last-name" v-model="Global.Driver.lastname" :disabled = "Global.isDisable" />
      </div>

      <div class="form-group">
        <label for="driver-mobile-no">{{ $t("surveyform.label.phone") }}</label>
        <input type="number" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" maxlength="10" class="form-control" id="driver-mobile-no" v-model="Global.Driver.Phone" :disabled = "Global.isPhoneDisable"/>
      </div>

      <div class="form-group">
        <label for="driver-email">{{ $t("surveyform.label.email") }}</label>
        <input type="email" class="form-control" id="driver-email" v-model="Global.Driver.Email" :disabled = "Global.isEmailDisable"/>
      </div>

      <div class="form-group">
      <label for="driver-email">{{ $t("surveyform.label.driving.license") }}</label>
        <input type="email" class="form-control" id="driver-email" v-model="Global.Driver.DrivingLicense"/>
      </div>

      <div class="form-group">
        <label for="accident-cause-type">{{ $t("surveyform.label.driving.license.type") }}</label>
        <select id="accident-cause-type" class="custom-select" v-model="Global.Driver.DrivingLicenseType">
          <option selected>{{ $t("surveyform.pls.select") }}</option>
          <option v-for="lType in Global.DriverLicenseTypeSelection" :key="lType.key" :value="lType.value">{{lType.desc}}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="driver-preferred-language">{{$t("surveyform.label.lang")}}</label>
        <div class="custom-control custom-radio py-2">
          <input type="radio" id="language-th" name="preferred-language" class="custom-control-input" v-model="Global.Driver.prefLang" value="TH" :disabled = "Global.isDisable" />
          <label class="custom-control-label" for="language-th">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512">
              <path fill="#f0f0f0" d="M0 85.334h512V426.66H0z" />
              <path fill="#0052b4" d="M0 194.056h512v123.882H0z" />
              <g fill="#d80027">
                <path d="M0 85.334h512v54.522H0zM0 372.143h512v54.522H0z" />
              </g>
            </svg>
            ภาษาไทย
            </label>
        </div>
        <div class="custom-control custom-radio py-2">
          <input type="radio" id="language-en" name="preferred-language" class="custom-control-input" v-model="Global.Driver.prefLang" value="EN" :disabled = "Global.isDisable" />
          <label class="custom-control-label" for="language-en">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512" >
              <path fill="#f0f0f0" d="M0 85.333h512V426.67H0z" />
              <path fill="#d80027" d="M288 85.33h-64v138.666H0v64h224v138.666h64V287.996h224v-64H288z" />
              <g fill="#0052b4">
                <path d="M393.785 315.358L512 381.034v-65.676zM311.652 315.358L512 426.662v-31.474l-143.693-79.83zM458.634 426.662l-146.982-81.664v81.664z"/>
              </g>
              <path fill="#f0f0f0" d="M311.652 315.358L512 426.662v-31.474l-143.693-79.83z" />
              <path fill="#d80027" d="M311.652 315.358L512 426.662v-31.474l-143.693-79.83z"/>
              <g fill="#0052b4">
                <path d="M90.341 315.356L0 365.546v-50.19zM200.348 329.51v97.151H25.491z"/>
              </g>
              <path fill="#d80027" d="M143.693 315.358L0 395.188v31.474l200.348-111.304z"/>
              <g fill="#0052b4">
                <path d="M118.215 196.634L0 130.958v65.676zM200.348 196.634L0 85.33v31.474l143.693 79.83zM53.366 85.33l146.982 81.664V85.33z" />
              </g>
              <path fill="#f0f0f0" d="M200.348 196.634L0 85.33v31.474l143.693 79.83z"/>
              <path fill="#d80027" d="M200.348 196.634L0 85.33v31.474l143.693 79.83z"/>
              <g fill="#0052b4">
                <path d="M421.659 196.636L512 146.446v50.19zM311.652 182.482V85.331h174.857z"/>
              </g>
              <path fill="#d80027" d="M368.307 196.634L512 116.804V85.33L311.652 196.634z" />
            </svg>
            English
            </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Global from "./GlobalVariable";
export default {
	data() {
		return {
      Global: Global,
		}
	},
  methods:{
    
     validateSearchID: function() {
      var vm = this;
      if (!Global.Driver.ID) {
        // vm.sweetError(vm.$t("validate.word.error"), vm.$t("validate.id.card"));
        return false
      }
      return true
    },
    accountSearchClick: function() {
      var vm = this;
      if (vm.validateSearchID()) {
        $('#processing').modal('show');
        var formData = new FormData();
        formData.append("ic_passport", Global.Driver.ID);
        this.axios
          .post(Global.claimBackend + "getAccontDetailById", formData)
          .then(function(response) {
            if (response && response.data.code && response.data.code == "OK") {
              $('#processing').modal('hide');
              let claimDetailData = response.data.data[0];
              // Global.isDisable = true
              vm.$set(Global, 'isDisable', true);
              // Global.sweetSuccess(Global.$t("surveyform.success"),Global.$t("surveyform.warn.success.account.search"))
              vm.$set(Global.Driver, 'sfAccountId', claimDetailData.sfid);
              vm.$set(Global.Driver, 'firstname', claimDetailData.firstname);
              vm.$set(Global.Driver, 'lastname', claimDetailData.lastname);
              vm.$set(Global.Driver, 'prefLang', claimDetailData.preflang);
              if(!claimDetailData.phone){
                vm.$set(Global, 'isPhoneDisable',false);
              }else{
                vm.$set(Global, 'isPhoneDisable',true);
                 vm.$set(Global.Driver, 'Phone', claimDetailData.phone);
              }
              
              if(!claimDetailData.email){
                vm.$set(Global, 'isEmailDisable',false);
              }else{
                vm.$set(Global, 'isEmailDisable',true);
                vm.$set(Global.Driver, 'Email', claimDetailData.email);
              }
              // Global.Driver.sfAccountId = res_data.sfid
              // Global.Driver.firstname = res_data.firstname
              // Global.Driver.lastname = res_data.lastname
              // Global.Driver.Phone = res_data.phone
              // Global.Driver.Email = res_data.email
              // Global.Driver.prefLang = res_data.preflang
              Global.InjuryProperty.InjuredName = res_data.name
            } else {
              console.log('onElse')
              $('#processing').modal('hide');
              vm.$set(Global, 'isDisable', false);
              vm.$set(Global, 'isPhoneDisable', false);
              vm.$set(Global, 'isEmailDisable', false);
              vm.$set(Global.Driver, 'sfAccountId', "");
              vm.$set(Global.Driver, 'firstname', "");
              vm.$set(Global.Driver, 'lastname', "");
              vm.$set(Global.Driver, 'prefLang', "");
              vm.$set(Global.Driver, 'Phone', "");
              vm.$set(Global.Driver, 'Email', "");
              // Global.isEnable = false
              // Global.Driver.sfAccountId = ""
              // Global.Driver.firstname = ""
              // Global.Driver.lastname = ""
              // Global.Driver.Phone = ""
              // Global.Driver.Email = ""
              // Global.Driver.prefLang = ""
              Global.InjuryProperty.InjuredName = ""
              // Global.sweetError(vm.$t("surveyform.warn.error"), vm.$t("surveyform.warn.error.account.search"));
            }
          })
          .catch(error => {
            $('#processing').modal('hide');
            // vm.sweetError(vm.$t("surveyform.warn.error"), "Something wrong with internet!");
            console.log("getClaimNumberByCondition Exception:", error);
          });
      }
    },
   
  },
  watch:{
    'Global.Driver.ID':{
      handler: function(newVal, oldVal){
        var vm = this
        if(newVal != oldVal && oldVal != ""){
          vm.$set(Global, 'isDisable', true);
          vm.$set(Global, 'isPhoneDisable', true);
          vm.$set(Global, 'isEmailDisable', true);
          vm.$set(Global.Driver, 'sfAccountId', "");
          vm.$set(Global.Driver, 'firstname', "");
          vm.$set(Global.Driver, 'lastname', "");
          vm.$set(Global.Driver, 'prefLang', "");
          vm.$set(Global.Driver, 'Phone', "");
          vm.$set(Global.Driver, 'Email', "");
        }
      },
      deep: true
    },
  }
};
</script>

<style>
</style>