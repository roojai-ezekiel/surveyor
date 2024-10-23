import axios from 'axios';
import Global from '../components/GlobalVariable';

var ajax = axios.create({
   withCredentials: true
});

ajax.interceptors.response.use((response) => {
   // console.log('Yes in interceptor;-------')
   let endpoints = response.request.responseURL.split("/");
   let endpoint = endpoints[endpoints.length - 1];
      if (!['login', 'getSystemConfByCondition', 'saveSurveyorAppData', 'verifyOtpSurvey','checkSurveyToGetOtp'].includes(endpoint) && response.data.errMsg === "session expired") {
         popupGotoLogin();
      } else {
         //****************Check it's an api for login or not?************************ */
         if (['verifyOtpSurvey'].includes(endpoint)) {
            ajax.interceptors.request.use(function (config) {
               if ((typeof response.headers._rjt !== "undefined")) {
                  config.headers._rjt = response.headers._rjt;
                  localStorage.setItem('_rjt',response.headers._rjt)
               }
               return config;
            });
         }
         // ***************Set a new request header property**************
   
      }
   return response;
   
},(error) => {
   console.log('error >>',error)
   console.log('error.response >> ',error.response)
   if ( error && error.response) 
   {
      if(error.response.status == 401 || error.response.status == 301) {
         popupGotoLogin();
      } else {
         error = Global.locale == 'th' ? "ไม่สามารถติดต่อ server ได้ (#"+error.response.status+")" : "Could not connect to server (#"+error.response.status+")";
      }
   }else if (error.toString().search("Network Error") > -1 ) {
      if(error.message.toString().search("503") > -1 ){
         error = Global.locale == 'th' ? "ไม่สามารถติดต่อ server ได้ กรุณาตรวจสอบสัญญาณอินเตอร์เน็ต" : "Could not connect to server. Please check connection.";
      }else{
         error = error.message;
      }
   }
   return Promise.reject(error);
})

ajax.interceptors.request.use((req)=>{
   if(localStorage.getItem('_rjt')){
      req.headers._rjt = localStorage.getItem('_rjt');
      // console.log('Yes we have _rjt and it was set as : ',req.headers._rjt)
   }else{
      req.headers._rjt = null
   }
   return req;
})


function popupGotoLogin() {

   let title = Global.locale == 'th' ? "เซสชั่นหมดอายุ" : "Your session expired!";
   let msg = Global.locale == 'th' ? "เซสชั่นของคุณหมดอายุแล้ว กรุณาเข้าสู่ระบบใหม่อีกครั้ง" : "Your session has expired! Please Login again!";
   let session_btn = Global.locale == 'th' ? "เข้าสู่ระบบใหม่อีกครั้ง" : "Go to login";
   function reloadAndClear(){
      localStorage.clear();
      window.location.reload(1)
   }
   $(".closeErrorModal").hide();
   $("#error-modal-title").html( title );
   let div = '<div class="mb-3 text-center">'+ msg +'</div><div class="text-center"><a href="javascript:void(0)" onclick="localStorage.clear();window.location.reload(1);" class="btn btn-primary btn-sm px-4">'+ session_btn +'</a></div>';
   $("#errMsg").html( div );
   $("#errmsgModal").modal("show");
}



export const httpClient = ajax;