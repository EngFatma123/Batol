<template>
  <div class="card card-body mb-3">
    <div class="mx-4">
      <button class="new_trip" @click="new_trip = true">اضافة رحلة</button>
    </div>
    <!-- <ul class="tab">
      <li :class="trip_status == 'going' ? 'active' : ''" @click="changetrip_status('going')">
        <img src="@/assets/images/travel-icon.svg" />الذهاب
      </li>
      <li :class="trip_status == 'return' ? 'active' : ''" @click="changetrip_status('return')">
        <img src="@/assets/images/travel-icon.svg" />العوده
      </li>
      <li :class="trip_status == 'going_return' ? 'active' : ''" @click="changetrip_status('going_return')">
        <img src="@/assets/images/travel-icon.svg" />الذهاب و العوده
      </li>
    </ul> -->
    <div class="TapContent mt-5">
      <Table :trip_status="trip_status"/>
    </div>
  </div>
  <AddTrip v-if="new_trip" @closePopup="new_trip = false" :trip_status="trip_status"/>
</template>
<script setup>
import { ref, onMounted } from "vue";
import Table from "@/components/pages/Trips/travelsTable.vue";
import AddTrip from "@/components/pages/Trips/AddTrip.vue";
import { useTrips } from "@/stores/Trip/index";
const Trips = useTrips();
let trip_status = ref("going_return");
let new_trip = ref(false);
const changetrip_status = async (namevalue) => {
  trip_status.value = namevalue;
  await Trips.getTrips('going_return');
};
onMounted(async () => {
  await Trips.getTrips(trip_status.value);
  await Trips.getdestinationstrat_point();
  await Trips.getdestinationend_point();

});
</script>
<style scoped lang="scss">
.card {
  min-height: 70vh;
}

button {
  background: linear-gradient(167deg, #ff8a00 1.71%, #ffc75b 95.32%);
  width: 150px !important;
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

    img {
      width: 16px;
      height: 16px;
      margin: auto 5px;
    }
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

form label {
  color: #2473b3;
}

@media (max-width: 900px) {
  .tab {
    margin-top: 20px;
    align-items: center;
    padding: 0px;
    gap:5px;

    li {
      width: 33%;
      font-size: 11px;
    }
  }
}
</style>
<style lang="scss">
.popup-trip.content-popup {
  .vue3-easy-data-table__main.fixed-header th {
    background: transparent !important;
    padding: 0px !important;
  }
}
</style>
