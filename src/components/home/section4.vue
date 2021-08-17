<template>
    <div class="section4">
        <div class="left-arrow">
            <button @click.prevent="onBackwardClick" class="btn customButton">
                <div class="arrow"></div>
                <div class="left"></div>
            </button>
        </div>
        <div class="right-arrow">
            <button @click.prevent="onForwardClick" class="btn customButton">
                <div class="arrow"></div>
                <div class="right"></div>
            </button>
        </div>
        <div class="container">
            <div class="row" style="margin: 0px 16px">
                <!-- <CarouselSlide
          v-slot:default="{ blocksCurrent }"
          :slideCurrent="slideCurrent"
          :blocks="blocks"
        >
          <div
            class="col-sm"
            v-for="(block, index) in blocksCurrent"
            :key="index"
          >
            <img :src="block.path" />
          </div>
        </CarouselSlide> -->
                <splide :options="slideOptions">
                    <splide-slide
                        v-for="slide in blocks"
                        :key="slide.index"
                        class="slide-items"
                    >
                        <div class="img col-sm">
                            <img
                                @click="onPageChanged(slide.id)"
                                :src="slide.path"
                            />
                        </div>
                    </splide-slide>
                </splide>
                <div class="row pt-5 content">
                    <div class="col">
                        <div class="group-content">
                            <h1 class="customText">ART 4 C</h1>
                            <sub class="sub"><p>WORKSHOP</p></sub>
                        </div>
                    </div>
                    <div class="col">
                        <p class="customDiscription">
                            โครงการ “Chula Art Town”
                            เป็นความร่วมมือกันระหว่างสำนักงานจัดการทรัพย์สิน
                            จุฬาลงกรณ์มหาวิทยาลัย (PMCU), บริษัท อุไรพาณิชย์
                            จำกัด และ ATM Spray
                            ซึ่งให้การสนับสนุนอุปกรณ์สีสำหรับสร้างสรรค์ผลงาน
                        </p>
                        <button
                            class="btn btn-outline-primary"
                            @click="onPageChanged"
                        >
                            more
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import CarouselSlide from "@/components/slide/carouselSlide";
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/splide/dist/css/themes/splide-default.min.css'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
    components: {
        // CarouselSlide,
        Splide,
        SplideSlide,
    },
    setup() {
        const router = useRouter()
        const blocks = ref([
            { path: require('@/assets/images/workshop/image-workshop.png') },
            { path: require('../../assets/images/gallery/Image 49.svg') },
            { path: require('@/assets/images/workshop/image-workshop.png') },
            { path: require('../../assets/images/gallery/Group 294.svg') },
            { path: require('../../assets/images/gallery/Group 294.svg') },
        ])
        const slideOptions = ref({
            type: 'loop',
            perPage: 3,
            rewind: true,
            pagination: false,
            autoplay: true,
            gap: '1rem',
            classes: {
                prev: 'splide__arrow--prev section4-prev',
                next: 'splide__arrow--next section4-next',
            },
        })
        // const slideCurrent = ref(0);
        const onForwardClick = () => {
            let next = document.getElementsByClassName('section4-next')
            next[0].click()
            //   if (slideCurrent.value > blocks.value.length) {
            //     slideCurrent.value = 0;
            //     return;
            //   }
            //   slideCurrent.value++;
        }

        const onBackwardClick = () => {
            let prev = document.getElementsByClassName('section4-prev')
            prev[0].click()
            //   if (slideCurrent.value <= 1) {
            //     slideCurrent.value = blocks.value.length;
            //     return;
            //   }
            //   slideCurrent.value--;
        }

        const onPageChanged = (id = null) => {
            if (typeof id === Number) {
                router.push({ name: 'Workshop-id', params: { id } })
            } else {
                router.push({ name: 'Workshop' })
            }
        }

        return {
            onForwardClick,
            onBackwardClick,
            onPageChanged,
            //   slideCurrent: computed(() => slideCurrent.value),
            blocks: blocks.value,
            slideOptions,
        }
    },
}
</script>

<style lang="scss">
@import '../../assets/css/home/section4.scss';
</style>
