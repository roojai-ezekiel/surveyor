<template>
  <div>
    <div
      class="tab-pane fade active show"
      id="injury"
      role="tabpanel"
      aria-labelledby="injury-tab"
    >
      <h5 class="text-center">{{ $t("surveyform.label.injury.property") }}</h5>
      <div id="driver-injured-case">
        <div class="form-group">
           <label for="number-passenger">{{ $t("surveyform.label.number.passenger" ) }}</label>
          <input type="number" class="form-control" id="number-passenger" v-model="Global.InjuryProperty.NumberPassenger" />
        </div>
        <div class="form-group">
          <div class="row">
            <p class="col-7 mb-0">{{ $t("surveyform.label.driver.injured") }}</p>
            <div class="col-2">
              <input
                class="radio-inline-input-y"
                type="radio"
                name="driver-injured"
                id="driver-injured-y"
                v-model="Global.InjuryProperty.DriverInjured"
                value="Yes"
              />
              <label
                class="radio-inline-label-y py-1 mb-0"
                for="driver-injured-y"
                >{{ $t("surveyform.choice.yes") }}</label
              >
            </div>
            <div class="col-2">
              <input
                class="radio-inline-input-n"
                type="radio"
                name="driver-injured"
                id="driver-injured-n"
                v-model="Global.InjuryProperty.DriverInjured"
                value="No"
              />
              <label
                class="radio-inline-label-n py-1 mb-0"
                for="driver-injured-n"
                >{{ $t("surveyform.choice.no") }}</label
              >
            </div>
          </div>
        </div>

        <!-- driver-injured-info / default: hide / yes-no  -->
        <div class="driver-injured-info">
          <div class="form-group">
            <label for="driver-injured-name">{{ $t("surveyform.label.injured.name") }}</label>
            <input
              id="driver-injured-name"
              class="form-control"
              type="text"
              placeholder="Input"
              v-model="Global.InjuryProperty.InjuredName"
              disabled
            />
          </div>

          <div class="form-group">
            <label for="driver-injured-relation">{{ $t("surveyform.label.injured.relation") }}</label>
            <select id="driver-injured-relation" class="custom-select" v-model="Global.InjuryProperty.InjuredRelation" disabled>
              <option selected value="">{{ $t("surveyform.pls.select") }}</option>
               <option v-for="item in Global.RelationSelection" :key="item.val" :value="item.val">{{item.desc}}</option>
            </select>
          </div>

          <div class="form-group">
            <label for="driver-injured-detail">{{ $t("surveyform.label.injured.detail") }}</label>
            <textarea
              id="driver-injured-detail"
              type="text"
              class="form-control"
              v-model="Global.InjuryProperty.InjuredDetail"
              :disabled="Global.InjuryProperty.DriverInjured != 'Yes'"
            ></textarea>
          </div>
        </div>
      </div>

      <h5 class="text-center mt-5">{{ $t("surveyform.label.deduct.excess") }}</h5>

      <div class="form-group">
        <label for="other-policy-deductible">{{ $t("surveyform.label.deductible") }}</label>
        <input id="other-policy-deductible" class="form-control" type="text" v-model="Global.Deductible" readonly/>
      </div>

      <div class="form-group">
        <label for="other-excess">{{ $t("surveyform.label.otherexcess") }}</label>
        <input id="other-excess" class="form-control" type="number" v-model="Global.OtherExcess"/>
      </div>

      <div class="form-group">
        <label for="other-remark">{{ $t("surveyform.label.remark") }}</label>
        <textarea id="other-remark" type="text" class="form-control" v-model="Global.RemarkExcess"></textarea>
      </div>

      <h5 class="text-center mt-5">{{ $t("surveyform.label.fraud.section") }}</h5>
      <div id="fraud-case">
        <div class="form-group">
          <div class="row my-2">
            <p class="col-7 mb-0">{{$t("surveyform.label.suspected")}} ?</p>

            <div class="col-2">
              <input
                class="radio-inline-input-y"
                type="radio"
                name="fraud"
                id="fraud-y"
                v-model="Global.Fraud.SuspectedFraud"
                :value="true"
              />
              <label class="radio-inline-label-y py-1 mb-0" for="fraud-y"
                >{{$t("surveyform.choice.yes")}}</label>
            </div>
            <div class="col-2">
              <input
                class="radio-inline-input-n"
                type="radio"
                name="fraud"
                id="fraud-n"
                v-model="Global.Fraud.SuspectedFraud"
                :value="false"
              />
              <label class="radio-inline-label-n py-1 mb-0" for="fraud-n"
                >{{$t("surveyform.choice.no")}}</label
              >
            </div>
          </div>
        </div>

        <!-- fraud-case-info / default: hide / yes-no  -->
        <div class="fraud-case-info">
          <div class="form-group">
            <label for="fraud-internal-comment">{{ $t("surveyform.label.internal.comment") }}</label>
            <textarea
              type="text"
              class="form-control"
              id="fraud-internal-comment"
              v-model="Global.Fraud.InternalComment" 
              :disabled="Global.Fraud.SuspectedFraud != true"
            ></textarea>
          </div>

          <div class="form-group">
            <label for="fraud-comment">{{ $t("surveyform.label.fraud.comment") }}</label>
            <textarea
              id="fraud-comment"
              type="text"
              class="form-control"
              v-model="Global.Fraud.FraudComment"  
              :disabled="Global.Fraud.SuspectedFraud != true"
            ></textarea>
          </div>
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

};
</script>

<style>
</style>