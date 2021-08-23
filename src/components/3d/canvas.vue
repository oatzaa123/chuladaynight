<template>
    <canvas id="c"></canvas>
    <x-model
        class="obj3d model"
        src="static/models/obj/3D Model ประแจจีน.obj"
    ></x-model>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
// import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
// import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader.js'
export default {
    data() {
        return {
            // scene: null,
            // camera: null,
            // renderer: null,
            // controls: null,
            // keyLight: null,
            // fillLight: null,
            // backLight: null,
            // mtlLoader: null,
            // objLoader: null,
        }
    },
    methods: {
        async main() {
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
            controls.enableDamping = true
            controls.update()

            const scene = new THREE.Scene()
            // scene.background = new THREE.Color('black')

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
                await objLoader.load(
                    './../../assets/3d/windmill.obj',
                    (root) => {
                        console.log(root)
                        scene.add(root)
                    },
                    onProgress,
                    onError
                )
                const onProgress = (xhr) => {
                    if (xhr.lengthComputable) {
                        const percentComplete = (xhr.loaded / xhr.total) * 100
                        console.log(
                            Math.round(percentComplete, 2) + '% downloaded'
                        )
                    }
                }

                const onError = () => {
                    console.log('xxx')
                }

                // const manager = new THREE.LoadingManager()
                // manager.addHandler(/\.dds$/i, new DDSLoader())
                // new MTLLoader()
                //     .setPath('/public/static/models/obj/')
                //     .load('3D Model ประแจจีน.mtl', (materials) => {
                //         materials.preload()

                //         new OBJLoader()
                //             .setMaterials(materials)
                //             .setPath('/public/static/models/obj/')
                //             .load(
                //                 'windmill.obj',
                //                 (object) => {
                //                     scene.add(object)
                //                 },
                //                 onProgress,
                //                 onError
                //             )
                //     })
            }

            function resizeRendererToDisplaySize(renderer) {
                const canvas = renderer.domElement
                const width = canvas.clientWidth
                const height = canvas.clientHeight
                const needResize =
                    canvas.width !== width || canvas.height !== height
                if (needResize) {
                    renderer.setSize(width, height, false)
                }
                return needResize
            }

            function render() {
                if (resizeRendererToDisplaySize(renderer)) {
                    const canvas = renderer.domElement
                    camera.aspect = canvas.clientWidth / canvas.clientHeight
                    camera.updateProjectionMatrix()
                }

                renderer.render(scene, camera)

                requestAnimationFrame(render)
            }

            requestAnimationFrame(render)
        },
        // onInit() {
        //     this.scene = new THREE.Scene()

        //     this.camera = new THREE.PerspectiveCamera(
        //         75,
        //         window.innerWidth / window.innerHeight,
        //         0.1,
        //         1000
        //     )
        //     this.camera.position.z = 200

        //     this.renderer = new THREE.WebGLRenderer()
        //     this.renderer.setSize(window.innerWidth, window.innerHeight)
        //     document.body.appendChild(this.renderer.domElement)

        //     this.controls = new OrbitControls(
        //         this.camera,
        //         this.renderer.domElement
        //     )
        //     this.controls.enableDamping = true
        //     this.controls.dampingFactor = 0.25
        //     this.controls.enableZoom = true

        //     this.keyLight = new THREE.DirectionalLight(
        //         new THREE.Color('hsl(30, 100%, 75%)'),
        //         1.0
        //     )
        //     this.keyLight.position.set(-100, 0, 100)

        //     this.fillLight = new THREE.DirectionalLight(
        //         new THREE.Color('hsl(240, 100%, 75%)'),
        //         0.75
        //     )
        //     this.fillLight.position.set(100, 0, 100)

        //     this.backLight = new THREE.DirectionalLight(0xffffff, 1.0)
        //     this.backLight.position.set(100, 0, -100).normalize()

        //     this.scene.add(this.keyLight)
        //     this.scene.add(this.fillLight)
        //     this.scene.add(this.backLight)

        //     this.mtlLoader = new MTLLoader()
        //     this.mtlLoader.setTexturePath('@/assets/3d/3D Model ประแจจีน.mtl')
        //     this.mtlLoader.setPath('@/assets/3d/3D Model ประแจจีน.mtl')
        //     this.mtlLoader.load('3D Model ประแจจีน.mtl', function (materials) {
        //         materials.preload()

        //         this.objLoader = new OBJLoader()
        //         this.objLoader.setMaterials(materials)
        //         this.objLoader.setPath('@/assets/3d/3D Model ประแจจีน.obj')
        //         this.objLoader.load('3D Model ประแจจีน.obj', function (object) {
        //             this.scene.add(object)
        //             object.position.y -= 60
        //         })
        //     })
        // },
        // animate() {
        //     requestAnimationFrame(this.animate)
        //     this.controls.update()
        //     this.renderer.render(this.scene, this.camera)
        // },
    },
    mounted() {
        // window.requestAnimationFrame(this.animate)
        this.main()
        // this.animate()
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
