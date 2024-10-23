<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      
    }
  },
  created() {
    
  },
  methods: {
    apiCallCreateTime() {
         var vm = this;
         setInterval(function () {
            var dt = new Date().getTime();
            vm.axios.interceptors.request.use(function (config) {
               config.headers.env = 'mobile';
               config.headers.rjFT = vm.CryptoJS.AES.encrypt(new Date().getTime().toString(), 'RJSEC@$2020#@!').toString();
               if(localStorage.getItem('session') != null){
                 config.headers.session = localStorage.getItem('session')
               }else{
                  var session = vm.generateUuid("xxxxxxxxxxxxxxxx")
                  localStorage.setItem('session',session)
                  config.headers.session = localStorage.getItem('session')

               }
               return config;
            });
         }, 1000);
      },
      generateUuid: function(format) {
         var dt = new Date().getTime();
         return format.replace(/[x]/g, function(c) { var r = (dt + Math.random()*16)%16 | 0; return (c=='x' ? r :(r&0x3|0x8)).toString(16);});
      },
  },
  mounted() {
    var vm = this;
    vm.apiCallCreateTime()
  },
}
</script>
 