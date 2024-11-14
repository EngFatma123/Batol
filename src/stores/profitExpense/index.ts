import { defineStore } from "pinia";
import callServer from "../../assets/scripts/callServer/callServer";
import { useToast } from "vue-toastification";
import { ref } from "vue";
const toast = useToast();

export const useprofitExpense = defineStore("profitExpense", () => {
  // properites
  let profitExpense = ref([]);
  let Profits = ref([]);
  let loadingStore = ref(false);
  let loadingget = ref(false);
  let profitExpenseDelete = ref(false);
  // getprofitExpense
  async function getprofitExpense(gettype, date_from, date_to) {
    profitExpense.value = [];
    loadingget.value = true;
    const response = await callServer({
      url: `admin/profitExpense?type=${gettype}${date_from ? `&from_date=${date_from}` : ""}${date_to ? `&to_date=${date_to}` : ""}`,
      auth: true,
    });
    if (response.ok) {
      response.json().then((data) => {
        loadingget.value = false;
        profitExpense.value = data.data;
      });
    } else {
      loadingget.value = false;
      response.json().then((data) => {
        toast.error(data.error);
      });
      throw response.status;
    }
  }
  // getProfitOnly
  async function getProfitOnly(date_from, date_to) {
    loadingget.value = true;
    profitExpense.value = [];
    const response = await callServer({
      url: `admin/profitExpense/Profit${date_from ? `?from_date=${date_from}` : ""}${date_to ? `&to_date=${date_to}` : ""}`,
      auth: true,
    });
    if (response.ok) {
      response.json().then((data) => {
        profitExpense.value = data.data.all_data;
        console.log("data.all_data === ", data.data.all_data);
        loadingget.value = false;
      });
    } else {
      response.json().then((data) => {
        toast.error(data.error);
      });
      loadingget.value = false;
      throw response.status;
    }
  }
  // storeprofitExpense
  async function storeprofitExpense(data, nameTab, typeTab, date_from, date_to) {
    loadingStore.value = true;
    const response = await callServer({
      url: `admin/profitExpense/store`,
      auth: true,
      method: "POST",
      data,
    });
    if (response.ok) {
      response.json().then((data) => {
        loadingStore.value = false;
        toast.success(" . تم بنحاح ");
        console.log("date_from", date_from);
        console.log("date_to", date_to);
        console.log("nameTab", nameTab);
        getprofitExpense(typeTab, date_from, date_to);
      });
    } else {
      response.json().then((data) => {
        toast.error(data.error);
      });
      loadingStore.value = false;
      throw response.status;
    }
  }
  // DeleteTrip
  async function DeleteprofitExpense(ID, type_delete) {
    profitExpenseDelete.value = true;
    const response = await callServer({
      url: `admin/profitExpense/${ID}`,
      auth: true,
      method: "DELETE",
    });
    if (response.ok) {
      profitExpenseDelete.value = false;
      toast.success("تم بنجاح");
      getprofitExpense(type_delete, null, null);
    } else {
      profitExpenseDelete.value = false;
      response.json().then((data) => {
        toast.error(data.error);
      });
      throw response.status;
    }
  }

  // storeprofitExpense
  async function UpdateprofitExpense(data, id, typeTab, date_from, date_to) {
    loadingStore.value = true;
    const response = await callServer({
      url: `admin/profitExpense/${id}`,
      auth: true,
      method: "PUT",
      data,
    });
    if (response.ok) {
      loadingStore.value = false;
      getprofitExpense(typeTab, date_from, date_to);
    } else {
      loadingStore.value = false;
      response.json().then((data) => {
        toast.error(data.error);
      });
      loadingStore.value = false;
      throw response.status;
    }
  }
  return {
    // properites

    // auth functions
    storeprofitExpense,
    getprofitExpense,
    profitExpense,
    loadingStore,
    loadingget,
    Profits,
    getProfitOnly,
    profitExpenseDelete,
    DeleteprofitExpense,
    UpdateprofitExpense
  };
});
