<template>
  <div class="card Users mb-3">
    <DataTable :value="Users.Users" class="table-style">
      <Column field="first_name" header="الاسم"></Column>
      <Column field="phone_number" header="رقم الهاتف"></Column>
      <Column field="email" header="البريد الالكترونى"></Column>
      <Column field="DestinationPoint.name" header="الحساب"></Column>
      <Column field="action">
        <template #body>
          <router
            class="button-table"
            @click="
              $router.push({ name: 'ProfileUser', params: { id: data.id } })
            "
          >
            الصفحه الشخصيه
          </router></template
        >
      </Column>
    </DataTable>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
import { useUsers } from "@/stores/Users/index";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

let Users = useUsers();
const itemsPerPage = ref(5);
const loading = ref(true);
const totalItems = ref(0);
const serverItems = ref([]);
</script>
<style scoped lang="scss">
.v-btn.v-btn--density-default {
  box-shadow: none;
}
.imagePro {
  width: 50px;
  height: 50px;
  border-radius: 100%;
}
.v-list-item-title {
  padding: 10px;
  cursor: pointer;
  width: 150px;
  &:hover {
    background: #673ab7;
    color: white;
    border-radius: 4px;
  }
}
.is-ar {
  .v-list-item-title {
    direction: rtl;
  }
}
</style>
