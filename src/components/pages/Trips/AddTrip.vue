<template>
  <popup class="popup popup-trip">
    <template #body>
      <div class="header mb-4">
        <h5 class="text-center mb-0">اضافة رحلة</h5>
        <span class="close" @click="$emit('closePopup')"><img src="@/assets/images/close-svgrepo-com.svg" /></span>
      </div>
      <form @submit.prevent="onSubmit">
        <div class="row">

          <div class="mb-3 content-filed">
            <label for="exampleFormControlInput1" class="form-label">عنوان الالتقاط

              <span class="title_error" v-if="Trips.Listaddress_strat_point.length == 0">(برجاء اضافه عنوان)</span>
            </label>
            <div class="content-form">
              <select type="text" class="form-control" id="trip_from" name="trip_from" v-bind="trip_from"
                :class="{ 'is-invalid': errors.trip_from }" :disabled="Trips.Listaddress_strat_point.length == 0">
                <option v-for="start_point in Trips.Listaddress_strat_point" :key="start_point.id"
                  :value="start_point.id">
                  {{ start_point.name_ar }}
                </option>
              </select>
              <div class="invalid-feedback">{{ errors.trip_from }}</div>
            </div>
          </div>
          <div class="mb-3 content-filed">
            <label for="exampleFormControlInput1" class="form-label">عنوان الوصول
              <span class="title_error" v-if="Trips.Listaddress_end_point.length == 0">(برجاء اضافه عنوان)</span>
            </label>
            <div class="content-form">
              <select type="text" class="form-control" id="trip_to" name="trip_to" v-bind="trip_to"
                :class="{ 'is-invalid': errors.trip_to }" :disabled="Trips.Listaddress_end_point.length == 0">
                <option v-for="end_point in Trips.Listaddress_end_point" :key="end_point.id" :value="end_point.id">
                  {{ end_point.name_ar }}
                </option>
              </select>
              <div class="invalid-feedback">{{ errors.trip_to }}</div>
            </div>
          </div>
          <!-- <div class="mb-3 content-filed">
            <label for="exampleFormControlInput1" class="form-label"
              >الحاله
            </label>
            <div class="content-form">
              <select
                type="text"
                class="form-control"
                id="trip_to"
                name="trip_to"
                v-bind="trip_to"
                :class="{ 'is-invalid': errors.trip_to }"
              >
                <option
                  v-for="status in trip_status"
                  :key="status.id"
                  :value="status.id"
                >
                  {{ status.name_ar }}
                </option>
              </select>
              <div class="invalid-feedback">{{ errors.trip_to }}</div>
            </div>
          </div> -->
          <div class="mb-3 content-filed col-md-6">
            <label for="exampleFormControlTextarea1" class="form-label">التاريخ
            </label>
            <div class="content-form">
              <DatePicker name="tripe_date" :minDate="thisDate" v-model="tripe_date"
                :class="`{ 'is-invalid': errors.tripe_date }`" />
              <div class="invalid-feedback">{{ errors.tripe_date }}</div>
            </div>
          </div>
          <div class="mb-3 content-filed col-md-6">
            <label for="exampleFormControlTextarea1" class="form-label">
              وقت بدأ الرحلة
              <span class="feedback">(يجب ادخال وقت يلى الوقت الحالى بساعه) </span></label>
            <div class="content-form">
              <input type="time" id="datepicker-timeonly" v-model="trip_time" 
                @change="chaeckTime" @date-select="chaeckTime"/>
            </div>
          </div>
          <div class="mb-3 content-filed col-md-6" v-if="props.trip_status == 'going_return'">
            <label for="exampleFormControlTextarea1" class="form-label">
              وقت العوده من الرحلة
              <span class="feedback">(يجب ان يلى وقت البدأ بساعه)</span></label>
            <div class="content-form">
              <input type="time" id="datepicker-timeonly" v-model="trip_time_return" hourFormat="12" timeOnly fluid
                @change="chaeckTimetrip_time_return" @date-select="chaeckTimetrip_time_return" />
              <div class="invalid-feedback" v-if="errorstrip_time_return">
                هذا الحقل مطلوب
              </div>
            </div>
          </div>
          <div class="col-md-6 mt-4 p-0" v-if="trip_time_return">
            <button type="button" class="add_new_return mt-2  mb-2 text-center m-auto d-block"
              :class="trip_time_return_more.length == 4 ? 'displayButon' : ''" @click="addNewReturnHour">إضافه وقت عوده
              +</button>
          </div>

          <div class="mb-3 content-filed col-md-6" v-if="props.trip_status == 'going_return'"
            v-for="(return_triponly, i) in trip_time_return_more" :key="return_trip">
            <label for="exampleFormControlTextarea1" class="form-label">
              وقت العوده من الرحلة
              <span class="feedback">(يجب ان يلى وقت البدأ )</span></label>
            <div class="content-form">
              <input type="time" id="datepicker-timeonly" v-model="trip_time_return_more[i]" hourFormat="12" timeOnly
                fluid @change="chaecktrip_time_return_more" @date-select="chaecktrip_time_return_more" />
              <div class="invalid-feedback" v-if="errorstrip_time_return">
                هذا الحقل مطلوب
              </div>
            </div>
          </div>
          <div class="text-center gap-2 d-flex buttons">
            <button class="send" v-if="!Trips.LoadingTripStore">حفظ</button>
            <button class="send" v-else>إنتظر......</button><button class="cancel"
              @click="$emit('closePopup')">إلغاء</button>
          </div>
        </div>
      </form>
    </template>
  </popup>
