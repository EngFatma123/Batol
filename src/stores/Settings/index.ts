import { defineStore } from "pinia";
import callServer from "../../assets/scripts/callServer/callServer";
import { useToast } from "vue-toastification";
import { ref } from "vue";
const toast = useToast();

export const useSetting = defineStore("Settings", () => {
  // properites
  let Setting = ref([]);
  let UpdateSetting = ref([]);
  let loadingSettings = ref(false);
  let loadingPullMoney = ref(false);
  // getUsers
  async function getSettings() {
    Setting.value = [];
    loadingSettings.value = true;
    const response = await callServer({
      url: `admin/Setting`,
      auth: true,
    });
    if (response.ok) {
      response.json().then((data) => {
        Setting.value = data.data;
        UpdateSetting.value = data.data;
        loadingSettings.value = false;
      });
    } else {
       response.json().then((data) => {
      toast.error(data.error);
    });
      loadingSettings.value = false;
      throw response.status;
    }
  }
  async function UpdateData(data) {
    loadingSettings.value = true;
    const response = await callServer({
      url: `admin/Setting/update`,
      auth: true,
      method: "POST",
      data,
    });
    if (response.ok) {
      getSettings();
      toast.success(" . تم بنحاح ");
    } else {
       response.json().then((data) => {
      toast.error(data.error);
    });
      loadingSettings.value = false;
      throw response.status;
    }
  } //PullMoney
  async function PullMoney(data) {
    loadingPullMoney.value = true;
    const response = await callServer({
      url: `admin/User/Pull-Money`,
      auth: true,
      method: "POST",
      data,
    });
    if (response.ok) {
      loadingPullMoney.value = false;
      toast.success("تم التعديل بنجاح");
      getSettings();
    } else {
      loadingPullMoney.value = false;
       response.json().then((data) => {
      toast.error(data.error);
    });
      throw response.status;
    }
  }
  return {
    // properites

    // auth functions
    getSettings,
    Setting,
    loadingSettings,
    UpdateData,
    UpdateSetting,
    PullMoney,
    loadingPullMoney,
  };
});
