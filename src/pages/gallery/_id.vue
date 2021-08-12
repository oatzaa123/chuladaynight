<template>
    <div class="main-gallery-id">
        <div class="left-arrow">
            <button
                @click.prevent="onBackwardClick"
                class="btn btn-light customButton"
            >
                <div class="arrow"></div>
                <div class="left"></div>
            </button>
        </div>
        <div class="right-arrow">
            <button
                @click.prevent="onForwardClick"
                class="btn btn-light customButton"
            >
                <div class="arrow"></div>
                <div class="right"></div>
            </button>
        </div>
        <div class="container" v-for="item in data" :key="item.id">
            <div class="title-sub-gallery">
                <div class="text-title">
                    <p>{{ item.title }}</p>
                    <div class="d-flex mb-auto">
                        <div class="live">
                            <span class="dotted"></span>
                            <span>BOARDCAST</span>
                            <span>&nbsp; WATCH NOW</span>
                        </div>
                        <img
                            :src="
                                require('../../assets/images/gallery/Group 128.svg')
                            "
                            width="30"
                        />
                    </div>
                </div>
                <div class="sub-text">
                    <p>
                        <img
                            :src="require('../../assets/images/icons/user.png')"
                            width="20"
                            class="hover-img"
                        />
                        {{ item.author }}
                    </p>
                    <p>{{ item.group }}</p>
                </div>
            </div>
            <div class="live-view"></div>
            <div
                class="content-sub-gallery"
                v-for="gallery in item.content"
                :key="gallery"
            >
                <div class="content-img">
                    <img :src="gallery.image" />
                </div>
                <div class="content-description">
                    <p>{{ gallery.description }}</p>
                </div>
            </div>
            <div class="showreel"></div>
            <div class="gallery-footer">
                <img
                    class="profile"
                    :src="
                        require('../../assets/images/gallery/Image 44@3X.png')
                    "
                    height="120"
                />
                <div class="footer-description">
                    <p>{{ item.author }}</p>
                    <p>{{ item.group }}</p>
                    <p>
                        <img
                            :src="
                                require('../../assets/images/icons/phone-icon-18-ffffff-16.png')
                            "
                            width="15"
                            class="hover-img"
                        />
                        {{ item.phone }}
                    </p>
                    <div class="footer-icon">
                        <div
                            class="footer-icon-img"
                            v-for="item in ['1', '2', '3', '4', '5']"
                            :key="item"
                        >
                            <img
                                :src="
                                    require('../../assets/images/icons/Group 327@2x.png')
                                "
                                width="35"
                                height="35"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import useRoute from './../../hooks/useRoute'
