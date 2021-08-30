<template>
  <div class="section3">
    <div class="left-arrow" @mousedown="Arrow(-1)" @mouseup="ArrowStop()">
      <button class="btn customButton">
        <div class="arrow"></div>
        <div class="left"></div>
      </button>
    </div>

    <div class="right-arrow" @mousedown="Arrow(1)" @mouseup="ArrowStop()">
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
        <div class="col text-center">
          <div class="group-title">
            <h1 class="customText">DIGITAL ART</h1>
            <sub class="sub"><p>SCULTURE</p></sub>
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
    let isDown = false;
    let startX;
    let scrollLeft;
    let interval = false;

    const mousedown = (e) => {
      const slider = ele[0];
      slider.classList.add("active");
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };
    const mouseup = () => {
      const slider = ele[0];
      isDown = false;
      slider.classList.remove("active");
    };
    const mouseleave = () => {
      const slider = ele[0];
      isDown = false;
      slider.classList.remove("active");
    };
    const mousemove = (e) => {
      const slider = ele[0];
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 3; //scroll-fast
      slider.scrollLeft = scrollLeft - walk;
    };

    const Arrow = (pageX) => {
      if (!interval)
        interval = setInterval(() => {
          const slider = ele[0];
          startX = (startX || 0) + pageX;
          scrollLeft = (scrollLeft || 0) + pageX;
          slider.scrollLeft = scrollLeft * 5;
        }, 30);
    };

    const ArrowStop = () => {
      clearInterval(interval);
      interval = false;
    };

    return {
      data,
      onPageChanged,
      mousedown,
      mouseup,
      mouseleave,
      mousemove,
      Arrow,
      ArrowStop,
      isDown,
      startX,
      scrollLeft,
    };
  },
};
</script>

<style lang="scss">
@import "../../assets/css/home/section3.scss";
</style>
