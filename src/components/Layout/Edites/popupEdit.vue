<template>
    <popup class="EditAdmin">
        <template #header>تعديل المسؤول </template>
        <template #body>
            <form @submit.prevent="onSubmit">
                <div class="row mt-4 d-flex ">
                    <div class="col-md-3">
                        <div class="imageProfile">
                            <img :src="ChangeIMage" v-if="ChangeIMage" class="imagePostion" />
                            <img :src="authStore.user.image" v-else class="imagePostion" />
                            <span class="div-icon">
                                <v-icon icon="mdi-upload"></v-icon></span>
                            <input type="file" name="headerImg" @change="changeFile" class="input-file" />
                        </div>
                    </div>
                    <div class="col-md-9 ">
                        <div class="mb-3 content-filed">
                            <label for="exampleFormControlInput1" class="form-label">اسم المستخدم</label>
                            <div class="content-form">
                                <div class="d-flex gap-2">
                                    <span class="filed-icon"><img src="@/assets/images/manprofile.svg" /></span>
                                    <div class="content-input"> <input type="text" class="form-control" id="name"
                                            name="name" v-bind="name"
                                            :class="{ 'is-invalid': errors.name }" />
                                        <div class="invalid-feedback">{{ errors.name }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mb-3  content-filed">
                            <label for="exampleFormControlTextarea1" class="form-label">البريد الالكتروني </label>
                            <div class="content-form">
                                <div class="d-flex gap-2">
                                    <span class="filed-icon"><img src="@/assets/images/email.svg" /></span>
                                    <div class="content-input">
                                        <input type="text" class="form-control" id="email" name="email" v-bind="email"
                                            :class="{ 'is-invalid': errors.email }" />
                                        <div class="invalid-feedback">{{ errors.email }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="text-center gap-2 d-flex buttons my-3">
                            <button class="send" v-if="!authStore.Update_use_profile ">حفظ</button>
                            <button class="send" v-else>إنتظر .....</button><button class="cancel"
                                @click="$emit('closepopup')">إلغاء</button>
                        </div>
                    </div>
                </div>
            </form>
        </template>
    </popup>
</template>
<script setup>
import popup from "@/components/global/popup.vue";
import { useForm } from "vee-validate";
import { onMounted, ref, watch } from "vue";
import { useAuthStore } from "@/stores/auth/index";
// auth store
const authStore = useAuthStore();
import * as Yup from "yup";
const adminInfo = ref({}) 
const emits =defineEmits(['closepopup']) 
// meta
const { errors, handleSubmit, defineInputBinds,resetForm } = useForm({
    validationSchema: Yup.object({
        name: Yup.string().required("يجب إدخال هذا الحقل"),
        email: Yup.string()
        .email("يجب كتابه ايميل بشكل صحيح").required("يجب إدخال هذا الحقل"),
    }),
});
let ChangeIMage = ref("");
let fileupload = ref("");
let changeFile = (e) => {
    const files = event.target.files;
   fileupload.value = event.target.files.item(0);
    let filename = files[0].name;
    const fileReader = new FileReader();
    fileReader.addEventListener("load", () => {
        ChangeIMage.value = fileReader.result;
    });
    fileReader.readAsDataURL(files[0]);
    ChangeIMage.value = files[0];
};
//first_name ,last_name
const name = defineInputBinds("name");
const email = defineInputBinds("email");
let onSubmit = handleSubmit(async (values) => {
    if (values) {
        try {
            let data= new FormData();
            data.append('name',values.name); 
            data.append('email',values.email); if(fileupload.value){
            data.append('image',fileupload.value); }
           await authStore.UpdateProfile(data);
           emits('closepopup');
        } catch (err) {
            console.log(err);
        }
    }
});
onMounted(() => {
    adminInfo.value =localStorage.getItem('rememberme') == 'true' ? JSON.parse(localStorage.getItem("user")) : sessionStorage.getItem('rememberme') ;  
    resetForm({
    values: {
        name: localStorage.getItem('rememberme') == 'true' ? JSON.parse(localStorage.getItem("user")).name : JSON.parse(sessionStorage.getItem("user")).name,
        email: localStorage.getItem('rememberme') == 'true' ? JSON.parse(localStorage.getItem("user")).email : JSON.parse(sessionStorage.getItem("user")).email,
    },
  });
})
watch(
  () => localStorage.getItem("user"),
  (newVal) => {
  resetForm({
    values: {
        name: localStorage.getItem('rememberme') == 'true' ? JSON.parse(localStorage.getItem("user")).name : JSON.parse(sessionStorage.getItem("user")).name,
        email: localStorage.getItem('rememberme') == 'true' ? JSON.parse(localStorage.getItem("user")).email : JSON.parse(sessionStorage.getItem("user")).email,
    },
  });
  }
);
</script>
<style lang="scss" scoped>
.row.d-flex {
    // align-items: center;
}

.imageProfile {
    width: max-content;
    margin: auto;
    position: relative;
    cursor: pointer;

    .input-file {
        position: absolute;
        width: 100%;
        height: 100%;
        cursor: pointer;
        right: 0px;
        opacity: 0;
        z-index: 000000;
        top: 0px;
    }

    .div-icon {
        position: absolute;
        top: 24%;
        left: 0px;
        margin: auto;
        width: 100%;
        text-align: center;
        font-size: 19px;

        i {
            background: #46277c;
            color: white;
            opacity: 0;
            padding: 17px;
            border-radius: 100%;
        }
    }

    .imagePostion {
        width: 150px;
        height: 150px;
        border-radius: 100%;
    }

    &:hover i {
        opacity: 0.8;
    }
}

.filed-icon {
    text-align: center;

    img {
        width: 30px;
        height: 30px;
    }
}

.form-label {
    padding-right: 10%
}

.content-filed {
    padding: 0px 20px;

    .content-input {
        width: 100%;
    }
}
</style>
<style lang="scss">
.EditAdmin.content-popup .card {
    width: 50%
}

@media screen and (max-width: 993px) {
    .EditAdmin.content-popup .card {
        width: 95%
    }

    .content-filed {
        padding: 0px;
    }
}
</style>