</template>
<script setup>
import { ref, watch } from "vue";
import DatePicker from "primevue/datepicker";
import popup from "@/components/global/popup.vue";
import { useTrips } from "@/stores/Trip/index";
import { useForm } from "vee-validate";
import * as Yup from "yup"; // meta
import moment from "moment";
const props = defineProps(['trip_status']);
const emits = defineEmits(['closePopup']);
const Trips = useTrips();
let errorstrip_time_return = ref("");
const thisDate = ref(new Date());
const tripe_date = ref(new Date());
const trip_time = ref(new Date());
let trip_time_return = ref();
let trip_time_return_more = ref([]);
const { errors, handleSubmit, defineInputBinds } = useForm({
  validationSchema: Yup.object({
    trip_from: Yup.string().required("هذا المجال مطلوب"),
    trip_to: Yup.string().required("هذا المجال مطلوب"),
  }),
});


// watch(trip_time, (newQuery) => {
//   chaeckTime();

// });
watch(tripe_date, (newQuery) => {
  chaeckTime();
});

// watch(trip_time_return, (newQuery) => {
//   chaeckTimetrip_time_return();
// });

//first_name ,last_name
const trip_from = defineInputBinds("trip_from");
const trip_to = defineInputBinds("trip_to");

const chaeckTime = () => {
  if (moment(tripe_date.value).format("YYYY-MM-DD") == moment(new Date()).format("YYYY-MM-DD")) {
    let trip_timeStart = moment(new Date(), "HH:mm  A");
    // let trip_timeStart_plus1hour = trip_timeStart.clone().add(50, 'minutes');
    let trip_timeend = moment(trip_time.value, "HH:mm  A");
    if (trip_timeend.isBefore(trip_timeStart)) {
      trip_time.value = null;
    }
  }
}

const chaeckTimetrip_time_return = () => {
  if(trip_time.value){
  let trip_timeStart = moment(trip_time.value, "HH:mm  A");
  let trip_timeStart_plus1hour = trip_timeStart.clone().add(60, 'minutes');
  trip_timeStart = moment(trip_time.value, "HH:mm  A");
  let trip_timeend = moment(trip_time_return.value, "HH:mm  A");
  if (trip_timeend.isBefore(trip_timeStart_plus1hour)) {
    trip_time_return.value = "";
    trip_time_return_more.value = [];
  }
  chaecktrip_time_return_more();}else{
    trip_time_return.value = "";
    trip_time_return_more.value = [];

  }
}

const chaecktrip_time_return_more = () => {
  if (trip_time_return_more.value.length == 1) {
    console.log("trip_time_return_more");
    let trip_timeStart = moment(trip_time_return.value, "HH:mm  A");
    let trip_timeStart_plus1hour = trip_timeStart.clone().add(60, 'minutes');
    let trip_timeend = moment(trip_time_return_more.value[0], "HH:mm  A");
    if (trip_timeend.isBefore(trip_timeStart_plus1hour)) {
      trip_time_return_more.value[0] = null;
    }
  } else {
    let trip_timeStart = moment(trip_time_return_more.value[trip_time_return_more.value.length - 2], "HH:mm  A");
    let trip_timeend = moment(trip_time_return_more.value[trip_time_return_more.value.length - 1], "HH:mm  A");
    let trip_timeStart_plus1hour = trip_timeStart.clone().add(60, 'minutes');
    if (trip_timeend.isBefore(trip_timeStart_plus1hour)) {
      console.log("trip_timeend ==");
      trip_time_return_more.value[trip_time_return_more.value.length - 1] = null;
    }

  }
}
const addNewReturnHour = () => {
  if (trip_time_return_more.value.length <= 4) {
    trip_time_return_more.value.push(null)
  }
}
let onSubmit = handleSubmit(async (values) => {
  if (values) {
    try {
      let data = ref({
        trip_from: values.trip_from,
        trip_to: values.trip_to,
        tripe_date: moment(tripe_date.value).format("YYYY-MM-DD"),
        trip_type: "one_trip",
        trip_time: trip_time.value,
        trip_status: props.trip_status,
        trip_time_return: []
      });
      data.value.trip_time_return[0] = trip_time_return.value;
      let x= 1;
      for (let key in trip_time_return_more.value) {
        if(trip_time_return_more.value[key]){
          data.value.trip_time_return[x ++ ] = trip_time_return_more.value[key];
        }
      }
      console.log(data.value);
      await Trips.TripStore(data.value);
      // emits('closePopup');
    } catch (err) {
      console.log(err);
    }
  }
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
  font-size: 13px;
}

input[type='time'] {
  border: 1px solid #aaa;
  width: 100%;
  height: 42px;
  border-radius: 8px;
  padding: 10px;
}

@media (max-width: 900px) {
  .tab {
    margin-top: 20px;
    align-items: center;
    padding: 0px;

    li {
      width: 33%;
      font-size: 13px;
    }
  }
}

.title_error {
  font-size: 12px;
  color: darkgray;
}

.feedback {
  color: darkgray;
  font-size: 10px;
}

.add_new_return {
  height: 36px;
  font-size: 15px;
  width: auto !important;
  padding: 5px;
  background: #2c85ce;
  border-radius: 5px !important;
}
</style>
<style lang="scss">
.popup-trip.content-popup {
  .vue3-easy-data-table__main.fixed-header th {
    background: transparent !important;
    padding: 0px !important;
  }

  .card {
    margin-top: 1%;
    overflow: auto;
    max-height: 90%;
  }
}

.displayButon {
  background: #aaa !important;
}
</style>