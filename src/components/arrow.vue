<template>
    <div class="left-arrow" :style="customClassLeft">
        <button @click.prevent="onBackwardClick" class="btn customButton">
            <div class="arrow"></div>
            <div class="left"></div>
        </button>
        <slot name="left-text" />
    </div>
    <slot name="middle-button"></slot>
    <div class="right-arrow" :style="customClassRight">
        <slot name="right-text" />
        <button @click.prevent="onForwardClick" class="btn customButton">
            <div class="arrow"></div>
            <div class="right"></div>
        </button>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from '@/configs/axios'
export default {
    props: ['customClassLeft', 'customClassRight', 'name'],
    async setup(props) {
        const router = useRouter()
        const route = useRoute()
        const news = ref(null)

        const onForwardClick = async () => {
            const id = route.params.id
            try {
                // nextPage(id)
                const res = await axios.get(`/news/${id}/nextNews`)
                news.value = res.data.data.news
                if (res.data.data) {
                    router.push({
                        name: props.name,
                        params: { id: news.value._id },
                    })
                }
            } catch (error) {
                throw new Error(error)
            }
        }

        const onBackwardClick = async () => {
            const id = route.params.id
            try {
                // perviousPage(id)
                const res = await axios.get(`/news/${id}/perviousNews`)
                news.value = res.data.data.news
                if (res.data.data) {
                    router.push({
                        name: props.name,
                        params: { id: news.value._id },
                    })
                }
            } catch (error) {
                throw new Error(error)
            }
        }

        return {
            onForwardClick,
            onBackwardClick,
        }
    },
}
</script>

<style lang="scss">
.left-arrow {
    position: fixed;
    left: 5%;
    top: 50%;
}
.right-arrow {
    position: fixed;
    right: 5%;
    top: 50%;
}
.customButton {
    background-color: #7948e6;
    color: #ffffff;
    border-radius: 100%;
    // border: none;
    position: relative;
    width: 48px;
    height: 48px;
    .arrow {
        border: 0.5px solid white;
        width: 25px;
        position: absolute;
    }
    .left {
        border: solid white;
        position: absolute;
        border-width: 0 2px 2px 0;
        padding: 4px;
        transform: rotate(135deg);
        -webkit-transform: rotate(135deg);
        top: 19px;
    }
    .right {
        border: solid white;
        position: absolute;
        border-width: 2px 0px 0px 2px;
        padding: 4px;
        transform: rotate(135deg);
        -webkit-transform: rotate(135deg);
        top: 19px;
        right: 22%;
    }
}

@media screen and (max-width: 426px) {
    .customButton {
        width: 30px;
        height: 30px;
        .arrow {
            border: 0.5px solid white;
            width: 7px;
            position: absolute;
        }
        .left {
            border: solid white;
            position: absolute;
            border-width: 0 2px 2px 0;
            padding: 2px;
            transform: rotate(135deg);
            -webkit-transform: rotate(135deg);
            top: 11.5px;
        }
        .right {
            border: solid white;
            position: absolute;
            border-width: 2px 0px 0px 2px;
            padding: 2px;
            transform: rotate(135deg);
            -webkit-transform: rotate(135deg);
            top: 11.5px;
            right: 23%;
        }
    }
}
</style>
