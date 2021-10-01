<template>
  <!-- <div class="about-bg" :class="{ bgnight: isNight }"></div> -->

  <div id="about" class="container">
    <div class="logo-block">
      <!-- <div class="row"> -->
      <!-- <div class="left col-6">
        <div class="logo">
          <div class="title">CHULA</div>
          <div class="sub">DIGITAL ARTS PARK</div>
        </div>
        <div class="toggle" :class="{ day: !isNight, night: isNight }">
          <div class="day" :class="{ active: !isNight }">DAY</div>
          <div class="n">&</div>
          <div class="night" :class="{ active: isNight }">NIGHT</div>
        </div>
      </div> -->
      <div class="left col-6">
        <div class="logo">
          <div class="group">
            <img
              width="450"
              :src="require('../assets/images/home/section1/newbg/logo@2x.png')"
            />
            <div class="toggle" :class="{ day: !isNight, night: isNight }">
              <div class="day">DAY</div>
              <div class="">&</div>
              <div class="night">NIGHT</div>
            </div>
          </div>
        </div>
      </div>
      <div class="right col-6">
        <div class="title">{{ $t("about_title") }}</div>
        <div class="description">
          <p>{{ $t("about_description") }}</p>
        </div>
      </div>
      <!-- </div> -->
    </div>
    <div class="row">
      <div class="about-description">
        <div class="header">{{ $t("about_timeline") }}</div>
        <div class="timeline">
          <div
            class="row timeline-item"
            v-for="item in data.Article"
            :key="item._id"
          >
            <div class="col-5 image">
              <img
                v-if="item.coverImage"
                :src="getImage(item.coverImage.name, item.coverImage.path)"
                alt=""
              />
              <div v-else class="default-coverImage"></div>
            </div>
            <div class="col-1 line"></div>
            <div class="col-1 year">
              {{ item.year }}
            </div>
            <div class="col-5">
              <div class="title">
                {{ $i18n.locale === "th" ? item.title_th : item.title_en }}
              </div>
              <div class="content">
                {{
                  $i18n.locale === "th"
                    ? item.description_th
                    : item.description_en
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, inject, onMounted } from "vue";
import { useStore } from "vuex";
import useAbout from "@/hooks/useAbout";
export default {
  setup() {
    const { data, getAll, errorMessage } = useAbout();

    try {
      getAll();
    } catch (error) {
      throw new Error(errorMessage);
    }

    const getImage = (imageName, imagePath) => {
      return `${process.env.VUE_APP_PATH_IMAGE}/${imagePath}/${imageName}`;
    };

    const store = useStore();
    const globalStore = inject("globalStore");

    const setBackgroundImage = () => {
      globalStore.changeBackground(
        require("@/assets/images/home/section1/Rectangle 47.png")
      );
    };

    onMounted(() => {
      setBackgroundImage();
    });

    return {
      data,
      isNight: computed(() => store.getters["showIsNight"]),
      getImage,
    };
  },
};
</script>

<style lang="scss">
@import "../assets/css/about.scss";
</style>
