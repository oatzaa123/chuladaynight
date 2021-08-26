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
                    <h1>{{ item.title_th }}</h1>
                    <p>{{ item.description_th }}</p>
                    <p>สถานที่ {{ item.locationName_th }}</p>
                    <p>
                        ติดต่อสอบถามเพิ่มเติม <br />
                        {{ item.contact.telephone }}
                    </p>
                </div>
                <div class="icon">
                    <img
                        :src="require('@/assets/images/gallery/Group 128.svg')"
                        width="40"
                        height="40"
                    />
                    <div class="icon-img" v-for="item in icon" :key="item">
                        <img :src="item.path" width="40" height="40" />
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
                },
                {
                    path: require('@/assets/images/icons/Group 344@2x.png'),
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

        return {
            ...toRefs(state),
            data,
            getImage,
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
        }
        .icon-img {
            img {
                margin: 0 10px;
            }
        }
    }
}
</style>
