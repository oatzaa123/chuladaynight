<template>
    <div class="section2">
        <div class="container">
            <div class="title">
                {{ $t('section2_title') }}
            </div>
        </div>

        <div class="content">
            <div v-for="i in 5" :key="i" class="star-group">
                <div class="blur"></div>
                <div class="star"></div>
            </div>
            <img
                :src="require('@/assets/images/home/section2/Group 654.svg')"
                class="map"
            />
            <div class="row">
                <div class="left-top col-6" :style="height">
                    <div class="logo">
                        <img
                            :src="
                                require('@/assets/images/home/section2/Group 812.png')
                            "
                        />
                        <p>
                            {{ $t('section2_leftTop') }}
                        </p>
                    </div>
                    <img
                        :src="
                            require('@/assets/images/home/section2/Path 61.svg')
                        "
                        class="path"
                        :style="pathHeight"
                    />
                </div>
                <div class="right-top col-6" :style="height">
                    <div class="logo">
                        <img
                            :src="
                                require('@/assets/images/home/section2/Group 809.png')
                            "
                        />
                        <p>
                            {{ $t('section2_rightTop') }}
                        </p>
                    </div>
                    <img
                        :src="
                            require('@/assets/images/home/section2/Path 50.svg')
                        "
                        class="path"
                        :style="pathHeight"
                    />
                </div>
            </div>

            <div class="row">
                <div class="left-bottom col-6" :style="height">
                    <img
                        :src="
                            require('@/assets/images/home/section2/Path 124.svg')
                        "
                        class="path"
                        :style="pathWidth"
                    />
                    <div class="logo">
                        <img
                            :src="
                                require('@/assets/images/home/section2/Group 811 copy.png')
                            "
                        />
                        <p>
                            {{ $t('section2_leftBottom') }}
                        </p>
                    </div>
                </div>
                <div class="right-bottom col-6" :style="height">
                    <img
                        :src="
                            require('@/assets/images/home/section2/Path 420.svg')
                        "
                        class="path"
                        :style="pathWidth"
                    />
                    <div class="logo">
                        <img
                            :src="
                                require('@/assets/images/home/section2/Group 810 copy.png')
                            "
                        />
                        <p>
                            {{ $t('section2_rightBottom') }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <!-- </div> -->
    </div>
</template>

<script>
import { onBeforeMount, computed, ref } from 'vue'
export default {
    setup() {
        var section2Height = ref('min-height: 100vh;')
        var height = ref('height: 500px;')
        var pathHeight = ref('max-height: 500px;')
        var pathWidth = ref('max-width: 500px;')

        const setHeight = () => {
            section2Height.value = `min-height: ${window.innerWidth / 1.5}px;`
            height.value = `height: ${window.innerWidth / 2.5}px`
            pathHeight.value = `max-height: ${window.innerWidth / 2.5 / 1.5}px`
            pathWidth.value = `max-width: ${window.innerWidth / 2.5 / 1.5}px`
        }

        window.addEventListener('resize', setHeight)

        onBeforeMount(() => {
            setHeight()
        })

        return {
            section2Height: computed(() => section2Height.value),
            height: computed(() => height.value),
            pathHeight: computed(() => pathHeight.value),
            pathWidth: computed(() => pathWidth.value),
        }
    },
}
</script>

<style lang="scss">
@import '../../assets/css/home/section2.scss';
</style>
