<template>
  <div>
    <div class="constent-flex">
      <div class="constent">
        <img :src="UserInfo.media_personal_image" class="personal_image" />
        <div>
          <h4 class="mb-3">{{ UserInfo.name }}</h4>
          <h5>{{ UserInfo.uuid }}</h5>
        </div>
      </div>
      <div>
        <h4 class="orders">
          الطلبات <span class="online"></span
          ><img src="@/assets/images/orders.svg" @click="showOrders = true" />
        </h4>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.TapContent {
  .constent-flex {
    display: flex;
    gap: 10px;
    align-items: center;
    h5 {
      color: #00000099;
    }
  }
  .list_info {
    list-style-type: none;
    justify-content: space-between;
    li {
      label {
        color: #2473b3;
      }
      p {
        img {
          margin-left: 10px;
        }
      }
    }
  }
  .image_id {
    padding: 10px;
    width: auto;
  }
}
</style>
