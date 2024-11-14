<template>
  <div class="slidbar" :class="props.showMobile ? 'slidbardisplay' : ''">
    <span class="close" @click="$emit('showingslider')"><img src="@/assets/images/close-svgrepo-com.svg" /></span>
    <div class="logo"><img src="@/assets/images/logo_uni.svg" /></div>
    <nav class="navbar">
      <div class="" id="navbarNav">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item" @click="showListGrouptrips = false">
            <router-link to="/" class="nav-link active"><img src="@/assets/images/dashboard-svgrepo-com.svg" />لوحه
              التحكم</router-link>
          </li>
          <li class="nav-item" @click="showListGrouptrips = false">
            <router-link to="/Users" class="nav-link"><img src="@/assets/images/icon-users.svg" />المستخدمين
            </router-link>
          </li>
          <li class="nav-item" @click="showListGrouptrips = false">
            <router-link to="/Orders" class="nav-link"><img src="@/assets/images/icon-users.svg" />طلبات التسجيل
            </router-link>
          </li>
          <li class="nav-item">
            <span class="nav-link travels">
              <router-link to="/trips" class="nav-link travels" @click="showListGrouptrips = !showListGrouptrips"><img
                  src="@/assets/images/travel-icon.svg" />الرحالات
              </router-link></span>
            <ul class="list-group" v-if="showListGrouptrips">
              <li class="nav-item">
                <router-link :to="{ name: 'trips' }" class="nav-link travels">الرحالات
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'DestinationPoint' }" class="nav-link travels">
                  عنوانين الالتقاط
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'universityaddresses' }" class="nav-link travels">
                  عنوانين الجامعة
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'Dailymonthlypackages' }" class="nav-link travels">
                  الحزم اليومية و الشهرية
                </router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item" @click="showListGrouptrips = false">
            <router-link to="/profitExpense" class="nav-link"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.99219 7.25593C7.99219 7.54908 8.07869 7.79417 8.25169 7.96237C8.43431 8.13537 8.77551 8.30357 9.2705 8.46216V6.16504C8.87163 6.19387 8.55926 6.31882 8.32859 6.52066C8.10752 6.71289 7.99219 6.95798 7.99219 7.25593ZM10.1115 10.322V12.7104C10.544 12.6623 10.8756 12.5422 11.1255 12.3307C11.3658 12.1385 11.4907 11.8742 11.4907 11.5618C11.4907 11.2591 11.3994 11.0092 11.1976 10.8314C11.0102 10.6391 10.6449 10.4757 10.1115 10.322Z" fill="black"/>
<path d="M18.2284 12.3404C18.5071 11.4706 18.6561 10.5431 18.6561 9.58195C18.6561 4.5552 14.5809 0.47998 9.55412 0.47998C4.52257 0.47998 0.452148 4.5552 0.452148 9.58195C0.452148 14.6087 4.52257 18.6839 9.55412 18.6839C10.5153 18.6839 11.4428 18.5349 12.3126 18.2562C12.3943 15.0316 15.0038 12.4221 18.2284 12.3404ZM12.2982 13.3304C11.7407 13.8158 11.0247 14.0801 10.1116 14.1281V15.0845H9.27058V14.1089C8.05475 13.9984 6.95424 13.5034 5.99791 12.6672L6.96866 11.5138C7.70874 12.1578 8.47284 12.5423 9.27058 12.6672V10.0914C8.2662 9.84626 7.53573 9.53389 7.05997 9.14944C6.60343 8.76018 6.37756 8.17389 6.37756 7.41939C6.37756 6.65048 6.63707 6.02574 7.16569 5.53556C7.70874 5.05499 8.41037 4.78588 9.27058 4.74263V4.07463H10.1116V4.75224C11.0871 4.82913 12.005 5.16072 12.87 5.75182L12.0098 6.97727C11.4283 6.55918 10.794 6.29486 10.1116 6.20355V8.69771H10.1548C11.1688 8.9428 11.9233 9.26478 12.4039 9.67326C12.87 10.0769 13.1103 10.6632 13.1103 11.4369C13.1103 12.2059 12.8412 12.8498 12.2982 13.3304Z" fill="black"/>
<path d="M18.3943 13.2974C15.5638 13.2974 13.269 15.5921 13.269 18.4226C13.269 21.2532 15.5638 23.5479 18.3943 23.5479C21.2249 23.5479 23.5196 21.2537 23.5196 18.4231C23.5196 15.5926 21.2249 13.2974 18.3943 13.2974ZM19.663 18.2304V21.9029H17.1251V18.2304H15.7247L18.3938 14.9428L21.0629 18.2304H19.663Z" fill="black"/>
</svg>
الارباح و
              المصروفات
            </router-link>
          </li>
          <li class="nav-item" @click="showListGrouptrips = false">
            <router-link to="/Setting" class="nav-link"><svg width="25" height="25" viewBox="0 0 25 25" fill="white"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M22.7114 9.40574L20.829 9.16644C20.6755 8.69362 20.485 8.23362 20.2593 7.79073L21.4217 6.29386C21.6489 6.00646 21.762 5.64538 21.7395 5.27977C21.7169 4.91415 21.5603 4.5697 21.2996 4.31238L19.7226 2.73542C19.4652 2.47313 19.12 2.31511 18.7532 2.29165C18.3864 2.26818 18.0239 2.38092 17.7351 2.60826L16.2403 3.77071C15.7971 3.54478 15.3368 3.35428 14.8636 3.201L14.6243 1.32165C14.5807 0.957559 14.4052 0.622043 14.1311 0.37852C13.8569 0.134997 13.5031 0.000339529 13.1364 0L10.8936 0C10.1357 0 9.49586 0.567709 9.40574 1.31865L9.16644 3.201C8.69307 3.35385 8.23269 3.54436 7.78973 3.77071L6.29386 2.60826C6.00629 2.38155 5.6453 2.26869 5.27981 2.29122C4.91432 2.31375 4.56993 2.4701 4.31238 2.73041L2.73542 4.30638C2.47286 4.56388 2.31467 4.90928 2.2912 5.27628C2.26773 5.64328 2.38064 6.00601 2.60826 6.29486L3.77071 7.79073C3.54454 8.23343 3.35403 8.69346 3.201 9.16644L1.32165 9.40574C0.567709 9.49586 0 10.1357 0 10.8936V13.1364C0 13.8943 0.567709 14.5341 1.31865 14.6243L3.201 14.8636C3.35619 15.3412 3.54743 15.8017 3.77071 16.2393L2.60826 17.7361C2.38113 18.0235 2.268 18.3846 2.29054 18.7502C2.31308 19.1158 2.4697 19.4603 2.73041 19.7176L4.30738 21.2946C4.56518 21.5563 4.91039 21.7139 5.27703 21.7372C5.64367 21.7604 6.00603 21.6478 6.29486 21.4207L7.79073 20.2583C8.22827 20.4826 8.68885 20.6738 9.16644 20.828L9.40574 22.7063C9.49586 23.4623 10.1357 24.03 10.8936 24.03H13.1364C13.8943 24.03 14.5341 23.4623 14.6243 22.7114L14.8636 20.829C15.3364 20.6755 15.7964 20.485 16.2393 20.2593L17.7361 21.4217C18.3419 21.8923 19.197 21.8373 19.7176 21.2996L21.2946 19.7226C21.5569 19.4652 21.7149 19.12 21.7384 18.7532C21.7618 18.3864 21.6491 18.0239 21.4217 17.7351L20.2593 16.2393C20.4836 15.8017 20.6748 15.3412 20.829 14.8636L22.7073 14.6243C23.0714 14.5807 23.407 14.4052 23.6505 14.1311C23.894 13.8569 24.0287 13.5031 24.029 13.1364V10.8936C24.0292 10.5274 23.8953 10.1738 23.6525 9.89966C23.4097 9.62551 23.0749 9.4498 22.7114 9.40574ZM12.015 17.0212C9.25455 17.0212 7.00875 14.7754 7.00875 12.015C7.00875 9.25455 9.25455 7.00875 12.015 7.00875C14.7754 7.00875 17.0212 9.25455 17.0212 12.015C17.0212 14.7754 14.7754 17.0212 12.015 17.0212Z"
                  fill="black" />
              </svg>
              الإعدادات
            </router-link>
          </li>
        </ul>
        <div class="logout-icon" @click="LogoutFun">
          <img src="@/assets/images/logout-icon.svg" /> تسجيل الخروج
        </div>
      </div>
    </nav>
  </div>
