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
    </div>
</template>

<script>
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/splide/dist/css/themes/splide-default.min.css'
import { reactive, toRefs } from 'vue'
export default {
    components: {
        Splide,
        SplideSlide,
    },
    setup() {
        const state = reactive({
            slides: [
                {
                    src: require('../../assets/images/home/section1/L_DN2N_20202.png'),
                },
                {
                    src: require('../../assets/images/home/section1/L_DN2N_20202.png'),
                },
                {
                    src: require('../../assets/images/home/section1/L_DN2N_20202.png'),
                },
                {
                    src: require('../../assets/images/home/section1/L_DN2N_20202.png'),
                },
                {
                    src: require('../../assets/images/home/section1/L_DN2N_20202.png'),
                },
                {
                    src: require('../../assets/images/home/section1/L_DN2N_20202.png'),
                },
                {
                    src: require('../../assets/images/home/section1/L_DN2N_20202.png'),
                },
                {
                    src: require('../../assets/images/home/section1/L_DN2N_20202.png'),
                },
            ],
            slideOptions: {
                type: 'loop',
                perPage: 5,
                rewind: true,
                pagination: false,
                breakpoints: {
                    768: {
                        perPage: 3,
                    },
                },
            },
        })

        return {
            ...toRefs(state),
        }
    },
}
</script>

<style lang="scss">
@import '../../assets/css/home/section6.scss';
</style>
