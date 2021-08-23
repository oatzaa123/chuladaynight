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
    });

    const scene = new THREE.Scene();
    scene.add(new THREE.AxesHelper(5));

    const light = new THREE.PointLight();
    light.position.set(2.5, 7.5, 15);
    scene.add(light);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor("Gainsboro");
    renderer.setSize(500, 500);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const objLoader = new OBJLoader();
    const file = "static/models/obj/windmill.obj";
    objLoader.load(
      file,
      (object) => {
        // (object.children[0] as THREE.Mesh).material = material
        // object.traverse(function (child) {
        //     if ((child as THREE.Mesh).isMesh) {
        //         (child as THREE.Mesh).material = material
        //     }
        // })
        console.log("obj", object);
        scene.add(object);
      },
      (xhr) => {
        console.log("xhr", xhr);
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.log(error);
      }
    );

    window.addEventListener("resize", onWindowResize, false);
    function onWindowResize() {
      camera.aspect = 500 / 500;
      camera.updateProjectionMatrix();
      renderer.setSize(500, 500);
      render();
    }

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      render();
    };

    const render = () => {
      renderer.render(scene, camera);
    };

    onMounted(() => {
      let container = document.getElementById("section6container");
      container.appendChild(renderer.domElement);

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
