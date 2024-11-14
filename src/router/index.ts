import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

//Login
import Login from "@/views/Auth/Login/Main.vue";
//Hompage
import Home from "@/views/Home/Main.vue";
//Orders
import Orders from "@/views/Orders/Main.vue";
//Uses
import Users from "@/views/Users/Main.vue";
//ProfileUser
import ProfileUser from "@/views/ProfileUser/Main.vue";
//UserPorfile
import UserPorfile from "@/views/UserPorfile/Main.vue";
//trips
import trips from "@/views/Trips/Main.vue";
//trips
import Dailymonthlypackages from "@/views/Dailymonthlypackages/Main.vue";
//trips
import DestinationPoint from "@/views/DestinationPoint/Main.vue";
//trips
import universityaddresses from "@/views/universityaddresses/Main.vue";
//trips
import profitExpense from "@/views/profitExpense/Main.vue";
//Setting
import Setting from "@/views/Setting/Main.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/signin",
    name: "Login",
    component: Login,
    meta: { title: "Sign In", parent: "Login" },
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { title: "لوحه التحكم", parent: "Home" },
  },
  {
    path: "/Users",
    children: [
      {
        path: "",
        name: "Users",
        component: Users,
        meta: { title: "المستخدمين", parent: "Users" },
      },
      {
        path: "user-porfile/:id",
        name: "UserPorfile",
        component: UserPorfile,
        meta: { title: "الصفحه الشخصيه ", parent: "UserPorfile" },
      },
    ],
  },
  {
    path: "/Orders",
    children: [
      {
        path: "",
        name: "Orders",
        component: Orders,
        meta: { title: "الطلبات", parent: "Orders" },
      },
      {
        path: "profile-user/:id",
        name: "ProfileUser",
        component: ProfileUser,
        meta: { title: "الصفحه الشخصيه", parent: "ProfileUser" },
      },
    ],
  },
  {
    path: "/trips",
    children: [
      {
        path: "",
        name: "trips",
        component: trips,
        meta: { title: "الرحلات", parent: "trips" },
      },
      {
        path: "/DestinationPoint",
        name: "DestinationPoint",
        component: DestinationPoint,
        meta: { title: "عنوانين الالتقاط", parent: "DestinationPoint" },
      },
      {
        path: "/universityaddresses",
        name: "universityaddresses",
        component: universityaddresses,
        meta: { title: "عنوانين الجامعة", parent: "universityaddresses" },
      },
      {
        path: "/Dailymonthlypackages",
        name: "Dailymonthlypackages",
        component: Dailymonthlypackages,
        meta: {
          title: "الحزم اليومية و الشهرية",
          parent: "Dailymonthlypackages",
        },
      },
    ],
  },
  {
    path: "/profitExpense",
    name: "profitExpense",
    component: profitExpense,
    meta: {
      title: "الأرباح والمصروفات",
      parent: "profitExpense",
    },
  },
  {
    path: "/Setting",
    name: "Setting",
    component: Setting,
    meta: { title: "الإعدادات", parent: "Setting" },
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    } else {
      return { left: 0, top: 0 };
    }
  },
});

export default router;
