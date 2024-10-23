module.exports =(_env,_platform) =>{
  // for version
  let version = _env=="uat"?
    //for uat
    (_platform=="android"?"2.9.4.0.2":""):
    //for production
    (_platform=="android"?"2.9.1.0.4":"")

  // for app build number
  let versionCode = _env=="production"?
    //for uat
    (_platform=="android"?"29402":""):
    //for production
    (_platform=="android"?"29402":"")
  
  return {
    "config.xml":{
      "widget.id":{
        "uat":_platform=="android"?"com.roojai.surveyor":"",
        "production":_platform=="android"?"com.rjs.claimapp.surveyor":""
      },
      "widget.platform":{
        "uat":_platform=="android"?"android-versionCode":"ios-CFBundleVersion",
        "production":_platform=="android"?"android-versionCode":"ios-CFBundleVersion",
      },
      "widget.version":{
        "uat":version,
        "production":version
      },
      "widget.versionCode":{
        "uat":versionCode,
        "production":versionCode
      },
      "widget.appName":{
        "uat":_platform=="android"?"UAT Surveyor App":"",
        "production":_platform=="android"?"Roojai Surveyor":""
      }
    },
    "GlobalVariable.vue":{
      "versionApp":{
        "uat":versionCode,
        "production":versionCode,
        "local":versionCode
      },
      "claimBackend":{
        "uat":"https://claimconsole.uat-roojai.com/api/",
        "production":"https://claimconsole.roojai.com/api/",
        "local":"http://localhost:8181/api/"
      },
      "username":{
        "uat":"svApiUat",
        "production":"svApiProd",
        "local":"svApiUat"
      },
      "password":{
        "uat":"c3YtYXBpLXJvb2phaQ==",
        "production":"c3YtYXBpLXJvb2phaQ==",
        "local":"c3YtYXBpLXJvb2phaQ=="
      },
      "gmapKey":{
        "uat":"AIzaSyATY-qKe9tI4ncgtxp-OyAkd66lJY5sQFI",
        "production":"AIzaSyBAq6X5dA4zoKHwEC7BZabZmXGDP-djJAM",
        "local":"AIzaSyATY-qKe9tI4ncgtxp-OyAkd66lJY5sQFI"
      },
      "RoojaiDocApp":{
        "uat":"https://dms.uat-roojai.com/",
        "production":"https://dms.roojai.com/",
        "local":"https://dms.uat-roojai.com/"
      }
    },
    "google-services.json":{
      "project_number":{
        "uat":"702580758196",
        "product.ion":"295138461765",
        "local":"702580758196"
      },
      "firebase_url":{
        "uat":"https://roojai-surveyor-app.firebaseio.com",
        "production":"https://roojai-surveyor.firebaseio.com",
        "local":"https://roojai-surveyor-app.firebaseio.com"
      },
      "project_id":{
        "uat":"roojai-surveyor-app",
        "production":"roojai-surveyor",
        "local":"roojai-surveyor-app"
      },
      "client_info.mobilesdk_app_id":{
        "uat":"1:702580758196:android:12d780f0f2fba210",
        "production":"1:295138461765:android:834d7a7089611822",
        "local":"1:702580758196:android:12d780f0f2fba210"
      },
      "client_info.android_client_info.package_name":{
        "uat":"com.roojai.surveyor",
        "production":"com.rjs.claimapp.surveyor",
        "local":"com.roojai.surveyor"
      },
      "oauth_client.client_id":{
        "uat":"702580758196-hcgfpsjql9c7ojcp3hjacsrvlb22eeum.apps.googleusercontent.com",
        "production":"295138461765-9hspqi1f3oej2cgljn1e5l8bfn2pqbnv.apps.googleusercontent.com",
        "local":"702580758196-hcgfpsjql9c7ojcp3hjacsrvlb22eeum.apps.googleusercontent.com"
      },
      "api_key.current_key":{
        "uat":"AIzaSyAffkNV483Les3Mbte-gce-eGF3MawltoQ",
        "production":"AIzaSyCQtEDk_laD0lXyhT8tWwYBmis80-V4iQ0",
        "local":"AIzaSyAffkNV483Les3Mbte-gce-eGF3MawltoQ"
      },
      "other_platform_oauth_client.client_id":{
        "uat":"702580758196-b1lcp8gftnlapf6k7r0q0t7nv6da963q.apps.googleusercontent.com",
        "production":"295138461765-9hspqi1f3oej2cgljn1e5l8bfn2pqbnv.apps.googleusercontent.com",
        "local":"702580758196-b1lcp8gftnlapf6k7r0q0t7nv6da963q.apps.googleusercontent.com"
      }
    }
  }
}