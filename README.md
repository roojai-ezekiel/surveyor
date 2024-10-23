
______________________Roojai Mobile App________________________________________


***UAT
*App icon
W:\Departments\IT\MobileLib\RoojaiMobileApp\Uat\AppIcon\roojai "replace to" .\res\
*build-extras.gradle
W:\Departments\IT\MobileLib\RoojaiMobileApp "copy to" .\platforms\android\

*Config.xml
id="com.roojai.claim"
<name>Uat Roojai Mobile</name>
android-versionCode="count up from latest released on google play store format 00000"
ios-CFBundleVersion="count up from latest released on app store format 0.0.0.0.0"
version="count up from latest released on google play store or app store format 0.0.0"
<preference name="com.salesforce.marketingcloud.app_id" value="01b26d1a-fbf9-43fb-9928-5d21eae4018b" />
<preference name="com.salesforce.marketingcloud.access_token" value="wTi7kjHgTTaEpAfj5qBDeswk" />
<preference name="com.salesforce.marketingcloud.tenant_specific_endpoint" value="https://mcnh09xp621f9dyffjg8rxgggrh4.device.marketingcloudapis.com/" />
<branch-key value="key_live_amNjnZHU69LnxWH6sBZOddmlxBl1l7Vm" />
<link-domain value="fz4s.app.link" />

*index.html
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCN2BHOIKlfeLZe0ZF1IT9Td0jbOCMUwNI"></script>

*Google service json
W:\Departments\IT\MobileLib\RoojaiMobileApp\Uat\google-service.json "replace to" .\
W:\Departments\IT\MobileLib\RoojaiMobileApp\Uat\GoogleService-Info.plist "replace to" .\

*Facebook Uninstall and install*******
cordova plugin rm cordova-plugin-facebook4 --save
cordova plugin add cordova-plugin-facebook4@6.3.0 --save --variable APP_ID="457775381757146" --variable APP_NAME="Roojai UAT"

*Add platform 
Android-> cordova platform add android@8.0.0
iOS-> cordova platform add ios@5.1.1

*Add config only android
.\platforms\android\app\build.gradle -> under android under defaultConfig add -> multiDexEnabled true

*RUN
1.npm run build
2.cordova run android --release -- --keystore=D:\Develop\Android-Key\Uat\roojai-key.jks --storePassword=roojai1234 --alias=roojai-key --password=roojai1234

*********************************************************************


***Production
*App icon
W:\Departments\IT\MobileLib\RoojaiMobileApp\Production\AppIcon\roojai "replace to" .\res\

*build-extras.gradle
W:\Departments\IT\MobileLib\RoojaiMobileApp "copy to" .\platforms\android\

*Config.xml
id="com.rjs.claimapp.customer" for android , id="rjs.claimapp.customer" for ios
<name>Roojai Mobile</name>
android-versionCode="count up from latest released on google play store format 00000"
ios-CFBundleVersion="count up from latest released on app store format 0.0.0.0.0"
version="count up from latest released on google play store or app store format 0.0.0"
<preference name="com.salesforce.marketingcloud.app_id" value="068c9812-1027-46a0-aa99-9a274315fff4" />
<preference name="com.salesforce.marketingcloud.access_token" value="KhSAP1agRyH9iYQngZYvxDSu" />
<preference name="com.salesforce.marketingcloud.tenant_specific_endpoint" value="https://mcnh09xp621f9dyffjg8rxgggrh4.device.marketingcloudapis.com/" />
<branch-key value="key_live_jgShQKIilTRCKBd5XE2PgdelqFcy5H6G" />
<link-domain value="b5g9-alternate.app.link" />

*index.html
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDilzpqLvrhLdvN6laNKzkRRxQ1l03GmsI"></script>

*Google service json
W:\Departments\IT\MobileLib\RoojaiMobileApp\Production\google-service.json "replace to" .\
W:\Departments\IT\MobileLib\RoojaiMobileApp\Production\GoogleService-Info.plist "replace to" .\

*Facebook Uninstall and install*******
cordova plugin rm cordova-plugin-facebook4 --save
cordova plugin add cordova-plugin-facebook4@6.3.0 --save --variable APP_ID="828505220589135" --variable APP_NAME="Roojai"

*Add platform 
Android-> cordova platform add android@8.0.0
iOS-> cordova platform add ios@5.1.1

*Add config only android
.\platforms\android\app\build.gradle -> under android under defaultConfig add -> multiDexEnabled true

*RUN
1.npm run build
2.cordova run android --release -- --keystore=D:\Develop\Android-Key\Production\rjs.claimapp.keystore --storePassword=fg33$3!#@aate --alias=rjsclaimapp --password=fg33$3!#@aate

*******************************************

