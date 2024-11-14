<template>
  <popupEditBAKA class="popupEdit"
    ><template #header> تعديل سعر الباقه اليوم </template>
    <template #body>
      <form @submit.prevent="onSubmit">
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label"
            >سعر الرحلة
          </label>
          <input
            type="text"
            class="form-control"
            id="package_daily"
            v-bind="package_daily"
            oninput="this.value= this.value&&this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').replace(/\+/g,'').replace(/\./g,'');"
            :class="{ 'is-invalid': errors.package_daily }"
          />
          <div class="invalid-feedback">{{ errors.package_daily }}</div>
        </div>
        <div class="text-center buttons">
          <button class="send" v-if="!Trips.loadingupdateDailyTrip">حفظ</button
          > <button class="cancel" v-else>حفظ</button
            ><button class="cancel" @click="$emit('closepop')">إلغاء</button>
        </div>
      </form></template
    >
  </popupEditBAKA>
</template>

<script setup>
import { useTrips } from "@/stores/Trip/index";
import { onMounted  } from "vue";
import popupEditBAKA from "@/components/global/popup.vue";
import { useForm } from "vee-validate";

const Trips = useTrips();
const emits = defineEmits(['closepop']);
import * as Yup from "yup"; // meta
let { errors, handleSubmit, defineInputBinds, resetForm } = useForm({
  validationSchema: Yup.object({
    package_daily: Yup.string().required("this filed is required"),
  }),
});

//first_name ,last_name
const package_daily = defineInputBinds("package_daily");
let onSubmit = handleSubmit(async (values) => {
  if (values) {
    try {
      await Trips.updateDailyTrip(values);
      emits("closepop");
    } catch (err) {
      console.log(err);
    }
  }
});
onMounted(() => {    
  resetForm({
  values: {
    package_daily:Trips.DailyTrip
  }});});
</script>
