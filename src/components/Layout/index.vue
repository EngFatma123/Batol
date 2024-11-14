<template>
  <div class="row">
    <div class="px-0" v-if="showLayout">
      <slidebar :showMobile="showMobile" @showingslider="showingslider" />
    </div>
    <div class="px-0 col-lg-12" :class="showLayout ? 'content' : ''">
      <navbar
        v-if="showLayout"
        @showingslider="showingslider"
        :showMobile="showMobile"
      />
      <div :class="showLayout ? 'pages' :''">
      <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script setup>
import slidebar from "./slidebar.vue";
import navbar from "./navbar.vue";
import { useRoute } from "vue-router";
import { onMounted, ref, watch } from "vue";
let showMobile = ref(false);
const route = useRoute();
let showLayout = ref(true);
const showingslider = () => {
  showMobile.value = !showMobile.value;
};
onMounted(() => {
  if (route.meta.parent == "Login") {
    showLayout.value = false;
  } else {
    showLayout.value = true;
  }
});
watch(route, (newQuery) => {
  if (route.meta.parent == "Login") {
    showLayout.value = false;
  } else {
    showLayout.value = true;
  }
});
</script>
<style scoped lang="scss">
.content {
  padding-right: 300px !important;
}
.pages{
  margin: 40px 30px 0px;
}
@media screen and (max-width: 993px) {
  .content {
    padding-right: 0px !important;
  }
.pages{
  margin: 40px 8px 0px;
} 
}
</style>
