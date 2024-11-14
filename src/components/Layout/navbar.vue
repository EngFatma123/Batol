<template>
  <div class="navbar-list">
    <div class="left_nav">
      <div class="top_mobile">
        <h2>{{ route.meta.title }}</h2>
        <span class="menu" @click="$emit('showingslider')"><img src="@/assets/images/menu-svgrepo-com.svg"
            v-if="!props.showMobile" /><img src="@/assets/images/close-svgrepo-com.svg" v-else /></span>
      </div>
      <span class="fieldIcon"><img src="@/assets/images/search-alt-svgrepo-com.svg" /><input v-model="inputSerach"
          type="text" placeholder="بحث ....." @keyup="changeSelect" />
        <ul v-if="showSearchMenu" class="listofUsers">
          <li v-for="user in Users.ListSearchUsers" :key="user" @click="makechange(user.id)" v-if="Users.ListSearchUsers.length > 0">
            {{ user.first_name }} {{ user.second_name }} {{ user.third_name }}
            {{ user.fourth_name }}
          </li>
          <li v-else class="notfound">لا يوجد مستخدمين لهذا البحث......</li>
        </ul>
      </span>
    </div>
    <div class="right_nav">
      <div class="DrpdownInformation">
        <span @click="DrpdownInformation = !DrpdownInformation" v-if="authStore.user">
          <img src="@/assets/images/man.svg" v-if="!authStore.user.image" />
          <img  :src="authStore.user.image" v-else class="image_profile">
          {{ authStore.user.name }}
          <img src="@/assets/images/arrow-down.svg" /></span>
        <ul class="dropdown" v-if="DrpdownInformation">
          <li @click="DetailesEdit = true">تعديل بيانات المسؤول</li>
          <li @click="Detailespass = true">تغير كلمه السر</li>
        </ul>
      </div>
      <div class="DrpdownInformation"><span @click="openNotification = !openNotification">
          <img src="@/assets/images/notification.svg" v-if="haveMessageNotReady" />
          <img src="@/assets/images/notification-ready-all.svg" v-else /></span>
        <div class="dropdown openNotification" v-if="openNotification">
          <h4>الاشعارات</h4>
          <div class="cheackes">
            <p @click="changeShow('all')">
              <img src="@/assets/images/accept.svg" v-if="changeShpeval == 'all'">
              <img src="@/assets/images/notread.svg" v-else>
              الكل
            </p>
            <p @click="changeShow('un_read')">
              <img src="@/assets/images/accept.svg" v-if="changeShpeval == 'un_read'">
              <img src="@/assets/images/notread.svg" v-else> الغير مقروء
            </p>
          </div>
          <ul class="list_notific" v-if="!loading_wait">
            <li v-for="notifi in Notifactions.notification" :key="notifi" v-if="Notifactions.notification.length > 0">
              <span class="notific_img">
                <img :src="notifi.image" v-if="notifi.image" />
                <img src="@/assets/images/notification/man.svg" v-else />
                <img src="@/assets/images/notification/shara.svg" class="shara" />
              </span>
              <div class="content">
                <span class="date">{{ notifi.created_at }}</span>
                <p class="m-0">{{ notifi.message }}</p>
              </div>
              <div class="mt-3"><img src="@/assets/images/notification/notreadcircle.svg" v-if="!notifi.is_read"></div>
            </li>
            <li class="notfound" v-else>لا يوجد إشعارات</li>
          </ul>
          <div v-else style="text-align: center;margin: auto; padding: 30px 0px;">
            <ProgressSpinner style="stroke: #42a5f5 !important; width: 30px; height: auto" strokeWidth="2"
              fill="transparent" animationDuration=".5s" aria-label="Custom ProgressSpinner" class="spinner" />
          </div>

          <div class="text-center"><button @click="openSendForm = true">إرسال اشعار</button></div>
        </div>
      </div>
    </div>
    <popupEdit v-if="DetailesEdit" @closepopup="DetailesEdit = false" />
    <poupChangePassword v-if="Detailespass" @closepopup="Detailespass = false" />
    <popupSend v-if="openSendForm" @closepopup="openSendForm = false" />
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import ProgressSpinner from "primevue/progressspinner";
import { useRoute } from "vue-router";
import { useUsers } from "@/stores/Users/index";
import popupEdit from "./Edites/popupEdit.vue"
import poupChangePassword from "./Edites/poupChangePassword.vue"
import popupSend from "./Notification/popupSend.vue"
import { useAuthStore } from "@/stores/auth/index";
import { useNotification } from "@/stores/Notification/index";
const Notifactions = useNotification();
// auth store
const authStore = useAuthStore();
let Users = useUsers();
let route = useRoute();
let props = defineProps(["showMobile"]);
let inputSerach = ref("");
let showSearchMenu = ref(false);
let DetailesEdit = ref(false);
let openNotification = ref(false);
let Detailespass = ref(false);
let listofUsers = ref([]);
const router = useRouter();
const DrpdownInformation = ref(false);
const openSendForm = ref(false);
const changeSelect = async () => {
  listofUsers.value = [];
  showSearchMenu.value = true;
  if(inputSerach.value == ''){
    Users.ListSearchUsers=[];
  }else{
  await Users.getUsersSearch(inputSerach.value);}

};
const makechange = (id) =>{
  showSearchMenu.value = false;
  router.push({ name: 'UserPorfile', params: { id: id } }) 
}
//changeShow
const changeShpeval = ref('all');
const loading_wait = ref(false);
const haveMessageNotReady = ref(false)
const changeShow = async(val) => {
  changeShpeval.value = val;
  loading_wait.value = true;
  await Notifactions.getNotification(val);
  loading_wait.value = false;
  
}
const clickOutsideDate = (event) => {
  const dropdownContainer = document.querySelector(".listofUsers");
  const dropdown = document.querySelector(".dropdown");
  if (dropdownContainer && !dropdownContainer.contains(event.target)) {
    showSearchMenu.value = false;
  }
  if (dropdown && !dropdown.contains(event.target)) {
    openNotification.value = false;
    DrpdownInformation.value = false;
  }
};
onMounted(async () => {
  document.addEventListener("mousedown", clickOutsideDate);
  if (Users.Users.length > 0) {
    await Users.getUsers();
  }
  if (!localStorage.getItem("access_token") && !sessionStorage.getItem('access_token') ) {
    router.push("/signin");
  } else {

    Notifactions.getNotification('all');
  }
  if (!authStore.user) {
    
    authStore.user = JSON.parse(localStorage.getItem("user") ? localStorage.getItem("user")  : sessionStorage.getItem("user") );
  }

});

