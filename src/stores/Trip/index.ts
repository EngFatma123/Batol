import { defineStore } from "pinia";
import callServer from "../../assets/scripts/callServer/callServer";
import { useToast } from "vue-toastification";
import { ref } from "vue";
const toast = useToast();
export const useTrips = defineStore("Trip", () => {
  // properites
  let Trips = ref([]);
  let UsersTrips = ref([]);
  let sourceDestinationend_point = ref([]);
  let Listaddress_strat_point = ref([]);
  let Listaddress_end_point = ref([]);
  let sourceDestinationstrat_point = ref([]);
  let DailyTrip = ref("");
  let LoadingTripStore = ref(false);
  let loadingUsersTrips = ref(false);
  let sourceDestinationstart_pointLoading = ref(false);
  let ChaneStatusPackagelaoding = ref(false);
  let loadingTrip = ref(false);
  let loadingPackage = ref(false);
  let loading_action = ref(false);
  let tripDelete = ref(false);
  let PackageDelete = ref(false);
  let Package = ref([]);
  let Generaldata = ref([]);
  let loadingGeneraldata = ref(false);
  let sourceDestinationend_pointLoading = ref(false);
  let loadingupdateDailyTrip = ref(false);
  // getUsers
  async function getTrips(trip_status) {
    Trips.value = [];
    loadingTrip.value = true;
    const response = await callServer({
      url: `admin/Trip?trip_status=${trip_status}`,
      auth: true,
    });
    if (response.ok) {
      response.json().then((data) => {
        Trips.value = data.data;
        loadingTrip.value = false;
      });
    } else {
       response.json().then((data) => {
      toast.error(data.error);
    });
      loadingTrip.value = false;
      throw response.status;
    }
  }
  // getUsers
  async function getPackage() {
    Package.value = [];
    loadingPackage.value = true;
    sourceDestinationend_point.value = [];
    const response = await callServer({
      url: `admin/Package`,
      auth: true,
    });
    if (response.ok) {
      response.json().then((data) => {
        Package.value = data.data;
        loadingPackage.value = false;
      });
    } else {
      loadingPackage.value = false;
      throw response.status;
    }
  }

  // storePakages
  async function storePakages(data) {
    loading_action.value = true;
    const response = await callServer({
      url: `admin/Package`,
      auth: true,
      method: "POST",
      data,
    });
    if (response.ok) {
      getPackage();
      toast.success(" . تم بنحاح ");
      loading_action.value = false;
    } else {
      response.json().then((data) => {
      toast.error(data.error);
    });
      loading_action.value = false;
      throw response.status;
    }
  }
  // updatePakages
  async function updatePakages(id, data) {
    loading_action.value = true;
    const response = await callServer({
      url: `admin/Package/${id}?_method=PUT`,
      auth: true,
      method: "POST",
      data,
    });
    if (response.ok) {
      getPackage();
      loading_action.value = false;
      toast.success(" . تم بنحاح ");
    } else {
       response.json().then((data) => {
      toast.error(data.error);
    });
      loading_action.value = false;
      throw response.status;
    }
  }
  // UpdateData
  async function UpdateData(data) {
    const response = await callServer({
      url: `admin/Package/update`,
      auth: true,
      method: "POST",
      data,
    });
    if (response.ok) {
      getPackage();
      toast.success(" . تم بنحاح ");
    } else {
       response.json().then((data) => {
      toast.error(data.error);
    });
      throw response.status;
    }
  }
  // getdestinationend_point
  async function getdestinationstrat_point() {
    sourceDestinationstart_pointLoading.value = true;
    sourceDestinationstrat_point.value = [];
    Listaddress_strat_point.value = [];
    const response = await callServer({
      url: `admin/source-destination?point_type=start_point`,
      auth: true,
    });
    if (response.ok) {
      response.json().then((data) => {
        sourceDestinationstart_pointLoading.value = false;
        sourceDestinationstrat_point.value = data.data;
        for (let key in sourceDestinationstrat_point.value) {
          if (sourceDestinationstrat_point.value[key].is_active) {
            Listaddress_strat_point.value.push(sourceDestinationstrat_point.value[key]);
          }
        }
        console.log("sourceDestinationstrat_point.value", sourceDestinationstrat_point.value);
        console.log(" Listaddress_strat_point.value", Listaddress_strat_point.value)
      });
    } else {
      sourceDestinationstart_pointLoading.value = false;
      throw response.status;
    }
  }

  // getUsers
  async function getdestinationend_point() {
    sourceDestinationend_pointLoading.value = true;
    sourceDestinationend_point.value = [];
    Listaddress_end_point.value = [];
    const response = await callServer({
      url: `admin/source-destination?point_type=end_point`,
      auth: true,
    });
    if (response.ok) {
      response.json().then((data) => {
        sourceDestinationend_pointLoading.value = false;
        sourceDestinationend_point.value = data.data;
        for (let key in sourceDestinationend_point.value) {
          if (sourceDestinationend_point.value[key].is_active) {
            Listaddress_end_point.value.push(sourceDestinationend_point.value[key]);
          }
        }
      });
    } else {
      sourceDestinationend_pointLoading.value = false;
      throw response.status;
    }
  }
  //Block-UnBlock
  async function TripStore(data) {
    console.log("data=====",data);
    LoadingTripStore.value = true;
    const response = await callServer({
      url: `admin/Trip`,
      auth: true,
      method: "POST",
      data,
    });
    if (response.ok) {
      toast.success("تم بنجاح");
      getTrips(data.trip_status);
      LoadingTripStore.value = false;
    } else {
      LoadingTripStore.value = false;
      response.json().then((data) => {
        for (let err in data.errors) {
          console.log("data.errors[err]", data.errors[err][0]);
          toast.error(data.errors[err][0]);
        }
      });
      throw response.status;
    }
  } //Change
  async function ChangeStatus(data, trip_status) {
    const response = await callServer({
      url: `admin/Change-subscribe-trip-status`,
      auth: true,
      method: "POST",
      data,
    });
    if (response.ok) {
      toast.success("تم بنجاح");
      getTrips(trip_status);
    } else {
       response.json().then((data) => {
      toast.error(data.error);
    });
      throw response.status;
    }
  } // getPackage
  async function getUsersTrips(trip_id) {
    UsersTrips.value = [];
    loadingUsersTrips.value = true;
    const response = await callServer({
      url: `admin/Trip-Users?trip_id=${trip_id}`,
      auth: true,
    });
    if (response.ok) {
      response.json().then((data) => {
        UsersTrips.value = data.data;
        loadingUsersTrips.value = false;
      });
    } else {
      loadingUsersTrips.value = false;
      throw response.status;
    }
  } // ChangeStatusPoint
  async function ChangeStatusPoint(data, point_type) {
    UsersTrips.value = [];
    loadingUsersTrips.value = true;
    const response = await callServer({
      url: `admin/Change-Point-Status`,
      auth: true,
      method: "POST",
      data,
    });
    if (response.ok) {
      if (point_type == "start_point") {
        getdestinationstrat_point();
      } else {
        getdestinationend_point();
      }
      toast.success("تم بنجاح");
    } else {
       response.json().then((data) => {
      toast.error(data.error);
    });
      throw response.status;
    }
  } // ChangeStatusPoint
  async function sourceDestination(id, data) {
    const response = await callServer({
      url: `admin/source-destination/${id}`,
      auth: true,
      method: "PUT",
      data,
    });
    if (response.ok) {
      if (data.point_type == "start_point") {
        getdestinationstrat_point();
      } else {
        getdestinationend_point();
      }
      toast.success("تم بنجاح");
    } else {
       response.json().then((data) => {
      toast.error(data.error);
    });
      throw response.status;
    }
  } // ChangeStatusPoint
  async function sourceDestinationAdd(data) {
    const response = await callServer({
      url: `admin/source-destination`,
      auth: true,
      method: "POST",
      data,
    });
    if (response.ok) {
      if (data.point_type == "start_point") {
        getdestinationstrat_point();
      } else {
        getdestinationend_point();
      }
      toast.success("تم بنجاح");
    } else {
       response.json().then((data) => {
      toast.error(data.error);
    });
      throw response.status;
    }
  }
  // DeleteTrip
  async function DeleteTrip(ID, trip_status) {
    tripDelete.value = true;
    const response = await callServer({
      url: `admin/Trip/${ID}`,
      auth: true,
      method: "DELETE",
    });
    if (response.ok) {
      tripDelete.value = false;
      toast.success("تم بنجاح");
      getTrips(trip_status);
    } else {
       response.json().then((data) => {
      toast.error(data.error);
    });
      tripDelete.value = false;
      throw response.status;
    }
  }

  // DeletePackage
  async function DeletePackage(ID) {
    PackageDelete.value = true;
    const response = await callServer({
      url: `admin/Package/${ID}`,
      auth: true,
      method: "DELETE",
    });
    if (response.ok) {
      PackageDelete.value = false;
      toast.success("تم حذف الباقة بنجاح");
      getPackage();
    } else {
       response.json().then((data) => {
      toast.error(data.error);
    });
      PackageDelete.value = false;
      throw response.status;
    }
  }
  // getPackage
  async function GeneralData() {
    Generaldata.value = [];
    loadingGeneraldata.value = true;
    const response = await callServer({
      url: `admin/General-Data`,
      auth: true,
    });
    if (response.ok) {
      response.json().then((data) => {
        Generaldata.value = data.data;
        loadingGeneraldata.value = false;
      });
    } else {
      loadingGeneraldata.value = false;
      throw response.status;
    }
  }
  // ChaneStatusPackage
  async function ChaneStatusPackage(data) {
    ChaneStatusPackagelaoding.value = true;
    const response = await callServer({
      url: `admin/Change-Status-Package`,
      auth: true,
      method: "POST",
      data
    });
    if (response.ok) {
      ChaneStatusPackagelaoding.value = false;
      getPackage();
    } else {
      ChaneStatusPackagelaoding.value = false;
      throw response.status;
    }
  }

  // ChaneStatusPackage
  async function getDailyTrip() {
    ChaneStatusPackagelaoding.value = true;
    const response = await callServer({
      url: `admin/Daily-Trip`,
      auth: true,
    });
    if (response.ok) {
      response.json().then((data) => {
        ChaneStatusPackagelaoding.value = false;
        DailyTrip.value = data.data;
      })
    } else {
      ChaneStatusPackagelaoding.value = false;
      throw response.status;
    }
  }
  // updateDailyTrip
  async function updateDailyTrip(data) {
    loadingupdateDailyTrip.value = true;
    const response = await callServer({
      url: `admin/Update-Daily-Trip`,
      auth: true,
      data,
      method: 'POST'
    });
    if (response.ok) {
      loadingupdateDailyTrip.value = false;
      getDailyTrip();
      toast.success("تم بنجاح");

    } else {
      loadingupdateDailyTrip.value = false;
       response.json().then((data) => {
      toast.error(data.error);
    });
      throw response.status;
    }
  }
  
  // DeleteTrip
  async function deletesource(ID,typepoint) {
    sourceDestinationstart_pointLoading.value = true;
    const response = await callServer({
      url: `admin/source-destination/${ID}`,
      auth: true,
      method: "DELETE",
    });
    if (response.ok) {
      sourceDestinationstart_pointLoading.value = false;
      toast.success("تم بنجاح");
      if(typepoint == "start_point"){
      getdestinationstrat_point();}
      else{
        getdestinationend_point();
      }
    } else {
       response.json().then((data) => {
      toast.error(data.error);
    });
    sourceDestinationstart_pointLoading.value = false;
      throw response.status;
    }
  }
  return {
    // properites

    // auth functions
    getTrips,
    Trips,
    loadingTrip,
    getdestinationend_point,
    sourceDestinationstart_pointLoading,
    getdestinationstrat_point,
    sourceDestinationstrat_point,
    sourceDestinationend_point,
    TripStore,
    LoadingTripStore,
    getPackage,
    Package,
    UpdateData,
    ChangeStatus,
    getUsersTrips,
    UsersTrips,
    loadingUsersTrips,
    loadingPackage, loading_action,
    ChangeStatusPoint,
    sourceDestination,
    sourceDestinationAdd, storePakages, updatePakages,
    DeleteTrip,
    tripDelete,
    Listaddress_end_point,
    Listaddress_strat_point,
    loadingGeneraldata,
    Generaldata,
    GeneralData,
    DeletePackage,
    PackageDelete,
    ChaneStatusPackage,
    ChaneStatusPackagelaoding,
    getDailyTrip,
    DailyTrip,
    updateDailyTrip, loadingupdateDailyTrip,
    deletesource

  };
});
