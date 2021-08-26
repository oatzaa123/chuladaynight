<template>
    <div class="news">
        <div class="container" @scroll="scroll($event)" ref="formContainer">
            <!-- <div class="dot" :style="dot"></div> -->
            <div class="news-title">
                <h1>
                    NEWS & EVENT
                    <p class="n">Art</p>
                </h1>
            </div>
            <div
                class="new-content"
                v-for="item in data"
                :key="item"
                @click="seeDetail(item._id)"
            >
                <div class="row">
                    <div class="col-5 col-sm-5 new-img">
                        <ImageView
                            v-if="item.coverImage"
                            :imagePath="item.coverImage.path"
                            :imageName="item.coverImage.name"
                        />
                    </div>
                    <div class="new-content-text col-7 col-sm-7">
                        <span>{{ formatDate(item.createdAt) }}</span>
                        <h3>
                            {{
                                $i18n.locale === 'th'
                                    ? item.title_th
                                    : item.title_en
                            }}
                        </h3>
                        <div v-for="news in item.content" :key="news">
                            <p v-if="news.contentType === 'Text'">
                                {{
                                    $i18n.locale === 'th'
                                        ? news.contentValue_th
                                        : news.contentValue_en
                                }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div
                    class="paginate-left col-5 col-sm-5"
                    :class="[parent ? 'parent' : '']"
                ></div>
                <div class="col-7 col-sm-7 paginate-right">
                    <Paginate
                        v-show="!parent"
                        :totalItems="totalItems"
                        :pageLimit="pageLimit"
                        pageNeighbours="1"
                        :onPageChanged="onPageChanged"
                    />
                    <router-link to="/News">
                        <button class="btn btn-custom" v-if="parent">
                            {{ $t('news_btn') }} &#8594;
                        </button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { inject, onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useLoading } from 'vue3-loading-overlay'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'
import Paginate from '@/components/paginate'
import axios from '@/configs/axios'
import moment from 'moment'
import ImageView from '@/components/ImageView'
// import useAxios from '@/hooks/useAxios'
export default {
    components: {
        Paginate,
        ImageView,
    },
    props: {
        limit: {
            type: Number,
            default: 5,
        },
        parent: {
            type: String,
            default: null,
        },
    },
    async setup(props) {
        const globalStore = inject('globalStore')
        const currentPage = ref(null)
        const totalPages = ref(null)
        const router = useRouter()
        const content = ref(null)
        const isLoading = ref(false)
        let loader = useLoading()
        let formContainer = ref(null)

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
            const response = await axios.get(
                `/news?page=${currentPage.value || 1}&limit=${props.limit}`
            )
            content.value = response.data.data
            isLoading.value = false
            loader.hide()
        } catch (error) {
            loader.hide()
            throw new Error(error)
        }

        const setBackgroundImage = () => {
            globalStore.changeBackground(
                // require("@/assets/images/BACKGROUND@2X.png")
                require('@/assets/images/home/section1/Rectangle 47.png')
            )
        }

        var dot = ref({ top: 145 })

        const onPageChanged = async (data) => {
            const {
                currentPage: cPage,
                totalPages: totalPage,
                pageLimit,
            } = data
            isLoading.value = true
            const currentData = await axios.get(
                `/news?page=${cPage}&limit=${pageLimit}`
            )
            isLoading.value = false
            currentPage.value = cPage
            totalPages.value = totalPage
            content.value = currentData.data.data
        }

        const scroll = (e) => {
            if (e.target.scrollTop >= 125) {
                dot = { top: e.target.scrollTop }
            } else {
                dot = { top: 145 }
            }
        }

        const seeDetail = (id) => {
            router.push({ name: 'News-id', params: { id } })
        }

        const formatDate = (date) => {
            return moment(date).locale('th').format('LL')
        }

        return {
            data: computed(() => content.value.News),
            totalItems: content.value.totalItems,
            totalPages: totalPages.value,
            currentPage: currentPage.value,
            pageLimit: props.limit,
            onPageChanged,
            scroll,
            dot: computed(() => dot.value),
            seeDetail,
            formatDate,
            isLoading: isLoading.value,
            formContainer,
        }
    },
}
</script>

<style lang="scss">
@import '@/assets/css/container.scss';
@import '@/assets/css/news.scss';
.news {
    .container {
        padding-top: var(--bs-gutter-x, 0);
        overflow-y: unset;
        max-height: unset;
        .btn-custom {
            position: relative;
            font-size: 15px;
            font-family: 'Prompt';
            border-radius: 20px;
            background-color: #7948e6;
            color: #fff;
            border: 1px solid #7948e6;
            padding: 8px 15px;
            &::before {
                content: '';
                position: absolute;
                top: 15px;
                left: -32px;
                width: 10px;
                height: 10px;
                border: 3px solid #ba1bff;
                border-width: none;
                border-radius: 50%;
                background: #ba1bff;
            }
        }
    }
}
</style>