import { computed, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default {
    name: 'Gallery-id',
    setup() {
        const router = useRouter()
        const route = useRoute()
        const store = useStore()

        const data = computed(() => {
            return store.getters['showGalleryList']
        })

        const gallery = ref([])

        const onForwardClick = () => {
            const id = route.params.id
            const currentIndex = data.value.findIndex(
                (item) => item.id.toString() === id
            )

            if (
                data.value[parseInt(currentIndex) + 1] &&
                data.value[parseInt(currentIndex) + 1].id
            ) {
                router.push({
                    name: 'Gallery-id',
                    params: { id: data.value[parseInt(currentIndex) + 1].id },
                })

                gallery.value = [data.value[parseInt(currentIndex) + 1]]
            } else {
                router.push({
                    name: 'Gallery-id',
                    params: { id: data.value[0].id },
                })

                gallery.value = [data.value[0]]
            }
        }

        const onBackwardClick = () => {
            const id = route.params.id
            const currentIndex = data.value.findIndex(
                (item) => item.id.toString() === id
            )

            if (
                data.value[parseInt(currentIndex) - 1] &&
                data.value[parseInt(currentIndex) - 1].id
            ) {
                router.push({
                    name: 'Gallery-id',
                    params: { id: data.value[parseInt(currentIndex) - 1].id },
                })

                gallery.value = [data.value[parseInt(currentIndex) - 1]]
            } else {
                router.push({
                    name: 'Gallery-id',
                    params: { id: data.value[data.value.length - 1].id },
                })

                gallery.value = [data.value[data.value.length - 1]]
            }
        }

        onMounted(() => {
            gallery.value = data.value.filter(
                (item) => item.id === route.params.id
            )
        })

        return {
            onForwardClick,
            onBackwardClick,
            data: gallery,
        }
    },
}
</script>

<style lang="scss">
@import '@/assets/css/container.scss';
.default {
    background-image: url('../../assets/images/gallery/Image 44.svg') !important;
    // background-repeat: no-repeat !important;
    // background-size: 100% !important;
    // background-position: center !important;
    // backdrop-filter: blur(14px) !important;
    // -webkit-backdrop-filter: blur(14px) !important;
}

.main-gallery-id {
    font-family: 'Kanit-Regular';
    .container::-webkit-scrollbar {
        display: none;
    }
    .container {
        background-image: url('../../assets/images/gallery/BACKGROUND.svg') !important;
        .title-sub-gallery {
            margin: 0 35px;
            .text-title {
                display: flex;
                justify-content: space-between;
                margin-right: 25px;
                text-align: left;
                font-size: 12px;
                p:nth-child(1) {
                    color: #ffffff;
                    font-size: 32px;
                    font-weight: bold;
                }
                img {
                    margin-left: 10px;
                    filter: invert(24%) sepia(50%) saturate(4728%)
                        hue-rotate(280deg) brightness(111%) contrast(119%);
                }
                .live {
                    border: 1px solid white;
                    padding: 0.375rem 0.75rem;
                    border-radius: 50px;
                    margin-bottom: auto;
                    span:nth-child(2) {
                        color: #e17cff;
                    }
                    span:nth-child(3) {
                        color: #ffffff;
                    }
                    .dotted {
                        height: 10px;
                        width: 10px;
                        background-color: #f61bff;
                        border-radius: 50%;
                        display: inline-block;
                        border: 1px solid white;
                        margin-right: 5px;
                    }
                }
            }
            .sub-text {
                display: flex;
                justify-content: left;
                align-items: center;
                p:nth-child(1) {
                    margin-right: 25px;
                    color: #ba1bff;
                }
                p:nth-child(2) {
                    color: #ffffff;
                }
            }
            .hover-img {
                filter: invert(19%) sepia(87%) saturate(4315%)
                    hue-rotate(276deg) brightness(103%) contrast(108%);
            }
        }
        .content-sub-gallery,
        .live-view,
        .showreel {
            .content-img {
                img {
                    width: 100%;
                }
            }
            .content-description {
                font-size: 14px;
                margin: 25px 40px;
                color: #ffffff;
            }
        }
        .gallery-footer {
            display: flex;
            margin: 25px 40px;
            .profile {
                margin-right: 25px;
            }
            .footer-description {
                font-size: 14px;
                color: #ffffff;
                p {
                    margin-bottom: 0;
                }
                p:nth-child(1) {
                    font-size: 20px;
                    font-weight: bold;
                    color: #ba1bff;
                }
                p:nth-child(3) {
                    margin-bottom: 10px;
                    img {
                        margin: auto;
                    }
                }
                .footer-icon {
                    display: flex;
                    .footer-icon-img {
                        margin: 0 3px;
                    }
                }
            }
        }
    }
    position: relative;
    .left-arrow {
        position: fixed;
        left: 5%;
        top: 50%;
    }
    .right-arrow {
        position: fixed;
        right: 5%;
        top: 50%;
    }
    .customButton {
        background-color: #7948e6;
        color: #ffffff;
        border-radius: 100%;
        border: none;
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
            top: 20px;
        }
        .right {
            border: solid white;
            position: absolute;
            border-width: 2px 0px 0px 2px;
            padding: 4px;
            transform: rotate(135deg);
            -webkit-transform: rotate(135deg);
            top: 20px;
            right: 20%;
        }
    }
}
</style>
