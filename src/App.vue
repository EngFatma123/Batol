<template>
  <Layout />
</template> 
<script>
import { initializeApp } from "firebase/app";
import { getMessaging, getToken,onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAHv-dji2G4lZZmDJT1RLk7St3ca-YMbrs",
  authDomain: "uni-bus-fd782.firebaseapp.com",
  projectId: "uni-bus-fd782",
  storageBucket: "uni-bus-fd782.appspot.com",
  messagingSenderId: "537386231648",
  appId: "1:537386231648:web:40ef1c7d889b4d2ca42005",
  measurementId: "G-GZL92T8Z45"
};
const app = initializeApp(firebaseConfig);
const messaging = getMessaging();
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
});
getToken(messaging, { vapidKey: 'BFizV_aIpebZ3AKlCiP2m6EKhPqDGny_rRj7Q7l9wpY4HysGKq5ht_JqKrXPyUKATWfERxmaZmg85Isi_GbLay0' }).then((currentToken) => {
  if (currentToken) {
    if(localStorage.getItem('rememberme')){
        localStorage.setItem('fcm_token',currentToken);
    }else{
      sessionStorage.setItem('fcm_token',currentToken);

    }
  } else {
    console.log('No registration token available. Request permission to generate one.');
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
});
</script>
<script setup>
import { onMounted } from "vue";
import Layout from "@/components/Layout/index.vue";
</script>
<style lang="scss">
body {
  background: #d1ebff !important;
}

// html,
// body {
//   touch-action: none;
// }

.row {
  min-width: 100%;
  margin: 0px !important;
  width: 100%;
}

.dropdown {
  list-style-type: none;
}

.dropdown-toggle {
  background: #2a82c9 !important;
  border: 0px !important;
}

.send {
  background: #2a82c9 !important;
  height: 40px;
  width: 100px !important;
}

.cancel {
  background: #ddd !important;
  height: 40px;
  color: black;
  width: 100px !important;
}

ul {
  list-style-type: none;
}

.vue3-easy-data-table__main {
  padding: 10px;
}

.table-style {
  border-collapse: collapse !important;

  tr {
    border-radius: 10px;
    display: table;
    height: 64px !important;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    padding: 0px !important;
    box-shadow: 1px 1px 6px #00000054;
    width: 100%;

    td {
      background: transparent !important;
    }
  }

  thead tr {
    box-shadow: none;
    height: auto !important;
    margin-bottom: 10px;
    // th:last-child {
    //   width: 15%;
    // }
  }
}

.vue3-easy-data-table__footer {
  direction: rtl !important;
  justify-content: flex-start !important;
}

.vue3-easy-data-table__header th.sortable,
.vue3-easy-data-table__main.fixed-header th {
  background: #d1ebff !important;
  // padding: 20px 0px !important;
  // text-align: center;
  width: 100px !important;
  font-size: 15px !important;
  direction: inherit !important;
}

// .vue3-easy-data-table__main.fixed-header th:last-child {
//   border-top-left-radius: 10px;
//   border-bottom-left-radius: 10px;
// }
// .vue3-easy-data-table__main.fixed-header th:first-child {
//   border-top-right-radius: 10px;
//   border-bottom-right-radius: 10px;
// }
.popup {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-items: center;
    height: auto;
    margin: 0px;
    max-width: 100%;

    h5 {
      width: 95%;
    }

    img {
      width: 20px;
      cursor: pointer;
    }
  }

  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
}
</style>
