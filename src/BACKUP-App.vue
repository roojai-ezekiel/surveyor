<template>
  <div id="app">  
    <router-view/>
  </div>
</template>

<script>
import Global from './components/GlobalVariable';
export default {
  name: 'app',
   created: function(){
	  // var userLang = navigator.language || navigator.userLanguage;
	  // if( Global.message[userLang] )
		//   Global.lang = userLang
  },
  methods:{
      detectCountDown(){
         /* let vm = this;

          if( Global.detectCounter ){
              clearInterval( Global.detectCounter );
          }

          Global.detectCounter = setInterval(  function(){

                  if( vm.$route.fullPath != '/login' && Global.detectCountDown > 2700 ){
                      let title = Global.locale == 'th' ? "เซสชั่นหมดอายุ" : "Your session expired!";
                      let msg = Global.locale == 'th' ? "เซสชั่นของคุณหมดอายุแล้ว กรุณาเข้าสู่ระบบใหม่อีกครั้ง" : "Your session has expired! Please Login again!";
                      let session_btn = Global.locale == 'th' ? "เข้าสู่ระบบใหม่อีกครั้ง" : "Go to login";

                      $(".closeErrorModal").hide();
                      $("#error-modal-title").html( title );
                      let div = '<div class="mb-3 text-center">'+ msg +'</div><div class="text-center"><a href="javascript:void(0)" onclick="window.location = \'/#/\';" class="btn btn-primary btn-sm">'+ session_btn +'</a></div>';
                      $("#errMsg").html( div );

                      $("#errmsgModal").modal("show");

                      clearInterval( Global.detectCounter );
                  }

                  Global.detectCountDown++;
           }, 2000);
           */
      }
  },
  updated(){
        Global.detectCountDown = 1;
        this.detectCountDown();

	      // ThemeControl.appHeight();

	      $(window).scrollTop(0,0);

        if( !$('.modal:visible').length && $("body.modal-open").length ){
            $("body").removeClass("modal-open");
            $("body").css({"overflow":"auto !important"});
        }

        if( $(".modal-backdrop").length ){
            $(".modal-backdrop").remove();
        }
  },
  mounted(){
      let vm = this;
	    // Detect user activity
	    $("body").on("click",function(){
	        // ThemeControl.appHeight();

	        Global.detectCountDown = 1;
	        vm.detectCountDown();

	        if( !$('.modal:visible').length && $("body.modal-open").length ){
              $("body").removeClass("modal-open");
              $("body").css({"overflow":"auto !important"});
          }
	    });

	    // ThemeControl.appHeight(); // fixed floating footer
	    $(window).scrollTop(0,0);
  }
}
</script>

<style>
#app {

}
</style>
