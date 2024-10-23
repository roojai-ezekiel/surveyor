<style scoped>

</style>

<template>
<div>
    	<!-- Nav bottom --> 	  
	  <div v-if="!showInpage(['/','/surveyorform','/fileupload','/garagecall'])" id="menu-bar" class="btn-toolbar fixed-bottom" role="toolbar" aria-label="Toolbar with button groups">               
  	  	<div class="btn-group mx-auto" role="group" aria-label="Menu bar">

    		<button type="button" class="btn btn-nav" :class="{'active-nav': $route.path=='/mainmenu'}" @click="goTopage('/mainmenu')"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg><br>{{$t("main.menu.home")}}</button>
			
    		<button type="button" class="btn btn-nav" :class="{'active-nav': $route.path=='/working'}" @click="goTopage('/working')"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg><br>{{$t("main.menu.working")}}</button>
			
    		<button type="button" class="btn btn-nav" :class="{'active-nav': $route.path=='/history'}" @click="goTopage('/history')"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg><br>{{$t("main.menu.history")}}</button>
			
    		<button type="button" class="btn btn-nav" href="#callcenterModal" data-toggle="modal" data-target="#callcenterModal"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-headphones"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg><br>{{$t("main.menu.call")}}</button>
			
    		<button type="button" class="btn btn-nav" :class="{'active-nav': $route.path=='/more'}" @click="goTopage('/more')"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg><br>{{$t("main.menu.more")}}</button>
    		
  		</div>
	  </div>
	<!-- Nav bottom -->
    <!-- Callcenter Modal -->
			<div class="modal fade" id="callcenterModal" tabindex="-1" role="dialog" aria-labelledby="callcenterModalLabel" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">

						<div class="modal-body text-center">
							<button type="button" class="close px-2 text-primary" data-dismiss="modal" aria-label="Close" style="position: absolute;top: 20px;right: 10px;line-height: 0;">x</button>
							
							<h4 class="text-secondary mb-4">{{$t("mainmenu.label.call.center")}}</h4>
							<p class="h1 mb-4">02 582 8844</p>
								
							<div class="btn-group btn-block" role="group" aria-label="">
							<button type="button" id="btn-cancel" data-dismiss="modal" class="btn btn-outline-secondary w-50 mr-2 strong">{{$t("mainmenu.label.cancel")}}</button>
							<button @click="callPhone()" type="button" id="btn-callcenter" class="btn btn-primary w-50 strong">{{$t("mainmenu.label.call")}}</button>
							</div>
							
						</div>			
						
					</div>
				</div>
			</div>	

     <div id="processing" class="modal" role="dialog" data-backdrop="false" style="display:none; z-index: 1500">
            <div class="modal-dialog modal-dialog-centered modal-sm">
                <div class="modal-content shadow">
                    <div class="modal-header">
                        <h4 class="modal-title text-center">
                            <span class="glyphicon glyphicon-time"></span>{{$t("label.please.wait.processing")}}
                        </h4>
                    </div>
                    <div class="modal-body">
                        <div class="progress">
                            <div class="progress-bar progress-bar-info progress-bar-striped active" style="width: 100%">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="loading" class="modal" role="dialog" data-backdrop="false" style="display:none">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body">
                        <div>
                            <img ref="assets/images/fidget-spinner-loading.gif"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Error message modal -->
        <div id="errmsgModal" class="modal" role="dialog" data-backdrop="false" style="display:none; z-index:1550 !important;">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header" style="background-color:#d9534f;color:#ffffff;">
              <h4 class="modal-title" id="error-modal-title"></h4>
                        <button type="button" class="close closeErrorModal" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div id="errMsg" style="color:#ff5011;"></div>
                    </div>
                </div>

            </div>
        </div>

</div>
</template>

