<template>
  <div class="section6">
    <!-- <div class="container"> -->
    <div class="header">PARNTER</div>
    <div class="slide">
      <splide :options="slideOptions">
        <splide-slide
          v-for="slide in slides"
          :key="slide.src"
          class="slide-items"
        >
          <div class="img">
            <img :src="slide.src" />
          </div>
          <div class="name">Partner name</div>
        </splide-slide>
      </splide>
    </div>
    <!-- </div> -->

    <div id="section6container" style="height: 500px; width: 500px"></div>
  </div>
</template>

<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { onMounted, reactive, toRefs } from "vue";

import * as Three from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
export default {
  components: {
    Splide,
    SplideSlide,
  },
  setup() {
    const state = reactive({
      slides: [
        {
          src: require("../../assets/images/home/section1/L_DN2N_20202.png"),
        },
        {
          src: require("../../assets/images/home/section1/L_DN2N_20202.png"),
        },
        {
          src: require("../../assets/images/home/section1/L_DN2N_20202.png"),
        },
        {
          src: require("../../assets/images/home/section1/L_DN2N_20202.png"),
        },
        {
          src: require("../../assets/images/home/section1/L_DN2N_20202.png"),
        },
        {
          src: require("../../assets/images/home/section1/L_DN2N_20202.png"),
        },
        {
          src: require("../../assets/images/home/section1/L_DN2N_20202.png"),
        },
        {
          src: require("../../assets/images/home/section1/L_DN2N_20202.png"),
        },
      ],
      slideOptions: {
        type: "loop",
        perPage: 5,
        rewind: true,
        pagination: false,
        breakpoints: {
          768: {
            perPage: 3,
          },
        },
      },
      camera: null,
      scene: null,
      renderer: null,
      loader: null,
      loader2: null,
    });

    const init = () => {
      console.log("init");
      let container = document.getElementById("section6container");
      //camera
      state.camera = new Three.PerspectiveCamera(
        70,
        container.clientWidth / container.clientHeight,
        0.01,
        10
      );
      state.camera.position.z = 1;
      //scene
      state.scene = new Three.Scene();
      //obj loader
      state.loader = new OBJLoader();
      state.loader.load("../../assets/3d/male02.obj", (loadedObject) => {
        state.scene.add(loadedObject);
        console.log("obj", loadedObject);
      });

      state.loader2 = new MTLLoader();
      state.loader2.load("../../assets/3d/male02.mtl", (loadedObject) => {
        state.scene.add(loadedObject);
        console.log("mtl", loadedObject);
      });

      //renderer
      state.renderer = new Three.WebGLRenderer({ antialias: true });
      state.renderer.setSize(container.clientWidth, container.clientHeight);
      state.renderer.setClearColor("#ff0");
      container.appendChild(state.renderer.domElement);
    };

    const animate = () => {
      console.log("animate");
      requestAnimationFrame(animate);
      state.renderer.render(state.scene, state.camera);
    };

    onMounted(() => {
      init();
      animate();
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss">
@import "../../assets/css/home/section6.scss";
</style>
