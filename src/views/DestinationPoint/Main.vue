<template>
  <div class="card px-5 card-body py-3 mt-5">
    <div class=" mb-3">
      <button class="addTitle" @click="showpopupAddTitle = true" type="button">
        اضافة عنوان
      </button>
    </div>
    <div v-if="!Trips.sourceDestinationstart_pointLoading">
      <div class="content-flex mb-3" v-for="start_point in Trips.sourceDestinationstrat_point" :key="start_point">
        <img src="@/assets/images/icon_location.svg" class="mt-3" />
        <div class="input-group">
          <label class="mb-2">عنوان الالتقاط</label>
          <div class="content-text-input">{{ start_point.name_ar }}</div>
        </div>
        <div class="Dropdown Dropdown-action">
          <button>تحكم <img src="@/assets/images/down-arrow.svg" class="icon-dropdown" />
          </button>
          <ul>
            <li v-if="!start_point.is_active"> <span class="make-active"
                @click="checkActive(start_point.is_active, start_point.id)">
                تفعيل
              </span>
            </li>
            <li v-else>
              <span class="make-notactive" @click="checkNoActive(start_point.is_active, start_point.id)">
                تعطيل
              </span>
            </li>
            <li>
              <span @click="openUpdat(start_point.id, start_point.name_ar)"><img
                  src="@/assets/images/edit-button-svgrepo-com.svg">
                تعديل
              </span>
            </li>
            <li>
              <span class="make-notactive" @click="DeleteFun(start_point.id)"><img src="@/assets/images/icons-delete.svg" >حذف</span>

            </li>
          </ul>
        </div>
        <!-- <div class="d-flex gap-3 actions mt-4 pt-2">
          <span class="make-active" :class="start_point.is_active ? 'make-active' : 'make-cancel'"
            @click="checkActive(start_point.is_active, start_point.id)">
            تفعيل
          </span>
          <span :class="!start_point.is_active ? 'make-notactive' : 'make-cancel'"
            @click="checkNoActive(start_point.is_active, start_point.id)">
            تعطيل
          </span>
          <span class="make-cancel" @click="openUpdat(start_point.id, start_point.name_ar)">
            تعديل
          </span>
        </div> -->
      </div>
    </div>
    <div v-if="Trips.sourceDestinationstart_pointLoading"
      style="width: 100%; height: 200px; text-align: center; margin: auto">
      <ProgressSpinner style="stroke: #42a5f5 !important; width: 30px; height: auto" strokeWidth="2" fill="transparent"
        animationDuration=".5s" aria-label="Custom ProgressSpinner" class="spinner" />
    </div>
    <popupActive v-if="showpopupActive">
      <template #body>
        <h2 class="text-center py-5">
          هل انت متأكد من إعادة تفعيل عنوان الالتقاط؟
        </h2>
        <div class="text-center gap-2 d-flex buttons m-auto">
          <button class="send" @click="FunChage(1)">نعم ،أرغب</button><button class="cancel"
            @click="showpopupActive = false">
            لا ، ارغب
          </button>
        </div>
      </template>
    </popupActive>
    <popupNotActive v-if="showpopupNoActive">
      <template #body>
        <h2 class="text-center py-5">
          هل انت متأكد من تعطيل العنوان الالتقاط؟
        </h2>
        <div class="text-center gap-2 d-flex buttons m-auto">
          <button class="send" @click="FunChage(0)">نعم ،أرغب</button><button class="cancel"
            @click="showpopupNoActive = false">
            لا ، ارغب
          </button>
        </div>
      </template>
    </popupNotActive>
    <popupEdit v-if="showpopupEdit" class="popupEdit"><template #header>تعديل عنوان الالتقاط </template>
      <template #body>
        <form @submit.prevent="onSubmit">
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">إسم عنوان
            </label>
            <input type="text" class="form-control" id="name_ar" v-bind="name_ar"
              :class="{ 'is-invalid': errors.name_ar }" />
            <div class="invalid-feedback">{{ errors.name_ar }}</div>
          </div>
          <div class="text-center buttons">
            <button class="send">حفظ</button><button class="cancel" @click="showpopupEdit = false">
              إلغاء
            </button>
          </div>
        </form>
      </template>
    </popupEdit>
    <popupAddTitle v-if="showpopupAddTitle" class="popupEdit"><template #header>إضافة عنوان الالتقاط </template>
      <template #body>
        <form>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">عنوان الرحلة</label>
            <input v-model="name_arNew" type="text" class="form-control" id="address" placeholder="" />
          </div>
          <div class="text-center buttons">
            <button class="send" @click="addNew" type="button">حفظ</button><button class="cancel"
              @click="showpopupAddTitle = false" type="button">
              إلغاء
            </button>
          </div>
        </form>
      </template>
    </popupAddTitle>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import popupNotActive from "@/components/global/popup.vue";