<script>
import Global from './GlobalVariable';
import Service from './Service';
export default {
    mixins: [Service],
    name: 'mainLayout',
    data() {
        return {
            fbId: null,
            fbUsername: null,
            tempFbId: null,
            tempFbUsername: null,

            fbAlreadyLoggedIn: null,
            fullYear: null,
            customerLastname: Global.customerLastname,
            mainPage: false,
            current_page : 'login',
            loginPage: false,
            showBackToLogin: false,

            locale: Global.locale,
            mobileNumber: null,
            callMeComplete: false,
            contractNumber : '',
            pageTitle : Global.pageTitle,
            fbSrcImg:null,
            callMeSubject : "General inquiry",
            submitComplete: false
        }
    },
    created() {
        // FB.init({
        //     // appId      : '441391489330149',
        //     appId      : '828505220589135',//'467455343673039',
        //     cookie     : true,  // enable cookies to allow the server to access the session
        //     xfbml      : true,  // parse social plugins on this page
        //     version    : 'v2.8', // use graph api version 2.8
        //     // status     : true // set this status to true, this will fixed popup blocker issue
        // });
        // this.current_page = this.$route.name.toLowerCase();
    },
    mounted() {
       

    },
    beforeCreated() {

    },
    updated() {
        feather.replace();
        // call every time when value of component change
        // this.$i18n.locale = Global.locale;
        // ThemeControl.appHeight();
        this.pageTitle = Global.pageTitle;
    },
    methods: {
        callPhone: function() {

        var vm = this;
        $('#processing').modal('show');
        setTimeout(() => {
            window.plugins.CallNumber.callNumber(
            onSuccess,
            onError,
            '025828844',
            false
            );
        }, 500);

        function onSuccess(result) {
            $("#processing").modal('hide');
        }

        function onError(result) {
            $("#processing").modal('hide');
        }
        },
        showInpage: function(arrPage) {
         return arrPage.indexOf(this.$route.path.toLowerCase()) > -1;
        },
        goTopage:function(page){
            var vm = this;
            vm.$router.push(page)
        },
        setNull: function(input) {
            if (input != null) {
                input = null;
            }
        },
        checkFbLoginStatus: function() {
            var vm = this;
             // This function is called when someone finishes with the Login
            // Button.  See the onlogin handler attached to it in the sample
            // code below.
            function checkLoginState() {
                FB.getLoginStatus(function(response) {
                    statusChangeCallback(response);
                });
            }

            // This is called with the results from from FB.getLoginStatus().
            function statusChangeCallback(response) {
                // The response object is returned with a status field that lets the app know the current login status of the person.
                // Full docs on the response object can be found in the documentation for FB.getLoginStatus().
                if (response.status === 'connected') {
                    FB.api('/me', function(response) {
                        // Global.fbUsername = response.name;
                        // vm.fbUsername = Global.fbUsername;
                        Global.tempFbUsername = response.name;
                        vm.tempFbUsername = Global.tempFbUsername;
                        // this.fbAccountUrl = 'https://graph.facebook.com/' + response.id + '/picture';
                    });
                    // Global.fbId = response.authResponse.userID;
                    Global.tempFbId = response.authResponse.userID;
                    vm.tempFbId = Global.tempFbId;
                    Global.fbAlreadyLoggedIn = true;
                    vm.fbAlreadyLoggedIn = Global.fbAlreadyLoggedIn;
                } else {
                    vm.setNull(Global.fbId);
                    vm.setNull(Global.fbUsername);
                    vm.setNull(Global.tempFbId);
                    vm.setNull(Global.tempFbUsername);
                    Global.fbAlreadyLoggedIn = false;
                }

                vm.tempFbId = Global.tempFbId;
                vm.fbAlreadyLoggedIn = Global.fbAlreadyLoggedIn;
            }

            checkLoginState();
        },
        checkCurrentPage: function() {
            var vm = this;
            if ( (vm.$route.fullPath.toLowerCase() == '/login') || (vm.$route.fullPath.toLowerCase() == '/otp') || (vm.$route.fullPath.toLowerCase() == '/accounts') )  {
                vm.mainPage = false;
            } else {
                vm.mainPage = true;
            }

            if ( vm.$route.fullPath.toLowerCase() == '/login' ) {
                vm.loginPage = true;
            } else {
                vm.loginPage = false;
            }
        },
        displayBackToLogin: function() {
            var vm = this;
            if ( (vm.$route.fullPath.toLowerCase() == '/otp') || (vm.$route.fullPath.toLowerCase() == '/accounts') )  {
                vm.showBackToLogin = true;
            } else {
                vm.showBackToLogin = false;
            }
        },
        getFullYear: function() {
            var vm = this, d = new Date();
            vm.fullYear = d.getFullYear();
        },
        gotoLogin: function() {        
           this.$router.push('/');
        },
        goToRefer: function(){
            var vm = this;
            vm.trackingMobileGlScreenName("refer");
            window.open('https://www.uat-roojai.com/refer/?ref='+this.contractNumber+'&lang='+this.locale,'_blank');
        },
        refreshFacebookId: function() {
            var vm = this;
            vm.fbId = Global.fbId;
        },
        toDefaultPage: function() {
             var vm = this;
            if ( (vm.$route.fullPath.toLowerCase() == '/login') || (vm.$route.fullPath.toLowerCase() == '/otp') || (vm.$route.fullPath.toLowerCase() == '/accounts') )  {
                vm.$router.push('/');
            } else {
               vm.$router.push('/home');
            }
        },
        
        isCallMeComplete: function() {
            var vm = this;
            if(!$.isEmptyObject(vm.mobileNumber)) {
                if ($("#calling-phone").parsley().isValid()) {
                    vm.isCallMeLengthValid();
                }
            }
        },
        isCallMeLengthValid: function() {
            var vm = this;
            if(!$.isEmptyObject(vm.mobileNumber)) {
                if ( vm.mobileNumber.length == 9 || vm.mobileNumber.length == 10 ) {
                    vm.callMeComplete = true;
                } else {
                    vm.callMeComplete = false;
                }
            } else {
                vm.callMeComplete = false;
            }
        },
        headGoback : function(){
            var vm = this;
            if (vm.$router.currentRoute.path == "/login") {
                vm.$router.push("/home");
            }else{
                vm.$router.back();
            }
        }
     },
    computed: {
        currentRoute: function(){
            return this.$router.currentRoute.fullPath
        }
    },
    watch: {
        locale: function(value){
            Global.locale = value;
            this.$i18n.locale = value;
            this.locale = Global.locale;
        },
        mobileNumber: function(val) {
            this.mobileNumber = val.replace(/[^0-9/]/g, '');
            this.isCallMeComplete();
        },
	}
};
</script>
