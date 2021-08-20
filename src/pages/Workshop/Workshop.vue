<template>
    <div class="workshop" v-if="workshop">
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
                    v-for="item in workshop.Workshop"
                    :key="item._id"
                    @click.stop="onHandleClick(item._id)"
                >
                    <img
                        v-if="item.coverImage"
                        :src="getImage(item.coverImage)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { inject } from 'vue'
import { useRouter } from 'vue-router'
import useWorkshop from '@/hooks/useWorkshop'
export default {
    setup() {
        const router = useRouter()
        const globalStore = inject('globalStore')
        const { data, getAll, errorMessage } = useWorkshop()

        try {
            getAll()
        } catch (error) {
            throw new Error(errorMessage)
        }

        const getImage = (imageName) => {
            return `http://localhost:5000/images/${imageName}`
        }

        globalStore.changeBackground(
            require('@/assets/images/BACKGROUND@2X.png')
        )

        const onHandleClick = (id) => {
            router.push({ name: 'Workshop-id', params: { id } })
        }

        return {
            workshop: data,
            onHandleClick,
            getImage,
        }
    },
}
</script>

<style lang="scss">
@import '@/assets/css/container.scss';
@import '@/assets/css/workshop.scss';
</style>
