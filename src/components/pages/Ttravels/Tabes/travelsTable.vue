<template>
  <div class="Users travelsTable my-2">
    <EasyDataTable :headers="headers" :items="Trips.Trips" class="table-style">
      <template #item-trip_time_return="data">
        <img src="@/assets/images/users/clock.svg" class="icon" />
        {{ data.trip_time_return }}
      </template>
      <template #item-from_to="data">
        {{ data.trip_from }} - {{ data.trip_to }}
      </template>
      <template #item-type="data">
        <span v-if="data.trip_type == 'return'"> العوده </span
        ><span v-else> الذهاب </span>
      </template>
      <template #item-status="data">
        <span v-if="data.is_active">
          <span class="dots active"></span>تم الحضور</span
        ><span v-else> <span class="dots active"></span>لم يتم الحضور</span>
      </template>
    </EasyDataTable>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTrips } from "@/stores/Trip/index";
const Trips = useTrips();
let headers = ref([
  { text: "رقم الرحلة", value: "trip_number" },
  { text: "التاريخ", value: "tripe_date", sortable: true },
  { text: "الوقت", value: "trip_time_return", sortable: true },
  { text: "من - إلى", value: "from_to" },
  { text: "نوع الرحلات", value: "type" },
  { text: "الحالة", value: "status" },
]);

let items = ref([
  {
    numberTravel: "00001#",
    History: `25/7/2024`,
    from_to: "جامعة القاهر - الشيخ زايد",
    trip_time_return: "50 ج.م",
    type: "ذهاب",
    status: "تم الحضور",
  },
  {
    numberTravel: "00001#",
    History: `25/7/2024`,
    from_to: "جامعة القاهر - الشيخ زايد",
    trip_time_return: "50 ج.م",
    type: "ذهاب",
    status: "لم الحضور",
  },
  {
    numberTravel: "00001#",
    History: `25/7/2024`,
    from_to: "جامعة القاهر - الشيخ زايد",
    trip_time_return: "50 ج.م",
    type: "ذهاب",
    status: "لم الحضور",
  },
]);
</script>
<style lang="scss" scoped>
.Users {
  .card {
    width: 95%;
    margin: 20px auto 50px;
  }

  button,
  .button-table {
    background: #2a82c9;
    color: white;
    width: auto !important;
    border: 0px !important;
    padding: 2px;
    border-radius: 5px !important;
    box-shadow: 0px 0px 0px 0px;
    width: 100px;
    padding: 10px;
    margin-bottom: 5px;
  }
  .more-button {
    background: #ff9917;
  }
  .btnactive {
    color: green;
  }
  .dots {
    width: 10px;
    height: 10px;
    display: inline-block;
    border-radius: 100%;
    margin: 0px 10px;
  }
  .active {
    background: green;
  }
  .notActive {
    background: #f93a3a;
  }
}
</style>
<style lang="scss">
.travelsTable {
  .vue3-easy-data-table__main,
  .vue3-easy-data-table {
    padding: 0px !important;
  }
  .table-style tbody tr {
    margin: 0px auto !important;
    width: 95%;
    margin-bottom: 30px !important;
  }
  .vue3-easy-data-table__main.fixed-header th:last-child,
  .vue3-easy-data-table__main.fixed-header th:first-child {
    border-radius: 0px !important;
  }
  .vue3-easy-data-table__body tbody tr td {
    width: calc(100% / 5) !important;
  }
}
</style>
