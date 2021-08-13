<template>
    <div class="workshop">
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
import { ref, inject, onMounted } from 'vue'
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

        const setBackgroundImage = () => {
            globalStore.changeBackground(
                require('@/assets/images/home/section1/Rectangle 47.png')
            )
        }

        onMounted(() => {
            setBackgroundImage()
        })

        const onHandleClick = (id) => {
            router.push({ name: 'Workshop-id', params: { id } })
        }

        return { image, onHandleClick }
    },
}
</script>

<style lang="scss">
@import '@/assets/css/container.scss';
.workshop {
    .workshop-title {
        padding-bottom: 2rem;
        h1 {
            position: relative;
            font-size: 58px;
            font-weight: 600;
            color: #ffffff;
            text-align: center;
            letter-spacing: 0px;
            text-shadow: 1px 1px 1px white, 0 0 5px white, 0 0 5px white;
        }
        .n {
            position: absolute;
            font-family: 'Savoye Regular';
            font-weight: 100;
            color: #b61bff;
            left: 55.8%;
            font-size: 60px;
            top: 35%;
            text-shadow: none;
        }
    }
    .container {
        padding-top: var(--bs-gutter-x, 0);
        .workshop-content {
            margin: 5px -5px;
            img {
                width: 100%;
                height: 100%;
                image-rendering: auto;
                image-rendering: pixelated;
            }
            img:hover {
                cursor: pointer;
            }
        }
    }
}
</style>
