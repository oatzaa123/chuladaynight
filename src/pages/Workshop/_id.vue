<template>
    <div class="main-workshop-id">
        <div class="row" v-for="item in data" :key="item._id">
            <div class="col-12 col-md-8">
                <img
                    v-if="item.image"
                    class="workshop-img"
                    :src="getImage(item.image.name, item.image.path)"
                />
            </div>
            <div
                class="
                    workshop-content
                    col-6 col-md-4
                    d-flex
                    align-items-center
                    justify-content-center
                "
            >
                <div>
                    <h1>
                        {{
                            $i18n.locale === 'th'
                                ? item.title_th
                                : item.title_en
                        }}
                    </h1>
                    <p>
                        {{
                            $i18n.locale === 'th'
                                ? item.description_th
                                : item.description_en
                        }}
                    </p>
                    <p>
                        {{ $t('workshop_location') }}
                        {{
                            $i18n.locale === 'th'
                                ? item.locationName_th
                                : item.locationName_en
                        }}
                    </p>
                    <p>
                        {{ $t('workshop_contact') }} <br />
                        {{ item.contact.telephone }}
                    </p>
                </div>
                <div class="icon">
                    <img
                        @click="
                            openUrl(
                                `https://www.google.com/maps/search/?api=1&query=`,
                                {
                                    lat: item.contact.location.latitude,
                                    lng: item.contact.location.longitude,
                                }
                            )
                        "
                        :src="require('@/assets/images/gallery/Group 128.svg')"
                        width="40"
                        height="40"
                    />
                    <div class="icon-img">
                        <img
                            :src="
                                require('@/assets/images/icons/Group 327@2x.png')
                            "
                            width="40"
                            height="40"
                            @click="
                                openUrl(
                                    'https://www.facebook.com',
                                    item.contact.facebook.trim()
                                )
                            "
                        />
                        <img
                            :src="
                                require('@/assets/images/icons/Group 344@2x.png')
                            "
                            width="40"
                            height="40"
                            @click="
                                openUrl(
                                    'https://www.instagram.com',
                                    item.contact.instagram.trim()
                                )
                            "
                        />
                        <img
                            :src="
                                require('@/assets/images/icons/Group 328.svg')
                            "
                            width="40"
                            height="40"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs, inject } from 'vue'
import { useRoute } from 'vue-router'
import useWorkshop from '@/hooks/useWorkshop'
export default {
    setup() {
        const state = reactive({
            icon: [
                {
                    path: require('@/assets/images/icons/Group 327@2x.png'),
                    url: 'https://www.facebook.com',
                },
                {
                    path: require('@/assets/images/icons/Group 344@2x.png'),
                    url: 'https://www.instagram.com',
                },
                {
                    path: require('@/assets/images/icons/Group 328.svg'),
                },
            ],
        })

        const globalStore = inject('globalStore')

        globalStore.changeBackground(
            require('@/assets/images/workshop/Rectangle 47@2x.png')
        )

        const route = useRoute()
        const { data, getOne, errorMessage } = useWorkshop()

        try {
            getOne(route.params.id)
        } catch (error) {
            throw new Error(errorMessage)
        }

        const getImage = (imageName, imagePath) => {
            return `${process.env.VUE_APP_PATH_IMAGE}/${imagePath}/${imageName}`
        }

        const openUrl = (url, value) => {
            console.log(`${url}/${value}`)
            if (typeof value === 'string') {
                window.open(`${url}/${value}`, '_blank')
            } else {
                window.open(`${url}${value.lat},${value.lng}`, '_blank')
            }
        }

        return {
            ...toRefs(state),
            data,
            getImage,
            openUrl,
        }
    },
}
</script>

<style lang="scss">
.main-workshop-id {
    font-family: 'Kanit-Regular';
    color: #ffffff;
    .workshop-img {
        width: 100%;
        height: 90vh;
    }
    .workshop-content {
        font-size: 14px;
        position: relative;
        h1 {
            margin-bottom: 2.5rem;
            font-size: 26;
            font-weight: bold;
        }
        p {
            margin-bottom: 2.5rem;
        }
    }
    .icon {
        position: absolute;
        bottom: 2%;
        display: flex;
        img:nth-child(1) {
            margin: 0 10px;
            cursor: pointer;
        }
        .icon-img {
            img {
                margin: 0 10px;
                cursor: pointer;
            }
        }
    }
}
</style>
