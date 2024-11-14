<template>
  <div class="Users travelsTable my-2">
    <Table
      :headers="headers"
      :data="Trips.Trips"
      @actionShow="showUsers"
      @ChangeStatus="changeStatusfun"
      :loading="Trips.loadingTrip"
      @Delete="DeleteTrip"
    />
  </div>
  <popup class="popup popup-travel" v-if="makeTrips">
    <template #body
      ><div class="header mb-3">
        <h5 class="text-center">مستخدمين الرحلة</h5>
        <span class="close" @click="makeTrips = false"
          ><img src="@/assets/images/close-svgrepo-com.svg"
        /></span>
      </div>
      <UserStrip></UserStrip>
    </template>
  </popup>
  
  <popup v-if="showDelete">
        <template #body
          ><h3 class="text-center py-5 mb-4 mt-2">
            هل انت متأكد من حذف هذه الرحله؟
          </h3>
          <div class="text-center gap-2 d-flex buttons m-auto">
            <button
              class="send"
              @click="DeletripFun"
              v-if="!Trips.tripDelete"
            >
              نعم أرغب</button
            ><button class="send" v-else>....إنتظر</button>
            <button class="cancel" @click="showDelete = false">
              لا ,أرغب
            </button>
          </div></template
        >
      </popup>
</template>

<script setup>
import { ref } from "vue";
import popup from "@/components/global/popup.vue";
import UserStrip from "./UserStrip.vue";
import { useTrips } from "@/stores/Trip/index";
import Table from "@/components/global/table.vue";
let props = defineProps(["trip_status"]);
const makeTrips = ref(false);
const Trips = useTrips();
//headers
let headers = ref([
  { name: "رقم الرحلة", key: "trip_number" },
  { name: "التاريخ", key: "tripe_date" },
  { name: "الوقت", key: "trip_time_return" },
  { name: "من - إلى", key: "from_to" },
  { name: "الحالة", key: "status", dropdownEdit: "status" },
  { name: "الركاب", key: "count_users" },
  { name: "", key: "popupAction" },
  { name: "", key: "DeleteIcon" },
]);

const showUsers = async (id) => {
  await Trips.getUsersTrips(id);
  makeTrips.value = true;
};
const changeStatusfun = async (id, status) => {
  let data = ref({ trip_id: id, status: status });
  await Trips.ChangeStatus(data.value, props.trip_status);
  
};

const showDelete = ref(false);
const Deletid = ref(null);
const DeleteTrip=(id)=>{
showDelete.value =true;
Deletid.value = id; 
}
const DeletripFun =async()=>{
  await Trips.DeleteTrip(Deletid.value,props.trip_status);
  showDelete.value = false;
  Deletid.value = null; 

}
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
  .activeSpan {
    color: green;
  }
  .active {
    background: green;
  }
  .notSubSpan {
    color: #aaa;
  }
  .notSub {
    background: #aaa;
  }
  .notActiveSpan {
    color: #ff8a00;
  }
  .notActive {
    background: #ff8a00;
  }
}
.Dropdown {
  display: inline-block;
  position: relative;
  button {
    background: transparent;
    img {
      width: 17px;
      height: 17px;
    }
  }
  ul {
    display: none;
    position: absolute;
    background: white;
    padding: 10px 0px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.356);
    z-index: 9999999;
    top: 20px;
    li {
      padding: 5px 10px;
      width: 150px;
      margin-bottom: 2px;
      cursor: pointer;
    }
  }
  &:hover {
    ul {
      display: block;
      li:hover {
        background: #2a82c9;
        color: white;
      }
    }
  }
}
.send{
  background: red !important;
}
</style>
