<template>
    <div class="left-arrow" :style="customClassLeft">
        <button
            @click.prevent="onBackwardClick"
            class="btn btn-light customButton"
        >
            <div class="arrow"></div>
            <div class="left"></div>
        </button>
        <slot name="left-text" />
    </div>
    <slot name="middle-button"></slot>
    <div class="right-arrow" :style="customClassRight">
        <slot name="right-text" />
        <button
            @click.prevent="onForwardClick"
            class="btn btn-light customButton"
        >
            <div class="arrow"></div>
            <div class="right"></div>
        </button>
    </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
export default {
    props: ['customClassLeft', 'customClassRight', 'data', 'name'],
    emits: ['show'],
    setup(props, { emit }) {
        const router = useRouter()
        const route = useRoute()

        const onForwardClick = () => {
            const id = route.params.id
            const currentIndex = props.data.findIndex(
                (item) => item.id.toString() === id
            )

            if (
                props.data[parseInt(currentIndex) + 1] &&
                props.data[parseInt(currentIndex) + 1].id
            ) {
                router.push({
                    name: props.name,
                    params: {
                        id: props.data[parseInt(currentIndex) + 1].id,
                    },
                })

                emit('show', [props.data[parseInt(currentIndex) + 1]])
            } else {
                router.push({
                    name: props.name,
                    params: { id: props.data[0].id },
                })

                emit('show', [props.data[0]])
            }
        }

        const onBackwardClick = () => {
            const id = route.params.id
            const currentIndex = props.data.findIndex(
                (item) => item.id.toString() === id
            )

            if (
                props.data[parseInt(currentIndex) - 1] &&
                props.data[parseInt(currentIndex) - 1].id
            ) {
                router.push({
                    name: props.name,
                    params: {
                        id: props.data[parseInt(currentIndex) - 1].id,
                    },
                })

                emit('show', [props.data[parseInt(currentIndex) - 1]])
            } else {
                router.push({
                    name: props.name,
                    params: {
                        id: props.data[props.data.length - 1].id,
                    },
                })

                emit('show', [props.data[props.data.length - 1]])
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
    border: none;
    position: relative;
    width: 48px;
    height: 48px;
    .arrow {
        border: 0.5px solid white;
        width: 28px;
        position: absolute;
    }
    .left {
        border: solid white;
        position: absolute;
        border-width: 0 2px 2px 0;
        padding: 4px;
        transform: rotate(135deg);
        -webkit-transform: rotate(135deg);
        top: 20px;
    }
    .right {
        border: solid white;
        position: absolute;
        border-width: 2px 0px 0px 2px;
        padding: 4px;
        transform: rotate(135deg);
        -webkit-transform: rotate(135deg);
        top: 20px;
        right: 20%;
    }
}
</style>
