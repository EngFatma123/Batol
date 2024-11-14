import { defineStore } from "pinia";
import callServer from "../../assets/scripts/callServer/callServer";
import { useToast } from "vue-toastification";
import { ref } from "vue";
const toast = useToast();

export const useDashboard = defineStore("Dashboard", () => {
  // properites
  let DataDashboard = ref({});
  let chart_horizontal = ref([]);
  let chart_vertical = ref([]);
  let loadingDashboard = ref(false);
  let sumVertical = ref(0)
  // logOut
  async function getDashboard(data) {
    loadingDashboard.value = true;
    console.log(data);
    const response = await callServer({
      url: `admin/Dashboard?${
        data.filter_by ? `filter_by=${data.filter_by}` : ""
      }${data.type_search ? `&type_search=${data.type_search}` : ""}${
        data.day && data.filter_by == 'daily'  ? `&day=${data.day}` : ""
      }${
        data.month && data.filter_by == 'daily' ||  data.filter_by == 'monthly' ? `&month=${data.month}` : ""
      }${data.year ? `&year=${data.year}` : ""}`,
      auth: true,
    });
    if (response.ok) {
      chart_horizontal.value = [];
      chart_vertical.value = [];
      sumVertical.value = 0;
      response.json().then((data) => {
        DataDashboard.value = data.data;
        console.log("DataDashboard ==",DataDashboard.value)
        for (let key in DataDashboard.value?.Chart) {
          chart_horizontal.value.push(
            parseFloat(DataDashboard?.value.Chart[key].horizontal)
          );
          chart_vertical.value.push(
            parseFloat(DataDashboard?.value.Chart[key].vertical)
          );
          sumVertical.value +=DataDashboard?.value.Chart[key].vertical ;
        }
        loadingDashboard.value = false;
      });
    } else {
       response.json().then((data) => {
      toast.error(data.error);
    });
      loadingDashboard.value = false;
      throw response.status;
    }
  }

  return {
    // properites

    // auth functions
    getDashboard,
    DataDashboard,
    chart_vertical,
    chart_horizontal,
    loadingDashboard,
    sumVertical
  };
});
