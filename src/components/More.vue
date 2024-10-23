<template>
  <div>
      <mainLayout></mainLayout>
      <header>
			<div id="profile" class="container">
				<div class="row py-3">
					<div class="col">
						<h2 class="my-2">{{ $t("label.more.profile") }}</h2>
						<h5 class="mb-2">{{ surveyName }}</h5>
						<p class="strong">{{ $t("label.more.tel") }}<small>{{ tel }}</small></p>
						<p class="strong"><small>{{ lastLocal }}</small></p>
					</div>
				</div>
			</div>
		</header>
    

   		<div class="main-content mb-5 pb-3">
            <div class="container">
				<h4 class="text-secondary">{{ $t("label.more.lang") }}</h4>
				<div class="row mb-3">
			
					<div class="col">
     					<input class="btn-inline-input-profile" type="radio" name="language" id="language-th" @click="changeLocale('th', 'ไทย')" value="option1" :checked="_i18n.locale == 'th'">
    	 				<label class="btn btn-block btn-inline-label-profile rounded border" for="language-th">
							 <!-- <img class="img-fluid" src="assets/img/flag-thai.png"> -->
							 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><path fill="#f0f0f0" d="M0 85.334h512V426.66H0z"/><path fill="#0052b4" d="M0 194.056h512v123.882H0z"/><g fill="#d80027"><path d="M0 85.334h512v54.522H0zM0 372.143h512v54.522H0z"/></g></svg>
							  ภาษาไทย</label>
   					</div>
   					<div class="col">
     					<input class="btn-inline-input-profile" type="radio" name="language" id="language-en" @click="changeLocale('en', 'English')" value="option2"  :checked="_i18n.locale == 'en'">
     					<label class="btn btn-block btn-inline-label-profile rounded border" for="language-en">
							 <!-- <img class="img-fluid" src="assets/img/flag-eng.png"> -->
							 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><path fill="#f0f0f0" d="M0 85.333h512V426.67H0z"/><path fill="#d80027" d="M288 85.33h-64v138.666H0v64h224v138.666h64V287.996h224v-64H288z"/><g fill="#0052b4"><path d="M393.785 315.358L512 381.034v-65.676zM311.652 315.358L512 426.662v-31.474l-143.693-79.83zM458.634 426.662l-146.982-81.664v81.664z"/></g><path fill="#f0f0f0" d="M311.652 315.358L512 426.662v-31.474l-143.693-79.83z"/><path fill="#d80027" d="M311.652 315.358L512 426.662v-31.474l-143.693-79.83z"/><g fill="#0052b4"><path d="M90.341 315.356L0 365.546v-50.19zM200.348 329.51v97.151H25.491z"/></g><path fill="#d80027" d="M143.693 315.358L0 395.188v31.474l200.348-111.304z"/><g fill="#0052b4"><path d="M118.215 196.634L0 130.958v65.676zM200.348 196.634L0 85.33v31.474l143.693 79.83zM53.366 85.33l146.982 81.664V85.33z"/></g><path fill="#f0f0f0" d="M200.348 196.634L0 85.33v31.474l143.693 79.83z"/><path fill="#d80027" d="M200.348 196.634L0 85.33v31.474l143.693 79.83z"/><g fill="#0052b4"><path d="M421.659 196.636L512 146.446v50.19zM311.652 182.482V85.331h174.857z"/></g><path fill="#d80027" d="M368.307 196.634L512 116.804V85.33L311.652 196.634z"/></svg>
							  English</label>
   					</div>
				</div>
				
				<h4 class="text-secondary">{{ $t("modal.policy.dt.list.item.label.status") }}</h4>
				<div class="row mb-3">
					<div class="col">
     					<input @click="Global.statusWork='Active';surveyorChangeStatus('Active',true);" class="btn-inline-input-profile" type="radio" name="status" :value="Global.statusWork" id="status-th" :checked="Global.statusWork == 'Active'">
    	 				<label class="btn btn-block btn-inline-label-profile rounded border" for="status-th">{{ $t("mainmenu.label.active") }}</label>
   					</div>
   					<div class="col">
     					<input @click="Global.statusWork='In Active';surveyorChangeStatus('In Active',true);" class="btn-inline-input-profile" type="radio" name="status" :value="Global.statusWork" id="status-en"  :checked="Global.statusWork == 'In Active'">
     					<label class="btn btn-block btn-inline-label-profile rounded border" for="status-en">{{ $t("mainmenu.label.inactive") }}</label>
   					</div>
				</div>
				
				<div class="row logout-section">
					<div class="col text-center">
						<button @click="logOut()" type="button" class="btn btn-outline-primary btn-lg px-5">Log Out</button>
						<p class="text-center my-4 version-more"><span id="lbl_version" >Version : {{versionApp}} </span>| <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> {{ currentTime }}</p>
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

