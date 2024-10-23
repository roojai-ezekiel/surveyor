<template>
  <div>
    <div
      class="tab-pane fade active show"
      id="accident"
      role="tabpanel"
      aria-labelledby="accident-tab"
    >
      <h5 class="text-center">{{ $t("surveyform.label.accident.detail") }}</h5>

      <div class="form-group">
        <label for="accident-cause-type">{{ $t("surveyform.label.cause.type") }}</label>
        <select id="accident-cause-type" class="custom-select" v-model="Global.AccDetail.CauseType">
          <option selected value="">{{ $t("surveyform.pls.select") }}</option>
          <option v-for="cType in Global.causeTypeSelection" :key="cType.val" :value="cType.val">{{cType.desc}}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="accident-incident-type">{{ $t("surveyform.label.incident.type") }}</label>
        <select id="accident-incident-type" class="custom-select" v-model="Global.AccDetail.IncidentType">
          
          <option selected value="" v-if="Global.AccDetail.CauseType == '' ">{{$t("surveyform.pls.select.causetype")}}</option>
          <option selected value="" v-else>{{ $t("surveyform.pls.select") }}</option>
          <option v-for="item in IncTypeSelectionfiltering" :key="item.val" :value="item.val">{{item.desc}}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="accident-insured-driver">{{ $t("surveyform.label.liability") }}</label>
        <select id="accident-insured-driver" class="custom-select" v-model="Global.AccDetail.Liability">
          <option selected value="">{{ $t("surveyform.pls.select") }}</option>
          <option v-for="item in Global.LiabilitySelection" :key="item.val" :value="item.val">{{item.desc}}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="accident-remark">{{ $t("surveyform.label.investigate.remark") }}</label>
        <textarea
          id="accident-remark"
          type="text"
          class="form-control"
          v-model="Global.AccDetail.InvestRemark"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import Global from './GlobalVariable.vue';
export default {
	data(){
		return{
			Global: Global
		}
  },
  computed:{
    IncTypeSelectionfiltering: function() {
      var currentCusType = Global.AccDetail.CauseType;
      if (currentCusType) {
        return Global.IncidentTypeSelection[currentCusType];
      }else{
        return null
      }
    }
  }
};
</script>

<style>
</style>