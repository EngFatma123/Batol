import { defineStore } from "pinia";
import callServer from "../../assets/scripts/callServer/callServer";
import { useToast } from "vue-toastification";
import { ref } from "vue";
const toast = useToast();

export const useNotification = defineStore("Notification ", () => {
  // properites
  let loadingsend = ref(false);
  let lodaing_wait = ref(false);
  let notification = ref([]);
  async function getNotification(type) {
    lodaing_wait.value = true;
    notification.value = [];
    const response = await callServer({
      url: `admin/Notification${type == 'all' ? '' : `/${type}`}`,     
       auth: true,
    });
    if (response.ok) {
      response.json().then((data) => {
        notification.value = data.data;
        lodaing_wait.value = false;
      });
    } else {
       response.json().then((data) => {
      toast.error(data.error);
    });
      lodaing_wait.value = false;
      throw response.status;
    }
  }
  //sendnotification
  async function sendnotification(data) {
    loadingsend.value = true;
    const response = await callServer({
      url: `admin/Notification/Send`,
      auth: true,
      method: "POST",
      data,
    });
    if (response.ok) {
      loadingsend.value = false;
      toast.success(" . تم بنحاح ");
    } else {
       response.json().then((data) => {
      toast.error(data.error);
    });
      loadingsend.value = false;
      throw response.status;
    }
  } 
  return {
    // properites

    // auth functions
    sendnotification ,loadingsend,
    notification,lodaing_wait,getNotification
  };
});
