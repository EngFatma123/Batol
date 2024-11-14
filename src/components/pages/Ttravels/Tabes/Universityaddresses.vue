<template>
  <div class="px-5">
    <form>
      <div class="content-flex">
        <img src="@/assets/images/icon_location.svg" class="mt-3" />
        <div class="input-group">
          <label class="mb-2">عنوان الجامعة</label>
          <input type="text" class="form-control" aria-label="" />
        </div>
        <div class="d-flex gap-3 actions mt-4 pt-2">
          <span
            class="make-active"
            :class="showActive1 == 'active' ? 'make-active' : 'make-cancel'"
            @click="showpopupActive = true"
          >
            تفعيل
          </span>
          <span
            :class="
              showActive1 == 'notActive' ? 'make-notactive' : 'make-cancel'
            "
            @click="showpopupNoActive = true"
          >
            تعطيل
          </span>
          <span class="make-cancel" @click="showpopupEdit = true"> تعديل </span>
        </div>
      </div>
      <div class="content-flex">
        <img src="@/assets/images/icon_location.svg" class="mt-3" />
        <div class="input-group">
          <label class="mb-2">عنوان الجامعة</label>
          <input type="text" class="form-control" aria-label="" />
        </div>
        <div class="d-flex gap-3 actions mt-4 pt-2">
          <span
            class="make-active"
            :class="showActive1 == 'active' ? 'make-active' : 'make-cancel'"
            @click="showpopupActive = true"
          >
            تفعيل
          </span>
          <span
            :class="
              showActive1 == 'notActive' ? 'make-notactive' : 'make-cancel'
            "
            @click="showpopupNoActive = true"
          >
            تعطيل
          </span>
          <span class="make-cancel" @click="showpopupEdit = true"> تعديل </span>
        </div>
      </div>
      <div class="content-flex">
        <img src="@/assets/images/icon_location.svg" class="mt-3" />
        <div class="input-group">
          <label class="mb-2">عنوان الجامعة</label>
          <input type="text" class="form-control" aria-label="" />
        </div>
        <div class="d-flex gap-3 actions mt-4 pt-2">
          <span
            class="make-active"
            :class="showActive1 == 'active' ? 'make-active' : 'make-cancel'"
            @click="showpopupActive = true"
          >
            تفعيل
          </span>
          <span
            :class="
              showActive1 == 'notActive' ? 'make-notactive' : 'make-cancel'
            "
            @click="showpopupNoActive = true"
          >
            تعطيل
          </span>
          <span class="make-cancel" @click="showpopupEdit = true"> تعديل </span>
        </div>
      </div>
      <div class="content-flex">
        <img src="@/assets/images/icon_location.svg" class="mt-3" />
        <div class="input-group">
          <label class="mb-2">عنوان الجامعة</label>
          <input type="text" class="form-control" aria-label="" />
        </div>
        <div class="d-flex gap-3 actions mt-4 pt-2">
          <span
            class="make-active"
            :class="showActive1 == 'active' ? 'make-active' : 'make-cancel'"
            @click="showpopupActive = true"
          >
            تفعيل
          </span>
          <span
            :class="
              showActive1 == 'notActive' ? 'make-notactive' : 'make-cancel'
            "
            @click="showpopupNoActive = true"
          >
            تعطيل
          </span>
          <span class="make-cancel" @click="showpopupEdit = true"> تعديل </span>
        </div>
      </div>
      <div class="content-flex">
        <img src="@/assets/images/icon_location.svg" class="mt-3" />
        <div class="input-group">
          <label class="mb-2">عنوان الجامعة</label>
          <input type="text" class="form-control" aria-label="" />
        </div>
        <div class="d-flex gap-3 actions mt-4 pt-2">
          <span
            class="make-active"
            :class="showActive1 == 'active' ? 'make-active' : 'make-cancel'"
            @click="showpopupActive = true"
          >
            تفعيل
          </span>
          <span
            :class="
              showActive1 == 'notActive' ? 'make-notactive' : 'make-cancel'
            "
            @click="showpopupNoActive = true"
          >
            تعطيل
          </span>
          <span class="make-cancel" @click="showpopupEdit = true"> تعديل </span>
        </div>
      </div>
      <div class="m-auto text-center mt-5 mb-3">
        <button
          class="addTitle"
          @click="showpopupAddTitle = true"
          type="button"
        >
          اضافة عنوان
        </button>
      </div>
    </form>
    <popupActive v-if="showpopupActive">
      <template #body
        ><h2 class="text-center py-5">
          هل انت متأكد من إعادة تفعيل عنوان القاهرة؟
        </h2>
        <div class="text-center gap-2 d-flex buttons m-auto">
          <button class="send" @click="FunChage('active')">نعم ،أرغب</button
          ><button class="cancel" @click="showpopupActive = false">
            لا ، ارغب
          </button>
        </div></template
      >
    </popupActive>
    <popupNotActive v-if="showpopupNoActive">
      <template #body
        ><h2 class="text-center py-5">
          هل انت متأكد من تعطيل العنوان القاهرة؟
        </h2>
        <div class="text-center gap-2 d-flex buttons m-auto">
          <button class="send" @click="FunChage('notActive')">نعم ،أرغب</button
          ><button class="cancel" @click="showpopupNoActive = false">
            لا ، ارغب
          </button>
        </div></template
      >
    </popupNotActive>
    <popupEdit v-if="showpopupEdit" class="popupEdit"
      ><template #header>تعديل عنوان الالتقاط </template>
      <template #body
        ><form>
          <div class="mb-3 mt-5 px-3">
            <label for="exampleFormControlInput1" class="form-label"
              >عنوان الرحلة</label
            >
            <input
              type="text"
              class="form-control"
              id="address"
              placeholder=""
            />
          </div>
          <div class="text-center gap-2 d-flex buttons">
            <button class="send">حفظ</button
            ><button class="cancel" @click="showpopupEdit = false">
              إلغاء
            </button>
          </div>
        </form></template
      >
    </popupEdit>
    <popupAddTitle v-if="showpopupAddTitle" class="popupEdit"
      ><template #header>إضافة عنوان الالتقاط </template>
      <template #body
        ><form>
          <div class="mb-3 mt-5 px-3">
            <label for="exampleFormControlInput1" class="form-label"
              >عنوان الرحلة</label
            >
            <input
              type="text"
              class="form-control"
              id="address"
              placeholder=""
            />
          </div>
          <div class="text-center gap-2 d-flex buttons">
            <button class="send">حفظ</button
            ><button class="cancel" @click="showpopupAddTitle = false">
              إلغاء
            </button>
          </div>
        </form></template
      >
    </popupAddTitle>
  </div>
