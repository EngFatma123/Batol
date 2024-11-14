import { createApp, markRaw } from "vue";

// router
import router from "./router/index.js";

// styles
import "normalize.css";
import "./assets/scss/main.scss";
// app
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";

// bootstrap 5
import "@popperjs/core";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import "vue-toastification/dist/index.css";

// pinia
import { createPinia } from "pinia";
import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";
// Toast
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
const app = createApp(App);
//pinia
const pinia = createPinia();
pinia.use(({ store }) => {
  store.router = markRaw(router);
});
import VueApexCharts from "vue3-apexcharts";

app.use(router).use(pinia).use(Toast, {
  position: POSITION.TOP_RIGHT,
  timeout: 500
});
// Arabic locale settings for DatePicker
const arabicLocale = {
  firstDayOfWeek: 6,
  dayNames: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
  dayNamesShort: ['أحد', 'إثن', 'ثلاث', 'أربع', 'خميس', 'جمعة', 'سبت'],
  dayNamesMin: ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'],
  monthNames: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
  monthNamesShort: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
  today: 'اليوم',
  clear: 'مسح',
  dateFormat: 'dd/mm/yy',
  weekHeader: 'أسبوع',
};

app.use(PrimeVue, { locale: arabicLocale, ripple: true, rtl: true ,
  theme: {
    preset: Aura,
  },});
// app.use(PrimeVue, {
//   locale: {
//     accept: "Aceptar",
//     reject: "Rechazar",
//     //...
//   },
//   theme: {
//     preset: Aura,
//   },
// });
app.use(VueApexCharts);
app.component("VueDatePicker", VueDatePicker);
app.component("EasyDataTable", Vue3EasyDataTable);
app.mount("#app");
