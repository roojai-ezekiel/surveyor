<template>
  <div>
	  <mainLayout/>
      <header class="bg-secondary py-1 fixed-top">
		<button  @click="$router.push('/history')" type="button" class="btn p-2 text-white position-absolute"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg></button>
		<div class="text-center py-2">
			<p class="mb-0 text-white">{{ $t("history.label.caseid") }} : {{ Global.claimObject.id }} </p>
		</div>
	</header>  

	<div class="main-content" style="padding-top: 50px;">
    	<div class="container py-3">
			<h5 class="text-center">{{ $t("file.upload.header") }}</h5>
			<!-- if no photos -->
			<p class="display-4 text-center" style="color: #ccc;" v-if="imgAr.length == 0">{{ $t("file.upload.empty") }}</p>

			<div class="d-none" id="my-dropzone"></div>
			<form id="myForm" class="d-none">
               <input id="myFile" type="file" multiple class="d-none">
            </form>
			<div class="row px-3" v-if="imgAr.length != 0">
  				<div class="col-4 p-2 " v-for="img in imgAr" :key="img.s3key">
					<img
                     v-if="img.docType != 'pdf' && img.docType != 'mp4'"
                     :src="img.thumbnailUrl"
                     class="img-thumbnail"
                     alt="..."
                     @click="openPreviewModal(img)"
                  >
                  <video
                     class="img-thumbnail"
                     v-if="img.docType == 'mp4'"
                     @click="openPreviewModal(img)"
                  >
                     <source :src="img.videoUrl">
                  </video>
                  <div
                     class="img-thumbnail"
                     v-if="img.docType == 'pdf'"
                     @click="openPreviewModal(img)"
                  >
                     <i data-feather="file-text" />
                     {{ img.name.split("_")[1] }}
                  </div>
					<button  @click="toDelete(img)" type="button" class="btn btn-link text-primary position-absolute p-0" style="right: 0px;top:-5px;"><svg viewBox="0 0 24 24" width="20" height="20" stroke="#e84118" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></button>
  				</div>
			</div>

			<div class="fixed-bottom">
				<div class="container py-3">
					<div class="btn-group btn-block" role="group" aria-label="Button group with nested dropdown">
						<button @click="SelectPhotosfromLibrary()"  type="button" class="btn bg-secondary strong text-white mr-2 rounded"><svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1" style="position: relative;top:-2px;"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg> {{ $t( "file.upload.add.photo") }} </button>
						<button @click="takePhoto()" type="button" class="btn bg-secondary strong text-white ml-2 rounded"><svg viewBox="0 0 24 24" width="20" height="20" stroke="#ffffff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1" style="position: relative;top:-2px;"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg> {{ $t("file.upload.take.photo") }}</button>
					</div>
					<!-- <button @click="clickToOpenModal()" type="button" class="btn btn-primary btn-lg btn-block btn-update strong">UPDATE</button> -->
				</div>
			</div>
			
    	</div>  <!-- end container -->
	</div>  <!-- end main -->


	  <!-- comfirm delete -->
      <div
         class="modal fade grey-underline-form"
         id="confirm-del-file-dialogue"
         data-backdrop="static"
         tabindex="-1"
         role="dialog"
         aria-labelledby="renewal-payment-complete-title"
      >
         <div class="modal-dialog modal-dialog-centered centerTop" role="document">
            <div class="modal-content shadow">
               <div class="modal-header modal-header-info">
                  <h5 class="modal-title" style="color: #ffffff !important;">
                     {{$t("file.upload.del.file.photo")}}
                  </h5>
               </div>
               <div class="modal-body pt-4">
                  {{ $t("file.upload.del.warning") }}
               </div>
               <div class="modal-footer justify-content-between">
                  <button
                     type="button"
                     class="btn btn-secondary btn-sm px-4"
                     data-dismiss="modal"
                  >
                     {{ $t("file.upload.cancel.del") }}
                  </button>
                  <button
                     type="button"
                     class="btn btn-primary btn-sm px-4"
                     data-dismiss="modal"
                     @click="deleteThis(selectedImg);"
                  >
                     {{ $t("file.upload.confirm.del") }}
                  </button>
               </div>
            </div>
         </div>
      </div>

	   <!-- Modal preview file -->
      <div
         class="modal fade"
         id="previewModal"
         tabindex="-1"
         role="dialog"
         aria-labelledby="previewModalTitle"
         aria-hidden="true"
         style="background-color: #000000"
      >
         <div
            class="modal-dialog modal-lg modal-dialog-centered"
            role="document"
            id="dialogPreview"
         >
            <div class="modal-content">
               <div class="modal-body">
                  <div
                     class="embed-responsive embed-responsive-16by9"
                     v-if="showItem.docType == 'pdf'"
                  >
                     <iframe
                        class="embed-responsive-item"
                        :src="showItem.pdfUrl"
                        allowfullscreen
                     />
                  </div>
                  <div
                     class="embed-responsive embed-responsive-16by9"
                     v-if="showItem.docType == 'mp4'"
                  >
                     <iframe
                        class="embed-responsive-item"
                        :src="showItem.videoUrl"
                        allowfullscreen
                     />
                  </div>
                  <img
                     v-if="
                        showItem.docType != 'mp4' && showItem.docType != 'pdf'
                           ? true
                           : false
                     "
                     :src="showItem.thumbnailUrl"
                     style="width: 100%; max-width: none"
                  >
                  <button
                     id="btnDel"
                     type="button"
                     class="close text-primary position-absolute p-0"
                     data-dismiss="modal"
                     aria-label="Close"
                    style="top: 0px; right: 0px;"
                  >
                     <svg
                        id="delOnPreview"
                        viewBox="0 0 24 24"
                        width="30"
                        height="30"
                        stroke="#e84118"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="css-i6dzq1"
                     >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="15" y1="9" x2="9" y2="15" />
                        <line x1="9" y1="9" x2="15" y2="15" />
                     </svg>
                  </button>
               </div>
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
	mixins:[Service],
	name:'FileUpload',
	data(){
		return{
			Global: Global,
			imgAr: [],
			buttonEnable: true,
			isAuth: false,
			selectedImg: null,
			errorMessage: null,
			chosenImg: [],
			showItem: {},
			tokenn: "",
		}
	},
	components:{
		mainLayout
	},
	methods: {
		sweetQuestion: function (title, message, successCallback, errorCallback) {
      this.$swal({
        title: title,
        text: message,
        type: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((value) => {
        if (value) {
          successCallback();
        } else {
          errorCallback();
        }
      });
    },
    sweetSuccess: function (title, message) {
      this.$swal(title, message, "success").then((value) => {
        return true;
      });
    },
    sweetError: function (title, message) {
      this.$swal(title, message, "error").then((value) => {
        return false;
      });
    },
    uploadRequest: function (config) {
      var vm = this;
      if ($.isEmptyObject(config)) {
        config = {
          headers: {
            Accept: "application/json",
            // Authorization: vm.tokenn
            Authorization: vm.tokenn,
          },
        };
      }

      var axios = vm.originAxios.create(config);
      return axios;
      //uploadRequest(config).post|get(),
    },
    openPreviewModal: function (img) {
      var vm = this;
      vm.showItem = img;

      $("#previewModal").modal("show");
	},
	ToDropzone: function (URL_PATH) {
    var vm = this;
      window.resolveLocalFileSystemURL(URL_PATH, function (fileEntry) {
        fileEntry.file(function (file) {
          var reader = new FileReader();
          reader.onloadend = function (evt) {
            var blob = new Blob([reader.result], { type: "image/jpeg" });
            Global.xDropzone.addFile(blob);
          };
          reader.readAsArrayBuffer(file);
        });
      });
    },
    takePhoto: function () {
      var vm = this;
      navigator.camera.getPicture(onSuccess, onFail, {
        quality: 100,
        destinationType: Camera.DestinationType.FILE_URI,
        saveToPhotoAlbum: true
      });

      function onSuccess(imageURI) {
        vm.ToDropzone(imageURI);
      }

      function onFail(message) {
        if(message != 'No Image Selected'){
        vm.sweetError(vm.$t("surveyform.warn.error"),message)
      }
      }
    },
    SelectPhotosfromLibrary: function () {
      var vm = this
      $("#myFile").click();
      // window.imagePicker.getPictures(
      //   function (results) {
      //     console.log("@@results",results);
      //     for (var i = 0; i < results.length; i++) {
      //       vm.ToDropzone(results[i])
      //     }
      //   },
      //   function (error) {
      //     vm.sweetError(vm.$t("surveyform.warn.error"),error)
      //   },
      //   {
      //     maximumImagesCount: 10
      //   }
      // );
    },
  
    /* Fetch file from Roojai Doc App */
    getRelatedS3Files: function (sfid) {
      var vm = this;
      $("#processing").modal("show");
      var setting = {
        headers: {
          Accept: "application/json",
          Authorization: vm.tokenn,
        },
      };
      vm.uploadRequest(setting)
        .get(Global.RoojaiDocApp + "listS3Prefix/" + sfid)
        .then(function (resp) {
          //  handle success
          if (resp.status == "200" && resp.data) {
            vm.imgAr = resp.data;
          }
          $("#processing").modal("hide");
        })
        .catch(function (error) {
		  // handle error
        vm.openErrorMessageModal(
				error.message
            );

        });
    },
    /* To show delete comfirm dialog */
    toDelete: function (img) {
      var vm = this;
      vm.selectedImg = img;
      $("#confirm-del-file-dialogue").modal("show");
    },
    /* API to delete img */
    deleteThis: function (img) {
      var vm = this;
      //To read Thai character
      img.name = decodeURI(img.name);
      img.s3Key = decodeURI(img.s3Key);
      img.thumbnailUrl = decodeURI(img.thumbnailUrl);

      let data = JSON.stringify(img);
      let destination = Global.RoojaiDocApp + "update/deleteFile";
      const config = {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json",
           Authorization: vm.tokenn
         // Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NUb2tlbiI6IiIsInJlY29yZElkIjoiIiwidXNlcm5hbWUiOiJmaWxlbWFuYWdlYXBwIiwiZXhwIjoxNjAxNTIzMTMwLCJpYXQiOjE2MDE1MjI4MzB9.nJXiz3QnHKJTtd7OlVigYr7Gaszf8z3cIrP9EfPJJqM "
        },
      };

      $("#processing").modal("show");
      vm.uploadRequest(config)
        .post(destination, data)
        .then(function (resp) {
          $("#processing").modal("hide");
          if (resp.status == "200") {
            vm.imgAr.splice(vm.imgAr.indexOf(img), 1);
          }
        })
        .catch(function (error) {
          $("#processing").modal("hide");
          vm.showModalTokenError();
        });
    },
    showModalTokenError: function (){
       var vm = this;
        vm.openErrorMessageModal(vm.$t("file.upload.warn.token.expire") ,'ERROR 401');
          $("#errmsgModal").on("hidden.bs.modal", function (e) {
            vm.$router.push("/history");
            $(this).off("hidden.bs.modal");
          });
    }
	},
	
	mounted(){
		
    var formData = new FormData();
    var vm = this;
    if(localStorage.getItem("RoojaiDocUsername") && localStorage.getItem("RoojaiDocPass")){
      formData.append("username",localStorage.getItem("RoojaiDocUsername"));
      formData.append("password",localStorage.getItem("RoojaiDocPass"));
      $("#processing").modal("show");
      try {
        /*[B]- Login Roojai Doc app before initial page-*/
        var auth_roojaiDoc = vm.originAxios.create({
          headers: {
            Accept: "application/json",
          },
        });
        auth_roojaiDoc
          .post(Global.RoojaiDocApp + "authenticate", formData)
          .then((response) => {
          //   $("#processing").modal("hide");
            if (response.status == "200" && response.data.token.length > 0) {
              vm.tokenn = "Bearer " + response.data.token;

              /* Init dropzone object for uploading things */
              Global.xDropzone = new Dropzone("div#my-dropzone", {
                url: Global.RoojaiDocApp + "update/addFile/" + Global.claimObject.case_sfid,
                parallelUploads: 50,
                autoQueue: true,
                dictDefaultMessage: "",
                maxFilesize: 20,
                acceptedFiles: "image/*,application/pdf",
                clickable: "#myFile",
                // clickable: false,
                renameFile: function (file) {
                  let newName = new Date().getTime() + "_" + file.name;
                  return newName;
                },
                headers: { Authorization: vm.tokenn    
            //Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NUb2tlbiI6IiIsInJlY29yZElkIjoiIiwidXNlcm5hbWUiOiJmaWxlbWFuYWdlYXBwIiwiZXhwIjoxNjAxNTIzMTMwLCJpYXQiOjE2MDE1MjI4MzB9.nJXiz3QnHKJTtd7OlVigYr7Gaszf8z3cIrP9EfPJJqM "
                },
              });
              /*Handle events on Dropzone Oject  */
              Global.xDropzone.on("addedfile", function (file, resp) {
                console.log("#addedfile");
                $(".dz-preview").remove();
                $("#processing").modal("show");
              });

              Global.xDropzone.on("success", function (file, resp) {
                console.log("#success");
                Global.xDropzone.removeFile(file);
                $("#processing").modal("hide");
                if (resp.error != undefined && resp.error.length > 0)
                  alert("upload has failed " + resp.error);
                else {
                  vm.imgAr.push(resp);
                  document.getElementById("myForm").reset();
                }
              });

              Global.xDropzone.on("error", function (file, errorMessage) {
                console.log("#error");
                  $("#processing").modal("hide");
                  Global.xDropzone.removeFile(file);
                  if (typeof errorMessage === 'string' || errorMessage instanceof String) {
                    if (
                      errorMessage == "You can't upload files of this type." ||
                      errorMessage.includes("File is too big")
                    ) {
                      vm.openErrorMessageModal(
                        vm.$t("file.upload.warn.upload.fail"),
                        "ERROR 403"
                      );
                      document.getElementById("myForm").reset();
                    } else {
                      vm.showModalTokenError();
                    }
                  } else {
                    vm.showModalTokenError();
                  }
              });


              /*Fetch the existing image*/
              vm.getRelatedS3Files(Global.claimObject.case_sfid);
            }
          });
        /*[E]- Login Roojai Doc app before initial page-*/
      } catch (error) {
        vm.openErrorMessageModal(vm.$t("file.upload.warn.connect.fail"));
        $("#errmsgModal").on("hidden.bs.modal", function (e) {
          vm.$router.push("/mainmenu");
          $(this).off("hidden.bs.modal");
        });
    }

      }
    else{
      vm.getSystemConfByCondition(false)
      vm.$swal({
        title: vm.$t("surveyform.warn.error"),
        icon: 'error',
        html: vm.$t("mainmenu.label.check.internet")
      }).then($router.back())
    }	}

}
</script>

<style>

</style>