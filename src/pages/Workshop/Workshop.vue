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
                require('@/assets/images/BACKGROUND@2X.png')
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
    position: relative;
    .star-group {
        position: absolute;
        display: block;
        .blur {
            position: absolute;
            top: 0%;
            left: 0%;
            transform: translate(-50%, -50%);
            border-radius: 50%;
        }
        .star {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 50%;
        }

        &:nth-child(1) {
            top: -35px;
            left: -35px;
            width: 30px;
            height: 30px;
            opacity: 1;
            .blur {
                width: 200px;
                height: 100px;
                background: #ef1286;
                transform: rotate(45deg);
                filter: blur(30px);
                animation: animationblur_20 2s infinite;
            }
            .star {
                width: 20px;
                height: 20px;
                background: #ef1286;
                // animation: animationstar_20 1s infinite;
            }
        }

        &:nth-child(2) {
            top: 10%;
            left: 70%;
            width: 58px;
            height: 58px;
            opacity: 0.8;
            .blur {
                width: 58px;
                height: 58px;
                background: #ef1286;
                filter: blur(12px);
            }
            .star {
                width: 27px;
                height: 27px;
                background: #ef1286;
                filter: blur(6px);
                animation: animationstar_27 1s infinite;
            }
        }

        &:nth-child(3) {
            top: 65%;
            left: 18%;
            width: 30px;
            height: 30px;
            .blur {
                width: 30px;
                height: 30px;
                background: #e17cff;
                filter: blur(12px);
            }
            .star {
                width: 20px;
                height: 20px;
                background: #e17cff;
                filter: blur(1px);
                animation: animationstar_20 1s infinite;
            }
        }

        &:nth-child(4) {
            top: 75%;
            left: 52%;
            width: 30px;
            height: 30px;
            opacity: 0.6;
            .blur {
                width: 15px;
                height: 15px;
                background: #ef1286;
                filter: blur(4px);
            }
            .star {
                width: 10px;
                height: 10px;
                background: #ef1286;
                animation: animationstar_10 1s infinite;
            }
        }

        &:nth-child(5) {
            top: 65%;
            left: 82%;
            width: 30px;
            height: 30px;
            .blur {
                width: 30px;
                height: 30px;
                background: #ef1286;
                filter: blur(12px);
            }
            .star {
                width: 20px;
                height: 20px;
                background: #ef1286;
                filter: blur(1px);
                animation: animationstar_20 1s infinite;
            }
        }

        &:nth-child(6) {
            top: 89%;
            left: 27%;
            width: 30px;
            height: 30px;
            opacity: 0.6;
            .blur {
                width: 30px;
                height: 30px;
                background: #ef1286;
                filter: blur(12px);
            }
            .star {
                width: 20px;
                height: 20px;
                background: #ef1286;
                filter: blur(2px);
                animation: animationstar_20 1s infinite;
            }
        }

        &:nth-child(7) {
            top: 84%;
            left: 65%;
            width: 30px;
            height: 30px;
            opacity: 0.6;
            .blur {
                width: 30px;
                height: 30px;
                background: #ef1286;
                filter: blur(12px);
            }
            .star {
                width: 17px;
                height: 17px;
                background: #ef1286;
                filter: blur(1px);
                animation: animationstar_17 1s infinite;
            }
        }
    }
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
@keyframes animationstar_27 {
    0% {
        width: 27px;
        height: 27px;
    }
    50% {
        width: 17px;
        height: 17px;
    }
    100% {
        width: 27px;
        height: 27px;
    }
}

@keyframes animationstar_20 {
    0% {
        width: 20px;
        height: 20px;
    }
    50% {
        width: 10px;
        height: 10px;
    }
    100% {
        width: 20px;
        height: 20px;
    }
}

@keyframes animationblur_20 {
    0% {
        width: 100px;
        height: 50px;
    }
    50% {
        width: 200px;
        height: 170px;
    }
    100% {
        width: 100px;
        height: 50px;
    }
}

@keyframes animationstar_17 {
    0% {
        width: 17px;
        height: 17px;
    }
    50% {
        width: 12px;
        height: 12px;
    }
    100% {
        width: 17px;
        height: 17px;
    }
}

@keyframes animationstar_10 {
    0% {
        width: 10px;
        height: 10px;
    }
    50% {
        width: 5px;
        height: 5px;
    }
    100% {
        width: 10px;
        height: 10px;
    }
}
</style>
