<template>
  <div class="row mt-4 profitExpense">
    <div class="col-md-5 px-5">
      <!-- <ul class="list-fillter">
        <li :class="type == 'daily' ? 'active' : ''" @click="type = 'daily'">
          <span>اليوم</span>
        </li>
        <li
          :class="type == 'monthly' ? 'active' : ''"
          @click="type = 'monthly'"
        >
          <span>الأسبوع</span>
        </li>
      </ul> -->
      <DatePicker v-model="dates" dateFormat="dd" inline selectionMode="range" />
    </div>
    <div class="col-md-7">
      <div class="card">
        <profitExpenseTable :headers="props.nameTab == 'profit' ? headers : headers2"
          :data="profitExpense.profitExpense" :loading="profitExpense.loadingget"
          @DeleteprofitExpense="DeleteprofitExpenseFun" @actionShow="actionShow"></profitExpenseTable>
      </div>
      <button class="mt-4 showAddData" v-if="props.showAddData" @click="addItems">
        إدخال بيانات
      </button>
      <div class="mt-4 sheetDownload">
        <SheetsDownload :headers="headers" :data="profitExpense.profitExpense" v-if="data.length > 0"
          sheetName="Sheet List" />
      </div>
    </div>
    <popup class="popup popup-trip" v-if="showAdd">
      <template #body>
        <div class="header mb-5">
          <h5 class="text-center mb-0">إدخال بيانات</h5>
          <span class="close" @click="showAdd = false"><img src="@/assets/images/close-svgrepo-com.svg" /></span>
        </div>
        <form @submit.prevent="onSubmit">
          <div class="row">
            <div class="mb-4 content-filed d-flex gap-2">
              <label for="exampleFormControlInput1" class="form-label">العنوان
              </label>
              <div class="content-form" style="width: 92%">
                <input type="text" class="form-control" id="name" name="name" v-bind="name"
                  :class="{ 'is-invalid': errors.name }" />
                <div class="invalid-feedback">{{ errors.name }}</div>
              </div>
            </div>
            <div class="mb-4 content-filed col-md-6 d-flex gap-2">
              <label for="exampleFormControlInput1" class="form-label">المقدار
              </label>
              <div class="content-form">
                <input type="text" class="form-control" id="price" name="price" v-bind="price"
                  :class="{ 'is-invalid': errors.price }"
                  oninput="this.value= this.value&&this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').replace(/\+/g,'').replace(/\./g,'');" />
                <div class="invalid-feedback">{{ errors.price }}</div>
              </div>
              <span>ج.م</span>
            </div>
            <div class="mb-4 content-filed col-md-6 d-flex gap-2">
              <label for="exampleFormControlTextarea1" class="form-label">التاريخ
              </label>
              <div class="content-form">
                <DatePicker name="tripe_date" :minDate="date_profits_expenses" v-model="date_profits_expenses"
                  :class="`{ 'is-invalid': errors.date_profits_expenses }`" />
              </div>
            </div>
            <div class="text-center gap-2 d-flex buttons mb-4">
              <button class="send" v-if="!profitExpense.loadingStore">
                حفظ
              </button>
              <button class="send" v-else>إنتظر......</button>
              <button class="cancel" @click="showAdd = false">إلغاء</button>
            </div>
          </div>
        </form>
      </template>
    </popup>

    <popup v-if="showDelete">
      <template #body>
        <h3 class="text-center py-5 mb-4 mt-2">
          هل انت متأكد من حذف هذه الرحله؟
        </h3>
        <div class="text-center gap-2 d-flex buttons m-auto">
          <button class="send" @click="DeletripFun" v-if="!profitExpense.profitExpenseDelete">
            نعم أرغب</button><button class="send" v-else>....إنتظر</button>
          <button class="cancel" @click="showDelete = false">
            لا ,أرغب
          </button>
        </div>
      </template>
    </popup>
  </div>
</template>
<script setup>
import popup from "@/components/global/popup.vue";
import DatePicker from "primevue/datepicker";
import profitExpenseTable from "@/components/global/table.vue";
import { useprofitExpense } from "@/stores/profitExpense/index";
import SheetsDownload from "@/components/global/SheetsDownload.vue";
import { useForm } from "vee-validate";
import { ref, watch, onMounted } from "vue";
import moment from "moment";
import * as Yup from "yup"; // meta
const type = ref("daily");
const profitExpense = useprofitExpense();
const props = defineProps(["showAddData", "typeTab", "nameTab"]);
const dates = ref([]);
const showAdd = ref(false);
const date_profits_expenses = ref(new Date());
const headers = ref([
  { name: "#", key: "counter" },
  { name: "النوع", key: "name" },
  { name: "التاريخ", key: "date_profits_expenses" },
  { name: "المكسب", key: "price", sub: "ج.م" },
]);
const headers2 = ref([
  { name: "#", key: "counter" },
  { name: "النوع", key: "name" },
  { name: "التاريخ", key: "date_profits_expenses" },
  { name: "المكسب", key: "price", sub: "ج.م" },
  { name: "", key: "popupprofitExpense" },
]);
const data = ref([
  { id: 1, type: "يشسيس", type: "سشيس", hitory: "12/3/4444", winner: "ييس" },
]);
const { errors, handleSubmit, defineInputBinds, resetForm } = useForm({
  validationSchema: Yup.object({
    name: Yup.string().required("يجب إدخال "),
    price: Yup.string().required("يجب إدخال "),
  }),

});

