<template>
    <canvas id="c"></canvas>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
// import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js'
// import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js'
// import { DDSLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/DDSLoader.js'
// import { OBJLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/OBJLoader.js'
// import { MTLLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/MTLLoader.js'
export default {
    setup() {
        const main = () => {
            const canvas = document.querySelector('#c')
            const renderer = new THREE.WebGLRenderer({ canvas })

            const fov = 45
            const aspect = 2 // the canvas default
            const near = 0.1
            const far = 100
            const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
            camera.position.set(0, 10, 20)

            const controls = new OrbitControls(camera, canvas)
            controls.target.set(0, 5, 0)
            controls.update()

            const scene = new THREE.Scene()
            scene.background = new THREE.Color('black')

            {
                const planeSize = 40

                const loader = new THREE.TextureLoader()
                const texture = loader.load(
                    'https://threejsfundamentals.org/threejs/resources/images/checker.png'
                )
                texture.wrapS = THREE.RepeatWrapping
                texture.wrapT = THREE.RepeatWrapping
                texture.magFilter = THREE.NearestFilter
                const repeats = planeSize / 2
                texture.repeat.set(repeats, repeats)

                const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize)
                const planeMat = new THREE.MeshPhongMaterial({
                    map: texture,
                    side: THREE.DoubleSide,
                })
                const mesh = new THREE.Mesh(planeGeo, planeMat)
                mesh.rotation.x = Math.PI * -0.5
                scene.add(mesh)
            }

            {
                const skyColor = 0xb1e1ff // light blue
                const groundColor = 0xb97a20 // brownish orange
                const intensity = 1
                const light = new THREE.HemisphereLight(
                    skyColor,
                    groundColor,
                    intensity
                )
                scene.add(light)
            }

            {
                const color = 0xffffff
                const intensity = 1
                const light = new THREE.DirectionalLight(color, intensity)
                light.position.set(0, 10, 0)
                light.target.position.set(-5, 0, 0)
                scene.add(light)
                scene.add(light.target)
            }

            {
                const objLoader = new OBJLoader()
                objLoader.load(
                    'static/models/obj/3D Model ประแจจีน.obj',
                    (root) => {
                        scene.add(root)
                    }
                )
                // const onProgress = function (xhr) {
                //     if (xhr.lengthComputable) {
                //         const percentComplete = (xhr.loaded / xhr.total) * 100
                //         console.log(
                //             Math.round(percentComplete, 2) + '% downloaded'
                //         )
                //     }
                // }

                // const onError = function () {}
                // const manager = new THREE.LoadingManager()
                // manager.addHandler(/\.dds$/i, new DDSLoader())
                // new MTLLoader(manager)
                //     .setPath('static/models/obj/')
                //     .load('3D Model ประแจจีน.mtl', function (materials) {
                //         materials.preload()

                //         new OBJLoader(manager)
                //             .setMaterials(materials)
                //             .setPath('static/models/obj/')
                //             .load(
                //                 '3D Model ประแจจีน.obj',
                //                 function (object) {
                //                     object.position.y = -95
                //                     scene.add(object)
                //                 },
                //                 onProgress,
                //                 onError
                //             )
                //     })
            }

            // function resizeRendererToDisplaySize(renderer) {
            //     const canvas = renderer.domElement
            //     const width = '500px'
            //     const height = '500px'
            //     const needResize =
            //         canvas.width !== width || canvas.height !== height
            //     if (needResize) {
            //         renderer.setSize(width, height, false)
            //     }
            //     return needResize
            // }

            function render() {
                // if (resizeRendererToDisplaySize(renderer)) {
                //     const canvas = renderer.domElement
                //     camera.aspect = canvas.clientWidth / canvas.clientHeight
                //     camera.updateProjectionMatrix()
                // }

                renderer.render(scene, camera)

                requestAnimationFrame(render)
            }

            requestAnimationFrame(render)
        }

        main()

        return {}
    },
}
</script>

<style scoped>
#c {
    width: 100%;
    height: 100%;
    display: block;
}
</style>
