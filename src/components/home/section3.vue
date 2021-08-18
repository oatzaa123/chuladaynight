<template>
  <div class="section3">
    <div class="left-arrow">
      <button class="btn customButton">
        <div class="arrow"></div>
        <div class="left"></div>
      </button>
    </div>
    <div class="right-arrow">
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

    <div class="slide-container">
      <div
        class="items"
        @mousedown="mousedown($event)"
        @mouseup="mouseup()"
        @mouseleave="mouseleave()"
        @mousemove="mousemove($event)"
      >
        <div class="item"></div>
        <div class="item"></div>
      </div>
    </div>

    <div class="container">
      <div class="sec3-content row">
        <div class="col">
          <div class="group-title">
            <h1 class="customText">DIGITAL ART</h1>
            <sub class="sub"><p>SCULTURE</p></sub>
          </div>
        </div>
        <div class="col">
          <div class="group-discription">
            <h1>TITLE</h1>
            <p>
              โครงการ “Chula Art Town”
              เป็นความร่วมมือกันระหว่างสำนักงานจัดการทรัพย์สิน
              จุฬาลงกรณ์มหาวิทยาลัย (PMCU), บริษัท อุไรพาณิชย์ จำกัด และ ATM
              Spray ซึ่งให้การสนับสนุนอุปกรณ์สีสำหรับสร้างสรรค์ผลงาน
              เนื่องในวาระครบรอบ 36 ปี ของคณะศิลปกรรมศาสตร์
              จุฬาลงกรณ์มหาวิทยาลัย
            </p>
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
export default {
  setup() {
    const router = useRouter();
    const onPageChanged = () => {
      router.push({ name: "Gallery" });
    };

    const ele = document.getElementsByClassName("items");
    let isDown = false;
    let startX;
    let scrollLeft;

    const mousedown = (e) => {
      const slider = ele[0];
      slider.classList.add("active");
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      console.log("down", ele);
    };
    const mouseup = () => {
      const slider = ele[0];
      isDown = false;
      slider.classList.remove("active");
      console.log("up", ele);
    };
    const mouseleave = () => {
      const slider = ele[0];
      isDown = false;
      slider.classList.remove("active");
      console.log("leave", ele);
    };
    const mousemove = (e) => {
      const slider = ele[0];
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 3; //scroll-fast
      slider.scrollLeft = scrollLeft - walk;
      console.log(walk);
    };

    return {
      onPageChanged,
      mousedown,
      mouseup,
      mouseleave,
      mousemove,
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
