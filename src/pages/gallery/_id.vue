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
        <!-- <div class="container"> -->
        <div class="container-gallery">
            <div class="title-sub-gallery">
                <div class="text-title row">
                    <div class="col-12 col-md-9">
                        <p>
                            {{
                                $i18n.locale === 'th'
                                    ? data.title_th
                                    : data.title_en
                            }}
                        </p>
                    </div>
                    <div class="col-6 col-md-3">
                        <div class="d-flex mb-auto">
                            <div class="live" @click="isOpen = !isOpen">
                                <span
                                    class="dotted"
                                    :class="{ changeColor: boardCast }"
                                ></span>
                                <span :class="{ changeColor: boardCast }"
                                    >BOARDCAST</span
                                >
                                <span v-if="!boardCast">&nbsp; WATCH NOW</span>
                                <span v-else
                                    >&nbsp;
                                    {{ formatDate(boardCast, 'title') }}</span
                                >
                                <div class="dropdown" :class="{ open: isOpen }">
                                    <div class="triangle"></div>
                                    <div class="dropdown-title">BOARDCAST</div>
                                    <div class="dropdown-body">
                                        <div
                                            class="dropdown-group"
                                            :class="{
                                                selected: index === select,
                                            }"
                                            v-for="(i, index) in data.live
                                                .videos"
                                            :key="index"
                                            @click="
                                                ;(select = index),
                                                    (boardCast = i.liveTime)
                                            "
                                        >
                                            <span
                                                v-show="index === select"
                                                class="dotted"
                                                :style="{
                                                    position: 'absolute',
                                                    top: '15px',
                                                    left: '15px',
                                                }"
                                            ></span>
                                            {{ formatDate(i.liveTime, 'list') }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <img
                                @click="
                                    openUrl(
                                        `https://maps.googleapis.com/maps/api/streetview?parameters`,
                                        {
                                            lat: data.location.latitude,
                                            lng: data.location.longitude,
                                        }
                                    )
                                "
                                :src="
                                    require('../../assets/images/gallery/Group 848.svg')
                                "
                                width="30"
                            />
                            <img
                                @click="
                                    openUrl(
                                        `https://www.google.com/maps/search/?api=1&query=`,
                                        {
                                            lat: data.location.latitude,
                                            lng: data.location.longitude,
                                        }
                                    )
                                "
                                :src="
                                    require('../../assets/images/gallery/Group 128.svg')
                                "
                                width="30"
                            />
                        </div>
                        <div class="views-count">
                            <img
                                :src="
                                    require('../../assets/images/gallery/Group 804.svg')
                                "
                                width="12"
                                height="12"
                                class="mr-3"
                            />{{ data.countViews.toLocaleString() }} views
                        </div>
                    </div>
                </div>
                <div class="sub-text">
                    <p>
                        <img
                            :src="require('../../assets/images/icons/user.png')"
                            width="20"
                            class="hover-img"
                        />
                        {{
                            $i18n.locale === 'th'
                                ? data.author.name_th
                                : data.author.name_en
                        }}
                    </p>
                    <p>
                        {{
                            $i18n.locale === 'th'
                                ? data.author.group_th
                                : data.author.group_en
                        }}
                    </p>
                </div>
            </div>
            <div class="live-view" v-if="boardCast">
                <div v-for="i in data.live.videos" :key="i">
                    <video
                        class="video"
                        height="500"
                        controls
                        muted
                        loop
                        v-if="i.liveTime === boardCast"
                    >
                        <source
                            :src="getVideo(i.name, i.path)"
                            type="video/mp4"
                        />
                    </video>
                </div>
            </div>
            <div
                class="content-sub-gallery"
                v-for="gallery in data.content"
                :key="gallery"
            >
                <div class="modelView" v-if="gallery.contentType === 'Model'">
                    <Canvas :path="gallery.path" :name="gallery.contentValue" />
                    <div class="icon-360"></div>
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
                    <p>
                        {{
                            $i18n.locale === 'th'
                                ? gallery.contentValue_th
                                : gallery.contentValue_en
                        }}
                    </p>
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
                    <p>
                        {{
                            $i18n.locale === 'th'
                                ? data.author.name_th
                                : data.author.name_en
                        }}
                    </p>
                    <p>
                        {{
                            $i18n.locale === 'th'
                                ? data.author.group_th
                                : data.author.group_en
                        }}
                    </p>
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
                                @click="
                                    openUrl(
                                        'https://www.facebook.com',
                                        data.author.contact.facebook.trim()
                                    )
                                "
                                :src="
                                    require('@/assets/images/icons/Group 327@2x.png')
                                "
                                width="35"
                                height="35"
                            />
                            <img
                                @click="
                                    openUrl(
                                        'https://www.instagram.com',
                                        data.author.contact.instagram.trim()
                                    )
                                "
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
        <!-- </div> -->
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
import { formatMonth } from '@/helpers/formatDate'
import moment from 'moment'
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
        const boardCast = ref(null)
        const select = ref(null)
        const isOpen = ref(false)
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

        const openUrl = (url, value) => {
            console.log(`${url}/${value}`)
            if (typeof value === 'string') {
                window.open(`${url}/${value}`, '_blank')
            } else {
                window.open(`${url}${value.lat},${value.lng}`, '_blank')
            }
        }

        const formatDate = (date, type) => {
            const newDate = moment(new Date(date)).format('YYYY-MM-DD HH:mm')
            return type === 'title'
                ? `${newDate.split('-')[2].split(' ')[0]} ${formatMonth(
                      newDate.split('-')[1]
                  )} ${newDate.split('-')[0]}`
                : `${newDate.split('-')[2].split(' ')[0]} ${formatMonth(
                      newDate.split('-')[1]
                  )} ${newDate.split('-')[0]} at ${newDate.split(' ')[1]}`
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
            openUrl,
            select,
            isOpen,
            boardCast: boardCast.value,
            formatDate,
        }
    },
}
</script>

<style lang="scss">
@import '@/assets/css/gallery_id.scss';
</style>
