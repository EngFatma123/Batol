<template>
  <div class="date_fillter mt-5 px-3 mb-5">
    <div class="row">
      <div class="col-md-5 mb-4">
        <div class="row">
          <div class="col-md-2 p-0">
            <ul class="list_tab">
              <li :class="ContentData.filter_by == 'daily' ? 'active' : ''" @click="ContentData.filter_by = 'daily'">
                اليوم
              </li>
              <li :class="ContentData.filter_by == 'monthly' ? 'active' : ''"
                @click="ContentData.filter_by = 'monthly'">
                الشهر
              </li>
              <li :class="ContentData.filter_by == 'yearly' ? 'active' : ''" @click="ContentData.filter_by = 'yearly'">
                السنه
              </li>
            </ul>
          </div>
          <div class="col-md-10 p-0">
            <!-- <VueDatePicker
              v-model="date"
              auto-apply
              inline
              type="quarter"
              dayFormat
              locale="ar"
              class="VueDatePicker"
              :rtl="true"
            /> -->
            <DatePicker v-model="Time" dateFormat="DD" inline v-if="ContentData.filter_by == 'daily'"
              @date-select="changeTime" />
            <DatePicker v-model="Time" dateFormat="dd" inline view="month"
              v-else-if="ContentData.filter_by == 'monthly'"  @date-select="changeTime" />
            <DatePicker v-model="Time" dateFormat="dd" inline view="year"
              v-else-if="ContentData.filter_by == 'yearly'"  @date-select="changeTime" />
          </div>
        </div>
      </div>
      <div class="col-md-7">
        <div class="card m-0" style="width: 100%">
          <div><img src="@/assets/images/man.svg" />{{ ContentData.name }} </div>
          <p class="dateshow">لتاريخ
            <span v-if="ContentData.filter_by == 'daily'">{{ ContentData.day }}
              /{{ moment(ContentData.month).format("MM") }} /</span>
            <span v-if="ContentData.filter_by == 'monthly'">{{
              moment(ContentData.month).format("MM") }} /</span>
               {{ moment(ContentData.year).format("YYYY") }} = {{
                Dashboard.sumVertical }} {{ ContentData.name }}
          </p>
          <div class="conent_charts">
            <Chart2 v-if="!Dashboard.loadingDashboard" :chartvertical="Dashboard.chart_vertical"
              :charthorizontal="Dashboard.chart_horizontal" />
            <div v-else style="width: 100%; text-align: center; margin: auto">
              <ProgressSpinner style="
                  stroke: #42a5f5 !important;
                  margin: 70px 0px;
                  width: 70px;
                " strokeWidth="2" fill="transparent" animationDuration=".5s" aria-label="Custom ProgressSpinner"
                class="spinner" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import ProgressSpinner from "primevue/progressspinner";
import Chart2 from "./Chart2.vue";
const typeFillter = ref("day");
import moment from "moment";
import { useDashboard } from "@/stores/Dashboard/index";
// auth store
const Dashboard = useDashboard();

import DatePicker from "primevue/datepicker";
const Time = ref(new Date());
const props = defineProps(["theCurrentType"]);
const ContentData = ref({
  name: "المستخدمين",
  type_search: "user",
  day: new Date(),
  year: new Date(),
  month: new Date(),
  filter_by: "daily",
});
watch(
  () => props.theCurrentType,
  (newVal) => {
    ContentData.value = props.theCurrentType;
  }
);
// watch(
//   () => ContentData.value.filter_by,
//   (newVal) => {
//     ContentData.value.year = "";
//     ContentData.value.month = "";
//     ContentData.value.day = "";
//   }
// );
let changeTime = async () => {
  if (
    ContentData.value.day != "Invalid date" &&
    ContentData.value.day != ""
  ) {
    
    console.log("Time",Time)
    ContentData.value.day = moment(Time.value).format("DD");
    ContentData.value.month = moment(Time.value).format("MM");
    ContentData.value.year = moment(Time.value).format("YYYY");
    await Dashboard.getDashboard(ContentData.value);
  }
};
// let changeMonth = async () => {
//   if (
//     ContentData.value.month != "Invalid date" &&
//     ContentData.value.month != ""
//   ) {
//     ContentData.value.month = moment(ContentData.value.month).format("MM");
//     await Dashboard.getDashboard(ContentData.value);
//   }
// };
// let changeyear = async () => {
//   if (
//     ContentData.value.year != "Invalid date" &&
//     ContentData.value.year != ""
//   ) {
//     ContentData.value.year = moment(ContentData.value.year).format("YYYY");
//     await Dashboard.getDashboard(ContentData.value);
//   }
// };
onMounted(async () => {
  console.log("props.theCurrentType", props.theCurrentType);
  ContentData.value = props.theCurrentType;
  console.log("ContentData.value", ContentData.value);
  ContentData.value.day = moment(new Date()).format("DD");
  ContentData.value.year = moment(new Date()).format("YYYY");
  ContentData.value.month = moment(new Date()).format("MM");
  console.log("getDashboard", ContentData.value);
  await Dashboard.getDashboard(ContentData.value);

});
</script>
<style lang="scss">
.VueDatePicker {
  width: 100%;

  .dp__outer_menu_wrap {
    width: 100%;
  }
}

.ui-datepicker-year {
  display: none;
}

.card {
  width: 100%;
  padding: 20px;

  .conent_charts {
    width: 100% !important;
    margin: auto;
    height: 300px;

    #apexchartsVueApexCharts {
      width: 100% !important;
    }
  }
}

.list_tab {
  list-style-type: none;
  padding: 0px;

  li {
    margin-bottom: 5px;
    background: white;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
    padding: 10px;
    cursor: pointer;
    width: 100%;
    text-align: center;
  }

  .active {
    background: #2473b3;
    color: white;
  }
}

.dp__flex_display {
  display: block !important;
}

.dp__instance_calendar {
  height: 250px;
}

.dp__month_year_wrap {
  background: #bad8f0;
  color: #2876b4;

  svg path {
    fill: #2876b4;
  }
}

.dp--tp-wrap {
  display: none;
}

.dp__menu_inner {
  padding: 0px !important;
}

.dp__menu {
  border-radius: 15px !important;
  border: 0px !important;
}

.p-datepicker {
  width: 100%;

  .p-datepicker-panel {
    padding: 0px;
  }

  .p-datepicker-header {
    padding: 4px;
    background: #bad8f0;
  }

  .p-datepicker-next-button,
  .p-datepicker-prev-button {
    transform: rotate(180deg);
  }

  .p-datepicker-day-cell {
    padding: 10px 0px;
  }
}

.p-datepicker-year {
  padding: 10px !important;
}

.p-datepicker-month {
  padding: 15px !important;
}

.p-datepicker-month-selected,
.p-datepicker-year-selected,
.p-datepicker-day-selected {
  background: #2c85ce !important;
}

p.dateshow {
  font-size: 12px;
  color: #a0a0a0;
  padding: 0px 31px;
  margin: 0px;
}

@media screen and (max-width: 993px) {
  .list_tab {
    display: flex;

    li {
      border-radius: 0px;
    }
  }

  .date_fillter {
    padding: 0px !important;
  }
  .row >div{
    padding: 0px !important;
  }
}
</style>
