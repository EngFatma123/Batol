<template>
  <div v-if="Users.UserInfo">
    <div class="constent-flex">
      <div class="constent">
        <img :src="Users.UserInfo.media_personal_image" class="personal_image" v-if="Users.UserInfo.media_personal_image"/>
        <img src="@/assets/images/man.svg" class="personal_image" v-else />
        <div>
          <h4 class="mb-3">{{ Users.UserInfo.first_name }} {{ Users.UserInfo.second_name }} {{ Users.UserInfo.second_name }} {{ Users.UserInfo.fourth_name }} {{ Users.UserInfo.third_name }}</h4>
          <h5>{{ UserInfo.uuid }}</h5>
          <label class="btnactive" v-if="UserInfo.is_active"><img src="@/assets/images/circle3.svg" />
            مفعل</label>
          <label class="btnnotactive" v-else><img src="@/assets/images/circel4.svg" /> غير مفعل</label>
        </div>
      </div>
      <div class="d-flex gap-3">
        <h5 class="wallet">المحفظه {{ Users.UserInfo.wallet_info ? Users.UserInfo.wallet_info.price : '00:00' }} <img src="@/assets/images/wallet.svg" /> </h5>
        <h4 class="orders">
          الطلبات <span class="online"></span><img src="@/assets/images/orders.svg" @click="showOrders = true" />
        </h4>
      </div>
    </div>
    <div class="profile_info mt-5">
      <ul class="d-flex list_info">
        <li>
          <label>رقم الاقامه</label>
          <p>
            <img src="@/assets/images/profile/id.svg" />
            {{ Users.UserInfo.id_number }}
          </p>
        </li>
        <li>
          <label>البريد الالكترونى</label>
          <p>
            <img src="@/assets/images/profile/email.svg" /> {{ Users.UserInfo.email }}
          </p>
        </li>
        <li>
          <label>رقم الهاتف</label>
          <p>
            <img src="@/assets/images/profile/id.svg" />
            {{ Users.UserInfo.phone_number }}
          </p>
        </li>
        <li>
          <label>عنوان الالتقاط</label>
          <p>
            <img src="@/assets/images/profile/location.svg" />
            {{ Users.UserInfo.DestinationPoint ? Users.UserInfo.DestinationPoint.name : "" }}
          </p>
        </li>
        <li>
          <label>عنوان الجامعه</label>
          <p>
            <img src="@/assets/images/profile/location.svg" />
            {{ Users.UserInfo.SourcePoint ? Users.UserInfo.SourcePoint.name : "" }}
          </p>
        </li>
      </ul>
      <button class="image_id" @click="show_id = !show_id">صوره البطاقه</button>
      <div v-if="show_id" class="mt-3">
        <img :src="Users.UserInfo.media_face_id" class="id_imge" />
        <img :src="Users.UserInfo.media_back_id" class="id_imge" />
      </div>
    </div>
    <div class="row mt-4" v-if="Users.UserInfo.current_trip">
      <div class="col-md-6">
        <div class="box">
          <h3>فى رحله الأن</h3>
          <ul class="travel_now">
            <li><img src="@/assets/images/users/bus2.svg" /></li>
            <li>
              <img src="@/assets/images/users/clock.svg" class="icon" />  {{ Users.UserInfo.current_trip.trip_time }}
            </li>
            <li>
              <img src="@/assets/images/users/money.svg" class="icon" />
              {{ Users.UserInfo.current_trip.price }} ج.م
            </li>
          </ul>
          <ul class="traveling row">
            <li class="col-md-6">
              <img src="@/assets/images/users/location.svg" />
            </li>
            <li class="col-md-6 text-end">
              <img src="@/assets/images/users/location.svg" />
            </li>
            <li class="line col-md-12">
              <span class="active"></span><span class="line"></span>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-6 bus">
        <img src="@/assets/images/ic_bus.svg" />
      </div>
    </div>
    <popup class="popup popup-orders" v-if="showOrders">
      <template #body>
        <div class="header">
          <h5 class="text-center mb-0">الطلبات</h5>
          <span class="close" @click="showOrders = false"><img src="@/assets/images/close-svgrepo-com.svg" /></span>
          <span></span>
        </div>
        <h5 class="mt-4" style="margin-bottom: -20px; position: relative; z-index: 99999">
          البيانات الشخصية
        </h5>
        <EasyDataTable :headers="headers" :items="[Users.UserOrders]" class="table-style orders" v-if="Users.UserOrders.length >0">
          <template #item-old_email="header">
            <div class="constent-flex">
              <div>
                <h6 class="email-table">البريد الالكتروني القديم</h6>
                <img src="@/assets/images/email.svg" class="icon-email" />
                {{ header.old_email }}
              </div>
              <div>
                <img src="@/assets/images/leftArrowCom.svg" style="height: 20px; width: 20px" />
              </div>
            </div>
          </template>
          <template #item-new_email="header">
            <div>
              <h6 class="email-table">البريد الالكتروني الجديد</h6>
              <img src="@/assets/images/email.svg" class="icon-email" />
              {{ header.new_email }}
            </div>
          </template>
          <template #item-action>
            <div class="d-flex buttons-table mt-0">
              <button class="accept" @click="funApprove(1)">الموافقه</button><button class="reject"
                @click="funApprove(0)">الرفض</button>
            </div>
          </template>
        </EasyDataTable>
        <div v-else class="mt-5 pt-5 text-center"><p>لا يوجد بيانات</p></div>

      </template>
    </popup>
  </div>
