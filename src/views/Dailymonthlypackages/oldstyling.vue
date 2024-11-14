<template>
  <div>
    <div class="card card-body py-5">
      <div class="row">
        <div class="col-md-12">
          <div class="row p-0 m-0" v-if="!editForm">
            <div class="col-md-6">
              <h4 class="mb-4">الرحلة اليومية</h4>
              <label>سعر الرحلة اليومية </label>
              <p>{{ Trips.Package.package_daily }}ج.م</p>
            </div>
            <div class="col-md-6">
              <h4 class="mb-4">سعر الاشتراك</h4>
              <label>مقدار الخصم باقة شهرية</label>
              <p>{{ Trips.Package.package_monthly }}ج.م</p>
            </div>
            <div class="col-md-6"></div>
            <div class="col-md-6">
              <label>سعر الرحلة بعد الاشتراك </label>
              <p>{{ Trips.Package.price_after_subscribe }}ج.م</p>
            </div>
          </div>
          <!-- <div
            v-if="editForm"
            style="width: 100%; height: 200px; text-align: center; margin: auto"
          > -->
          <!-- <ProgressSpinner
              style="stroke: #42a5f5 !important; width: 30px; height: auto"
              strokeWidth="2"
              fill="transparent"
              animationDuration=".5s"
              aria-label="Custom ProgressSpinner"
              class="spinner"
            /> -->
          <div class="form" v-if="editForm">
            <from
              ><div class="row p-0 m-0">
                <div class="col-md-6">
                  <h4 class="mb-4">الرحلة اليومية</h4>
                  <label>سعر الرحلة اليومية </label
                  ><span
                    ><input
                      type="number"
                      v-model="Trips.UpdatePackage.package_daily"
                      class="form-control"
                    />
                    ج.م</span
                  >
                </div>
                <div class="col-md-6">
                  <h4 class="mb-4">سعر الاشتراك</h4>
                  <label style="display: block">مقدار الخصم باقة شهرية</label>
                  <span
                    ><input
                      type="text"
                      v-model="Trips.UpdatePackage.package_monthly"
                      class="form-control"
                    />
                    ج.م</span
                  >
                </div>
                <div class="col-md-6"></div>
                <div class="col-md-6">
                  <label>سعر الرحلة بعد الاشتراك </label>
                  <span
                    ><input
                      type="number"
                      v-model="Trips.UpdatePackage.price_after_subscribe"
                      class="form-control"
                    />
                    ج.م</span
                  >
                </div>
              </div></from
            >
          </div>
        </div>
        <div class="bg-img"><img src="@/assets/images/bg2_bus.svg" /></div>
        <div class="buttons d-flex mt-5" v-if="!loadingPackage">
          <button class="edit-show" @click="editForm = true" v-if="!editForm">
            تعديل
          </button>
          <button class="save-show" v-if="editForm" @click="updateDatafun">
            حفظ
          </button>
          <button class="cancel-show" v-if="editForm" @click="editForm = false">
            الغاء
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useSetting } from "@/stores/Settings/index";
import { onMounted, ref, watch } from "vue";
import { useTrips } from "@/stores/Trip/index";
const Trips = useTrips();
const Settings = useSetting();
const showpopupActive = ref(false);
const editForm = ref(false);
const showActive = ref("active");

const updateDatafun = async () => {
  await Trips.UpdateData(Trips.UpdatePackage);
  editForm.value = false;
};
onMounted(async () => {
  await Trips.getPackage();
});
</script>

<style scoped lang="scss">
.card {
  min-height: 80vh;
  label {
    margin-bottom: 10px;
    color: #2473b3;
    font-weight: 600;
  }
  span {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    gap: 10px;
  }
  input {
    width: 80px;
  }
  .bg-img {
    text-align: center;
    width: 100%;
    img {
      object-fit: contain;
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
  .make-active,
  .make-cancel,
  .make-notactive {
    color: #4ce049;
    padding: 0px;
    height: 36px;
    border-radius: 5px;
    width: auto;
    text-align: center;
  }
  .make-cancel,
  .make-notactive {
    color: #aaa;
  }
  .make-notactive {
    color: #f93a3a;
  }
  .actions {
    align-items: end;
  }
}
.buttons {
  justify-content: center;
  gap: 20px;
  display: flex;
  button {
    width: 20% !important;
  }
  .edit-show {
    background: linear-gradient(167deg, #ff8a00 1.71%, #ffc75b 95.32%);
  }
  .cancel-show {
    color: black;
    background: #d9d9d9;
  }
  .save-show {
    background: #2473b3;
  }
}
</style>
