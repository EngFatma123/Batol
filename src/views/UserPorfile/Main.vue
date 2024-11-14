<template>
  <div class="card card-body" v-if="Users.UserInfo ">
    <ul class="tab" >
      <li :class="!Users.UserInfo.is_active ? 'active' : ''" @click="MakeActive" v-if="!Users.UserInfo.is_active">
        تفعيل الحساب
      </li>
      <li
        :class="Users.UserInfo.is_active ? 'notActive' : ''"
        @click="showpopupDisable = true"
        v-if="Users.UserInfo.is_active"
      >
        تعطيل الحساب
      </li>
      <li
        :class="currentTap == 3 ? 'active' : ''"
        @click="showpopupRemove = true"
      >
        حذف الحساب
      </li>
      <li :class="currentTap == 4 ? 'active' : ''" @click="showPopup4 = true">
        الرحلات
      </li>
      <li :class="currentTap == 5 ? 'active' : ''" @click="showPopup5 = true">
        تعديل البيانات
      </li>
      <li :class="currentTap == 6 ? 'active' : ''" @click="showPopup6 = true">
        المعاملات
      </li>
    </ul>
    <div class="TapContent mt-5">
      <TabActiveAccount :UserInfo="Users.UserInfo" />
      <popup v-if="showpopupActive && !Users.UserInfo.is_active">
        <template #body
          ><h3 class="text-center py-5 mb-4 mt-2">
            هل انت متأكد من تفعيل الحساب؟
          </h3>
          <div class="text-center gap-2 d-flex buttons m-auto">
            <button
              class="send"
              @click="MakeBlockUnBlockFun"
              v-if="!Users.loadingAccountChangeStatus"
            >
              نعم أرغب</button
            ><button class="send" v-else>....إنتظر</button
            ><button class="cancel" @click="showpopupActive = false">
              لا ,أرغب
            </button>
          </div></template
        >
      </popup>
      <popup v-if="showpopupDisable && Users.UserInfo.is_active">
        <template #body
          ><h3 class="text-center py-5 mb-4 mt-2">
            هل انت متأكد من تعطيل الحساب؟
          </h3>
          <div class="text-center gap-2 d-flex buttons m-auto">
            <button
              class="send"
              @click="MakeBlockUnBlockFun"
              v-if="!Users.loadingAccountChangeStatus"
            >
              نعم أرغب</button
            ><button class="send" v-else>....إنتظر</button>
            <button class="cancel" @click="showpopupDisable = false">
              لا ,أرغب
            </button>
          </div></template
        >
      </popup>
      <popup v-if="showpopupRemove && currentTap < 3">
        <template #body
          ><h3 class="text-center py-5 mb-4 mt-2">
            هل انت متأكد من حذف الحساب؟
          </h3>
          <div class="text-center gap-2 d-flex buttons m-auto">
            <button class="send" @click="MakeDeleteUser">نعم أرغب</button
            ><button class="cancel" @click="showpopupRemove = false">
              لا ,أرغب
            </button>
          </div></template
        >
      </popup>
      <!-- <div class="" v-if="currentTap == 2">
        <TabNotActiveAccount :UserInfo="UserInfo" />
      </div> -->
      <div class="" v-if="currentTap == 3">
        <TabRemoveAccount />
      </div>
      <popup class="popup popup-travel" v-if="showPopup4">
        <template #body
          ><div class="header">
            <h5 class="text-center mb-0">الرحلات</h5>
            <span class="close" @click="showPopup4 = false"
              ><img src="@/assets/images/close-svgrepo-com.svg"
            /></span>
          </div>
          <TableTravel></TableTravel>
        </template>
      </popup>
      <popup class="popup popup-sha7n" v-if="showPopup6">
        <template #body
          ><div class="header">
            <h5 class="text-center mb-0">سجل الشحن</h5>
            <span class="close" @click="showPopup6 = false"
              ><img src="@/assets/images/close-svgrepo-com.svg"
            /></span>
          </div>
          <Table></Table>
        </template>
      </popup>
      <popupEditData v-if="showPopup5" @closePopup="showPopup5 = false" />
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import popup from "@/components/global/popup.vue";
import popupEditData from "@/components/pages/UserProfile/popupEditData.vue";
import TabActiveAccount from "@/components/pages/UserProfile/Tabes/TabActiveAccount.vue";
import TabRemoveAccount from "@/components/pages/UserProfile/Tabes/TabRemoveAccount.vue";
import Table from "@/components/pages/UserProfile/table.vue";
import TableTravel from "@/components/pages/UserProfile/TableTravel.vue";
import { useUsers } from "@/stores/Users/index";
import { useRoute, useRouter } from "vue-router";
let Users = useUsers();
let currentTap = ref(1);
let route = useRoute();
let router = useRouter();
const showpopupDisable = ref(false);
const showpopupRemove = ref(false);
const showpopupActive = ref(false);
const showActive = ref("active");
const showPopup4 = ref(false);
const showPopup5 = ref(false);
const showPopup6 = ref(false);
// const FunChage = (val) => {
//   showpopupDisable.value = false;
//   showpopupActive.value = false;
//   showActive.value = val;
// };
const MakeBlockUnBlockFun = async () => {
  currentTap.value = 2;
  let Data = { user_id: route.params.id };
  await Users.MakeBlockUnBlock(Data);
  showpopupDisable.value = false;
  showpopupActive.value = false;
  if (Users.UserInfo.is_active) {
    router.push("/Users");
  }
};
const MakeDeleteUser = async () => {
  await Users.DeleteUser(route.params.id);
  DeleteUser.value = false;
};
const MakeActive = async () => {
  if (!Users.UserInfo.is_active) {
    showpopupActive.value = true;
  }
};
onMounted(async () => {
  console.log("ASasasddddddddddddddd")
  await Users.TakeUserInfo(route.params.id);
  await Users.getWalletTransaction(route.params.id);
  await Users.getTrips(route.params.id);
  await Users.getUserOrders(route.params.id);
});
</script>
<style scoped lang="scss">
.card {
  min-height: 70vh;
}
.dropdown {
  width: auto;
  .btn {
    height: 37px;
    padding: 10px;
  }
}

.tab {
  display: flex;
  width: 90%;
  margin: 0px auto;
  justify-content: space-between;
  gap: 20px;
  list-style-type: none;
  li {
    background: #2a82c9;
    color: white;
    width: 120px;
    padding: 10px 2px;
    border-radius: 4px;
    padding: 10px 2px;
    cursor: pointer;
    width: calc(100% / 5);
    text-align: center;
  }
  .active {
    background:#4ce049 ;
    color: black;
  }
  
.notActive {
    background: #f93a3a !important;
    color: white;
  }
}
.buttons-report {
  justify-content: space-between;
  margin: auto;
  align-items: end;
  width: 95%;
  .report-make,
  .miza {
    background: #4ce049;
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
@media (max-width: 900px) {
  .tab{
    width: 100%;
    overflow-x: auto;
    li{   
    width: min-content;
    min-width: max-content !important;
    padding: 10px;
    font-size: 12px
  }}
  
}


</style>
<style lang="scss">
.popup-travel.content-popup,
.popup-sha7n.content-popup {
  .card {
    width: 71% !important;
  }
  .vue3-easy-data-table__main.fixed-header th {
    background: #2c85ce !important;
    color: white;
  }
}

</style>