const UpdateId = ref();
//first_name ,last_name
const name = defineInputBinds("name");
const price = defineInputBinds("price");
let onSubmit = handleSubmit(async (values) => {
  if (values) {
    try {
      let data = ref({
        type: props.typeTab,
        name: values.name,
        price: values.price,
        date_profits_expenses: moment(date_profits_expenses.value).format(
          "YYYY-MM-DD"
        ),
      });
      // console.log("props.nameTab===",props.nameTab)
      if (UpdateId.value) {
        await profitExpense.UpdateprofitExpense(data.value,UpdateId.value,
          props.typeTab,
          moment(dates.value[0]).format("YYYY-MM-DD"),
          moment(dates.value[1]).format("YYYY-MM-DD"));
      } else {
        await profitExpense.storeprofitExpense(
          data.value,
          props.nameTab,
          props.typeTab,
          moment(dates.value[0]).format("YYYY-MM-DD"),
          moment(dates.value[1]).format("YYYY-MM-DD")
        );
      }
      showAdd.value = false;

      UpdateId.value = false;

    } catch { }
  }
});

onMounted(async () => {
  // dates.value[0] = new Date();
  // dates.value[1] = new Date();
  // dates.value[1].setDate(dates.value[1].getDate() + 5);
  // if (props.nameTab != "profit") {
  //   await profitExpense.getprofitExpense(props.typeTab);
  // }
  if (props.nameTab == "profit") {

    await profitExpense.getProfitOnly();
  }
  else {
    await profitExpense.getprofitExpense(
      props.typeTab);
  }
});
watch(
  () => dates.value[1],
  async (newVal) => {
    console.log("dates.value[1] ", dates.value[1]);
    if (props.nameTab == "profit" && dates.value[1]) {
      await profitExpense.getProfitOnly(
        moment(dates.value[0]).format("YYYY-MM-DD"),
        moment(dates.value[1]).format("YYYY-MM-DD")
      );
    }
    if (props.nameTab != "profit" && dates.value[1]) {
      await profitExpense.getprofitExpense(
        props.typeTab,
        moment(dates.value[0]).format("YYYY-MM-DD"),
        moment(dates.value[1]).format("YYYY-MM-DD")
      );
    }
  }
);
let showDelete = ref(false);
let Deletid = ref();
const DeleteprofitExpenseFun = (id) => {
  showDelete.value = true;
  Deletid.value = id;
}
const DeletripFun = async () => {
  await profitExpense.DeleteprofitExpense(Deletid.value, props.typeTab);
  showDelete.value = false;
  Deletid.value = null;

}
const itemUpdate = ref({});
const addItems = () => {
  itemUpdate.value = {};
  showAdd.value = true;
  resetForm({
    values: {
      name: '',
      price: '',
    },
  });
  date_profits_expenses.value = new Date();
}
const actionShow = (id) => {
  showAdd.value = true;
  UpdateId.value = id;
  itemUpdate.value = profitExpense.profitExpense.find(i => i.id === id);
  resetForm({
    values: {
      name: itemUpdate.value.name,
      price: itemUpdate.value.price,
    },
  });
  date_profits_expenses.value = new Date(itemUpdate.value.date_profits_expenses)

}

</script>
<style scoped lang="scss">
.list-fillter {
  gap: 20px;
  padding: 0px;
  display: flex;

  li {
    cursor: pointer;
    border: 1px solid #2473b3;
    color: #2473b3;
    border-radius: 8px;
    font-size: 15px;
    padding: 5px 10px;
  }

  .active {
    background: #2473b3;
    color: #fff;
  }
}

.showAddData {
  width: 150px;
}

.sheetDownload {
  justify-content: space-between;
  display: flex;
  direction: ltr;
}

.d-flex {
  align-items: baseline;

  span {
    color: #797979;
  }

  label {
    color: #2473b3;
    margin: 0px;
  }
}

@media screen and (max-width: 993px) {
  .row>div {
    padding: 0px !important;
    margin-bottom: 10px;

  }
}
</style>
<style>
.profitExpense .table-style tr:first-child .Dropdown ul {
  top: auto;
  bottom: -15px;

}
</style>