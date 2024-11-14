<template>
  <div class="card card-body profitExpense">
    <ul class="tab mt-3">
      <li
        :class="TabExpense == 'profit' ? 'active' : ''"
        @click="changeTabExpense('profit')"
      >
        <img src="@/assets/images/monyicon-3.svg" />الارباح
      </li>
      <li
        :class="TabExpense == 'Revenue' ? 'active' : ''"
        @click="changeTabExpense('Revenue')"
      >
        <img src="@/assets/images/monyicon-2.svg" />الإيرادات
      </li>
      <li
        :class="TabExpense == 'expense' ? 'active' : ''"
        @click="changeTabExpense('expense')"
      >
        <img src="@/assets/images/monyicon-1.svg" />النفقات
      </li>
    </ul>
    <div class="content p-3 py-5">
      <div v-if="TabExpense == 'profit'">
        <TabContent typeTab="profit" nameTab="profit" />
      </div>
      <div v-if="TabExpense == 'Revenue'">
        <TabContent :showAddData="true" typeTab="profit" nameTab="revenue" />
      </div>
      <div v-if="TabExpense == 'expense'">
        <TabContent :showAddData="true" typeTab="expense" nameTab="expense" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import TabContent from "@/components/pages/profitExpense/TabContent.vue";
let TabExpense = ref("profit");
const changeTabExpense = async (namevalue) => {
  TabExpense.value = namevalue;
};
onMounted(()=>{
  console.log("ss");
    changeTabExpense('profit');
})
</script>
<style scoped lang="scss">
.tab {
  display: flex;
  width: 100%;
  margin: 0px auto;
  justify-content: center;
  gap: 20px;
  list-style-type: none;
  li {
    background: #2574B2;
    color: white;
    width: 120px;
    padding: 10px 2px;
    border-radius: 4px;
    padding: 10px 2px;
    cursor: pointer;
    width: calc(100% / 5);
    text-align: center;
    img {
      width: 20px;
      height: 20px;
      margin: auto 5px;
      vertical-align: sub;    filter: brightness(0) invert(1);
    }
  }
  .active {
    background: #a8a8a8;
    color: black;
    img {
      filter: brightness(0);
    }
  }
}
@media (max-width: 900px) {
  .tab {
    margin-top: 20px;
    align-items: center;
    padding: 0px;

    li {
      width: 33%;
      font-size: 13px;
    }
  }
}
</style>
<style>
.profitExpense .table-style thead tr th{
  background: #2574B2 !important;
  color: white;
}</style>