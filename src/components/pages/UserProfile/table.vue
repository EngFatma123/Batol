<template>
  <EasyDataTable
    :headers="headers"
    :items="Users.WalletTransaction"
    class="table-style"
  >
    <template #item-name="header">
      <img src="@/assets/images/man.svg" />{{ header.name }}</template
    >
  </EasyDataTable>
</template>

<script setup>
import { ref } from "vue";
import { useUsers } from "@/stores/Users/index";
let Users = useUsers();
let headers = ref([
  { text: "نوع المعاملة", value: "transaction_type" },
  { text: "التاريخ", value: "created_date", sortable: true },
  { text: "الوقت", value: "created_time", sortable: true },
  { text: "المبلغ", value: "price", sortable: true },
]);

let items = ref([
  {
    number: "1",
    history: "15/12/2024",
    email: "50 ج.م",
  },
  {
    number: "1",
    history: "15/12/2024",
    email: "50 ج.م",
  },
  {
    number: "1",
    history: "15/12/2024",
    email: "50 ج.م",
  },
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
</style>
<style>
.table_sha7n .vue3-easy-data-table__body tr td {
  width: 33.3% !important;
}
</style>
