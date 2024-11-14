<template>
  <popupEditBAKA class="popupEdit"><template #header>
      <span v-if="props.UpdateId">تعديل الباقه </span>
      <span v-else>إضافة الباقه جديده</span></template>
    <template #body>
      <form @submit.prevent="onSubmit">
        <div class="row mt-4">
          <div class="mb-2 col-md-6">
            <label for="exampleFormControlInput1" class="form-label">نوع الباقه
            </label>
            <select class="form-control" id="type_baka" v-bind="trip_type_id"
              :class="{ 'is-invalid': errors.trip_type_id }" :disabled="Trips.Generaldata.length == 0">
              <option v-for="trip_type in Trips.Generaldata" :key="trip_type" :value="trip_type.id">
                {{ trip_type.name }}
              </option>
            </select>
            <div class="invalid-feedback">{{ errors.trip_type_id }}</div>
          </div>
          <!-- <div class="mb-2 col-md-6">
            <label for="exampleFormControlInput1" class="form-label">نوع الرحلة
            </label>
            <select class="form-control" id="type_trip" v-bind="type_trip" :class="{ 'is-invalid': errors.type_trip }">
              <option v-for="typetrip in list_type_trip" :key="typetrip" :value="typetrip.value">
                {{ typetrip.name }}
              </option>
            </select>
            <div class="invalid-feedback">{{ errors.type_trip }}</div>
          </div> -->
          <!-- <div class="mb-2 col-md-6" v-if="props.UpdateId">
            <label for="exampleFormControlInput1" class="form-label">عنوان الإستيلام
            </label>
            <select class="form-control" id="type_trip" v-bind="address_Receipt" required>
              <option v-for="typetrip in list_type_trip" :key="typetrip" :value="typetrip.value">
                {{ typetrip.name }}
              </option>
            </select>
          </div> -->

          <div class="mb-3 col-md-6 content-filed">
            <label for="exampleFormControlInput1" class="form-label">عنوان المحطه</label>
            <div class="content-form">
              <select type="text" class="form-control" id="trip_from" name="trip_from" v-model="trip_from"
                :disabled="Trips.Listaddress_strat_point.length == 0">
                <option v-for="start_point in Trips.Listaddress_strat_point" :key="start_point.id"
                  :value="start_point.id">
                  {{ start_point.name_ar }}
                </option>
              </select>
            </div>
          </div>
          <div class="mb-3 col-md-6 content-filed">
            <label for="exampleFormControlInput1" class="form-label">عنوان الوصول
            </label>
            <div class="content-form">
              <select type="text" class="form-control" id="trip_to" name="trip_to" v-model="trip_to"
                :class="{ 'is-invalid': errors.trip_to }" :disabled="Trips.Listaddress_end_point.length == 0">
                <option v-for="end_point in Trips.Listaddress_end_point" :key="end_point.id" :value="end_point.id">
                  {{ end_point.name_ar }}
                </option>
              </select>
              <div class="invalid-feedback">{{ errors.trip_to }}</div>
            </div>
          </div>
          <!-- <div class="mb-2 col-md-6">
            <label for="exampleFormControlInput1" class="form-label">إسم الباقه
            </label>
            <input type="text" class="form-control" id="name_ar" v-bind="name_ar"
              :class="{ 'is-invalid': errors.name_ar }" />
            <div class="invalid-feedback">{{ errors.name_ar }}</div>
          </div> -->
          <div class="mb-2 col-md-6">
            <label for="exampleFormControlInput1" class="form-label">عدد الرحلات
            </label>
            <input type="text" class="form-control" id="trips_number" v-bind="trips_number"
              :class="{ 'is-invalid': errors.trips_number }" 
              oninput="this.value= this.value&&this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').replace(/\+/g,'').replace(/\./g,'');"
            />
            <div class="invalid-feedback">{{ errors.trips_number }}</div>
          </div>
          <div class="mb-3 content-filed col-md-6">
            <label for="exampleFormControlTextarea1" class="form-label">تاريح انتهاء الباقه
            </label>
            <div class="content-form">
              <DatePicker name="tripe_date" v-model="expired_date" :class="`{ 'is-invalid': errors.tripe_date }`" />
              <div class="invalid-feedback">{{ errors.expired_date }}</div>
            </div>
          </div>
          <div class="mb-2 col-md-6">
            <label for="exampleFormControlInput1" class="form-label">سعر الباقه
            </label>
            <input
              class="form-control" id="price" v-bind="price" :class="{ 'is-invalid': errors.price }" 
              oninput="this.value= this.value&&this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').replace(/\+/g,'').replace(/\./g,'');"

        
              />
              <span class="feedback" v-if="errorPrice">يجب أن يكون أكبر من 0</span>
            <div class="invalid-feedback">{{ errors.price }}</div>
          </div>
          <!-- <div class="mb-2 col-md-6">
            <label for="exampleFormControlInput1" class="form-label">مدده الباقه
            </label>
            <input type="text" class="form-control" id="duration" v-bind="duration"
              :class="{ 'is-invalid': errors.duration }" />
            <div class="invalid-feedback">{{ errors.duration }}</div>
          </div> -->
        </div>
        <div class="text-center buttons">
          <button class="send" v-if="!Trips.loading_action">حفظ</button>
          <button class="cancel" v-else>إنتظر ...</button>
          <button class="cancel" @click="$emit('closepop')">إلغاء</button>
        </div>
      </form>
    </template>
  </popupEditBAKA>
