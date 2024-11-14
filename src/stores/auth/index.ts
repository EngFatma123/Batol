import { defineStore } from "pinia";
import type { Register, ResetPassword, VerifyRegister } from "./interface";
import { ref } from "vue";
import callServer from "../../assets/scripts/callServer/callServer";
import { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";
import { useRouter } from "vue-router";
const toast = useToast();
const router = useRouter()
export const useAuthStore = defineStore("auth", () => {
  // properites

  // user
  let user = ref();

  // is_error
  const is_error = ref<Boolean>(false);

  // is_loading
  const is_loading = ref<Boolean>(false);

  // is_loading
  const Update_use_profile = ref<Boolean>(false);

  // is_auth
  const is_auth = ref<Boolean>(false);

  // is_waiting
  const is_waiting = ref<Boolean>(false);

  // -- auth functions

  // login
  async function login(data,rememberme) {
    is_loading.value = true;
    is_waiting.value = true;
    const response = await callServer({
      url: "admin/auth/login",
      method: "POST",
      data,
    });

    if (response.ok) {
      is_auth.value = true;
      await response.json().then(async (data: { token: string }) => {
        localStorage.setItem('rememberme',rememberme)
        if(rememberme){
        localStorage.setItem("access_token", data.data.token);
        if(!localStorage.getItem('fcm_token') ){
        localStorage.setItem("fcm_token",data.data.user.fcm_token ? data.data.user.fcm_token :"fdktiaijigjisniigjiserq");}
        }else{
          sessionStorage.setItem("access_token", data.data.token);
        if(!sessionStorage.getItem('fcm_token') ){
          sessionStorage.setItem("fcm_token",data.data.user.fcm_token ? data.data.user.fcm_token :"fdktiaijigjisniigjiserq");
        }
      }
        UpdateFCM({fcm_token :localStorage.getItem('fcm_token') ?localStorage.getItem('fcm_token') : sessionStorage.getItem('fcm_token')});
        Profile();
        await toast.info("تم تسجيل الدخول بنجاح ");
        is_auth.value = true;
        is_loading.value = false;
        this.router.push("/");
      });
    } else {
      is_error.value = true;
      is_loading.value = false;
      is_waiting.value = false;
      toast.error("تأكد من إدخال البيانات الصحيحه ");
      throw response.status;
    }
  }
    // UpdateFCM
    async function UpdateFCM(data) {
      const response = await callServer({
        url: "admin/auth/Update-FCM",
        method: "POST",
        data,
        auth:true
      });
  
      if (response.ok) {
        is_auth.value = true;
        await response.json().then(async (data) => {
          if(localStorage.getItem('rememberme') == 'true'){
            localStorage.setItem("fcm_token", data.data.fcm_token);

          }else{
             sessionStorage.setItem("fcm_token", data.data.fcm_token);
          }
               });
      } else {
        throw response.status;
      }
    }
  // UpdateProfile
  async function UpdateProfile(data) {
    Update_use_profile.value = true;
    const response = await callServer({
      url: "admin/auth/UpdateProfile",
      method: "POST",
      data,
      auth:true,
      type: "",
    });

    if (response.ok) {
      Update_use_profile.value = false;
      Profile();
      await toast.info("تم بنجاح ");
    } else {
      Update_use_profile.value = false;
      toast.error("أعد العمليه لم يتم التسجيل  ");
      throw response.status;
    }
  }
  // Profile
  async function Profile() {
    is_loading.value = true;
    is_waiting.value = true;
    const response = await callServer({
      url: "admin/auth/Show-Profile",
      method: "GET",
      auth:true
    });

    if (response.ok) {
      is_auth.value = true;
      await response.json().then(async (data: { token: string }) => {
        user.value =data.data;
        if(localStorage.getItem('rememberme') == 'true'){
        localStorage.setItem("user", JSON.stringify(data.data));
        }else{
          sessionStorage.setItem("user", JSON.stringify(data.data));
          
        }
      });
    } else {
      throw response.status;
    }
  }

  // ChangePass
  async function ChangePass(data) {
    Update_use_profile.value = true;
    const response = await callServer({
      url: "admin/auth/Change-Password",
      method: "POST",
      data,
      auth:true
    });

    if (response.ok) {
      Update_use_profile.value = false;
      await toast.info("تم بنجاح ");
      await logOutFun();
    } else {
      Update_use_profile.value = false;
      toast.error("أعد العمليه لم يتم التسجيل  ");
      throw response.status;
    }
  }
  // logOut
  async function logOutFun() {
    const response = await callServer({
      url: "admin/auth/logout",
      method: "POST",
      auth: true,
    });
    console.log(response);
    if (response.ok) {
      await localStorage.removeItem("access_token");
      await localStorage.removeItem("rememberme");
      await sessionStorage.removeItem("access_token");
      await localStorage.removeItem("user");
      await sessionStorage.removeItem("user");
      await toast.info("تم تسجيل الخروج بنجاح ");
    } else {
      await localStorage.removeItem("access_token");
      await localStorage.removeItem("rememberme");
      await sessionStorage.removeItem("access_token");
      await localStorage.removeItem("user");
      await sessionStorage.removeItem("user");
      await toast.info("تم تسجيل الخروج بنجاح ");
      // toast.error(" . خطأ فى تسجيل الخروج ");
      throw response.status;
    }
  }

  // logOut
  async function logOut() {
    await logOutFun();
  }

  return {
    // properites
    is_loading,
    is_auth,
    is_waiting,
    user, Update_use_profile,

    // auth functions
    login,
    logOut, UpdateProfile,ChangePass
  };
});
