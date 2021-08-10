<template>
    <div class="container">
        <div class="title">
            <div class="group-title">
                <sup class="sup"><p>Gallery</p></sup>
                <h1 class="customText">DIGITAL ART</h1>
                <sub class="sub"><h5>SCULTURE</h5></sub>
            </div>
        </div>
        <div class="content">
            <div class="map">
                <img :src="pictureHover" />
            </div>
            <div class="content-view">
                <div
                    v-for="(item, index) in data"
                    :key="index"
                    class="image-view"
                    @mouseover="hoverImage(index)"
                    @click.stop="onHandleClick(item.id)"
                >
                    <img :src="item.path" width="570" />
                    <div class="overlay">
                        <div class="text">
                            <p class="text-title">{{ item.title }}</p>
                            <div class="sub-text">
                                <p>
                                    <img
                                        :src="
                                            require('../../assets/images/icons/user.png')
                                        "
                                        width="20"
                                        class="hover-img"
                                    />
                                    {{ item.author }}
                                </p>
                                <p>{{ item.group }}</p>
                            </div>
                            <span>{{ item.discription }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
export default {
    setup() {
        const data = ref([
            {
                id: 1,
                path: require('../../assets/images/gallery/Image 49.svg'),
                title: 'INNOVATION ART 4',
                author: 'POOM JAI ARTIST',
                group: 'POOM JAI ART GROUP',
                discription:
                    'โครงการ “Chula Art Town” เป็นความร่วมมือกันระหว่างสำนักงานจัดการทรัพย์สิน จุฬาลงกรณ์มหาวิทยาลัย (PMCU), บริษัท อุไรพาณิชย์ จำกัด และ ATM Spray ซึ่งให้การสนับสนุนอุปกรณ์สีสำหรับสร้างสรรค์ผลงาน เนื่องในวาระครบรอบ 36 ปี ของคณะศิลปกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย',
            },
            {
                id: 2,
                path: require('../../assets/images/gallery/Image 49.svg'),
                title: 'aaa',
                author: 'aaa',
                group: 'aaa',
                discription:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident aliquid impedit, placeat minima eos laborum modi. Recusandae natus distinctio aut reprehenderit tempora accusamus possimus quaerat soluta! Voluptas ad in a!',
            },
            {
                id: 3,
                path: require('../../assets/images/gallery/Image 49.svg'),
                title: 'aaa',
                author: 'aaa',
                group: 'aaa',
                discription:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident aliquid impedit, placeat minima eos laborum modi. Recusandae natus distinctio aut reprehenderit tempora accusamus possimus quaerat soluta! Voluptas ad in a!',
            },
            {
                id: 4,
                path: require('../../assets/images/gallery/Image 49.svg'),
                title: 'aaa',
                author: 'aaa',
                group: 'aaa',
                discription:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident aliquid impedit, placeat minima eos laborum modi. Recusandae natus distinctio aut reprehenderit tempora accusamus possimus quaerat soluta! Voluptas ad in a!',
            },
            {
                id: 5,
                path: require('../../assets/images/gallery/Image 49.svg'),
                title: 'aaa',
                author: 'aaa',
                group: 'aaa',
                discription:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident aliquid impedit, placeat minima eos laborum modi. Recusandae natus distinctio aut reprehenderit tempora accusamus possimus quaerat soluta! Voluptas ad in a!',
            },
        ])

        const map = ref([
            { path: require('../../assets/images/gallery/Group 294.svg') },
            { path: require('../../assets/images/gallery/Image 49.svg') },
            { path: require('../../assets/images/gallery/Group 294.svg') },
            { path: require('../../assets/images/gallery/Group 294.svg') },
            { path: require('../../assets/images/gallery/Group 294.svg') },
        ])

        const position = ref(0)
        const router = useRouter()

        const hoverImage = (index) => {
            position.value = index
        }

        const onHandleClick = (id) => {
            router.push({ name: 'Gallery-id', params: { id } })
        }

        const pictureHover = computed(() => {
            return map.value[position.value].path
        })

        return {
            data: data.value,
            position: position.value,
            hoverImage,
            pictureHover,
            onHandleClick,
        }
    },
}
</script>

<style lang="scss" scoped>
.container {
    padding-top: var(--bs-gutter-x, 1.75rem);
    .title {
        font: size 25px;
        color: #ffffff;
        font-weight: bold;
        text-align: center;
        .group-title {
            width: fit-content;
            display: inline-block;
            .customText {
                letter-spacing: 0px;
                text-shadow: 1px 1px 1px white, 0 0 5px white, 0 0 5px white;
            }
            .sup {
                text-align: left;
            }
            .sub {
                text-align: right;
                color: #b61bff;
                text-shadow: 1px 1px 1px #b61bff, 0 0 5px #b61bff,
                    0 0 5px #b61bff;
            }
        }
    }
    .content {
        display: flex;
        justify-content: space-around;
        margin-top: 20px;
        .content-view {
            overflow-y: auto;
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none;
            max-height: 100vh;
            .image-view {
                position: relative;
            }
        }
        .overlay {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            height: 100%;
            width: 100%;
            opacity: 0;
            transition: 0.5s ease;
            background-color: #0c0c0c;
            .text {
                color: white;
                font-size: 14px;
                position: absolute;
                margin: 40px 40px 0 25px;
                font-weight: bold;
                // top: 50%;
                // left: 50%;
                // transform: translate(-50%, -50%);
                // -ms-transform: translate(-50%, -50%);
                text-align: center;

                span {
                    text-indent: 30%;
                    text-align: left;
                }

                .text-title {
                    margin-right: 25px;
                    color: #ba1bff;
                    font-size: 18px;
                    text-align: left;
                }

                .sub-text {
                    display: flex;
                    justify-content: left;
                    align-items: center;
                    p:nth-child(1) {
                        margin-right: 25px;
                        color: #ba1bff;
                    }
                }

                .hover-img {
                    filter: invert(19%) sepia(87%) saturate(4315%)
                        hue-rotate(276deg) brightness(103%) contrast(108%);
                }
            }
        }
        .image-view:hover > .overlay {
            opacity: 0.5;
            cursor: pointer;
        }
        .content-view::-webkit-scrollbar {
            display: none;
        }
    }
}
</style>