</template>

<script setup>
import popupEditBAKA from "@/components/global/popup.vue";
import { useForm } from "vee-validate";
import DatePicker from "primevue/datepicker";
import { onMounted, ref, watch } from "vue";
import * as Yup from "yup";
import { useTrips } from "@/stores/Trip/index";
import moment from "moment";
const Trips = useTrips();
const props = defineProps(["UpdateId", "DataUpdate"]);
let emits = defineEmits('closepop');

const list_type_baka = ref([
  { name: "يومى", value: "daily" },
  { name: "شهريه", value: "montly" },
  { name: "دائمه", value: "alwaily" },
]);
const list_type_trip = ref([
  { name: "ذهاب", value: "going" },
  { name: "عوده", value: "return" },
  { name: "ذهاب و عوده", value: "going_return" },
]);
let trip_from = ref(null);
let trip_to = ref(null);
// meta
let { errors, handleSubmit, defineInputBinds, resetForm } = useForm({
  validationSchema: Yup.object({
    trip_type_id: Yup.string().required("هذا المجال مطلوب"),
    // type_trip: Yup.string().required("هذا المجال مطلوب"),
    trips_number: Yup.string().required("هذا المجال مطلوب"),
    price: Yup.string().required("هذا المجال مطلوب"),
    // duration: Yup.string().required("هذا المجال مطلوب"),
  }),
});
//type_baka ,type_trip
const trip_type_id = defineInputBinds("trip_type_id");
// const type_trip = defineInputBinds("type_trip");
const trips_number = defineInputBinds("trips_number");
const price = defineInputBinds("price");
// const duration = defineInputBinds("duration");
const expired_date = ref(new Date());
const errorPrice =ref(false);
let onSubmit = handleSubmit(async (values) => {
  errorPrice.value =false;
  if(values.price <= 0){
    errorPrice.value =true;
    return;
  }
  if (values) {
    try {
      let data = ref({
        trip_type_id: values.trip_type_id,
        trips_number: values.trips_number,
        price: values.price,
        trip_from: trip_from.value ? trip_from.value : null,
        trip_to: trip_to.value ? trip_to.value : null,
        expired_date: moment(expired_date.value).format(
          "YYYY-MM-DD"
        ),
      })
      if (!props.UpdateId) {
        await Trips.storePakages(data.value);
      } else {
        await Trips.updatePakages(props.UpdateId, data.value);

      }
      emits('closepop');
    } catch (err) {
      console.log(err);
    }
  }
});
onMounted(() => {
  const trip_type_id = ref();
  console.log('DataUpdate', props.DataUpdate);
  for (let key in Trips.Generaldata) {
    if (props.DataUpdate.trip_type == Trips.Generaldata[key].name) {
      trip_type_id.value = Trips.Generaldata[key].id;
    }
  }
  if (props.DataUpdate) {
    resetForm({
      values: {
        trips_number: props.DataUpdate.trips_number,
        price: props.DataUpdate.price,
        name_ar: props.DataUpdate.name_ar,
        trip_type_id: trip_type_id.value,
        // phone_number: Users.UserInfo.phone_number,
      },
    });
    for (let key in Trips.Listaddress_strat_point) {
      if (props.DataUpdate.trip_from == Trips.Listaddress_strat_point[key].name_ar) {
        trip_from.value = Trips.Listaddress_strat_point[key].id;
      }
    }
    for (let key in Trips.Listaddress_end_point) {
      if (props.DataUpdate.trip_to == Trips.Listaddress_end_point[key].name_ar) {
        trip_to.value = Trips.Listaddress_end_point[key].id;
      }
    }
  }
})
// watch(
//   () => props.DataUpdate,
//   (newVal) => {alert("adsdaasd");
//     // resetForm({
//     //   values: {
//     //     trips_number: props.DataUpdate.trips_number,
//     //     phone_number: Users.UserInfo.phone_number,
//     //   },
//     // });
//   }
// );
</script>
<style lang="scss">
.popupEdit.content-popup .card {
  margin-top: 2% !important;
}
.p-datepicker-day-selected-range{
    margin: 0px !important;
    width: auto !important;
}
.p-datepicker-day-selected-range{
  background: #bad8f0 !important;
    color: #514655 !important;
    border-radius: 0px !important;
}
</style>