<template>
  <div>
    <div class="card-fillter">
      <div class="dropdown">
        <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
          aria-expanded="false" @click="showDropdown = !showDropdown">
          ترتيب حسب
        </a>

        <ul class="dropdown-menu text-end" :class="showDropdown ? 'show' : ''">
          <li><a class="dropdown-item" href="#" @click="MakeSortingLast">التاريخ (الاقدم)</a></li>
          <li><a class="dropdown-item" href="#" @click="MakeSortingNew">التاريخ (الاحدث)</a></li>
        </ul>
      </div>
    </div>
    <div class="card-body card">
      <Table :headers="headers" :data="Users.Users" :loading="Users.loadingUsers"></Table>
    </div>
  </div>

  <div class="card-fillter">
    <SheetsDownload :headers="headers" :data="Users.Users" sheetName="Sheet List"  v-if="Users.Users != 0" />
  </div>
</template>
<script setup>
import SheetsDownload from "@/components/global/SheetsDownload.vue";
import Table from "@/components/global/table.vue";
import { onMounted, ref } from "vue";
import { useUsers } from "@/stores/Users/index";
let Users = useUsers();
const showpopupDisable = ref(false);
const showpopupActive = ref(false);
const showActive = ref("active");
const showDropdown = ref(false);
const close = () => {
  showpopupDisable.value = false;
  showpopupActive.value = false;
};
const FunChage = (val) => {
  showpopupDisable.value = false;
  showpopupActive.value = false;
  showActive.value = val;
};
let headers = ref([
  { name: "الاسم", key: "first_name" },
  { name: "رقم الهاتف", key: "phone_number" },
  { name: "البريد الالكترونى", key: "email" },
  { name: "الحاله", key: "is_active" },
  { name: "", key: "action", link: "UserPorfile" },
]);


const MakeSortingNew = () => {
  const sortingUserNew = ref([]);
  sortingUserNew.value = Users.Users.sort((a, b) => {
    return new Date(a.created_at) - new Date(b.created_at);
  });
  console.log("sortingUserNew =", sortingUserNew.value);
  Users.Users = [];
  Users.Users = sortingUserNew.value;
  showDropdown.value = false;
}
const MakeSortingLast = () => {
  const sortingUserLast = ref([]);
  sortingUserLast.value = Users.Users.sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });
  console.log("sortingUserLast =", sortingUserLast.value);
  Users.Users = [];
  Users.Users = sortingUserLast.value;
  showDropdown.value = false;

}
onMounted(async () => {
  await Users.getUsers();
});
</script>

<style scoped lang="scss">
.card-fillter {
  display: flex;
  justify-content: end;
  margin: 0px;
  padding: 6px;
  margin-left: 8%;

  .dropdown {
    width: auto;

    .btn {
      height: 42px;
      padding: 10px;
    }
  }

  .search-svgrepo {
    width: 250px;
    position: relative;

    img {
      position: absolute;
      top: 10px;
      right: 5px;
      width: 15px;
    }

    input {
      width: 100%;
      height: 40px;
      padding-right: 25px;
      padding-top: 0px;
      background: #cdcdcd54;
      border: 0px;
    }
  }
}

.buttons-report {
  justify-content: space-between;
  margin: auto;
  align-items: end;
  width: 95%;

  .report-make,
  .miza {
    background: green;
    color: white;
    padding: 10px;
    width: auto;
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .miza {
    background: #263a95;
  }

  .make-active {
    background: #4ce049;
    color: white;
    padding: 2px;
    height: 30px;
  }

  .make-cancel,
  .make-notactive {
    background: #aaa;
    color: black;
    height: 30px;
  }

  .make-notactive {
    background: #f93a3a;
    color: white;
  }

  .actions {
    align-items: end;
  }
}

.buttons {
  justify-content: center;
}
</style>
