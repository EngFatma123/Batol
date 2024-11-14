<template>
  <div>
    <div class="constent-flex">
      <img src="@/assets/images/users/man.svg" />
      <div>
        <h4 class="mb-3">أحمد سمير عبد البارى</h4>
        <h5>23333</h5>
      </div>
    </div>
    <div class="profile_info mt-5">
      <ul class="d-flex list_info">
        <li>
          <label>رقم الاقامه</label>
          <p><img src="@/assets/images/profile/id.svg" /> 01222333333333</p>
        </li>
        <li>
          <label>البريد الالكترونى</label>
          <p><img src="@/assets/images/profile/email.svg" /> text@gmail.com</p>
        </li>
        <li>
          <label>رقم الهاتف</label>
          <p>
            <img src="@/assets/images/profile/id.svg" />
            01127122395
          </p>
        </li>
        <li>
          <label>عنوان الالتقاط</label>
          <p><img src="@/assets/images/profile/location.svg" /> الشيخ زيد</p>
        </li>
        <li>
          <label>عنوان الجامعه</label>
          <p><img src="@/assets/images/profile/id.svg" /> حامعه القاهره</p>
        </li>
      </ul>
      <button class="image_id">صوره البطاقه</button>
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
