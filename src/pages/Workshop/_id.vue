<template>
  <div class="main-workshop-id">
    <div class="container-workshop">
      <div class="row" v-for="item in data" :key="item._id">
        <div class="col-12 col-md-8">
          <img
            v-if="item.image"
            class="workshop-img"
            :src="getImage(item.image.name, item.image.path)"
          />
        </div>
        <div
          class="
            workshop-content
            col-6 col-md-4
            d-flex
            align-items-center
            justify-content-center
          "
        >
          <div>
            <h1>
              {{ $i18n.locale === "th" ? item.title_th : item.title_en }}
            </h1>
            <p>
              {{
                $i18n.locale === "th"
                  ? item.description_th
                  : item.description_en
              }}
            </p>
            <p>
              &nbsp;
              <img
                :src="require('../../assets/images/workshop/Path 471.svg')"
              />
              &nbsp;
              {{ item.period }}
            </p>
            <p>
              <img
                :src="require('../../assets/images/icons/Path 115.svg')"
                width="20"
                class="hover-img"
              />
              &nbsp;
              {{ $t("workshop_location") }}
              {{
                $i18n.locale === "th"
                  ? item.locationName_th
                  : item.locationName_en
              }}
            </p>
            <p>
              &nbsp;
              <img
                :src="require('../../assets/images/icons/Group 850.svg')"
                width="10"
                class="hover-img"
              />
              &nbsp;
              {{ item.staff }} <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span v-if="item.contact.telephone">{{
                $t("workshop_contact")
              }}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ item.contact.telephone }}
            </p>
          </div>
          <div class="icon">
            <img
              @click="
                openUrl(`https://www.google.com/maps/search/?api=1&query=`, {
                  lat: item.contact.location.latitude,
                  lng: item.contact.location.longitude,
                })
              "
              :src="require('@/assets/images/gallery/Group 128.svg')"
              width="50"
              height="50"
            />
            <div class="icon-img">
              <img
                :src="require('@/assets/images/icons/Group 327@2x.png')"
                width="50"
                height="50"
                @click="
                  openUrl(
                    'https://www.facebook.com',
                    item.contact.facebook.trim()
                  )
                "
              />
              <img
                :src="require('@/assets/images/icons/Group 344@2x.png')"
                width="50"
                height="50"
                @click="
                  openUrl(
                    'https://www.instagram.com',
                    item.contact.instagram.trim()
                  )
                "
              />
              <img
                @click="openUrl('mailto:', item.contact.email)"
                :src="require('@/assets/images/icons/Group 328.svg')"
                width="50"
                height="50"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="news-id-footer">
      <Arrow
        name="Workshop-id"
        type="workshop"
        :customClassLeft="customClassLeft"
        :customClassRight="customClassRight"
      >
        <template v-slot:left-text>
          <span class="arrow-text">{{ $t("news_id_pervious") }}</span>
        </template>

        <template v-slot:middle-button>
          <button @click="onAllContent" class="btn-custom">
            {{ $t("news_btn") }}
          </button>
        </template>

        <template v-slot:right-text>
          <span class="arrow-text">{{ $t("news_id_next") }}</span>
        </template>
      </Arrow>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, inject, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Arrow from "@/components/arrow";
import useWorkshop from "@/hooks/useWorkshop";
export default {
  components: {
    Arrow,
  },
  setup() {
    const state = reactive({
      icon: [
        {
          path: require("@/assets/images/icons/Group 327@2x.png"),
          url: "https://www.facebook.com",
        },
        {
          path: require("@/assets/images/icons/Group 344@2x.png"),
          url: "https://www.instagram.com",
        },
        {
          path: require("@/assets/images/icons/Group 328.svg"),
        },
      ],
    });

    const customClassLeft = ref({
      position: "unset",
      display: "flex",
      alignItems: "center",
    });
    const customClassRight = ref({
      position: "unset",
      display: "flex",
      alignItems: "center",
    });

    const onAllContent = () => {
      router.push({ name: "Workshop" });
    };

    const globalStore = inject("globalStore");

    globalStore.changeBackground(
      require("@/assets/images/workshop/Rectangle 47@2x.png")
    );

    const router = useRouter();
    const route = useRoute();
    const { data, getOne, errorMessage } = useWorkshop();

    try {
      getOne(route.params.id);
    } catch (error) {
      throw new Error(errorMessage);
    }

    const getImage = (imageName, imagePath) => {
      return `${process.env.VUE_APP_PATH_IMAGE}/${imagePath}/${imageName}`;
    };

    const openUrl = (url, value) => {
      if (typeof value === "string") {
        window.open(`${url}/${value}`, "_blank");
      } else {
        window.open(`${url}${value.lat},${value.lng}`, "_blank");
      }
    };

    return {
      ...toRefs(state),
      data,
      getImage,
      openUrl,
      customClassLeft: customClassLeft.value,
      customClassRight: customClassRight.value,
      onAllContent,
    };
  },
};
</script>

