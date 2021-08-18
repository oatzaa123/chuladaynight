<template>
    <div class="workshop">
        <div v-for="i in 2" :key="i" class="star-group">
            <div class="blur"></div>
            <div class="star"></div>
        </div>
        <div class="workshop-title">
            <h1>
                WORK SHOP
                <p class="n">Art</p>
            </h1>
        </div>
        <div class="container">
            <div class="row">
                <div
                    class="workshop-content col-6 col-md-4"
                    v-for="item in image"
                    :key="item"
                    @click.stop="onHandleClick(item.id)"
                >
                    <img :src="item.image" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
export default {
    setup() {
        const image = ref([
            {
                id: 1,
                image: require('@/assets/images/workshop/image-workshop.png'),
            },
            {
                id: 2,
                image: require('@/assets/images/workshop/image-workshop.png'),
            },
            {
                id: 3,
                image: require('@/assets/images/workshop/Image 50@4X.png'),
            },
            {
                id: 4,
                image: require('@/assets/images/workshop/image-workshop.png'),
            },
            {
                id: 5,
                image: require('@/assets/images/workshop/image-workshop.png'),
            },
            {
                id: 6,
                image: require('@/assets/images/workshop/image-workshop.png'),
            },
            {
                id: 7,
                image: require('@/assets/images/workshop/image-workshop.png'),
            },
            {
                id: 8,
                image: require('@/assets/images/workshop/image-workshop.png'),
            },
            {
                id: 9,
                image: require('@/assets/images/workshop/image-workshop.png'),
            },
            {
                id: 10,
                image: require('@/assets/images/workshop/image-workshop.png'),
            },
            {
                id: 11,
                image: require('@/assets/images/workshop/image-workshop.png'),
            },
            {
                id: 12,
                image: require('@/assets/images/workshop/image-workshop.png'),
            },
        ])

        const router = useRouter()
        const globalStore = inject('globalStore')

        globalStore.changeBackground(
            require('@/assets/images/BACKGROUND@2X.png')
        )

        const onHandleClick = (id) => {
            router.push({ name: 'Workshop-id', params: { id } })
        }

        return { image, onHandleClick }
    },
}
</script>

<style lang="scss">
@import '@/assets/css/container.scss';
@import '@/assets/css/workshop.scss';
</style>
