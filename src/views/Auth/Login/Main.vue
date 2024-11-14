<template>
  <section>
    <div class="card">
      <!-- <div class="logo">
        <img class="" src="@/assets/images/logo_uni.svg" />
      </div> -->
      <div class="logo-imge">
        <img class="" src="@/assets/images/logo_uni.svg" />
      </div>
      <div class="content mt-4">
        <h1 class="text-center my-3">مرحبا بعودتك</h1>
        <FormLogin />
      </div>
    </div>
  </section>
</template>
<script setup>
import FormLogin from "@/components/pages/auth/login/index.vue";
</script>
<style scoped lang="scss">
section {
  background: #2473b3;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding-top: 10px;
  .card {
    width: 80%;
    padding: 10px 0px;
    border-radius: 20px;
    margin: 10px auto;
    .logo {
      margin: auto;
      text-align: center;
      img {
        width: 350px;
      }
    }
    .logo-imge {
      margin: auto;
      text-align: center;
      img {
        width: 100%;
        object-fit: contain;
      }
    }
  }
}
@media screen and (max-width: 993px) {
  section .card .logo-imge img {
    width: 100%;
  }
  section .card {
    width: 95%;
  }
  section .card .logo img {
    width: 80%;
  }
  button {
    width: 90%;
    margin: 20px auto;
  }
}
</style>
