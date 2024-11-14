<template>
  <div>
    <div class="card-fillter">
      <div class="dropdown">
        <a
          class="btn btn-secondary dropdown-toggle"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          @click="showDropdown = !showDropdown"
        >
          ترتيب حسب
        </a>

        <ul class="dropdown-menu text-end" :class="showDropdown ? 'show' : ''">
          <li><a class="dropdown-item" href="#">الرحلات (تصاعديه)</a></li>
          <li><a class="dropdown-item" href="#">الرحلات (تنازلى)</a></li>
          <li><a class="dropdown-item" href="#">التاريخ (الاقدم)</a></li>
          <li><a class="dropdown-item" href="#">التاريخ (الاحدث)</a></li>
          <li><a class="dropdown-item" href="#">الحضور</a></li>
          <li><a class="dropdown-item" href="#">الغياب</a></li>
        </ul>
      </div>
      <div class="search-svgrepo">
        <img src="@/assets/images/search-svgrepo-com.svg" />
        <input type="text" placeholder="بحث ..." class="form-control" />
      </div>
    </div>
    <travelsTable></travelsTable>
  </div>
</template>
<script setup>
import travelsTable from "./travelsTable.vue";
import { ref } from "vue";
const showDropdown = ref(false);
const showActive = ref("active");
</script>

<style scoped lang="scss">
.card-fillter {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-direction: row;
  margin: 0px;
  padding: 6px;
  width: 35%;
  margin-right: auto;
  margin-left: 2.5%;
  .dropdown {
    width: auto;
    .btn {
      height: 42px;
      padding: 10px;
    }
  }
  .search-svgrepo {
    width: 250px;
    position: relative;
    img {
      position: absolute;
      top: 10px;
      right: 5px;
      width: 15px;
    }
    input {
      width: 100%;
      height: 40px;
      padding-right: 25px;
      padding-top: 0px;
      background: #cdcdcd54;
      border: 0px;
    }
  }
}
.buttons-report {
  justify-content: space-between;
  margin: auto;
  align-items: end;
  width: 95%;
  .report-make,
  .miza {
    background: green;
    color: white;
    padding: 10px;
    width: auto;
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .miza {
    background: #263a95;
  }
  .make-active {
    background: #4ce049;
    color: white;
    padding: 2px;
    height: 30px;
  }
  .make-cancel,
  .make-notactive {
    background: #aaa;
    color: black;
    height: 30px;
  }
  .make-notactive {
    background: #f93a3a;
    color: white;
  }
  .actions {
    align-items: end;
  }
}
.buttons {
  justify-content: center;
}
</style>
