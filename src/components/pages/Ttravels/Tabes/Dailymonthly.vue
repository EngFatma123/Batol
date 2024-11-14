<template>
  <div class="content"><img src="@/assets/images/bg-bus.svg" /></div>
  <popup class="popupEdit"
    ><template #header>الحزم اليومية و الشهرية </template>
    <template #body
      ><form>
        <div class="row mt-3">
          <div class="col-md-6">
            <h5>الرحلة اليومية</h5>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"
                >سعر الرحلة اليومية
              </label>
              <select class="form-control">
                <option>nothink</option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <h5>الاشتراك الشهري</h5>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"
                >سعر الاشتراك
              </label>
              <select class="form-control">
                <option>nothink</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"
                >سعر الرحلة بعد الاشتراك
              </label>
              <select class="form-control">
                <option>nothink</option>
              </select>
            </div>
          </div>
        </div>
        <div class="text-center gap-2 d-flex buttons">
          <button class="send">حفظ</button><button class="cancel">إلغاء</button>
        </div>
      </form></template
    >
  </popup>
</template>
<script setup>
import popup from "@/components/global/popup.vue";
</script>
<style lang="scss" scoped>
.content {
  width: 100%;
  text-align: center;
  img {
    object-fit: contain;
  }
}
.buttons {
  justify-content: center;
  button {
    width: 40%;
  }
}
</style>