</template>
<script setup>
import { ref } from "vue";
import popupNotActive from "@/components/global/popup.vue";
import popupActive from "@/components/global/popup.vue";
import popupEdit from "@/components/global/popup.vue";
import popupAddTitle from "@/components/global/popup.vue";
const showpopupEdit = ref(false);
const showpopupAddTitle = ref(false);
const showActive1 = ref("active");
const showpopupActive = ref(false);
const showpopupNoActive = ref(false);
const FunChage = (val) => {
  showpopupActive.value = false;
  showpopupNoActive.value = false;
  showActive1.value = val;
};
</script>
<style lang="scss" scoped>
.content-flex {
  display: flex;
  align-items: center;
  gap: 20px;
  .input-group {
    flex-direction: column;
    width: 65%;
    display: flex;
    label {
      color: #2473b3;
    }
    input {
      width: 100%;
      border-radius: 8px !important;
    }
  }
  .make-active,
  .make-cancel,
  .make-notactive {
    background: #23a429;
    color: white;
    padding: 5px;
    height: 36px;
    border-radius: 5px;
    width: 85px;
    text-align: center;
    cursor: pointer;
  }
  .make-cancel,
  .make-notactive {
    background: #aaa;
    color: black;
  }
  .make-notactive {
    background: #f93a3a;
    color: white;
  }
}
.body-popup {
  position: reactive;
  .buttons {
    justify-content: center;
    position: absolute;
    width: 96%;
    bottom: 14px;
  }
}
.popupEdit {
  label {
    display: block;
    width: 100%;
  }
}
.addTitle {
  background: linear-gradient(167deg, #ff8a00 1.71%, #ffc75b 95.32%);
  width: 191px !important;
}
</style>
