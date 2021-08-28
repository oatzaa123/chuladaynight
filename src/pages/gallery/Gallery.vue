<template>
    <div class="container">
        <div class="title">
            <div class="group-title">
                <sup class="sup"><p>Gallery</p></sup>
                <h1 class="customText">DIGITAL ART</h1>
                <sub class="sub"><h5>SCULTURE</h5></sub>
            </div>
        </div>
        <div class="content" v-if="data.Gallery">
            <div class="map">
                <div class="mappin">
                    <div
                        class="pin"
                        v-for="(i, index) in data.Gallery.length"
                        :key="index"
                    >
                        <img
                            v-if="position === index"
                            :src="
                                require('@/assets/images/gallery/Group 295.svg')
                            "
                        />
                        <img
                            v-else
                            :src="
                                require('@/assets/images/gallery/Group 295 (1).svg')
                            "
                        />
                    </div>
                    <img
                        class="map-img"
                        :src="
                            require('../../assets/images/gallery/Group 828 (1).svg')
                        "
                    />
                </div>
            </div>
            <div class="content-view">
                <div
                    v-for="(item, index) in data.Gallery"
                    :key="index"
                    class="image-view"
                    @mouseover="hoverImage(index)"
                    @click.stop="onHandleClick(item._id)"
                >
                    <img
                        :src="
                            getImage(item.coverImage.name, item.coverImage.path)
                        "
                        width="570"
                        height="336"
                    />
                    <div class="overlay">
                        <div class="text">
                            <p class="text-title">
                                {{
                                    $i18n.locale === 'th'
                                        ? item.title_th
                                        : item.title_en
                                }}
                            </p>
                            <div class="sub-text">
                                <p>
                                    <img
                                        :src="
                                            require('../../assets/images/icons/user.png')
                                        "
                                        width="20"
                                        class="hover-img"
                                    />
                                    {{
                                        $i18n.locale === 'th'
                                            ? item.author.name_th
                                            : item.author.name_en
                                    }}
                                </p>
                                <p>
                                    {{
                                        $i18n.locale === 'th'
                                            ? item.author.group_th
                                            : item.author.group_en
                                    }}
                                </p>
                            </div>
                            <span>{{
                                $i18n.locale === 'th'
                                    ? item.shortDescription_th
                                    : item.shortDescription_en
                            }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, inject } from 'vue'
import { useRouter } from 'vue-router'
import useGallery from '@/hooks/useGallery'
export default {
    setup() {
        const globalStore = inject('globalStore')
        const { data, getAll, errorMessage } = useGallery()

        try {
            getAll()
        } catch (error) {
            throw new Error(errorMessage)
        }

        const getImage = (imageName, imagePath) => {
            return `${process.env.VUE_APP_PATH_IMAGE}/${imagePath}/${imageName}`
        }

        const position = ref(0)
        const router = useRouter()

        const hoverImage = (index) => {
            position.value = index
        }

        const onHandleClick = (id) => {
            router.push({ name: 'Gallery-id', params: { id } })
        }

        const setBackgroundImage = () => {
            globalStore.changeBackground(
                require('@/assets/images/home/section1/Rectangle 47.png')
            )
        }

        setBackgroundImage()

        return {
            data,
            position: computed(() => position.value),
            hoverImage,
            onHandleClick,
            getImage,
        }
    },
}
</script>

<style lang="scss">
@import '@/assets/css/gallery.scss';
</style>
