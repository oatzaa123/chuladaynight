<template>
  <div class="section2">
    <div class="container">
      <div class="title">
        {{ $t("section2_title") }}
      </div>
    </div>

    <div class="content">
      <img
        :src="require('@/assets/images/home/section2/Group 654.svg')"
        class="map"
      />
      <div class="row">
        <div class="left-top col-6" :style="topHeight">
          <div class="logo">
            <img
              :src="
                require('@/assets/images/home/section2/Group 855/Group 855.png')
              "
              @click="onHandleClick('https://www.faa.chula.ac.th')"
            />
            <p>
              {{ $t("section2_leftTop") }}
            </p>
          </div>
          <!-- <img
            :src="require('@/assets/images/home/section2/Path 61.svg')"
            class="path"
            :style="pathHeight"
          /> -->
        </div>
        <div class="right-top col-6" :style="topHeight">
          <div class="logo">
            <img
              :src="
                require('@/assets/images/home/section2/Group 851/Group 851.png')
              "
              @click="
                onHandleClick('https://www.chula.ac.th/tag/chula-art-town')
              "
            />
            <p>
              {{ $t("section2_rightTop") }}
            </p>
          </div>
          <!-- <img
            :src="require('@/assets/images/home/section2/Path 50.svg')"
            class="path"
            :style="pathHeight"
          /> -->
        </div>
      </div>

      <div class="row">
        <div class="left-bottom col-6" :style="bottomHeight">
          <!-- <img
            :src="require('@/assets/images/home/section2/Path 124.svg')"
            class="path"
            :style="pathWidth"
          /> -->
          <div class="logo" @click="goto('section4')">
            <img
              :src="
                require('@/assets/images/home/section2/Group 853/Group 853 copy.png')
              "
            />

            <p>
              {{ $t("section2_leftBottom") }}
            </p>
          </div>
        </div>
        <div class="right-bottom col-6" :style="bottomHeight">
          <!-- <img
            :src="require('@/assets/images/home/section2/Path 420.svg')"
            class="path"
            :style="pathWidth"
          /> -->
          <div class="logo">
            <img
              :src="
                require('@/assets/images/home/section2/Group 852/Group 852 copy.png')
              "
              @click="goto('section3')"
            />
            <p>
              {{ $t("section2_rightBottom") }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import { onBeforeMount, computed, ref } from "vue";
// import { useStore } from "vuex";
export default {
  setup() {
    // const store = useStore();
    var section2Height = ref("min-height: 100vh;");

    var topHeight = ref("height: auto;");
    var bottomHeight = ref("height: auto;");

    var pathHeight = ref("max-height: 500px;");
    var pathWidth = ref("max-width: 500px;");

    const setHeight = () => {
      section2Height.value = `min-height: ${window.innerWidth / 1.5}px;`;
      //   topHeight.value = `height: ${window.innerWidth / 2.5}px`;
      // bottomHeight.value = `height: ${window.innerWidth / 4}px`;
      //   topHeight.value = `height: ${window.innerWidth / 2.5}px`;
      //   bottomHeight.value = `height: ${window.innerWidth / 4}px`;
      pathHeight.value = `max-height: ${window.innerWidth / 2.5 / 1.5}px`;
      pathWidth.value = `max-width: ${window.innerWidth / 2.5 / 1.5}px`;
    };

    const onHandleClick = (link) => {
      window.open(link);
    };

    const goto = (id) => {
      //   store.commit("setScrollId", id);
      let top = document.getElementById(id).offsetTop;
      setTimeout(() => {
        window.scrollTo(0, top);
      }, 10);
    };

    window.addEventListener("resize", setHeight);

    onBeforeMount(() => {
      setHeight();
    });

    return {
      section2Height: computed(() => section2Height.value),
      topHeight: computed(() => topHeight.value),
      bottomHeight: computed(() => bottomHeight.value),
      pathHeight: computed(() => pathHeight.value),
      pathWidth: computed(() => pathWidth.value),
      onHandleClick,
      goto,
    };
  },
};
</script>

<style lang="scss">
@import "../../assets/css/home/section2.scss";
</style>