</template>
<script setup>
import popup from "@/components/global/popup.vue";
import { useUsers } from "@/stores/Users/index";
import { ref } from "vue";
import { useRoute } from "vue-router";
let Users = useUsers();
let route = useRoute();
let props = defineProps(["UserInfo"]);
const showOrders = ref(false);
const show_id = ref(false);
let headers = ref([
  { text: "", value: "old_email", sortable: true },
  { text: "", value: "new_email", sortable: true },
  { text: "", value: "action" },
]);
let headersTravel = ref([
  { text: "", value: "clock", sortable: true },
  { text: "", value: "resonTravel", sortable: true },
  { text: "", value: "action" },
]);
let items = ref([
  {
    email: "name@email.com",
    email2: "name@email.com",
  },
  {
    email: "name@email.com",
    email2: "name@email.com",
  },
]);

let itemsTravel = ref([
  {
    clock: "10:20م",
    resonTravel: "الميعاد غير مناسب",
  },
  {
    clock: "10:20م",
    resonTravel: "الميعاد غير مناسب",
  },
]);
const funApprove = async (val) => {
  await Users.GetStatus_Appoint({
    user_id: route.params.id,
    status: val,
  });
  showpopupRejecter.value = true;
};
</script>
<style scoped lang="scss">
.TapContent {
  .constent-flex {
    justify-content: space-between;
    display: flex;
    width: 90%;
    gap: 10px;
    align-items: center;

    .constent {
      display: flex;
      gap: 10px;
      align-items: center;
    }

    h5 {
      color: #00000099;
    }

    .orders {
      position: relative;

      img {
        cursor: pointer;
      }

      .online {
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 100%;
        background: #53d118;
      }
    }
  }

  .list_info {
    list-style-type: none;
    justify-content: space-between;

    li {
      label {
        color: #2473b3;
      }

      p {
        img {
          margin-left: 10px;
        }
      }
    }
  }

  .image_id {
    padding: 10px;
    width: auto;
  }

  .bus {
    img {
      width: 90%;
      object-fit: contain;
    }
  }

  .box {
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.4196078431);
    padding: 39px 15px;
    width: 100%;
    min-height: 249px;

    h3 {
      font-size: 25px;
      text-align: center;
      color: #4ce049;
    }

    .travel_now {
      justify-content: space-between;
      align-items: center;
      display: flex;

      li {
        list-style-type: none;

        img.icon {
          width: 15px;
          height: 15px;
        }
      }
    }

    .traveling {
      li.line {
        position: relative;
        width: 100%;

        .line {
          height: 3px;
          width: 100%;
          background: #ddd;
          display: inline-block;
        }
      }

      .active {
        position: absolute;
        height: 3px;
        background: #2a82c9;
        width: 61%;
        top: 14px;
        left: 13px;
      }

      .text-end {
        text-align: end !important;
      }
    }
  }
}

.popup {
  .email-table {
    color: #2473b3;
  }

  .icon-email {
    width: 20px;
    height: 20px;
  }

  .buttons-table {
    margin-top: 20px;
    gap: 20px;
    display: flex;

    button {
      height: 40px;
      width: 100px !important;

      &.accept {
        background: #4ce049;
      }

      &.reject {
        background: red;
      }
    }
  }
}

.table-style {
  height: auto;
}

.personal_image {
  width: 100px;
  height: 100px;
  border-radius: 100%;
}

.id_imge {
  height: 200px;
}

@media (max-width: 900px) {

  .constent-flex,
  .TapContent .list_info {
    flex-direction: column;
    gap: 20px
  }
}
</style>
<style lang="scss">
.popup-orders.content-popup {
  .card {
    margin-top: 10px;
    width: 80% !important;
    overflow: auto;
    height: 90vh;
  }

  .vue3-easy-data-table__main.fixed-header th {
    background: transparent !important;
    padding: 0px !important;
  }

  .table-travel-tab-active .vue3-easy-data-table__body tr td {
    margin: auto !important;
    width: 33.3%;
  }
}

.wallet {
  color: #23a429 !important;
}

.orders .vue3-easy-data-table__footer {
  display: none !important;
}
@media screen and (max-width: 993px) {
  .TapContent .constent-flex .constent{
    flex-direction:column;
  }
  }
</style>
