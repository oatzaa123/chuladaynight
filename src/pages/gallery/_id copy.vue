<template>
    <div class="gallery-bg">
        <img v-if="backgroundImage" :src="backgroundImage" alt="" />
        <img
            v-else
            :src="require('@/assets/images/home/section1/BACKGROUND@1X.png')"
            alt=""
        />
    </div>
    <div class="main-gallery-id" ref="formContainer">
        <div class="left-arrow">
            <button class="btn btn-light customButton" @click="onBackwardClick">
                <div class="arrow"></div>
                <div class="left"></div>
            </button>
        </div>
        <div class="right-arrow">
            <button class="btn btn-light customButton" @click="onForwardClick">
                <div class="arrow"></div>
                <div class="right"></div>
            </button>
        </div>
        <div class="container">
            <div class="title-sub-gallery">
                <div class="text-title">
                    <p>{{ data.title_th }}</p>
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
                        {{ data.author.name_th }}
                    </p>
                    <p>{{ data.author.group_th }}</p>
                </div>
            </div>
            <div class="live-view"></div>
            <div
                class="content-sub-gallery"
                v-for="gallery in data.content"
                :key="gallery"
            >
                <div class="modelView" v-if="gallery.contentType === 'Model'">
                    <Canvas :path="gallery.path" :name="gallery.contentValue" />
                </div>
                <div class="content-img" v-if="gallery.contentType === 'Image'">
                    <ImageView
                        :imagePath="gallery.path"
                        :imageName="gallery.contentValue"
                    />
                </div>
                <div
                    class="content-description"
                    v-if="gallery.contentType === 'Text'"
                >
                    <p>{{ gallery.contentValue_th }}</p>
                </div>
                <div class="showreel" v-if="gallery.contentType === 'Video'">
                    <div class="showreel-text">SHOWREEL</div>
                    <video class="video" height="500" controls muted loop>
                        <source
                            :src="getVideo(gallery.contentValue, gallery.path)"
                            type="video/mp4"
                        />
                    </video>
                </div>
            </div>
            <div class="gallery-footer">
                <img
                    v-if="data.author.image"
                    class="profile"
                    :src="
                        getImage(data.author.image.name, data.author.image.path)
                    "
                    height="120"
                />
                <!-- <ImageView
                    class="profile"
                    :style="{ height: '120px' }"
                    :imagePath="data.author.image.path"
                    :imageName="data.author.image.name"
                /> -->
                <img
                    v-else
                    class="profile"
                    :src="getImage('defaultuser.png', 'common')"
                    height="120"
                />
                <div class="footer-description">
                    <p>{{ data.author.name_th }}</p>
                    <p>{{ data.author.group_th }}</p>
                    <p>
                        <img
                            :src="
                                require('../../assets/images/icons/phone-icon-18-ffffff-16.png')
                            "
                            width="15"
                            class="hover-img"
                        />
                        {{ data.author.contact.phone }}
                    </p>
                    <div class="footer-icon">
                        <div class="footer-icon-img">
                            <img
                                :src="
                                    require('@/assets/images/icons/Group 327@2x.png')
                                "
                                width="35"
                                height="35"
                            />
                            <img
                                :src="
                                    require('@/assets/images/icons/Group 344@2x.png')
                                "
                                width="35"
                                height="35"
                            />
                            <img
                                :src="
                                    require('@/assets/images/icons/Group 328.svg')
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
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import Canvas from '@/components/3d/canvas'
import ImageView from '@/components/ImageView'
import { useLoading } from 'vue3-loading-overlay'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'
// import useGallery from '@/hooks/useGallery'
import axios from '@/configs/axios'
export default {
    name: 'Gallery-id',
    components: { Canvas, ImageView },
    async setup() {
        const router = useRouter()
        const route = useRoute()
        const store = useStore()
        // const { data, getOne, perviousPage, errorMessage } = useGallery()
        const gallery = ref(null)
        const isLoading = ref(false)
        let loader = useLoading()
        let formContainer = ref(null)

        try {
            // getOne(route.params.id)
            isLoading.value = true
            loader.show({
                // Optional parameters
                container: isLoading.value ? null : formContainer.value,
                canCancel: true,
                loader: 'dots',
            })
            const id = route.params.id
            const res = await axios.get(`/gallery/${id}`)
            gallery.value = res.data.data.gallery
            loader.hide()
        } catch (error) {
            loader.hide()
            throw new Error(error)
        }

        const getImage = (imageName, imagePath) => {
            return `${process.env.VUE_APP_PATH_IMAGE}/${imagePath}/${imageName}`
        }

        const getVideo = (videoName, videoPath) => {
            return `${process.env.VUE_APP_PATH_VIDEO}/${videoPath}/${videoName}`
        }

        const onForwardClick = async () => {
            const id = route.params.id
            try {
                // nextPage(id)
                const res = await axios.get(`/gallery/${id}/nextGallery`)
                gallery.value = res.data.data.gallery
                if (res.data.data) {
                    router.push({
                        name: 'Gallery-id',
                        params: { id: gallery.value._id },
                    })
                }
            } catch (error) {
                throw new Error(error)
            }
        }

        const onBackwardClick = async () => {
            const id = route.params.id
            try {
                // perviousPage(id)
                const res = await axios.get(`/gallery/${id}/perviousGallery`)
                gallery.value = res.data.data.gallery
                if (res.data.data) {
                    router.push({
                        name: 'Gallery-id',
                        params: { id: gallery.value._id },
                    })
                }
            } catch (error) {
                throw new Error(error)
            }
        }

        gallery.value.content.map((item) => {
            if (item.contentType === 'Image') {
                store.commit(
                    'setBackgroundImage',
                    getImage(item.contentValue, item.path)
                )
            }
        })

        return {
            data: computed(() => gallery.value),
            backgroundImage: computed(
                () => store.getters['showBackgroundImage']
            ),
            getImage,
            getVideo,
            onForwardClick,
            onBackwardClick,
            formContainer,
        }
    },
}
</script>

<style lang="scss">
@import '@/assets/css/container.scss';
.gallery-bg {
    position: absolute;
    left: 0;
    top: 0;
    filter: blur(6px);
    object-fit: cover;
    height: 100%;
    width: 100%;
    img {
        width: 100%;
        height: 100%;
    }
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
            .showreel-text {
                padding: 20px;
                color: #ba1bff;
            }
            video {
                width: 100%;
                object-fit: fill;
            }
            .content-img {
                img {
                    width: 100%;
                    object-fit: fill;
                    // height: 500px;
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
                position: relative;
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
                    position: absolute;
                    bottom: 5%;
                    display: flex;
                    .footer-icon-img {
                        // margin: 0 3px;
                        img {
                            cursor: pointer;
                            margin: 0 3px;
                        }
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