<style lang="scss">
.main-workshop-id {
  position: relative;
  font-family: "Kanit-Regular";
  color: #ffffff;
  .container-workshop {
    width: 80%;
    margin: auto;
    padding-top: var(--bs-gutter-x, 1rem);
    padding-bottom: var(--bs-gutter-x, 1rem);
    overflow-y: unset;
    max-height: unset;
    .workshop-img {
      width: 100%;
      height: 90vh;
      // margin-top: 60px;
      object-fit: scale-down;
    }
    .workshop-content {
      font-size: 16px;
      position: relative;
      h1 {
        font-size: 26px;
        font-weight: bold;
      }
      // p {
      //   margin: auto;
      // }
      p:nth-child(2) {
        padding-bottom: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.4);
      }
    }
    .icon {
      position: absolute;
      bottom: 0;
      display: flex;
      img:nth-child(1) {
        margin: 0 10px;
        cursor: pointer;
      }
      .icon-img {
        img {
          margin: 0 10px;
          cursor: pointer;
        }
        .hover-img {
          margin: 0 10px;
          filter: invert(19%) sepia(87%) saturate(4315%) hue-rotate(276deg)
            brightness(103%) contrast(108%);
        }
      }
    }
  }
  .news-id-footer {
    font-family: "Prompt";
    padding-top: 0rem;
    padding-bottom: 0rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 2rem;
    .arrow-text {
      margin: 20px;
      font-size: 18px;
      font-weight: bold;
      color: #fff;
    }
    .btn-custom {
      border-radius: 20px;
      background-color: #7948e6;
      color: #fff;
      border: 1px solid #7948e6;
      padding: 0px 20px;
      width: 160px;
      height: 40px;
      &:hover {
        background-color: #ffffff;
        color: #7948e6;
      }
    }
  }
}

@media screen and (max-width: 1024px) {
  .main-workshop-id {
    .workshop-content {
      font-size: 14px;
      h1 {
        font-size: 20px;
      }
    }
    .icon {
      img:nth-child(1) {
        width: 25px;
        height: 25px;
      }
      .icon-img {
        img {
          width: 25px;
          height: 25px;
        }
      }
    }
  }
}

// @media screen and (max-width: 768px) {
//   .main-workshop-id {
//     .workshop-content {
//       h1 {
//         font-size: 15px;
//       }
//     }
//   }
// }

@media screen and (max-width: 768px) {
  .main-workshop-id {
    .col-12 {
      margin: auto;
      margin-top: 30px;
      .workshop-img {
        width: 100%;
        height: auto;
      }
    }
    .col-6 {
      width: 100%;
      padding-top: 10px;
    }
    .workshop-content {
      h1 {
        font-size: 26px;
      }
      p:nth-child(2) {
        padding-bottom: 0.5rem;
        font-size: 14px;
      }
      p {
        margin-bottom: 0.5rem;
        font-size: 14px;
      }
    }
    .icon {
      bottom: 0;
      img:nth-child(1) {
        width: 30px;
        height: 30px;
      }
      .icon-img {
        img {
          margin: 0 5px;
          width: 30px;
          height: 30px;
        }
      }
    }
  }
}

@media screen and (max-width: 426px) {
  .news-id-footer {
    .arrow-text {
      display: none;
    }
  }
}
</style>
