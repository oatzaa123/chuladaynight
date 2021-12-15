<template>
  <div id="section3" class="section3">
    <div
      class="left-arrow"
      @mouseover="mouseover()"
      @mousedown="Arrow(-2)"
      @mouseup="ArrowStop()"
      @mouseleave="ArrowStop()"
    >
      <button class="btn customButton">
        <div class="arrow"></div>
        <div class="left"></div>
      </button>
    </div>

    <div
      class="right-arrow"
      @mouseover="mouseover()"
      @mousedown="Arrow(2)"
      @mouseup="ArrowStop()"
      @mouseleave="ArrowStop()"
    >
      <button class="btn customButton">
        <div class="arrow"></div>
        <div class="right"></div>
      </button>
    </div>
    <!-- <div class="overlay"></div> -->
    <!-- <div class="sec3-img" @mousedown="clickImg($event)">
      <img
        :src="require('@/assets/images/gallery/Image 1.png')"
        draggable="false"
      />
      <img
        :src="require('@/assets/images/gallery/Image 1.png')"
        draggable="false"
      />
    </div> -->

    <div class="slide-container" data-test="11">
      <div
        class="items"
        @mousedown="mousedown($event)"
        @mouseup="mouseup()"
        @mouseover="mouseover()"
        @mouseleave="mouseleave()"
        @mousemove="mousemove($event)"
      >
        <template v-if="data.Gallery">
          <div
            class="item"
            :data-length="data.Gallery.length"
            data-fesa-num="8"
          >
            <template v-for="(i, index) in data.Gallery" :key="index">
              <ImageView
                v-if="i.coverImage"
                :imagePath="i.coverImage.path"
                :imageName="i.coverImage.name"
              />
            </template>
          </div>
        </template>
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
import { useRouter } from "vue-router";
import useGallery from "@/hooks/useGallery";
import ImageView from "@/components/ImageView";
import { onMounted, reactive } from "vue";
export default {
  components: { ImageView },
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

    const ele = document.getElementsByClassName("items");
    const state = reactive({
      isDown: false,
      startX: 0,
      scrollLeft: 0,
      interval: false,
      intervalAutoplay: false,
      AutoplayPageX: 1,
    });

    const mousedown = (e) => {
      const slider = ele[0];
      slider.classList.add("active");
      state.isDown = true;
      state.startX = e.pageX - slider.offsetLeft;
      state.scrollLeft = slider.scrollLeft;
    };
    const mouseup = () => {
      const slider = ele[0];
      state.isDown = false;
      slider.classList.remove("active");
      state.scrollLeft = slider.scrollLeft;
    };
    const mouseover = () => {
      if (state.intervalAutoplay) {
        clearInterval(state.intervalAutoplay);
        state.intervalAutoplay = false;
      }
    };
    const mouseleave = () => {
      const slider = ele[0];
      state.isDown = false;
      slider.classList.remove("active");
      state.scrollLeft = slider.scrollLeft;

      state.intervalAutoplay = false;
      autoPlay();
    };
    const mousemove = (e) => {
      const slider = ele[0];
      if (!state.isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - state.startX) * 1; //scroll-fast
      slider.scrollLeft = state.scrollLeft - walk;
    };

    const Arrow = (pageX) => {
      if (!state.interval) {
        state.interval = setInterval(() => {
          const slider = ele[0];
          state.startX = (state.startX || 0) + pageX;
          state.scrollLeft = (state.scrollLeft || 0) + pageX;
          slider.scrollLeft = state.scrollLeft;
        }, 0);

        if (state.intervalAutoplay) {
          clearInterval(state.intervalAutoplay);
          state.intervalAutoplay = false;
        }
      }
    };

    const ArrowStop = () => {
      clearInterval(state.interval);
      state.interval = false;

      // state.intervalAutoplay = false;
      // autoPlay();
    };

    const autoPlay = () => {
      if (!state.intervalAutoplay)
        state.intervalAutoplay = setInterval(() => {
          const slider = ele[0];
          if (slider) {
            state.startX = (state.startX || 0) + state.AutoplayPageX;
            state.scrollLeft = (state.scrollLeft || 0) + state.AutoplayPageX;
            slider.scrollLeft = state.scrollLeft;

            let scrollMax = slider.scrollWidth - slider.clientWidth;
            if (slider.scrollLeft == scrollMax) {
              state.AutoplayPageX = -1;
            } else if (slider.scrollLeft == 0) {
              state.AutoplayPageX = 1;
            }
          }
        }, 10);
    };

    onMounted(() => {
      autoPlay();
    });

    return {
      data,
      onPageChanged,
      mousedown,
      mouseup,
      mouseover,
      mouseleave,
      mousemove,
      Arrow,
      ArrowStop,
    };
  },
};
</script>

<style lang="scss">
@import "../../assets/css/home/section3.scss";
</style>
