import { defineStore } from "pinia";
import callServer from "../../assets/scripts/callServer/callServer";
import { useToast } from "vue-toastification";
import { ref } from "vue";
const toast = useToast();

export const useUsers = defineStore("Users", () => {
  // properites
  let Users = ref([]);
  let ListSearchUsers = ref([]);
  let UserOrders = ref([]);
  let OrderList = ref([]);
  let Trips = ref([]);
  let WalletTransaction = ref([]);
  let Status_Appoint = ref([]);
  let UserInfo = ref({});
  let loadingUsers = ref(false);
  let LoadingUpdateUser = ref(false);
  let loadingAccountChangeStatus = ref(false);
  // getUsers
  async function getUsers() {
    Users.value = [];
    loadingUsers.value = true;
    const response = await callServer({
      url: `admin/User?type=current`,
      auth: true,
    });
    if (response.ok) {
      response.json().then((data) => {
        Users.value = data.data;
     
        loadingUsers.value = false;
        });
    } else {
       response.json().then((data) => {
      toast.error(data.error);
    });
      loadingUsers.value = false;
      throw response.status;
    }
  } // searchUsers
  async function getUsersSearch(search) {
    ListSearchUsers.value = [];
    const response = await callServer({
      url: `admin/User/Search-User?search=${search}`,
      auth: true,
    });
    if (response.ok) {
      response.json().then((data) => {
        ListSearchUsers.value = data.data;
      });
    } else {
       response.json().then((data) => {
      toast.error(data.error);
    });
      throw response.status;
    }
  } // UserOrders
  async function getUserOrders(UserId) {
    Users.value = [];
    OrderList.value = [];
    loadingUsers.value = true;
    const response = await callServer({
      url: `admin/User/UserOrders?user_id=${UserId}`,
      auth: true,
    });
    if (response.ok) {
      response.json().then((data) => {
        UserOrders.value = data.data;
        
      });
    } else {
       response.json().then((data) => {
      toast.error(data.error);
    });
      loadingUsers.value = false;
      throw response.status;
    }
  }
   // UserOrders
   async function getUsersend() {
    OrderList.value = [];
    loadingUsers.value = true;
    const response = await callServer({
      url: `admin/User?type=new`,
      auth: true,
    });
    if (response.ok) {
      response.json().then((data) => {
        OrderList.value = data.data;
        loadingUsers.value = false;
      });
    } else {
       response.json().then((data) => {
      toast.error(data.error);
    });
      loadingUsers.value = false;
      throw response.status;
    }
  }
  //Delete User
  async function DeleteUser(id) {
    const response = await callServer({
      url: `admin/User/Delete-User/${id}?_method=Delete`,
      auth: true,
      method: "Delete",
    });
    if (response.ok) {
      toast.success(" . تم بنحاح ");
      this.router.push("/Users");
    } else {
       response.json().then((data) => {
      toast.error(data.error);
    });
      throw response.status;
    }
  }
  //gettrips
  async function getTrips(id) {
    const response = await callServer({
      url: `admin/User/Trips?user_id=${id}`,
      auth: true,
    });
    if (response.ok) {
      response.json().then((data) => {
        Trips.value = data.data;
      });
    } else {
       response.json().then((data) => {
      toast.error(data.error);
    });
      throw response.status;
    }
  }
  //WalletTransaction
  async function getWalletTransaction(id) {
    const response = await callServer({
      url: `admin/User/WalletTransaction?user_id=${id}`,
      auth: true,
    });
    if (response.ok) {
      response.json().then((data) => {
        WalletTransaction.value = data.data;
      });
    } else {
       response.json().then((data) => {
      toast.error(data.error);
    });
      throw response.status;
    }
  }
  //Block-UnBlock
  async function MakeBlockUnBlock(data) {
    loadingAccountChangeStatus.value = true;
    const response = await callServer({
      url: `admin/User/Block-UnBlock`,
      auth: true,
      method: "POST",
      data,
    });
    if (response.ok) {
      toast.success("تم تغير الحاله بنحاح ");
      await TakeUserInfo(data.user_id);
      loadingAccountChangeStatus.value = false;
    } else {
       response.json().then((data) => {
      toast.error(data.error);
    });
      loadingAccountChangeStatus.value = false;
      throw response.status;
    }
  }
  async function TakeUserInfo(UserId) {
    const response = await callServer({
      url: `admin/User/show/${UserId}`,
      auth: true,
    });
    if (response.ok) {
      response.json().then((data) => {
        UserInfo.value = data.data;
             });
    } else {
       response.json().then((data) => {
      toast.error(data.error);
    });
      throw response.status;
    }  }
  //Status_Appoint
  async function GetStatus_Appoint(data) {
    console.log("kk");
    const response = await callServer({
      url: `admin/User/Change-Order-Status`,
      auth: true,
      method: "POST",
      data,
    });
    if (response.ok) {
      response.json().then((data) => {
        Status_Appoint.value = data.data;
      });
    } else {
      response.json().then((data) => {
        toast.error(data.error);
      });
      throw response.status;
    }
  }
  //Approve_UnApprove
  async function Approve_UnApprove(data) {
    const response = await callServer({
      url: `admin/User/Approve-Refuse`,
      auth: true,
      method: "POST",
      data,
    });
    if (response.ok) {
      response.json().then((data) => {
        toast.success(" تم بنحاح");
      });
    } else {
       response.json().then((data) => {
      toast.error(data.error);
    });
      throw response.status;
    }
  }
  //Block-UnBlock
  async function UpdateUser(data) {
    LoadingUpdateUser.value = true;
    const response = await callServer({
      url: `admin/User/Update-User`,
      auth: true,
      method: "POST",
      data,
    });
    if (response.ok) {
      toast.success("تم التعديل بنجاح");
      LoadingUpdateUser.value = false;
      TakeUserInfo(data.user_id);
    } else {
      LoadingUpdateUser.value = false;
       response.json().then((data) => {
      toast.error(data.error);
    });
      throw response.status;
    }
  } //Block-UnBlock
  return {
    // properites

    // auth functions
    getUsers,
    Users,
    loadingUsers,
    UserInfo,
    getTrips,
    Trips,
    MakeBlockUnBlock,
    Approve_UnApprove,
    TakeUserInfo,
    Status_Appoint,
    GetStatus_Appoint,
    UpdateUser,
    LoadingUpdateUser,
    WalletTransaction,
    getWalletTransaction,
    DeleteUser,
    OrderList,
    loadingAccountChangeStatus,
    UserOrders,
    getUsersSearch,
    getUserOrders,
    ListSearchUsers,
    getUsersend
  };
});
