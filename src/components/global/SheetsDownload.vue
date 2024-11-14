<template>
  <div class="flex gap-[1rem] icons">
    <!-- <Button @click="printData" severity="reset" :image="PrintIcon" />
    <Button @click="exportCSV" severity="reset" :image="DownloadExecl" /> -->
    <button class="report-make" @click="exportCSV" severity="reset">
      إنشاء تقرير <img src="@/assets/images/icon.svg" />
    </button>
    <!-- <div id="print-section" style="display: none">
      <Table :headers="headers" :data="data" />
    </div> -->
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
const showIframe = ref(false);

// Images
import * as XLSX from "xlsx";

const props = defineProps({
  sheetName: {
    type: String,
  },
  sheets: {
    type: Object,
  },
  data: {
    type: Array,
    default: () => [],
  },
  headers: {
    type: Array,
  },
});

const exportCSV = () => {
  const workbook = XLSX.utils.book_new();
  const headerNames = props.headers.map((header) => header.name);
  const keys = props.headers.map((header) => header.key);
  const transformedData = props.data.map((item) =>
    keys.reduce((acc, key, index) => {
      acc[headerNames[index]] = item[key];
      return acc;
    }, {})
  );
  const worksheet = XLSX.utils.json_to_sheet(transformedData, {
    header: headerNames,
  });
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, `${props.sheetName}.xlsx`);
};
</script>
<style>
.icons img {
  max-width: 90% !important;
}
.report-make,
.miza {
  background: #23a429;
  color: white;
  padding: 10px 20px;
  width: 170px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
