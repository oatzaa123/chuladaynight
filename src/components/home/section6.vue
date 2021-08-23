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

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import Stats from "three/examples/jsm/libs/stats.module";

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
      scene: null,
      light: null,
      camera: null,
      renderer: null,
      controls: null,
      objLoader: null,
      stats: null,
    });

    const init = () => {
      let container = document.getElementById("section6container");

      state.scene = new THREE.Scene();
      state.scene.add(new THREE.AxesHelper(5));

      state.light = new THREE.PointLight();
      state.light.position.set(2.5, 7.5, 15);
      state.scene.add(state.light);

      state.camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      state.camera.position.z = 3;

      state.renderer = new THREE.WebGLRenderer();
      state.renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(state.renderer.domElement);

      state.controls = new OrbitControls(
        state.camera,
        state.renderer.domElement
      );
      state.controls.enableDamping = true;

      state.objLoader = new OBJLoader();
      state.objLoader.load(
        "../../assets/3d/male02.obj",
        (object) => {
          // (object.children[0] as THREE.Mesh).material = material
          // object.traverse(function (child) {
          //     if ((child as THREE.Mesh).isMesh) {
          //         (child as THREE.Mesh).material = material
          //     }
          // })
          state.scene.add(object);
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        (error) => {
          console.log(error);
        }
      );

      state.stats = Stats();
      container.appendChild(state.stats.dom);
    };

    const animate = () => {
      requestAnimationFrame(animate);
      state.controls.update();
      render();
      state.stats.update();
    };

    const render = () => {
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
