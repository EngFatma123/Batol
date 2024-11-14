<template>
  <EasyDataTable :headers="headers" :items="Users.Trips" class="table-style">
    <template #item-img>
      <img src="@/assets/images/travelBus.svg" class="travelBus"
    /></template>
    <template #item-trip_type="data">
      <span v-if="data.trip_type == 'going'">
        <span class="dots active"></span>تم الحضور</span
      ><span v-else> <span class="dots active"></span>لم يتم الحضور</span>
    </template>
    <template #item-time_trip="data">
      <img src="@/assets/images/users/clock.svg" class="icon" />{{
        data.time_trip
      }}</template
    >
    <template #item-price="data">
      <img src="@/assets/images/users/money.svg" class="icon" />{{
        data.price
      }}</template
    >
  </EasyDataTable>
</template>

<script setup>
import { ref } from "vue";
import { useUsers } from "@/stores/Users/index";
let Users = useUsers();
let headers = ref([
  { text: "#", value: "img" },
  { text: "رقم", value: "id" },
  { text: "التاريخ", value: "date_trip" },
  { text: "الوقت", value: "time_trip" },
  { text: "المبلغ", value: "price" },
  { text: "نوع الرحله", value: "trip_type" },
]);
</script>
<style lang="scss">
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
}
.travelBus {
  width: 80px;
}
.icon {
  width: 20px;
  height: 20px;
  margin-left: 5px;
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
</style>
