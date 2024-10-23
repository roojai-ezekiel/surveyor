<template>
  <div>
    <div
      class="tab-pane fade active show"
      id="preview"
      role="tabpanel"
      aria-labelledby="preview-tab"
    >
      <h5 class="text-center">{{ $t("surveyform.label.preview") }}</h5>

      <p><span class="strong">{{ $t("surveyform.label.ic.passport") }} : </span>{{ Global.Driver.ID }}</p>
      <p><span class="strong">{{ $t("surveyform.label.firstname") }} : </span>{{ Global.Driver.firstname }}</p>
      <p><span class="strong">{{ $t("surveyform.label.lastname") }} : </span>{{ Global.Driver.lastname }}</p>
      <p><span class="strong">{{ $t("surveyform.label.phone") }} : </span>{{ Global.Driver.Phone }}</p>
      <p><span class="strong">{{ $t("surveyform.label.email") }} : </span>{{ Global.Driver.Email }}</p>
      <p><span class="strong">{{ $t("surveyform.label.driving.license") }} : </span>{{ Global.Driver.DrivingLicense }}</p>
      <p><span class="strong">{{ $t("surveyform.label.driving.license.type") }} : </span>{{ Global.Driver.DrivingLicenseType }}</p>
      <p><span class="strong">{{ $t("surveyform.label.lang") }} : </span>{{ Global.Driver.prefLang }}</p>
      <br />
      <p>
        <span class="strong">{{ $t("surveyform.label.cause.type") }} : </span>{{ Global.AccDetail.CauseType?DisplayCauseType[0]["desc"]:'' }}</p>
      <p>
        <span class="strong">{{ $t("surveyform.label.incident.type") }} : </span>{{ Global.AccDetail.IncidentType }}</p>
      <p><span class="strong">{{ $t("surveyform.label.liability") }}  : </span>{{Global.AccDetail.Liability?DisplayLiability[0]["desc"]:''}}</p>
      <p><span class="strong">{{ $t("surveyform.label.investigate.remark") }} : </span> {{Global.AccDetail.InvestRemark}} </p>
      <br />
      <p><span class="strong">{{ $t("surveyform.label.is.car.drivable") }} : </span>{{ Global.InsuredVehicle.Drivable }}</p>
      <p><span class="strong">{{ $t("surveyform.label.odometer.reading") }} : </span> {{ Global.InsuredVehicle.Odometer }}</p>
      <p><span class="strong">{{ $t("surveyform.label.car.camera.install") }} : </span> {{ Global.InsuredVehicle.CameraInstall }} </p>
      <p><span class="strong">{{ $t("surveyform.label.car.camera.working") }} : </span>{{ Global.InsuredVehicle.CameraWork }}</p>
      <p><span class="strong">{{ $t("surveyform.label.car.at.garage") }} : </span>{{ Global.InsuredVehicle.CarAtGarage }}</p>
      <p><span class="strong">{{ $t("surveyform.label.garage.dealer") }} : </span>{{ Global.InsuredVehicle.GarageDealer }} </p>
      <br />
      <p><span class="strong">{{ $t("surveyform.label.number.passenger") }} : </span>{{ Global.InjuryProperty.NumberPassenger }}</p>
      <p><span class="strong">{{ $t("surveyform.label.driver.injured") }} : </span>{{ Global.InjuryProperty.DriverInjured }}</p>
      <p><span class="strong">{{ $t("surveyform.label.injured.name") }} : </span>{{Global.InjuryProperty.InjuredName}}</p>
      <p><span class="strong">{{ $t("surveyform.label.injured.relation") }} : </span>{{Global.InjuryProperty.InjuredRelation}}</p>
      <p><span class="strong">{{ $t("surveyform.label.injured.detail") }} : </span>{{Global.InjuryProperty.InjuredDetail}}</p>
      <br />
      <div class="row">
        <div class="col-7">
          <p class="mb-0">{{ $t("surveyform.label.noify.related") }}</p>
        </div>
        <div class="col-5 text-right">
          <input
            class="radio-inline-input-y"
            type="radio"
            name="Notify-Related"
            id="Notify-Related-y"
            v-model="Global.NotifyRelated"
            :value="true"
          />
          <label class="radio-inline-label-y py-1 ml-1" for="Notify-Related-y"
            >{{$t("surveyform.choice.yes")}}</label
          >
          <input
            class="radio-inline-input-n"
            type="radio"
            name="Notify-Related"
            id="Notify-Related-n"
            v-model="Global.NotifyRelated"
            :value="false"
          />
          <label class="radio-inline-label-n py-1 mb-0" for="Notify-Related-n"
            >{{ $t("surveyform.choice.no") }}</label
          >
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Global from "./GlobalVariable.vue";
export default {
  data() {
    return {
      Global: Global,
    };
  },
  methods:{
    
  },
  computed:{
    DisplayCauseType: function() {
      var selectedVal = Global.AccDetail.CauseType;
      if (selectedVal) {
        return Global.causeTypeSelection.filter(item => item.val === selectedVal);
      }else{
        return null
      }
    },
    DisplayLiability: function() {
      var selectedVal = Global.AccDetail.Liability;
      if (selectedVal) {
        return Global.LiabilitySelection.filter(item => item.val === selectedVal);
      }else{
        return null
      }
    },
  }
};
</script>

<style>
</style>