watch(Notifactions, (newQuery) => {
  Notifactions.notification.find((e) => {
    if (!e.is_read) {
      console.log(e.is_read);
      haveMessageNotReady.value = true;
      return 0;
    }
  });
});
</script>

<style scoped lang="scss">
.navbar-list {
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 97%;
  padding: 0px 20px;
  gap: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left_nav {
    width: 65%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h2 {
      color: #2473b3;
      margin: 0px;
      font-size: 25px;
    }

    .menu {
      display: none;

      img {
        width: 25px;
        height: 25px;
      }
    }

    .fieldIcon {
      position: relative;
      width: 60%;

      img {
        position: absolute;
        top: 12px;
        right: 8px;
        width: 20px;
        height: 18px;
      }

      input {
        width: 100%;
        border: 0px;
        height: 45px;
        padding: 0px 30px;
        border-radius: 10px;

        &:focus {
          box-shadow: none;
          outline: none;
        }
      }
    }
  }

  .right_nav {
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: end;
    gap:20px;

    .DrpdownInformation {
      position: relative;

      >span {
        cursor: pointer;
      }

      .dropdown {
        position: absolute;
        z-index: 99;
        box-shadow: 4px 1px 10px #00000026;
        background: white;
        padding: 10px;
        width: max-content;
        border-radius: 10px;
        text-align: right;
        left: 0px;

        li {
          padding: 10px;
          font-size: 14px;
          cursor: pointer;

          &:hover {
            color: #2473b3
          }
        }
      }

      .openNotification {
        min-width: 400px;
        padding: 20px 10px;

        h4 {
          text-align: right;
        }

        .cheackes {
          display: flex;
          padding: 10px;
          justify-content: start;
          align-items: center;
          gap: 20px;

          p {
            cursor: pointer;
            text-align: right;
            width: 30%;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 993px) {
  .navbar-list .left_nav h1 {
    font-size: 20px;
  }

  .navbar-list {
    padding: 0px;
  }

  .navbar-list .left_nav,
  .navbar-list {
    flex-direction: column;
  }

  .navbar-list .right_nav {
    width: 90%;
  }

  .navbar-list .left_nav,
  .navbar-list .left_nav .fieldIcon {
    width: 95%;
  }

  .navbar-list .right_nav .DrpdownInformation span {}

  .navbar-list .left_nav .top_mobile {
    justify-content: space-between;
    width: 95%;
    display: flex;

    .menu {
      display: block !important;
      cursor: pointer;
    }
  }
  .navbar-list .right_nav .DrpdownInformation .openNotification{
    min-width: 95%;
}
}

.list_notific {
  overflow-y: auto;
  padding: 0px;
  max-height: 280px;

  li {
    justify-content: space-between;
    align-items: self-start;
    display: flex;

    .notific_img {
      position: relative;

      img {
        width: 40px;
        height: 40px;
      }

      .shara {
        position: absolute;
        width: 20px;
        height: 20px;
        bottom: -5px;
        left: 0px;
      }
    }

    .content {
      width: 78%;
      text-align: right;
    }

    .date {
      color: #ddd
    }
  }
  
.notfound{
  color: darkgray;
    text-align: center;
    margin: auto;
    width: 100%;
    justify-content: center;
}
}

.listofUsers {
  position: absolute;
  z-index: 9999;
  width: 100%;
  box-shadow: 0px 0px 4px #00000087;
  border-radius: 3px;
  padding: 10px;
  background: white;

  li {
    cursor: pointer;
  }
  .notfound{
     text-align: center;
     font-size: 13px;
     color: #aaa;
  }
}
.image_profile{
  width:50px;
  height: 50px;
  border-radius: 100%;
}
@media screen and (max-width: 993px) {

.navbar-list .right_nav .DrpdownInformation{
  position: static;
}
}
</style>
