<template>
  <div class="card Hompage-users mb-5">
    <div class="row">
      <div class="col-md-6">
        <p><img src="@/assets/images/Frame.svg" class="mx-2" />الطلبات</p>
      </div>
      <div class="col-md-6" style="text-align: left">
        <button class="more-button" @click="$router.push('/Orders')">
          المزيد
        </button>
      </div>
    </div>
    <EasyDataTable
      :headers="headers"
      :items="Users.OrderList"
      class="table-style"
      :loading="Users.loadingUsers"
    >
      <template #item-name="header">
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
      <template #item-phone="header"> {{ header.phone }}</template>
      <template #item-action="header">
        <button
          class="button-table"
          @click="
            $router.push({ name: 'ProfileUser', params: { id: header.id } })
          "
        >
          الصفحه الشخصيه
        </button></template
      ></EasyDataTable
    >
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUsers } from "@/stores/Users/index";
let Users = useUsers();
let headers = ref([
  { text: "الاسم", value: "name" },
  { text: "رقم الهاتف", value: "phone_number", sortable: true },
  { text: "البريد الالكترونى", value: "email", sortable: true },
  { text: "عنوان الجامعه", value: "DestinationPoint.name", sortable: true },
  { text: "عنوان الالتقاط", value: "SourcePoint.name", sortable: true },
  { text: "", value: "action", sortable: true },
]);
</script>
<style lang="scss">
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
  padding: 8px;
  border-radius: 5px !important;
  box-shadow: 0px 0px 0px 0px;
  width: 100px;
}
.more-button {
  margin-left: 5%;
  width: 120px !important;
  background: #ff9917;
}
.imgs-profile {
  width: 20px;
}
.Hompage-users .vue3-easy-data-table__header th.sortable,
.Hompage-users .vue3-easy-data-table__main.fixed-header th {
  width: 17% !important;
}
</style>
