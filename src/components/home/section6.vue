<template>
  <div class="section6">
    <!-- <div class="container"> -->
    <div class="header">PARTNER</div>
    <div class="slide">
      <splide :options="slideOptions">
        <splide-slide
          v-for="(slide, index) in slides.Partner"
          :key="index"
          class="slide-items"
        >
          <div class="img">
            <img
              :src="getImage(slide.coverImage.name, slide.coverImage.path)"
            />
          </div>
          <div class="name">{{ slide.name }}</div>
        </splide-slide>
      </splide>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { reactive, toRefs, computed } from "vue";
import usePartner from "@/hooks/usePartner";

export default {
  components: {
    Splide,
    SplideSlide,
  },
  setup() {
    const state = reactive({
      slideOptions: {
        type: "loop",
        perPage: 5,
        rewind: true,
        pagination: false,
        autoplay: true,
        pauseOnHover: false,
        breakpoints: {
          768: {
            perPage: 3,
          },
          425: {
            perPage: 1,
          },
          375: {
            perPage: 1,
          },
        },
      },
    });

    const { data, getAll, errorMessage } = usePartner();

    try {
      getAll();
    } catch (error) {
      throw new Error(errorMessage);
    }

    const getImage = (imageName, imagePath) => {
      return `${process.env.VUE_APP_PATH_IMAGE}/${imagePath}/${imageName}`;
    };

    return {
      ...toRefs(state),
      getImage,
      slides: computed(() => data.value),
    };
  },
};
</script>

<style lang="scss">
@import "../../assets/css/home/section6.scss";
</style>
