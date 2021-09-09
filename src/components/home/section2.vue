<template>
  <div class="section2" :style="section2Height">
    <div class="container">
      <div class="title">
        {{ $t("section2_title") }}
      </div>
    </div>

    <div class="content" :style="section2Height">
      <div v-for="i in 5" :key="i" class="star-group">
        <div class="blur"></div>
        <div class="star"></div>
      </div>
      <!-- <img
        :src="require('@/assets/images/home/section2/Group 654.svg')"
        class="map"
      /> -->
      <div class="row">
        <div class="left-top col-6">
          <p>
            {{ $t("section2_leftTop") }}
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
        <div class="right-top col-6">
          <p>
            {{ $t("section2_rightTop") }}
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
      </div>

      <div class="row">
        <div class="left-bottom col-6">
          <p>
            {{ $t("section2_leftBottom") }}
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
        <div class="right-bottom col-6">
          <p>
            {{ $t("section2_rightBottom") }}
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
