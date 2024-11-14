<template>
  <div class="card card-body">
    <div class="profile_info">
      <div class="img_profile text-center mb-2">
        <img :src="Users.UserInfo.media_personal_image" v-if="Users.UserInfo.media_personal_image"/>
        <img src="@/assets/images/man.svg" class="personal_image" v-else/>
      </div>
      <h3 class="text-center mb-4">
        {{ Users.UserInfo.name }}
      </h3>
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
            <img src="@/assets/images/profile/email.svg" />
            {{ Users.UserInfo.email }}
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
            {{ Users.UserInfo.SourcePoint ? Users.UserInfo.SourcePoint.name : "" }}
          </p>
        </li>
        <li>
          <label>عنوان الجامعه</label>
          <p>
            <img src="@/assets/images/profile/id.svg" />
            {{ Users.UserInfo.DestinationPoint ? Users.UserInfo.DestinationPoint.name : "" }}
          </p>
        </li>
      </ul>
    </div>
    <div class="d-flex images_id mb-4">
      <img :src="Users.UserInfo.media_face_id" />
      <img :src="Users.UserInfo.media_back_id" />
    </div>
    <div class="d-flex buttons">
      <button class="accept" @click="Approve_UnApprove(1)">الموافقه</button><button class="reject"
        @click="showpopupRejecter = true">الرفض</button>
    </div>
    <popupRejecter v-if="showpopupRejecter"><template #header>سبب رفض الطلب</template>
      <template #body>
        <form @submit.prevent="onSubmit">
          <div class="mb-3 d-flex gap-2 content-filed">
            <label for="exampleFormControlInput1" class="form-label">العنوان</label>
            <div class="content-form">
              <input type="text" class="form-control" id="title" name="title" v-bind="title"
                :class="{ 'is-invalid': errors.title }" />
              <div class="invalid-feedback">{{ errors.title }}</div>
            </div>
          </div>
          <div class="mb-3 d-flex gap-2 content-filed">
            <label for="exampleFormControlTextarea1" class="form-label">محتوى الرساله</label>
            <div class="content-form">
              <textarea class="form-control" id="reason_cancel" rows="5" name="reason_cancel" v-bind="reason_cancel"
                :class="{ 'is-invalid': errors.reason_cancel }"></textarea>
              <div class="invalid-feedback">{{ errors.title }}</div>
            </div>
          </div>
          <div class="text-center gap-2 d-flex buttons">
            <button class="send">إرسال</button><button class="cancel" @click="close()">إلغاء</button>
          </div>
        </form>
      </template>
    </popupRejecter>
  </div>
</template>
<script setup>
import popupRejecter from "@/components/global/popup.vue";
import { ref, onMounted } from "vue";
import { useUsers } from "@/stores/Users/index";
import { useRoute } from "vue-router";
import { useForm } from "vee-validate";
import * as Yup from "yup"; // meta
import router from "@/router";
let Users = useUsers();
let route = useRoute();
const showpopupRejecter = ref(false);
const close = () => {
  showpopupRejecter.value = false;
};
const { errors, handleSubmit, defineInputBinds } = useForm({
  validationSchema: Yup.object({
    title: Yup.string().required("this filed is required"),
    reason_cancel: Yup.string().required("this filed is required"),
  }),
});

//first_name ,last_name
const title = defineInputBinds("title");
const reason_cancel = defineInputBinds("reason_cancel");
let onSubmit = handleSubmit(async (values) => {
  if (values) {
    try {
      await Approve_UnApprove(2, values);
    } catch (err) {
      console.log(err);
    }
  }
});

const Approve_UnApprove = async (approve, values) => {
  const data = ref({ user_id: route.params.id, approve: approve });
  if (approve == 2) {
    data.value.reason_cancel = values.reason_cancel;
  }
  await Users.Approve_UnApprove(data.value);
  if (approve == 1) {
    router.push('/Users')
  }
  close();
};
onMounted(async () => {

  await Users.TakeUserInfo(route.params.id);
});
</script>
<style scoped lang="scss">
.buttons,
.images_id {
  justify-content: center;
  width: 100%;
  gap: 20px;
}

.img_profile {
  img {
    width: 100px;
    height: 100px;
    object-fit: contain;
    border-radius: 100%;
  }
}

.images_id {
  img {
    width: 30%;
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

.content-filed {

  input,
  textarea {
    width: 80% !important;
  }

  label {
    width: 20%;
  }
}

.buttons {
  button {
    height: 40px;

    &.accept {
      background: #4ce049;
    }

    &.reject {
      background: #f93a3a;
    }
  }
}

form {
  label {
    color: #2a82c9;
  }

  .content-form {
    width: 100%;
  }
}

@media screen and (max-width: 993px) {
  .list_info {
    flex-direction: column;
  }

  .buttons button {
    width: 30%;
  }
}
</style>
