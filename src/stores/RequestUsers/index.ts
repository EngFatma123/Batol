import { defineStore } from "pinia";
import callServer from "../../assets/scripts/callServer/callServer";
import { useToast } from "vue-toastification";
import { ref } from "vue";
const toast = useToast();

export const useRequestUsers = defineStore("RequestUsers", () => {
  // properites
  let RequestUsers = ref([]);
  let loadingUsers = ref(false);
  // getUsers
  async function getindexRequestUsers() {
    loadingUsers.value = true;
    const response = await callServer({
      url: `admin/request-users?page=1&status=all`,
      auth: true,
    });
    if (response.ok) {
      response.json().then((data) => {
        RequestUsers.value = data.data;
        loadingUsers.value = false;
      });
    } else {
      toast.error(" . خطأ ");
      loadingUsers.value = false;
      throw response.status;
    }
  }
  return {
    // properites

    // auth functions
    getindexRequestUsers,
    RequestUsers,
  };
});
