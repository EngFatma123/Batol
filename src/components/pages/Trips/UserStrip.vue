<template>
  <Table :headers="headers" :data="Trips.UsersTrips" />
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useTrips } from "@/stores/Trip/index";
import SheetsDownload from "@/components/global/SheetsDownload.vue";
import Table from "@/components/global/table.vue";
let Trips = useTrips();

let headers = ref([
  { name: "الاسم", key: "full_name" },
  { name: "رقم الهاتف", key: "phone" },
  { name: "البريد الالكترونى", key: "email" },
  { name: "الحاله", key: "status" },
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
  .btnnotactive {
    color: red;
  }
  .imgs-profile {
    width: 20px;
  }
}
</style>
