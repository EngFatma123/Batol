<template>
  <div class="card px-0">
    <ul class="tab">
      <li :class="currentTap == 1 ? 'active' : ''" @click="currentTap = 1">
        <img src="@/assets/images/travel-icon.svg" /> الراحلات
      </li>
      <li :class="currentTap == 2 ? 'active' : ''" @click="currentTap = 2">
        <img src="@/assets/images/location-icon.svg" /> عنوانين الالتقاط
      </li>
      <li :class="currentTap == 3 ? 'active' : ''" @click="currentTap = 3">
        <img src="@/assets/images/location_icon2.svg" /> عنوانين الجامعة
      </li>
      <li :class="currentTap == 4 ? 'active' : ''" @click="currentTap = 4">
        <img src="@/assets/images/doller_icon3.svg" /> الحزم اليومية و الشهرية
      </li>
    </ul>
    <div class="TapContent mt-5">
      <tabTravel v-if="currentTap == 1" />
      <PickupAddresses v-if="currentTap == 2" />
      <Universityaddresses v-if="currentTap == 3" />
      <Dailymonthly v-if="currentTap == 4" />
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import tabTravel from "@/components/pages/Ttravels/Tabes/travels.vue";
import PickupAddresses from "@/components/pages/Ttravels/Tabes/PickupAddresses.vue";
import Universityaddresses from "@/components/pages/Ttravels/Tabes/Universityaddresses.vue";
import Dailymonthly from "@/components/pages/Ttravels/Tabes/Dailymonthly.vue";
import { useTrips } from "@/stores/Trip/index";
const Trips = useTrips();
let currentTap = ref(1);
const showpopupDisable = ref(false);
const showpopupRemove = ref(false);
const showpopupActive = ref(false);
const showActive = ref("active");
const showPopup4 = ref(false);
const showPopup5 = ref(false);
const showPopup6 = ref(false);

const FunChage = (val) => {
  showpopupDisable.value = false;
  showpopupActive.value = false;
  showActive.value = val;
};
onMounted(async () => {
  await Trips.getTrips();
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
  width: 100%;
  margin: 0px auto;
  justify-content: center;
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
    background: #a8a8a8;
    color: black;
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
</style>
<style lang="scss">
.popup-travel.content-popup {
  .card {
    width: 71% !important;
  }
  .vue3-easy-data-table__main.fixed-header th {
    background: transparent !important;
    padding: 0px !important;
  }
}
</style>
