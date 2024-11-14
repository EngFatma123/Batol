<template>
  <div>
    <div class="d-flex buttons-report mb-4">
      <div class="d-flex gap-3 actions">
        <button class="miza" @click="showpopupActive = true">
          <img src="@/assets/images/icon2.svg" />
          ميزه السحب
        </button>
      </div>
      <popupActive v-if="showpopupActive">
        <template #body
          ><h2 class="text-center py-5" v-if="Settings.Setting.pull_money">
            هل أنت متاكد من تعطيل ميزه السحب لجميع المستخدمين
          </h2>
          <h2 class="text-center py-5" v-else>
            هل أنت متاكد من تفعيل ميزه السحب لجميع المستخدمين
          </h2>
          <div class="text-center gap-2 d-flex buttons m-auto">
            <button
              class="send"
              @click="FunChage(1)"
              v-if="!Settings.Setting.pull_money"
            >
              <span v-if="!Settings.loadingPullMoney">تفعيل</span>
              <span v-else>إنتظر .....</span></button
            ><button class="make-notactive" @click="FunChage(0)" v-else>
              <span v-if="!Settings.loadingPullMoney">تعطيل</span>
              <span v-else>إنتظر .....</span></button
            ><button class="cancel" @click="showpopupActive = false">
              إلغاء
            </button>
          </div></template
        >
      </popupActive>
    </div>
    <div class="card pb-5 card-body">
      <!-- {{ Settings.Setting }} -->
      <h4>حالات الغاء الرحلات</h4>

      <div class="row mt-3">
        <div class="col-md-12">
          <div class="form" >
            <from
              ><div class="row p-0 m-0">
                <div class="col-md-12">
                  <label>الوقت المسموح به الإلغاء الرحلة قبل البدأ بالدقيقه</label
                  ><span
                    ><input
                      type="text"
                      v-model="Settings.UpdateSetting.free_cancel"
                      class="form-control" 
                      @keyup="editForm = true"
                      oninput="this.value= this.value&&this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').replace(/\+/g,'').replace(/\./g,'');"

                    />
                    </span
                  >
                </div>
                <div class="col-md-12">
                  <label> الوقت المقدر لحساب الإلغاء بالدقيقه</label>
                  <span
                    ><input
                      type="text"
                      v-model="Settings.UpdateSetting.payed_cancel"
                      class="form-control"
                      @keyup="editForm = true"
                      oninput="this.value= this.value&&this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').replace(/\+/g,'').replace(/\./g,'');"

                    />
                    </span
                  >
                </div>
        
                <div class="col-md-12">
                  <label>قيمه غرامة الإلغاء بال%</label
                  ><span
                    ><input
                      type="text"
                      v-model="Settings.UpdateSetting.percentage_cancel"
                      class="form-control"
                      @keyup="editForm = true"
                      oninput="this.value= this.value&&this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').replace(/\+/g,'').replace(/\./g,'');"

                    /></span
                  >
                </div>
                <div class="col-md-12">
                  <label> الرسوم الإضافيه لتغير وقت العوده بالجنيه</label
                  ><span
                    ><input
                      type="text"
                      v-model="Settings.UpdateSetting.change_trip_price"
                      class="form-control"
                      @keyup="editForm = true"
                      oninput="this.value= this.value&&this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').replace(/\+/g,'').replace(/\./g,'');"

                    /></span
                  >
                </div>
              </div></from
            >
          </div>
        </div>
      </div>
      <div class="bg-img"><img src="@/assets/images/ic_bus.svg" /></div>
      <div class="buttons d-flex mt-5">
     
        <button class="save-show"  @click="updateDatafun" :disabled="!editForm" :class="!editForm ? 'displaybutton':''" v-if="!Settings.loadingSettings">
          حفظ
        </button>
        <button class="displaybutton"  v-else>
          إنتظر....
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import popupActive from "@/components/global/popup.vue";
import { useSetting } from "@/stores/Settings/index";
import { onMounted, ref, watch } from "vue";
const Settings = useSetting();
const showpopupActive = ref(false);
const editForm = ref(false);
const showActive = ref("active");
const updateDatafun = async () => {
  await Settings.UpdateData(Settings.UpdateSetting);
  editForm.value = false;
};
const FunChage = async (val) => {
  await Settings.PullMoney({ pull_money: val, user_type: "all" });
  showActive.value = val;
  showpopupActive.value = false;
};
onMounted(async () => {
  await Settings.getSettings();
});
</script>

<style scoped lang="scss">
.card {
  label {margin-bottom: 0px;
    color: #2473b3;
    font-weight: 600;
    position: absolute;
    top: -13px;
    font-size: 12px;
    padding: 5px 0px;
    background: white;
    right: 23px;

  }
  span {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    gap: 10px;
  }
  input {
    width: 46%;
    padding-top: 14px;
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
    text-align: center;
    span {
      display: inline-block;
      margin-bottom: 0px;
    }
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
.make-notactive {
  background: #f93a3a;
}
.row >div{
position: relative;
}
.displaybutton{
  background: #2473b39c !important;
}

@media screen and (max-width: 993px) {
  .card .bg-img img{
    width:100%;
  }
}
</style>
