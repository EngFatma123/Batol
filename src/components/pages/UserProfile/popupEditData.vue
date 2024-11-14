<template>
  <popup class="popup popupFrom">
    <template #body
      ><div class="header">
        <h5 class="text-center mb-0">تعديل البيانات</h5>
        <span class="close">
          <img
            src="@/assets/images/close-svgrepo-com.svg"
            @click="$emit('closePopup')"
          />
        </span>
        <span></span>
      </div>
      <form @submit.prevent="onSubmit">
        <div class="content-flex">

          <div class="FullName mb-3">
            <label>الاسم رباعي</label>
            <div class="content">
              <input
                type="text"
                placeholder="الاسم الاول"
                disabled
                :value="Users.UserInfo.first_name"
              />
              <input
                type="text"
                placeholder="الاسم الثاني"
                disabled
                :value="Users.UserInfo.second_name"
              />
              <input
                type="text"
                placeholder="الاسم الثالث"
                disabled
                :value="Users.UserInfo.third_name"
              />
              <input
                type="text"
                placeholder="الاسم الرابع"
                disabled
                :value="Users.UserInfo.third_name"
              />
            </div>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-md-6 mb-2">
            <div class="content-field">
              <span class="filed-icon"
                ><img src="@/assets/images/password.svg"
              /></span>
              <div class="form-group">
                <label> رقم الهاتف</label>
                <input
                  type="text"
                  class="form-control"
                  id="phone_number"       
                  oninput="this.value= this.value&&this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').replace(/\+/g,'').replace(/\./g,'');"                
                  v-bind="phone_number"
                  :class="{ 'is-invalid': errors.phone_number }"
                />
                <div class="invalid-feedback">{{ errors.phone_number }}</div>
              </div>
            </div>
          </div>
          <div class="col-md-6 mb-2">
            <div class="content-field">
              <span class="filed-icon"
                ><img src="@/assets/images/profile/location.svg"
              /></span>
              <div class="form-group">
                <label> عنوان الالتقاط </label>
                <input
                  type="text"
                  class="form-control"
                  disabled
                  id="password"
                  name="password"
                  placeholder="عنوان الالتقاط"
                  :value="Users.UserInfo.SourcePoint.name"
                />
              </div>
            </div>
          </div>
          <div class="col-md-6 mb-2">
            <div class="content-field">
              <span class="filed-icon"
                ><img src="@/assets/images/profile/email.svg"
              /></span>
              <div class="form-group">
                <label> البريد الالكتروني </label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-bind="email"
                  placeholder="البريد الالكتروني"
                  :class="{ 'is-invalid': errors.email }"
                />
                <div class="invalid-feedback">{{ errors.email }}</div>
              </div>
            </div>
          </div>
          <div class="col-md-6 mb-2">
            <div class="content-field">
              <span class="filed-icon"
                ><img src="@/assets/images/profile/location.svg"
              /></span>
              <div class="form-group">
                <label> عنوان الجامعة </label>
                <input
                  type="text"
                  disabled
                  class="form-control"
                  :value="Users.UserInfo.DestinationPoint.name"
                  placeholder="عنوان الجامعة"
                />
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="content-field">
              <span class="filed-icon"
                ><img src="@/assets/images/profile/id.svg"
              /></span>
              <div class="form-group">
                <label> رقم الهوية</label>
                <input
                  type="text"
                  disabled
                  class="form-control"
                  id="password"
                  name="password"
                  :value="Users.UserInfo.id_number"
                  placeholder="رقم الهوية"
                />
              </div>
            </div>
          </div>
          <div class="text-center gap-2 d-flex buttons">
            <button class="send" v-if="!Users.LoadingUpdateUser">إرسال</button>
            <button class="cancel" v-else disabled>انتظر ....</button
            ><button class="cancel" @click="$emit('closePopup')">إلغاء</button>
          </div>
        </div>
      </form>
    </template>
  </popup>
</template>
<script setup>
import popup from "@/components/global/popup.vue";
import { useForm } from "vee-validate";
import * as Yup from "yup"; // meta
import { ref, onMounted, watch } from "vue";
import { useUsers } from "@/stores/Users/index";
import { useRoute } from "vue-router";
const emits = defineEmits(["closePopup"]);
let Users = useUsers();
let route = useRoute();
let { errors, handleSubmit, defineInputBinds, resetForm } = useForm({
  validationSchema: Yup.object({
    email: Yup.string()
    .email("يجب كتابه ايميل").required("هذا الحقل مطلوب"),
    phone_number: Yup.string().min(11,"يجب ان يكون 11").max(11,"يجب ان يكون 11").required("هذا الحقل مطلوب"),
  }),
});

//first_name ,last_name
const email = defineInputBinds("email");
const phone_number = defineInputBinds("phone_number");
let onSubmit = handleSubmit(async (values) => {
  if (values) {
    try {
      let data = {
        user_id: route.params.id,
        email: values.email,
        phone_number: values.phone_number,
      };
      await Users.UpdateUser(data);
      emits("closePopup");
    } catch (err) {
      console.log(err);
    }
  }
});
// let ChangeIMage = ref("");
// let changeFile = (e) => {
//   const files = event.target.files;
//   let filename = files[0].name;
//   const fileReader = new FileReader();
//   fileReader.addEventListener("load", () => {
//     ChangeIMage.value = fileReader.result;
//   });
//   fileReader.readAsDataURL(files[0]);
//   ChangeIMage.value = files[0];
// };
onMounted(async () => {
  resetForm({
    values: {
      email: Users.UserInfo.email,
      phone_number: Users.UserInfo.phone_number,
    },
  });
});
watch(
  () => Users.UserInfo,
  (newVal) => {
    resetForm({
      values: {
        email: Users.UserInfo.email,
        phone_number: Users.UserInfo.phone_number,
      },
    });
  }
);
</script>
<style scoped lang="scss">
.imageProfile {
  position: relative;
  .input-file {
    position: absolute;
    width: 100%;
    height: 100%;
    right: 0px;
    opacity: 0;
  }
  .imagePostion {
    width: 100px;
    height: 100px;
    border-radius: 100%;
  }
}
form {
  .content-flex {
    align-items: center;
    gap: 10px;
    display: flex;
  }
  .FullName .content {
    gap: 10px;
    display: flex;
    input {
      width: 20%;
      height: 40px;
      text-align: center;
    }
  }
  label {
    display: block;
    margin-bottom: 10px;
  }
  input {
    height: 40px;
    border: 0px;
    border: 1px solid #aaaaaa54;
    box-shadow: 0px 0px 5.13px 0px #00000040 inset;
    border-radius: 10px;
  }
}
.content-field {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: auto;
  align-items: center;
  .filed-icon {
    width: 10%;
    text-align: center;
    img {
      width: 30px;
      height: 30px;
      margin-top: 16px;
    }
  }
  .form-group {
    margin-bottom: 10px;
    position: relative;
    width: 90%;
    label {
      font-size: 18px;
      color: #2473b3;
      margin-bottom: 5px;
    }
    .pass_icon {
      position: absolute;
      left: 10px;
      top: 45px;
      cursor: pointer;
      width: 20px;
      height: 20px;
      z-index: 99999;
    }
  }
}
input {
  padding: 10px !important;
  height: 45px;
  &:focus {
    box-shadow: none;
    outline: none;
  }
}
input:disabled{
  background: #e9ecef;
}
</style>
<style>
.popupFrom .card {
  width: 70% !important;
  margin-top: 20px !important;
}
</style>
