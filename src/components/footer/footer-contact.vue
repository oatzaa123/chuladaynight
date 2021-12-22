<template>
  <div class="contact">
    <div class="contact-group">
      <div class="row">
        <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 address">
          <div>{{ $t("footer_company_name") }}</div>
          <div>
            {{ $t("footer_company_address") }}
          </div>
          <div>{{ $t("footer_company_address2") }}</div>
          <div>{{ $t("footer_company_address3") }}</div>
          <div>{{ $t("footer_company_address4") }}</div>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 google-culture">
          <div class="icon">
            <img
              :src="require('@/assets/images/home/footer/Image 58.png')"
              alt=""
            />
          </div>
          <div>
            <div>{{ $t("footer_description4") }}</div>
            <div
              style="color: #1ba7ff; cursor: pointer"
              @click="
                openUrl(
                  'https://artsandculture.google.com/partner/faculty-of-fine-and-applied-arts-chulalongkorn-university'
                )
              "
            >
              Google Art & Culture
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12 icon-social">
          <template v-for="(item, index) in icon" :key="index">
            <img
              @click="openUrl(item.url, item.name)"
              class="contact-icon"
              :src="item.path"
              width="40"
            />
          </template>
        </div>
      </div>
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

    const openUrl = (url, name = null) => {
      if (name) {
        window.open(`${url}/${name}`, "_blank");
      } else {
        window.open(`${url}`, "_blank");
      }
    };

    return { icon, openUrl };
  },
};
</script>

<style lang="scss">
.contact {
  .contact-group {
    // margin: 50px 50px 50px;
    margin: 0px 50px 50px;
    padding: 30px 15px 0px;
    border-top: 1px solid;
    .address {
      margin-bottom: 15px;
      font-size: 14px;
      div:nth-child(1) {
        opacity: 1;
        font-family: "Roboto-Bold";
      }
      div {
        opacity: 0.5;
        font-family: "Roboto-Medium";
      }
    }
    .google-culture {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 15px;
      font-size: 14px;
      font-family: "Prompt-Medium";
      .icon {
        margin-right: 15px;
      }
    }
    .icon-social {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 15px;
      img {
        cursor: pointer;
        margin-right: 10px;
        opacity: 0.5;
      }
    }
  }
}
.spaceline {
  height: 50px;
  width: 100%;
  border-top: 1px solid rgba(100, 100, 100, 0.2);
}
</style>
