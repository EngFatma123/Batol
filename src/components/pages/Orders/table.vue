<template>
  <div class="card Users mb-3">
    <EasyDataTable
      :headers="headers"
      :items="Users.OrderList"
      class="table-style"
      :loading="Users.loadingUsers"
    >
      <template #item-first_name="header">
        <img
          :src="header.media_personal_image"
          class="mx-2 imgs-profile"
          v-if="header.media_personal_image"
        />
        <img src="@/assets/images/man.svg" class="mx-2 imgs-profile" v-else />{{
          header.first_name
        }}
        {{ header.second_name }}</template
      >
      <template #item-action="header">
        <button
          class="button-table"
          @click="
            $router.push({ name: 'ProfileUser', params: { id: header.id } })
          "
        >
          الصفحه الشخصيه
        </button></template
      >
    </EasyDataTable>
  </div>
  <div class="mx-4 my-0">
    <SheetsDownload
      :headers="headers"
      :data="Users.Users"
      v-if="Users.Users.length > 0"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import SheetsDownload from "@/components/global/SheetsDownload.vue";

import { useUsers } from "@/stores/Users/index";
let Users = useUsers();
let headers = ref([
  { text: "الاسم", value: "first_name" },
  { text: "رقم الهاتف", value: "phone_number", sortable: true },
  { text: "البريد الالكترونى", value: "email", sortable: true },
  { text: "الحساب", value: "DestinationPoint.name", sortable: true },
  { text: "", value: "action", sortable: true },
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