</template>
<script setup>
import { useAuthStore } from "@/stores/auth/index";
import { ref } from "vue";
import { useRouter } from "vue-router";
// auth store
const router = useRouter();
// auth store
const authStore = useAuthStore();
let props = defineProps(["showMobile"]);
let showListGrouptrips = ref(false);
let LogoutFun = async () => {
  try {
    await authStore.logOut();
    router.push("/signin");
  } catch (err) {
    console.log(err);
  }
};
</script>
<style scoped lang="scss">
.slidbar {
  position: fixed;
  background: white;
  height: 100vh;
  transition: width 1s;
  width: 300px;

  .close {
    display: none;
  }

  .logo {
    margin: auto;
    padding: 20px;
    width: 90%;
    text-align: center;

    img {
      width: 100%;
    }
  }

  nav {
    height: 86%;
    display: block;
    width: 100%;

    ul {
      padding: 0px;

      li {
        display: block !important;
        width: 100%;
        height: auto;
        margin-bottom: 3px;

        a {
          padding: 10px;
          padding: 15px;
          padding-right: 50px;
          height: 100%;
          font-size: 20px;

          img {
            width: 25px;
            height: 25px;
            margin-left: 10px;
            filter: brightness(0);
          }
        }

        .list-group li .travels {
          background: transparent;
          color: black;
          font-size: 16px;
          padding: 0px 60px;
          height: auto;
          margin: 0px;

          img {
            filter: brightness(1);
            width: 15px;
            height: 15px;
          }
        }

        .list-group li .router-link-exact-active {
          color: #2c85ce !important;
        }

        .router-link-active {
          background: #2c85ce;
          color: white;

          img {
            filter: brightness(1);
          }

          svg {
            path {
              fill: white
            }
          }
        }

        .travels.router-link-active {
          background: #2c85ce;
          color: white;

          img {
            filter: brightness(1) invert(1);
          }
        }

        img {
          width: 30px;
          height: 30px;
        }
      }
    }
  }
}

#navbarNav {
  position: relative;
  height: 100%;
}

.logout-icon {
  position: absolute;
  bottom: 5px;
  width: 100%;
  text-align: center;
  cursor: pointer;
}

.slidbardisplay {
  display: block !important;
}

@media screen and (max-width: 993px) {
  .slidbar {
    box-shadow: 1px 7px 9px 2px #a5a5a5;
    position: absolute;
    width: 65%;
    display: none;
    right: 0px;
    z-index: 99;

    .close {
      width: 90%;
      margin: auto;
      top: 5px;
      left: 15px;
      text-align: left;
      cursor: pointer;
      position: absolute;
      display: block;

      img {
        width: 15px;
        height: 15px;
      }
    }

    nav ul li a {
      font-size: 15px;
    }
  }
}
</style>
