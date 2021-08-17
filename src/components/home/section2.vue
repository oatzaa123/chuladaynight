<template>
  <div class="section2" :style="section2Height">
    <div class="container">
      <div class="title">
        โครงการ “Chula Art Town”
        เป็นความร่วมมือกันระหว่างสำนักงานจัดการทรัพย์สิน จุฬาลงกรณ์มหาวิทยาลัย
        (PMCU), บริษัท อุไรพาณิชย์ จำกัด และ ATM Spray
        ซึ่งให้การสนับสนุนอุปกรณ์สีสำหรับสร้างสรรค์ผลงาน เนื่องในวาระครบรอบ 36
        ปี ของคณะศิลปกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
      </div>
    </div>

    <div class="content" :style="section2Height">
      <div v-for="i in 5" :key="i" class="star-group">
        <div class="blur"></div>
        <div class="star"></div>
      </div>
      <img
        :src="require('@/assets/images/home/section2/Group 654.svg')"
        class="map"
      />
      <div class="left-top">
        <p>
          โครงการ “Chula Art Town”
          เป็นความร่วมมือกันระหว่างสำนักงานจัดการทรัพย์สิน
        </p>
        <img
          :src="require('@/assets/images/home/section2/Group 812.png')"
          class="logo"
        />
        <img
          :src="require('@/assets/images/home/section2/Path 61.svg')"
          class="path"
        />
      </div>
      <div class="right-top">
        <p>
          โครงการ “Chula Art Town”
          เป็นความร่วมมือกันระหว่างสำนักงานจัดการทรัพย์สิน
        </p>
        <img
          :src="require('@/assets/images/home/section2/Group 809.png')"
          class="logo"
        />
        <img
          :src="require('@/assets/images/home/section2/Path 50.svg')"
          class="path"
        />
      </div>
      <div class="left-bottom">
        <p>
          โครงการ “Chula Art Town”
          เป็นความร่วมมือกันระหว่างสำนักงานจัดการทรัพย์สิน
        </p>
        <img
          :src="require('@/assets/images/home/section2/Group 811.png')"
          class="logo"
        />
        <img
          :src="require('@/assets/images/home/section2/Path 124.svg')"
          class="path"
        />
      </div>
      <div class="right-bottom">
        <p>
          โครงการ “Chula Art Town”
          เป็นความร่วมมือกันระหว่างสำนักงานจัดการทรัพย์สิน
        </p>
        <img
          :src="require('@/assets/images/home/section2/Group 810.png')"
          class="logo"
        />
        <img
          :src="require('@/assets/images/home/section2/Path 420.svg')"
          class="path"
        />
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import { onBeforeMount, computed } from "vue";
export default {
  setup() {
    var section2Height = "min-height: 100vh;";

    onBeforeMount(() => {
      section2Height = `min-height: ${window.innerWidth / 1.5}px;`;
    });

    return {
      section2Height: computed(() => section2Height),
    };
  },
};
</script>

<style lang="scss">
@import "../../assets/css/home/section2.scss";
</style>