import popupActive from "@/components/global/popup.vue";
import popupEdit from "@/components/global/popup.vue";
import popupAddTitle from "@/components/global/popup.vue";
import { useTrips } from "@/stores/Trip/index";
import ProgressSpinner from "primevue/progressspinner";
import { useForm } from "vee-validate";
import * as Yup from "yup"; // meta
const point_id = ref(null);
const Trips = useTrips();
const showpopupEdit = ref(false);
const showpopupAddTitle = ref(false);
const showActive1 = ref("active");
const showpopupActive = ref(false);
const showpopupNoActive = ref(false);
let { errors, handleSubmit, defineInputBinds, resetForm } = useForm({
  validationSchema: Yup.object({
    name_ar: Yup.string().required("this filed is required"),
  }),
});

//first_name ,last_name
const name_ar = defineInputBinds("name_ar");
let onSubmit = handleSubmit(async (values) => {
  if (values) {
    try {
      let data = {
        name_ar: values.name_ar,
        name_en: 'en',
        point_type: "start_point",
      };
      await Trips.sourceDestination(point_id.value, data);
      showpopupEdit.value = false;
      emits("closePopup");
    } catch (err) {
      console.log(err);
    }
  }
});
const name_arNew = ref("");
const addNew = async () => {
  let data = {
    name_ar: name_arNew.value,
    name_en: 'en',
    point_type: "start_point",
  };
  await Trips.sourceDestinationAdd(data);
  showpopupAddTitle.value = false;
};
const openUpdat = (id, name_ar) => {
  point_id.value = id;
  showpopupEdit.value = true;
  resetForm({
    values: {
      name_ar: name_ar,
    },
  });
};
const FunChage = async (val) => {
  showpopupActive.value = false;
  showpopupNoActive.value = false;
  showActive1.value = val == 1 ? true : false;
  await Trips.ChangeStatusPoint(
    { point_id: point_id.value, is_active: val },
    "start_point"
  );
};
const checkActive = (isActive, id) => {
  if (!isActive) {
    point_id.value = id;
    showpopupActive.value = true;
  }
};
const checkNoActive = (isActive, id) => {
  if (isActive) {
    point_id.value = id;
    showpopupNoActive.value = true;
  }
};

const DeleteFun = async(id) => {
    await Trips.deletesource(id,"start_point");
};
onMounted(async () => {
  if (Trips.sourceDestinationstrat_point.length == 0) {
    await Trips.getdestinationstrat_point();
  }
});
</script>
<style lang="scss" scoped>
.card {
  min-height: 70vh;
}

.content-flex {
  display: flex;
  align-items: end;
  gap: 20px;
  justify-content: space-between;

  .input-group {
    flex-direction: column;
    width: 75%;
    display: flex;

    label {
      color: #2473b3;
    }

    input {
      width: 100%;
      border-radius: 8px !important;
    }
  }

  .make-active,
  .make-cancel,
  .make-notactive {
    color: #23a429;
    cursor: pointer;
  }

  // .make-cancel,
  // .make-notactive {
  //   background: #aaa;
  //   color: black;
  // }

  .make-notactive {
    color: #f93a3a;
  }
}

.content-text-input {
  border: 1px solid #d6d6d6;
  padding: 7px;
  border-radius: 8px !important;
  width: 100%;
}

// .body-popup {
//   position: reactive;
//   .buttons {
//     justify-content: center;
//     position: absolute;
//     width: 96%;
//     bottom: 14px;
//   }
// }
.popupEdit {
  label {
    display: block;
    width: 100%;
  }
}

.addTitle {
  background: linear-gradient(167deg, #ff8a00 1.71%, #ffc75b 95.32%);
  width: 191px !important;
}

.Dropdown {
  display: inline-block;
  position: relative;
  width: 20%;

  button {
    background: #2473b3;
    width: 100%;

    .icon-dropdown {
      width: 12px !important;
      height: 12px !important;
      filter: brightness(0) invert(1);
    }

  }

  ul {
    display: none;
    position: absolute;
    background: white;
    padding: 10px 0px;

    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.356);
    z-index: 98;
    top: 10px;    width: 100%;

    li {
      padding: 5px 10px;
      width: 150px;
      margin-bottom: 2px;
      cursor: pointer;    
      width: 100%;
      text-align: right;
      span{
        width: 100%;
        display: block;
      }

      img {
        width: 17px !important;
        height: 17px !important;
        margin-left: 3px;
      }
    }
  }

  &:hover {
    ul {
      display: block;

      li:hover {
        background: #2a82c9;
        color: white;
      }
    }
  }
}

@media screen and (max-width: 993px) {
  .content-flex {
    flex-direction: column;
  }

  .card {
    padding: 0px !important;
  }

  .content-flex .actions {
    width: 100%;
    justify-content: center;
  }

  .content-flex .make-active,
  .content-flex .make-cancel,
  .content-flex .make-notactive {
    width: 26%
  }

  .content-flex .input-group {
    width: 95%;
  }

}
</style>
