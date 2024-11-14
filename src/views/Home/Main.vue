<template>
  <div class="pageHome">
    <div class="cards row">
      <div class="col-md-4 mb-2">
        <div class="card" :class="theCurrentType.type_search == 'user' ? 'active' : ''" @click="changeTab('user')">
          <h6 class="content">
            <img src="@/assets/images/person.svg" />المستخدمين
          </h6>
          <h2 v-if="!Dashboard.loadingDashboard">
            {{
              Dashboard.DataDashboard.total_users
                ? Dashboard.DataDashboard.total_users
                : 0
            }}
          </h2>
          <div v-else style="width: 100%; text-align: center; margin: auto">
            <ProgressSpinner style="stroke: #42a5f5 !important; width: 30px; height: auto" strokeWidth="2"
              fill="transparent" animationDuration=".5s" aria-label="Custom ProgressSpinner" class="spinner" />
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-2">
        <div class="card" @click="changeTab('trip')" :class="theCurrentType.type_search == 'trip' ? 'active' : ''">
          <h6 class="content">
            <img src="@/assets/images/doller.svg" />الراحلات
          </h6>
          <h2 v-if="!Dashboard.loadingDashboard">
            {{
              Dashboard.DataDashboard.total_trips
                ? Dashboard.DataDashboard.total_trips
                : 0
            }}
          </h2>
          <div v-else style="width: 100%; text-align: center; margin: auto">
            <ProgressSpinner style="stroke: #42a5f5 !important; width: 30px; height: auto" strokeWidth="2"
              fill="transparent" animationDuration=".5s" aria-label="Custom ProgressSpinner" class="spinner" />
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-2">{{ Dashboard.profit }}
        <div class="card profit" @click="changeTab('profit')"
          :class="theCurrentType.type_search == 'profit' ? 'active' : ''">
          <div class="content">
            <img src="@/assets/images/doller.svg" />
            <div class="pt-3">
              <h6>
                <span> الأرباح : {{ Dashboard.DataDashboard.profit }} ج.م </span>
              </h6>
              <h6>
                <span> النفقات : {{ Dashboard.DataDashboard.expense }} ج.م </span>
              </h6>
            </div>

          </div>
          <h2 v-if="!Dashboard.loadingDashboard"> الإجمالى :
            {{
              Dashboard.DataDashboard.total_profit < 0
                ? Dashboard.DataDashboard.total_profit *-1
                : Dashboard.DataDashboard.total_profit
            }} ج.م
            <span v-if="Dashboard.DataDashboard.total_profit > 0">ربح</span>          
              <span v-if="Dashboard.DataDashboard.total_profit < 0">مستحقه</span>
          </h2>
          <div v-else style="width: 100%; text-align: center; margin: auto">
            <ProgressSpinner style="stroke: #42a5f5 !important; width: 30px; height: auto" strokeWidth="2"
              fill="transparent" animationDuration=".5s" aria-label="Custom ProgressSpinner" class="spinner" />
          </div>
        </div>
      </div>
    </div>
    <FillterDate :theCurrentType="theCurrentType" />
    <div class="card Hompage-users mb-5">
      <div class="row mb-3">
        <div class="col-md-6">
          <p><img src="@/assets/images/Frame.svg" class="mx-2" />الطلبات</p>
        </div>
        <div class="col-md-6" style="text-align: left">
          <button class="more-button" @click="$router.push('/Orders')">
            المزيد
          </button>
        </div>
      </div>
      <RequestsTable :headers="headers" :data="Users.OrderList" :pagination="false"></RequestsTable>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import FillterDate from "@/components/pages/Homepage/FillterDate.vue";
import RequestsTable from "@/components/global/table.vue";
import { useDashboard } from "@/stores/Dashboard/index";
import moment from "moment";
import ProgressSpinner from "primevue/progressspinner";
import { useRequestUsers } from "@/stores/RequestUsers/index";
import { useUsers } from "@/stores/Users/index";
let Users = useUsers();
// auth store
const RequestUsers = useRequestUsers();
const Dashboard = useDashboard();
const headers = ref([
  {
    name: "الاسم",
    key: "first_name",
  },
  { name: "رقم الهاتف", key: "phone_number" },
  { name: "البريد الالكترونى", key: "email" },
  { name: "الحساب", key: "DestinationPoint.name" },
  { name: "", key: "action", link: "ProfileUser" },
]);
const List = ref([
  {
    name: "المستخدمين",
    type_search: "user",
    day: moment(new Date()).format("DD"),
    month: moment(new Date()).format("MM"),
    year: moment(new Date()).format("YYYY"),
    filter_by: "daily",
  },
  {
    name: "الراحلات",
    type_search: "trip",
    day: moment(new Date()).format("DD"),
    month: moment(new Date()).format("MM"),
    year: moment(new Date()).format("YYYY"),
    filter_by: "daily",
  },
  {
    name: "الأرباح",
    type_search: "profit",
    day: moment(new Date()).format("DD"),
    month: moment(new Date()).format("MM"),
    year: moment(new Date()).format("YYYY"),
    filter_by: "daily",
  },
]);
const theCurrentType = ref({
  name: "المستخدمين",
  type_search: "user",
  day: "",
  year: "",
  month: "",
  filter_by: "daily",
});
const changeTab = (TypeCard) => {
  if (TypeCard == "user") {
    theCurrentType.value = List.value[0];
  }
  if (TypeCard == "trip") {
    theCurrentType.value = "";
    theCurrentType.value = List.value[1];
  }
  if (TypeCard == "profit") {
    theCurrentType.value = List.value[2];
  }
};
onMounted(async () => {
  await Users.getUsers();
  await Users.getUsersend();
});
</script>
<style scoped lang="scss">
.pageHome {
  width: 90%;
  margin: auto;

  .cards {
    .card {
      height: 170px;
      cursor: pointer;
      width: 85%;
      margin: auto;
      border: 0px;
      padding: 15px;
      border-radius: 12px;

      h6 {
        color: #2473b3;

        img {
          margin-left: 10px;
        }
      }

      h2 {
        width: 100%;
        text-align: center;
        color: #318dd8;
      }

      &:hover,
      &.active {
        background: #2473b3;

        h2,
        h6 {
          color: white !important;
        }
      }
    }
  }
}

.more-button {
  margin-left: 10%;
  width: 120px !important;
  background: #ff9917;
}

.imgs-profile {
  width: 20px;
}

.profit {
  .content {
    display: flex;
    gap: 5px;
    align-items: center;

  }

  h2 {
    color: #263A97 !important;
    font-size: 20px;
    margin-top: 10px;
  }
}

@media screen and (max-width: 993px) {
  .pageHome {
    width: 100%;

    .row>div,
    .date_fillter {
      margin: 0px 0px 30px 0px !important;
      padding: 0px !important;
    }

    .cards .card {
      width: 100%;
    }
  }
}


</style>
