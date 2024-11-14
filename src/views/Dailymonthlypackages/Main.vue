<template>
  <div>
    <!-- <div class="top-card card">
      <div>
        <label>سعر الرحله اليوميه :</label>
        <p class="price-daily">{{ Trips.DailyTrip }} ج.م</p>
      </div>
      <button @click="showpopupEdit = true">تعديل</button>
    </div> -->
    <div class="card card-body">
      <div class="content-flex">
        <h5>أسعار الباقه</h5>
        <div class=" mb-4">
          <button class="add_baka" @click="addBack">اضافة باقة</button>
        </div>
      </div>
      <Table :headers="headers" :data="Trips.Package" @actionShow="actionShow" :loading="Trips.loadingPackage"
        @DeletePackage="DeletePackage" @ChaneStatusPackageFun="ChaneStatusPackageFun"/>
    </div>
  </div>
  <popupEditBAKA v-if="showpopupEdit" @closepop="showpopupEdit = false" />
  <ActionBaka v-if="showpopupaction" @closepop="showpopupaction = false" :UpdateId="UpdateId"
    :DataUpdate='DataUpdate' />
  <popup v-if="showDelete">
    <template #body>
      <h3 class="text-center py-5 mb-4 mt-2">
        هل انت متأكد من حذف هذه الباقه؟
      </h3>
      <div class="text-center gap-2 d-flex buttons m-auto">
        <button class="send" @click="DeletripFun" v-if="!Trips.PackageDelete">
          نعم أرغب</button><button class="cancel" v-else>....إنتظر</button>
        <button class="cancel" @click="showDelete = false">
          لا ,أرغب
        </button>
      </div>
    </template>
  </popup>
  
  <popup v-if="showpopchange">
        <template #body
          ><h2 class="text-center py-5" v-if="ActivePackage">
            هل أنت متاكد من تفعيل الباقه
          </h2>
          <h2 class="text-center py-5" v-else>
            هل أنت متاكد من تعطيل الباقه
          </h2>
          <div class="text-center gap-2 d-flex buttons m-auto">
            <button
              class="send"
              @click="ChaneStatusPackage"
              v-if="ActivePackage"
            >
              <span v-if="!Trips.ChaneStatusPackagelaoding">تفعيل</span>
              <span v-else>إنتظر .....</span></button
            ><button class="make-notactive" @click="ChaneStatusPackage" v-else>
              <span v-if="!Trips.ChaneStatusPackagelaoding">تعطيل</span>
              <span v-else>إنتظر .....</span></button
            ><button class="cancel" @click="showpopchange = false">
              إلغاء
            </button>
          </div></template
        >
   </popup>
</template>
<script setup>
import popup from "@/components/global/popup.vue";
import Table from "@/components/global/table.vue";
import popupEditBAKA from "@/components/pages/Dailymonthlypackages/popupEditBAKA.vue";
import ActionBaka from "@/components/pages/Dailymonthlypackages/ActionBaka.vue"; //headers
import { onMounted, ref } from "vue";
import { useTrips } from "@/stores/Trip/index";
const Trips = useTrips();
const showpopupEdit = ref(false);
const showpopupaction = ref(false);
const showpopchange = ref(false);
const showDelete = ref(false);
const UpdateId = ref(null);
const DeleteId = ref(null);
const package_id = ref(null);
const DataUpdate = ref(null);
const ActivePackage = ref(null);
let headers = ref([
  { name: "نوع الباقه", key: "trip_type" },
  // { name: "نوع الرحله", key: "type_trip" },
  { name: "عدد الرحلات", key: "trips_number" },
  // { name: "مدد الرحله", key: "duration" },
  // { name: "سعر الرحله", key: "price" },
  { name: "من - إلى", key: "from_to" },
  { name: "تاريخ إنتهاء الباقه", key: "expired_date" },
  { name: "عدد المستخدمين", key: "users_subscribe" },
  { name: "الحاله", key: "is_active" },
  { name: "", key: "popupActionEdit" },
]);

const actionShow = async (id) => {
  UpdateId.value = id;
  DataUpdate.value = {};
  await Trips.Package.find((e) => {
    if (e.id == id) { DataUpdate.value = e }
  });
  showpopupaction.value = true;
};
const addBack = (id) => {
  UpdateId.value = null;
  DataUpdate.value = {};
  showpopupaction.value = true;
};
const DeletePackage = (id) => {
  DeleteId.value = id;
  showDelete.value = true;
};

const DeletripFun = async () => {
  await Trips.DeletePackage(DeleteId.value);
  showDelete.value = false;
};
const ChaneStatusPackageFun = (id,status) => {
  package_id.value = id;
  showpopchange.value = true;
  ActivePackage.value = status;
};

const ChaneStatusPackage = async (id) => {
  await Trips.ChaneStatusPackage({package_id:package_id.value});
  showpopchange.value = false;
};
onMounted(async () => {
  await Trips.getPackage();
  await Trips.GeneralData();
  await Trips.getdestinationstrat_point();
  await Trips.getdestinationend_point();
  await Trips.getDailyTrip();


});
</script>
<style lang="scss" scoped>
.top-card {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 40%;
  margin: 0px 33px;

  label,
  p,
  button {
    margin: 0px;
    display: inline-block;
    vertical-align: -webkit-baseline-middle;
  }

  button {
    width: 150px;
  }

  label {
    color: #aaa;
    font-size: 16px;
  }

  .price-daily {
    font-size: 23px;
    color: #2473b3;
    margin-right: 10px;
  }
}

label,
h5 {
  color: #2473b3;
}

.add_baka {
  background: linear-gradient(167deg, #ff8a00 1.71%, #ffc75b 95.32%);
  width: 150px !important;
}
.content-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.make-notactive{
background: red
}
@media screen and (max-width: 993px) {  
.top-card{
  width: 94%;
    margin: auto;

}}
</style>
