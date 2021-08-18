<template>
    <div class="section3">
        <!-- <div class="overlay"></div> -->
        <div class="sec3-img">
            <img :src="require('@/assets/images/gallery/Image 1@2x.png')" />
        </div>
        <div class="container">
            <div class="sec3-content row">
                <div class="col">
                    <div class="group-title">
                        <h1 class="customText">DIGITAL ART</h1>
                        <sub class="sub"><p>SCULTURE</p></sub>
                    </div>
                </div>
                <div class="col">
                    <div class="group-discription">
                        <h1>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</h1>
                        <p>
                            โครงการ “Chula Art Town”
                            เป็นความร่วมมือกันระหว่างสำนักงานจัดการทรัพย์สิน
                            จุฬาลงกรณ์มหาวิทยาลัย (PMCU), บริษัท อุไรพาณิชย์
                            จำกัด และ ATM Spray
                            ซึ่งให้การสนับสนุนอุปกรณ์สีสำหรับสร้างสรรค์ผลงาน
                            เนื่องในวาระครบรอบ 36 ปี ของคณะศิลปกรรมศาสตร์
                            จุฬาลงกรณ์มหาวิทยาลัย
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
import { useRouter } from 'vue-router'
export default {
    setup() {
        const router = useRouter()
        const onPageChanged = () => {
            router.push({ name: 'Gallery' })
        }
        return { onPageChanged }
    },
}
</script>

<style lang="scss">
.section3 {
    position: relative;
    min-height: 100vh;
    .overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: linear-gradient(
            360deg,
            #030024,
            #030024 30%,
            rgba(177, 158, 158, 0)
        );
        z-index: 2;
    }
    .sec3-img {
        width: 100%;
        max-width: 1520px;
        object-fit: cover;
        // height: 614px;
        overflow-x: scroll;
        overflow-y: auto;
        z-index: 3;
        // position: absolute;
        &::-webkit-scrollbar {
            display: none;
        }
    }
    .container {
        padding-top: var(--bs-gutter-x, 0);
        overflow-y: unset;
        max-height: unset;
        position: absolute;
        bottom: 0;
        left: 7%;
        z-index: 4;
        .sec3-content {
            // margin-bottom: 3rem;
            color: #fff;
            .group-discription {
                p {
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
            .group-title {
                width: fit-content;
                display: inline-block;
                .customText {
                    font-family: 'Prompt-Bold';
                    font-size: 67px;
                    font-weight: bold;
                    letter-spacing: 0px;
                    text-shadow: 1px 1px 1px white, 0 0 2px white, 0 0 5px white;
                }
                .sub {
                    font-family: 'Prompt';
                    font-size: 35px;
                    text-align: right;
                    color: #b61bff;
                    text-shadow: 1px 1px 1px #b61bff, 0 0 2px #b61bff,
                        0 0 5px #b61bff;
                }
            }
        }
    }
}
</style>
