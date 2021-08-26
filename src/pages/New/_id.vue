<template>
    <div class="news-id">
        <div class="container-news" ref="formContainer">
            <div class="news-id-img">
                <ImageView
                    v-if="newData.coverImage"
                    :imagePath="newData.coverImage.path"
                    :imageName="newData.coverImage.name"
                />
            </div>
            <div class="news-id-title">
                <div class="news-id-group-title">
                    <h1>
                        {{
                            $i18n.locale === 'th'
                                ? newData.title_th
                                : newData.title_en
                        }}
                    </h1>
                    <span>{{ formatDate(newData.createdAt) }}</span>
                </div>
            </div>
            <div
                class="news-id-content"
                v-for="content in newData.content"
                :key="content"
            >
                <div
                    class="news-id-content-text"
                    v-if="content.contentType === 'Text'"
                >
                    <p>
                        {{
                            $i18n.locale === 'th'
                                ? content.contentValue_th
                                : content.contentValue_en
                        }}
                    </p>
                </div>
                <div class="news-id-img" v-if="content.contentType === 'Image'">
                    <ImageView
                        v-if="content.contentValue"
                        :imagePath="content.path"
                        :imageName="content.contentValue"
                    />
                </div>
            </div>
        </div>
        <div class="news-id-footer">
            <Arrow
                name="News-id"
                :customClassLeft="customClassLeft"
                :customClassRight="customClassRight"
            >
                <template v-slot:left-text>
                    <span
                        style="
                            margin-left: 20px;
                            font-size: 18px;
                            font-weight: bold;
                            color: #fff;
                        "
                        >{{ $t('news_id_pervious') }}</span
                    >
                </template>

                <template v-slot:middle-button>
                    <button @click="onAllContent" class="btn-custom">
                        {{ $t('news_btn') }}
                    </button>
                </template>

                <template v-slot:right-text>
                    <span
                        style="
                            margin-right: 20px;
                            font-size: 18px;
                            font-weight: bold;
                            color: #fff;
                        "
                        >{{ $t('news_id_next') }}</span
                    >
                </template>
            </Arrow>
        </div>
    </div>
</template>

<script>
import { onMounted, inject, ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Arrow from '@/components/arrow'
import axios from '@/configs/axios'
import ImageView from '@/components/ImageView'
import moment from 'moment'
import { useLoading } from 'vue3-loading-overlay'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'
export default {
    name: 'News-id',
    components: {
        Arrow,
        ImageView,
    },
    async setup() {
        const globalStore = inject('globalStore')
        const router = useRouter()
        const route = useRoute()
        const isLoading = ref(false)
        const newData = ref([])
        let loader = useLoading()
        let formContainer = ref(null)
        const setBackgroundImage = () => {
            globalStore.changeBackground(
                require('@/assets/images/home/section1/Rectangle 47.png')
            )
        }

        onMounted(() => {
            setBackgroundImage()
        })

        try {
            isLoading.value = true
            loader.show({
                // Optional parameters
                container: isLoading.value ? null : formContainer.value,
                canCancel: true,
                loader: 'dots',
            })
            const response = await axios.get(`/news/${route.params.id}`)
            newData.value = response.data.data
            isLoading.value = false
            loader.hide()
        } catch (error) {
            loader.hide()
            throw new Error(error)
        }

        const customClassLeft = ref({
            position: 'unset',
            display: 'flex',
            alignItems: 'center',
        })
        const customClassRight = ref({
            position: 'unset',
            display: 'flex',
            alignItems: 'center',
        })

        const onAllContent = () => {
            router.push({ name: 'News' })
        }

        const formatDate = (date) => {
            return moment(date).locale('th').format('LL')
        }

        return {
            customClassLeft: customClassLeft.value,
            customClassRight: customClassRight.value,
            newData: computed(() => newData.value.news),
            onAllContent,
            formatDate,
            formContainer,
        }
    },
}
</script>

<style lang="scss">
@import '@/assets/css/container.scss';
.news-id {
    padding-top: 3rem;
    font-family: 'Kanit-Regular';
    position: relative;
    .container-news {
        width: 80%;
        margin: auto;
        padding-top: var(--bs-gutter-x, 3rem);
        padding-bottom: var(--bs-gutter-x, 3rem);
        overflow-y: unset;
        max-height: unset;
        background-image: url('./../../assets/images/gallery/BACKGROUND.svg') !important;
        .news-id-img {
            img {
                height: 100%;
                max-width: 100%;
                object-fit: scale-down;
            }
        }
        .news-id-title {
            .news-id-group-title {
                color: #fff;
                margin: 25px 40px;
                h1 {
                    font-size: 32px;
                    font-weight: bold;
                }
                span {
                    color: #ba1bff;
                    font-size: 12px;
                }
            }
        }
        .news-id-content {
            .news-id-content-text {
                font-size: 14px;
                font-weight: bold;
                margin: 25px 40px;
                color: #fff;
            }
        }
    }
    .news-id-footer {
        font-family: 'Prompt';
        padding-top: 3rem;
        padding-bottom: 10rem;
        display: flex;
        justify-content: space-between;
        .btn-custom {
            border-radius: 20px;
            background-color: #7948e6;
            color: #fff;
            border: 1px solid #7948e6;
            padding: 0px 20px;
            width: 160px;
            height: 40px;
        }
    }
}
</style>
