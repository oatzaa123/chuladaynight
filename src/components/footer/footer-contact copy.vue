<template>
  <div class="contact">
    <div class="contact-group">
      <div class="box-1">
        <div>{{ $t("footer_company_name") }}</div>
        <div>
          {{ $t("footer_company_address") }}
        </div>
        <div>{{ $t("footer_company_address2") }}</div>
      </div>
      <div class="box-2">
        <div class="icon">
          <img
            :src="require('@/assets/images/home/footer/Image 58.png')"
            alt=""
          />
        </div>
        <div>
          <div>{{ $t("footer_description4") }}</div>
          <div style="color: #1ba7ff">Google art & Culture</div>
        </div>
      </div>
      <div class="box-3">
        <div v-for="(item, index) in icon" :key="index">
          <img
            @click="openUrl(item.url, item.name)"
            class="contact-icon"
            :src="item.path"
            width="40"
          />
        </div>
      </div>
    </div>
    <div class="contact-group">
      <div class="box-1">
        <div>{{ $t("footer_company_address3") }}</div>
        <div>{{ $t("footer_company_address4") }}</div>
      </div>
      <div class="box-2"></div>
      <div class="box-3"></div>
    </div>
  </div>
  <div class="spaceline"></div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const icon = ref([
      {
        path: require("@/assets/images/icons/Group 327@2x.png"),
        url: "https://www.facebook.com",
        name: "GridWhiz",
      },
      {
        path: require("@/assets/images/icons/Group 344@2x.png"),
        url: "https://www.instagram.com",
        name: "gridwhiz",
      },
      {
        path: require("@/assets/images/icons/Group 328.svg"),
      },
    ]);

    const openUrl = (url, name) => {
      window.open(`${url}/${name}`, "_blank");
    };

    return { icon, openUrl };
  },
};
</script>

<style lang="scss">
.contact {
  .contact-group {
    &:nth-child(1) {
      margin: 50px 50px 0px;
      padding: 30px 15px 0px;
      border-top: 1px solid;
      .box-1 {
        div:nth-child(1) {
          opacity: 1;
        }
      }
    }
    margin: 0px 50px;
    padding: 0px 15px 15px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    .box-1,
    .box-2 {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }
    .box-1 {
      div {
        opacity: 0.5;
      }
    }
    .box-2 {
      text-align: center;
      flex-direction: row;
      align-items: flex-end;
      .icon {
        margin-right: 15px;
        img {
          width: 40px;
        }
      }
    }
    .box-3 {
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      justify-content: flex-end;
      img {
        cursor: pointer;
        margin-right: 20px;
        opacity: 0.5;
      }
    }
  }
}
.spaceline {
  height: 100px;
  border-top: 1px solid rgba(100, 100, 100, 0.2);
}
@media screen and (max-width: 768px) {
  .content {
    .vego-group .vego {
      .vego-main,
      .vego-flip {
        font-size: calc(100px * 0.5);
      }
    }
    .description {
      p {
        font-size: calc(18px * 0.5);
      }
      .customButton {
        font-size: calc(18px * 0.5);
      }
    }
    .contact .contact-group {
      font-size: calc(16px * 0.5);
      .box-3 img {
        width: calc(40px * 0.5);
      }
    }
  }
}
</style>
