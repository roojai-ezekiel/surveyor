<template>
<div>
    <mainLayout/>
	<header class="bg-secondary py-1 fixed-top">
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
      <div class="text-center py-2">
        <p class="mb-0 text-white">{{ $t("workshop.page") }}</p>
      </div>
    </header>

   <div class="container" style="padding-top: 50px;">
      <div class="row" style="height: 95vh">
        <div class="col text-center mt-5">
            <b>
                <span class="clr-darkblue f-size24">{{$t("workshop.contact")}}</span>
                <span class="clr-orange f-size24">{{$t("workshop.roojai" )}}</span>
            </b>
            <div class="row-manual">
                <span class="f-size16 f-prompt">&nbsp;{{$t('workshop.please.input.claim')}}</span>
            </div>
            <div class="row">
               
            <div class="col" style="padding-top: 30px">
            <div class="input-group input-group-sm mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text f-prompt">{{claimPrefix}}</span>
                </div>
                <input type="number" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" class="form-control f-prompt" maxlength="8" placeholder="xxxxxxxx" v-model="claimNumber"/>
                
            </div>
            </div>
           
            </div>
            <button
              type="button"
              class="btn btn-primary btn-send-otp strong"
              :disabled="claimNumber == null || claimNumber.length < 8"
              @click="saveClaimbyWorkShop()"
            >
              {{$t("workshop.start.call")}}
            </button>
            
        </div>
      </div>
    </div>

   
</div>
  
</template>

<script>
import Global from "./GlobalVariable";
import Service from "./Service";
import mainLayout from "./mainLayout";

export default {
	mixins: [Service],
	data(){
		return{
			Global: Global,
			claimPrefix: 'CLA-',
            claimNumber: '',
            caseIdFromResponse:''

		}
	},
	methods:{
        saveClaimbyWorkShop: function(){
            var vm = this
            $('#processing').modal('show');
            var formData = new FormData()
            formData.append("claimName",vm.claimPrefix+vm.claimNumber)
            vm.axios
                .post(Global.claimBackend + "saveClaimbyWorkShop", formData)
                .then(function (response) {
                $('#processing').modal('hide');
                if (response.data && response.data.code && response.data.code == "OK") {
                        let objResp = JSON.parse(response.data.data) 
                        vm.caseIdFromResponse = objResp.herokuExternalIdC
                        if(vm.caseIdFromResponse){
                        vm.openSightCall(vm.caseIdFromResponse)
                        // window.open('https://guest.sightcall.com/call/15f0b30b3d6b717cf6d8ecccd1f6ad950c290758/?displayname='+vm.caseIdFromResponse,"sightcall","_blank",false)
                        // window.open('surveyor://?sightcall=de35b97922968d6d551be01dcc7c08170a1c6117&displayname='+vm.caseIdFromResponse,'_system','location=yes')
                        // window.open('https://www.google.com/','_system','location=yes')
                        }else{
                        alert('No have heroku')
                        }
                    } else if(response.data.code == "NOT_FOUND"){
                    $('#processing').modal('hide');;
                    vm.$swal(vm.$t("workshop.warn.failed"), vm.$t("workshop.warn.claim.not.fund"),"error");
                    }
                })
                .catch((error) => {
                $('#processing').modal('hide');;
                localStorage.setItem("user_obj", "");
                vm.$swal("Check Internet!!!", "Error!!", "error");
                vm.checkErrorExpire(error, function (flagLogin) {
                    if (flagLogin) {
                    vm.getLogin();
                    }
                });
                });

        }
	},
	mounted(){
	},
	beforeCreate(){
		
	},
	components:{
		mainLayout,
	}
}

</script>

<style>

</style>