<template>
  <div id="section3" class="section3">
    <div class="left-arrow">
      <button @click.prevent="onBackwardClick" class="btn customButton">
        <div class="arrow"></div>
        <div class="left"></div>
      </button>
    </div>
    <div class="right-arrow">
      <button @click.prevent="onForwardClick" class="btn customButton">
        <div class="arrow"></div>
        <div class="right"></div>
      </button>
    </div>

    <div class="container">
      <div class="row">
        <splide :options="slideOptions" v-if="blocks.Gallery">
          <splide-slide
            v-for="slide in blocks.Gallery"
            :key="slide._id"
            class="slide-items"
          >
            <div class="img col-sm">
              <img
                v-if="slide.coverImage"
                :src="getImage(slide.coverImage.name, slide.coverImage.path)"
              />
            </div>
          </splide-slide>
        </splide>
      </div>
    </div>

    <div class="text-container">
      <div class="sec3-content row">
        <div class="col-sm-12 col-md-6 text-center">
          <div class="group-title">
            <h1 class="customText">DIGITAL ART</h1>
            <sub class="sub"><p>SCULPTURE</p></sub>
          </div>
        </div>
        <div class="col">
          <div class="group-discription">
            <h1>{{ $t("section3_title") }}</h1>
            <p>{{ $t("section3_groupDescription") }}</p>
            <button class="btn btn-outline-primary" @click="onPageChanged">
              more
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { useRouter } from "vue-router";
import useGallery from "@/hooks/useGallery";
import { ref, computed } from "vue";
// import ImageView from "@/components/ImageView";
// import { onMounted, reactive } from "vue";
export default {
  components: {
    // ImageView,
    Splide,
    SplideSlide,
  },
  setup() {
    const { data, getAll, errorMessage } = useGallery();
    const router = useRouter();

    const onPageChanged = () => {
      router.push({ name: "Gallery" });
    };

    try {
      getAll();
    } catch (error) {
      throw new Error(errorMessage);
    }

    const getImage = (imageName, imagePath) => {
      return `${process.env.VUE_APP_PATH_IMAGE}/${imagePath}/${imageName}`;
    };

    const slideOptions = ref({
      type: "loop",
      perPage: 3,
      rewind: true,
      pagination: false,
      autoplay: true,
      pauseOnHover: false,
      gap: "1rem",
      perMove: 1,
      classes: {
        prev: "splide__arrow--prev section3-prev",
        next: "splide__arrow--next section3-next",
      },
      breakpoints: {
        768: {
          perPage: 2,
        },
        426: {
          perPage: 1,
        },
      },
    });

    const onForwardClick = () => {
      let next = document.getElementsByClassName("section3-next");
      next[0].click();
    };

    const onBackwardClick = () => {
      let prev = document.getElementsByClassName("section3-prev");
      prev[0].click();
    };

    return {
      data,
      blocks: computed(() => data.value),
      onPageChanged,
      getImage,
      slideOptions,
      onBackwardClick,
      onForwardClick,
    };
  },
};
</script>

<style lang="scss">
@import "../../assets/css/home/section3.scss";
</style>
