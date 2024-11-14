<template>
    <popup class="EditAdmin">
        <template #header> تغير كلمة السر </template>
        <template #body>
            <form @submit.prevent="onSubmit">
                <div class="row mt-4 d-flex ">
                    <div class="col-md-12 ">
                        <div class="mb-3 content-filed">
                            <label for="exampleFormControlInput1" class="form-label">كلمة السر الجديدة </label>
                            <div class="content-form">
                                <div class="d-flex gap-2">
                                    <span class="filed-icon"><img src="@/assets/images/password.svg" /></span>
                                    <div class="content-input">
                                        <img src="@/assets/images/eye-svgrepo.svg" @click="filedPass = 'text'"
                                            class="pass_icon" v-if="filedPass == 'password'" /><img
                                            src="@/assets/images/eye-slash.svg" @click="filedPass = 'password'"
                                            class="pass_icon" v-else />
                                        <input :type="filedPass" class="form-control" id="password" name="password"
                                            v-bind="password" :class="{ 'is-invalid': errors.password }" />
                                        <div class="invalid-feedback">{{ errors.password }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mb-3  content-filed">
                            <label for="exampleFormControlTextarea1" class="form-label"> تأكيد كلمة السر الجديدة
                            </label>
                            <div class="content-form">
                                <div class="d-flex gap-2">
                                    <span class="filed-icon"><img src="@/assets/images/password.svg" /></span>
                                    <div class="content-input">
                                        <img src="@/assets/images/eye-svgrepo.svg" @click="filedPassconfirm = 'text'"
                                            class="pass_icon" v-if="filedPassconfirm == 'password'" /><img
                                            src="@/assets/images/eye-slash.svg" @click="filedPassconfirm = 'password'"
                                            class="pass_icon" v-else />
                                        <input :type="filedPassconfirm" class="form-control" id="password_confirmation"
                                            name="password_confirmation" v-bind="password_confirmation"
                                            :class="{ 'is-invalid': errors.password_confirmation }" />
                                        <div class="invalid-feedback">{{ errors.password_confirmation }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="text-center gap-2 d-flex buttons my-3">
                            <button class="send" v-if="!authStore.Update_use_profile">حفظ</button>
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
import * as Yup from "yup";
import { useAuthStore } from "@/stores/auth/index";
import { useRouter } from "vue-router";
import { ref } from "vue";

const filedPass = ref("password");
const filedPassconfirm = ref("password");
// auth store
const router = useRouter();
const authStore = useAuthStore();
const { errors, handleSubmit, defineInputBinds } = useForm({
    validationSchema: Yup.object({
        password: Yup.string().min(6).required("هذا الحقل مطلوب"),
        password_confirmation: Yup.string().required("هذا الحقل مطلوب").oneOf([Yup.ref("password")], "يجب ان يكون مطابق كلمه مرور الجديده"),
    }),
});

//first_name ,last_name
const password = defineInputBinds("password");
const password_confirmation = defineInputBinds("password_confirmation");
let onSubmit = handleSubmit(async (values) => {
    if (values) {
        try {
            await authStore.ChangePass(values);
            router.push("/signin");
        } catch (err) {
            console.log(err);
        }
    }
});
</script>
<style lang="scss" scoped>
.row.d-flex {
    // align-items: center;
}

.pass_icon {
    position: absolute;
    left: 10px;
    top: 8px;
    cursor: pointer;
    width: 20px;
    height: 20px;
    z-index: 99999;
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
        position: relative;
    }
}
</style>
<style lang="scss">
.Editpassword.content-popup .card {
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