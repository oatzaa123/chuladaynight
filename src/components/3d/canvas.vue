<template>
  <canvas id="c"></canvas>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
// import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
// import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader.js'
export default {
  props: {
    path: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  methods: {
    async main() {
      const canvas = document.querySelector("#c");
      const renderer = new THREE.WebGLRenderer({ canvas });

      const fov = 45;
      const aspect = 2; // the canvas default
      const near = 0.1;
      const far = 100;
      const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      camera.position.set(0, 10, 20);

      const controls = new OrbitControls(camera, canvas);
      controls.target.set(0, 5, 0);
      controls.enableDamping = true;
      controls.enableZoom = false;
      controls.update();

      const scene = new THREE.Scene();
      scene.background = new THREE.Color("#030124");

      {
        const planeSize = 40;

        const loader = new THREE.TextureLoader();
        const texture = loader.load(
          "https://threejsfundamentals.org/threejs/resources/images/checker.png"
        );
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.magFilter = THREE.NearestFilter;
        const repeats = planeSize / 2;
        texture.repeat.set(repeats, repeats);

        const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
        const planeMat = new THREE.MeshPhongMaterial({
          map: texture,
          side: THREE.DoubleSide,
        });
        const mesh = new THREE.Mesh(planeGeo, planeMat);
        mesh.rotation.x = Math.PI * -0.5;
        // scene.add(mesh);
      }

      {
        const skyColor = 0xb1e1ff; // light blue
        const groundColor = 0xb97a20; // brownish orange
        const intensity = 1;
        const light = new THREE.HemisphereLight(
          skyColor,
          groundColor,
          intensity
        );
        scene.add(light);
      }

      {
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(0, 10, 0);
        light.target.position.set(-5, 0, 0);
        scene.add(light);
        scene.add(light.target);
      }

      function frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera) {
        const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
        const halfFovY = THREE.MathUtils.degToRad(camera.fov * 0.5);
        const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);
        // compute a unit vector that points in the direction the camera is now
        // in the xz plane from the center of the box
        const direction = new THREE.Vector3()
          .subVectors(camera.position, boxCenter)
          .multiply(new THREE.Vector3(1, 0, 1))
          .normalize();

        // move the camera to a position distance units way from the center
        // in whatever direction the camera was from the center already
        camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));

        // pick some near and far values for the frustum that
        // will contain the box.
        camera.near = boxSize / 100;
        camera.far = boxSize * 100;

        camera.updateProjectionMatrix();

        // point the camera to look at the center of the box
        camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
      }

      {
        // const objLoader = new OBJLoader()
        // const file = this.getModel(this.name, this.path)
        // await objLoader.load(
        //     file,
        //     (root) => {
        //         scene.add(root)
        //     },
        //     onProgress,
        //     onError
        // )
        // const onProgress = (xhr) => {
        //     if (xhr.lengthComputable) {
        //         const percentComplete = (xhr.loaded / xhr.total) * 100
        //         console.log(
        //             Math.round(percentComplete, 2) + '% downloaded'
        //         )
        //     }
        // }

        // const onError = () => {
        //     console.log('xxx')
        // }

        const gltfLoader = new GLTFLoader();
        const file = this.getModel(this.name, this.path);
        gltfLoader.load(file, (gltf) => {
          const root = gltf.scene;
          scene.add(root);

          // compute the box that contains all the stuff
          // from root and below
          const box = new THREE.Box3().setFromObject(root);

          const boxSize = box.getSize(new THREE.Vector3()).length();
          const boxCenter = box.getCenter(new THREE.Vector3());

          // set the camera to frame the box
          frameArea(boxSize, boxSize, boxCenter, camera);

          // update the Trackball controls to handle the new size
          controls.maxDistance = boxSize * 10;
          controls.target.copy(boxCenter);
          controls.update();
        });

        // const manager = new THREE.LoadingManager()
        // manager.addHandler(/\.dds$/i, new DDSLoader())
        // new MTLLoader()
        //     // .setPath('/public/static/models/obj/')
        //     .load(this.getModel('All.mtl', this.path), (materials) => {
        //         materials.preload()

        //         new OBJLoader()
        //             .setMaterials(materials)
        //             // .setPath('/public/static/models/obj/')
        //             .load(
        //                 this.getModel(this.name, this.path),
        //                 (object) => {
        //                     scene.add(object)
        //                 },
        //                 onProgress,
        //                 onError
        //             )
        //     })
      }

      function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
      }

      function render() {
        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement;
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
        }

        renderer.render(scene, camera);

        requestAnimationFrame(render);
      }

      requestAnimationFrame(render);
    },
    getModel(name, path) {
      return `http://localhost:5000/models/${path}/${name}`;
    },
  },
  mounted() {
    // window.requestAnimationFrame(this.animate)
    this.main();
    // this.animate()
  },
};
</script>

<style scoped>
#c {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