export default {
	mixins: [Service],
	data(){
		return{
			Global: Global,
			surveyName: '',
			tel: '',
			lastLocal:'',
			currentTime:'',
			versionApp: Global.versionApp

		}
	},
	methods:{
		surveyorChangeStatus: function(status) {
         $('#processing').modal('show');
         var vm = this;
         var formData = new FormData();
		 var userObj = JSON.parse(localStorage.getItem('user_obj'));
		 vm.getCurrentAddressManual();
         formData.append('id', userObj.id);
         formData.append('status', status);
         formData.append('lastLat', Global.surveyorObj.sLastLat ? Global.surveyorObj.sLastLat : 0);
         formData.append('lastLng', Global.surveyorObj.sLastLng ? Global.surveyorObj.sLastLng : 0);
         formData.append('lastLocaName', Global.currentAdress);
         formData.append('fcmToken', localStorage.getItem('fcm_token'));
        //  formData.append('fcmToken', 'FAKEFCMTOKEN');
         vm.axios
            .post(Global.claimBackend + 'surveyorChangeStatus', formData)
            .then(function(response) {
               $('#processing').modal('hide');
               if (response.status - 0 == 200 && response.data.updateSurveyor) {
                  vm.$swal(vm.$t('mainmenu.label.warning.save'), vm.$t('mainmenu.label.warning.save.complete'), 'success').then(result => {
                     //Change status to localStorage user_obj
                     var user_obj = JSON.parse(localStorage.getItem('user_obj'));
                     user_obj.status = status;
                     localStorage.setItem('user_obj', JSON.stringify(user_obj));
                     if (status == 'Closed') {
                        Global.flagTimerRealt = false;
                        Global.flagTimerSendLocation = false;
                        localStorage.setItem('access_token', '');
                        localStorage.setItem('user_obj', '');
                        localStorage.setItem('fcm_token', '');
                        vm.$router.push('/');
                     }
                  });
               } else {
                  vm.$swal(vm.$t('mainmenu.label.warning.save'), vm.$t('mainmenu.label.warning.save.error'), 'success');
               }
            })
            .catch(error => {
               $('#processing').modal('hide');
               console.log('!!ERROR surveyorChangeStatus', error);
               vm.checkErrorExpire(error, function(flagExpire) {});
               vm.$router.push('/');
            });
	  },
	  logOut: function() {
         var vm = this;
         vm.$swal({
            title: vm.$t('mainmenu.label.confirm') + '?',
            html: vm.$t('mainmenu.label.do.you.want.to.logout'),
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: vm.$t('mainmenu.label.cancel'),
            confirmButtonText: vm.$t('mainmenu.label.ok'),
         }).then(
            function(json_data) {
				if(json_data.hasOwnProperty('value')){
					vm.surveyorChangeStatus('Closed');
				}else{
					return false;
				}
            }
         );
         // var r = confirm(vm.$t("mainmenu.label.do.you.want.to.logout"));
         // if (r == true) {
         //   this.surveyorChangeStatus("Close");
         // }
      },

	},
	mounted(){
		var vm = this;
		let userString = localStorage.getItem('user_obj');
		let userObject = JSON.parse(userString);
		vm.surveyName = userObject.name?userObject.name:'';
		vm.tel = userObject.mobile?userObject.mobile:'';
		vm.lastLocal = userObject.lastLocaName?userObject.lastLocaName:'';

		setInterval(function(){
			var h = new Date().getHours();
			var m = new Date().getMinutes();
			var s = new Date().getSeconds();

			vm.currentTime = h+':'+m+':'+s
		},1000)

		vm.checkTokenForHttp(function () {

		if (localStorage.getItem('version-code') && localStorage.getItem('version-code') != Global.versionApp) {
			$('#lbl_version').css({
				color: '#808080',
				'text-decoration': 'line-through',
			});
		} else {
			$('#lbl_version').css({ color: '', 'text-decoration': '' });
		}
		});

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