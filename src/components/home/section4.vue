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
                <CarouselSlide
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
                </CarouselSlide>
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
                        <button class="btn btn-outline-primary">more</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CarouselSlide from '@/components/slide/carouselSlide'
import { ref, computed } from 'vue'
export default {
    components: {
        CarouselSlide,
    },
    setup() {
        const blocks = ref([
            { path: require('@/assets/images/workshop/image-workshop.png') },
            { path: require('../../assets/images/gallery/Image 49.svg') },
            { path: require('@/assets/images/workshop/image-workshop.png') },
            { path: require('../../assets/images/gallery/Group 294.svg') },
            { path: require('../../assets/images/gallery/Group 294.svg') },
        ])
        const slideCurrent = ref(0)
        const onForwardClick = () => {
            if (slideCurrent.value > blocks.value.length) {
                slideCurrent.value = 0
                return
            }
            slideCurrent.value++
        }

        const onBackwardClick = () => {
            if (slideCurrent.value <= 1) {
                slideCurrent.value = blocks.value.length
                return
            }
            slideCurrent.value--
        }

        return {
            onForwardClick,
            onBackwardClick,
            slideCurrent: computed(() => slideCurrent.value),
            blocks: blocks.value,
        }
    },
}
</script>

<style lang="scss">
.section4 {
    background-color: #0c0c0c;
    min-height: 100vh;
    padding: 3rem;
    position: relative;
    .container {
        padding-top: var(--bs-gutter-x, 5rem);
        overflow-y: unset;
        max-height: unset;
        .content {
            color: #fff;
            .group-content {
                width: fit-content;
                display: inline-block;
                .customText {
                    font-family: 'Kanit-Regular';
                    font-size: 71px;
                    font-weight: 900;
                    letter-spacing: 0px;
                    text-shadow: 1px 1px 1px white, 0 0 2px white, 0 0 5px white;
                }
                .sub {
                    font-family: 'Prompt';
                    font-size: 36px;
                    color: #b61bff;
                    text-align: right;
                    text-align: right;
                    color: #b61bff;
                    text-shadow: 1px 1px 1px #b61bff, 0 0 2px #b61bff,
                        0 0 5px #b61bff;
                }
            }
            .customDiscription {
                font-family: 'Roboto-Bold';
                font-size: 14px;
            }
            .btn-outline-primary {
                border-radius: 20px;
                color: #e17cff;
                border: 1px solid #e17cff;
                width: 187px;
                height: 37px;
                &:hover {
                    background-color: transparent;
                }
            }
        }
    }
    img {
        width: 100%;
        height: 328px;
    }
    .left-arrow {
        position: absolute;
        left: 3%;
        top: 50%;
    }
    .right-arrow {
        position: absolute;
        right: 3%;
        top: 50%;
    }
    .customButton {
        background-color: #7948e6;
        color: #ffffff;
        border-radius: 100%;
        // border: none;
        position: relative;
        width: 48px;
        height: 48px;
        .arrow {
            border: 0.5px solid white;
            width: 28px;
            position: absolute;
        }
        .left {
            border: solid white;
            position: absolute;
            border-width: 0 2px 2px 0;
            padding: 4px;
            transform: rotate(135deg);
            -webkit-transform: rotate(135deg);
            top: 19px;
        }
        .right {
            border: solid white;
            position: absolute;
            border-width: 2px 0px 0px 2px;
            padding: 4px;
            transform: rotate(135deg);
            -webkit-transform: rotate(135deg);
            top: 19px;
            right: 17%;
        }
    }
}
</style>
