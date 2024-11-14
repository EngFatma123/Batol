
<template>
  <DataTable :value="data" :loading="props.loading" class="table-style" :paginator="pagination" :rows="10">
    <template #empty>
      <div class="text-center" v-if="!props.loading">لايوجد بيانات...</div>
      <div class="text-center" v-else>تحميل ...</div>
    </template>
    <Column v-for="column in headers" :key="column.key" :field="column.key" v-click-outside="closeDropdown">
      <template #header> {{ column.name }} </template>

      <template #body="{ data }">
        <div v-if="column.key == 'is_active'">
          <label class="btnactive" v-if="data.is_active"><img src="@/assets/images/circle3.svg" /> مفعل</label><label
            class="btnnotactive" v-else><img src="@/assets/images/circel4.svg" /> غير مفعل</label>
        </div>
        <div v-else-if="column.key == 'counter'">
          {{ counter ++ }}
        </div>
        <div v-else-if="column.key == 'Dailymonthlypackagesststuts'">
          <label class="btnactive" v-if="data.is_active == 'مستمرة'"><img src="@/assets/images/circle3.svg" />
            نشط</label><label class="btnnotactive" v-else><img src="@/assets/images/circel4.svg" /> غير نشط </label>
        </div>
        <div v-else-if="column.key == 'trip_time_return'">
          <img src="@/assets/images/users/clock.svg" class="icon" />
          {{ data.trip_time_return }}
        </div>
        <div v-else-if="column.key == 'from_to'">
          {{ data.trip_from }} - {{ data.trip_to }}
        </div>
        <div v-else-if="column.dropdownEdit == 'status'" class="d-flex">
          <span v-if="data.status == 'not subscribed yet'" class="notSubSpan">
            <span class="dots notSub"></span> لم تبدأ بعد</span>
            <span v-else-if="data.status == 'completed'"
            class="activeSpan">
            <span class="dots active"></span> الرحله انتهت </span><span v-else="data.status == 'arrived'"
            class="notActiveSpan">
            <span class="dots notActive"></span> وصل
          </span>
          <span v-else="data.status == 'coming'" class="notActiveSpan">
            <span class="dots notActive"></span> قيد الوصول
          </span>
          <div class="Dropdown" v-if="data.status != 'completed' && data.count_users > 0">
            <button class="button">
              <img src="@/assets/images/edit-button-svgrepo-com.svg" />
            </button>
            <ul>
              <li v-for="list in optionsstatus" :key="list" @click="$emit('changeStatus', data.id, list.value)">
                {{ list.name }}
              </li>
            </ul>
          </div>
        </div>
        <div v-else-if="column.key == 'action'">
          <button class="button-table" @click="
            $router.push({ name: column.link, params: { id: data.id } })
            ">
            الصفحه الشخصيه
          </button>
        </div>
        <div v-else-if="column.key == 'popupAction'">
          <button class="button-table" @click="$emit('actionShow', data.id)" v-if="data.count_users > 0">
            المزيد
          </button>
        </div>


        <div v-else-if="column.key == 'popupprofitExpense'">
          <div class="Dropdown Dropdown-action">
            <button >تحكم  <img src="@/assets/images/down-arrow.svg" class="icon-dropdown"/>
            </button>
            <ul>
              <li  @click="$emit('actionShow', data.id)">
                تعديل
              </li>
              <li  @click="$emit('DeleteprofitExpense', data.id)">
                حذف 
              </li>
            </ul>
          </div>
        </div>
        <div v-else-if="column.key == 'popupActionEdit'">
          <div class="Dropdown Dropdown-action">
            <button >تحكم  <img src="@/assets/images/down-arrow.svg" class="icon-dropdown"/>
            </button>
            <ul>
              <li  @click="$emit('actionShow', data.id)">
                تعديل
              </li>
              <li  @click="$emit('DeletePackage', data.id)">
                حذف 
              </li>
              <li class="activeword" @click="$emit('ChaneStatusPackageFun', data.id,true)" v-if="!data.is_active">
                تفعيل
              </li>
              <li class="notactiveword" @click="$emit('ChaneStatusPackageFun', data.id,false)"  v-if="data.is_active">
               تعطيل
              </li>
            </ul>
          </div>
        </div>
        <div v-else-if="column.key == 'DeleteIcon'">
          <img src="@/assets/images/icons-delete.svg" class="delete-icon" @click="$emit('Delete', data.id)">
        </div>
        <div v-else>
          {{ getNestedValue(data, column.key) }}
          {{ column.sub ? column.sub : "" }}
        </div>
      </template>
    </Column>
  </DataTable>
</template>
<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { ref } from "vue";
const props = defineProps({
  headers: {
    type: Array,
    default: () => [],
  },
  data: {
    type: Array,
    default: () => [],
  },
  actions: {
    type: Array,
    default: () => [],
  },
  pagination: {
    type: Boolean,
    default: () => true,
  },
  loading: {
    type: Boolean,
    default: () => false,
  },
});
let counter = 1;
const optionsstatus = ref([
  { name: "قيد الوصول", value: "coming" },
  { name: "وصل", value: "arrived" },
  { name: "الرحله انتهت", value: "completed" },
]);
const getNestedValue = (obj, path) => {
  return path.split(".").reduce((o, p) => o && o[p], obj);
};
</script>
<style scoped lang="scss">
.card {
  width: 95%;
  margin: 20px auto;
}

.v-btn.v-btn--density-default {
  box-shadow: none;
}

.imagePro {
  width: 50px;
  height: 50px;
  border-radius: 100%;
}

.v-list-item-title {
  padding: 10px;
  cursor: pointer;
  width: 150px;

  &:hover {
    background: #673ab7;
    color: white;
    border-radius: 4px;
  }
}

.is-ar {
  .v-list-item-title {
    direction: rtl;
  }
}

.Dropdown {
  display: inline-block;
  position: relative;

  button {
    background: transparent;

    img {
      width: 17px;
      height: 17px;
    }
  }

  ul {
    display: none;
    position: absolute;
    background: white;
    padding: 10px 0px;
    
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.356);
    z-index: 98;
    bottom:-20px;

    li {
      padding: 5px 10px;
      width: 150px;
      margin-bottom: 2px;
      cursor: pointer;
      text-align: right;
    }
  }

  &:hover {
    ul {
      display: block;

      li:hover {
        background: #2a82c9;
        color: white;
      }
    }
  }
}

.dots {
  width: 10px;
  height: 10px;
  display: inline-block;
  border-radius: 100%;
  margin: 0px 2px;
}

.activeSpan {
  color: #23a429;
  font-size: 13px;
}

.active {
  background: #23a429;
}

.activeword {
  color: #23a429;
}

.notactiveword {
  color: red;
}
.notSubSpan {
  color: #aaa;
  font-size: 13px;
}

.notSub {
  background: #aaa;
}

.notActiveSpan {
  color: #ff8a00;
  font-size: 13px;
}

.notActive {
  background: #ff8a00;
}

.d-flex {
  align-items: baseline;
  justify-content: center;
}

.btnactive {
  color: #23a429;
}

.delete-icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.Dropdown-action{
  button{
    background: #2473b3
  }
  ul{
    left: 0px;li{
      padding: 0px 10px;
    }
  }
}
.table-style tr:first-child{
  .Dropdown   ul{
    bottom: auto;
    top: 30px;}

}
.table-style tbody{
  overflow-x: hidden;
}
.icon-dropdown{
  width: 12px !important;
    height: 12px !important;
    filter: brightness(0) invert(1);
}
</style>
