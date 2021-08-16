<template>
    <div class="news-id">
        <div class="container" v-for="item in newData" :key="item.id">
            <div class="news-id-img">
                <img :src="item.titleImage" />
            </div>
            <div class="news-id-title">
                <div class="news-id-group-title">
                    <h1>{{ item.titleText }}</h1>
                    <span>{{ item.newsDate }}</span>
                </div>
            </div>
            <div
                class="news-id-content"
                v-for="content in item.content"
                :key="content"
            >
                <div
                    class="news-id-content-text"
                    v-if="content.contentType === 'text'"
                >
                    <p>{{ content.contentText }}</p>
                </div>
                <div class="news-id-img" v-if="content.contentType === 'image'">
                    <img :src="content.contentText" />
                </div>
            </div>
        </div>
        <div class="news-id-footer">
            <Arrow
                @show="onSetValue"
                name="News-id"
                :data="data"
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
                        >ข่าวก่อนหน้า</span
                    >
                </template>

                <template v-slot:middle-button>
                    <button @click="onAllContent" class="btn-custom">
                        ดูข่าวสารทั้งหมด
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
                        >ข่าวถัดไป</span
                    >
                </template>
            </Arrow>
        </div>
    </div>
</template>

<script>
import { onMounted, inject, ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import Arrow from '@/components/arrow'
export default {
    name: 'News-id',
    components: {
        Arrow,
    },
    setup() {
        const globalStore = inject('globalStore')
        const router = useRouter()
        const route = useRoute()
        const store = useStore()
        const data = computed(() => store.getters['showNewsList'])
        const newData = ref([])
        const setBackgroundImage = () => {
            globalStore.changeBackground(
                require('@/assets/images/home/section1/Rectangle 47.png')
            )
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

        const onSetValue = (val) => {
            newData.value = val
        }

        onMounted(() => {
            newData.value = data.value.filter(
                (item) => item.id.toString() === route.params.id
            )
            setBackgroundImage()
        })

        return {
            customClassLeft: customClassLeft.value,
            customClassRight: customClassRight.value,
            data: data.value,
            newData,
            onAllContent,
            onSetValue,
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
    .container {
        padding-top: var(--bs-gutter-x, 0);
        overflow-y: unset;
        max-height: unset;
        background-image: url('./../../assets/images/gallery/BACKGROUND.svg') !important;
        .news-id-img {
            img {
                height: 448px;
                width: 100%;
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
        padding-top: 3rem;
        display: flex;
        justify-content: space-between;
        .btn-custom {
            border-radius: 20px;
            background-color: #7948e6;
            color: #fff;
            border: 1px solid #7948e6;
            padding: 10px 20px;
        }
    }
}
</style>
