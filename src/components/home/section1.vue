<template>
    <div class="home">
        <div class="animation-cloud" v-if="!isNight"></div>
        <div class="section1" :class="{ bgnight: isNight }">
            <div
                class="overlay"
                :class="{ show: showLang }"
                @click="showLang = false"
            ></div>
            <div class="lang">
                <div @click.stop="showLang = !showLang">
                    <span>{{ lang.toUpperCase() }}</span>
                </div>
                <div class="menu-lang" :class="{ show: showLang }">
                    <div
                        @click="saveLocale('th')"
                        @click.stop="showLang = false"
                    >
                        <input
                            type="radio"
                            id="th"
                            value="th"
                            v-model="$i18n.locale"
                        />TH
                    </div>
                    <div
                        @click="saveLocale('en')"
                        @click.stop="showLang = false"
                    >
                        <input
                            type="radio"
                            id="en"
                            value="en"
                            v-model="$i18n.locale"
                        />EN
                    </div>
                </div>
            </div>

            <div class="logo-block">
                <div class="left">
                    <div class="logo">
                        <img
                            width="450"
                            :src="
                                require('../../assets/images/home/section1/newbg/logo@2x.png')
                            "
                        />
                        <div
                            class="toggle"
                            :class="{ day: !isNight, night: isNight }"
                        >
                            <div class="day" @click="bgToggle(false)">DAY</div>
                            <div class="">&</div>
                            <div class="night" @click="bgToggle(true)">
                                NIGHT
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <router-link
                        :to="{ path: item.path }"
                        v-for="item in Menu"
                        :key="item.key"
                        class="menu-link"
                    >
                        <div>{{ $t(item.name) }}</div>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="sub-section1">
            <!-- <img
                :src="
                    require('../../assets/images/home/section1/L_DN2N_20202@2xx.png')
                "
            />
            <img
                :style="widthRange"
                :src="
                    require('../../assets/images/home/section1/L_DN2_20202@2xx.png')
                "
            /> -->

            <!-- <img
                src="https://cdn4.iconfinder.com/data/icons/hand-touch-gesture/64/hand_touch_gesture_slide_left_right_vertical-512.png"
                :style="leftRange"
                style="
                    width: 70px;
                    background: rgba(100, 100, 100, 0.5);
                    padding: 10px;
                    border-radius: 30px;
                    height: 70px;
                    position: absolute;
                    top: 50%;
                    transform: translate(-50%, -50%);
                "
            /> -->

            <div class="d-flex">
                <div
                    class="img-border"
                    :class="[isNight ? 'isNight' : null]"
                    @click="bgToggle(!isNight)"
                ></div>

                <div class="img-night"></div>
            </div>

            <div class="img-day" :style="widthRange"></div>

            <div class="tag-toggle" v-if="isNight">
                <div class="d-flex">
                    <div class="allTags">
                        <div class="tag"></div>
                        <div class="tags"></div>
                    </div>
                    <span class="dayTime" @click="bgToggle(false)"
                        >Day Time</span
                    >
                </div>
            </div>

            <div class="tag-toggle-reverse" v-else>
                <div class="d-flex">
                    <span class="nightTime" @click="bgToggle(true)"
                        >Night Time</span
                    >
                    <div class="allTags">
                        <div class="tag"></div>
                        <div class="tags"></div>
                    </div>
                </div>
            </div>

            <!-- <div class="slide-bar">
                <span class="slide-text">&lt; เลื่อน &gt;</span>
                <input
                    type="range"
                    class="points"
                    name="points"
                    min="0"
                    max="24"
                    step="1"
                    v-model="rangeValue"
                    :style="rangeStyle"
                />
            </div>

            <div
                class="slide-dash"
                :style="dashStyle"
                draggable="true"
                @dragstart="dragstart()"
            ></div> -->
        </div>
    </div>
</template>

<script>
import { reactive, watch, onBeforeMount, toRefs, computed } from 'vue'
import { useStore } from 'vuex'
export default {
    setup() {
        const state = reactive({
            // rangeValue: 12,
            rangeStyle: '',
            dashStyle: '',
            widthRange: '',
            leftRange: '',
            Menu: [
                { name: 'menu_Home', path: '/Home' },
                { name: 'menu_Gallery', path: '/Gallery' },
                { name: 'menu_WorkShop', path: '/WorkShop' },
                { name: 'menu_News', path: '/News' },
                { name: 'menu_About', path: '/About' },
                { name: 'menu_Contact', path: '/Contact' },
            ],
            lang:
                localStorage.getItem('locale') ||
                process.env.VUE_APP_I18N_LOCALE,
            showLang: false,
        })

        const store = useStore()

        const getTime = () => {
            var day = range(6, 17)
            var night = [...range(18, 24), ...range(0, 5)]
            var hour = new Date().getHours()
            var value = 0

            if (night.includes(hour)) {
                value = 5
            }

            if (day.includes(hour)) {
                value = 95
            }

            state.rangeStyle = `background: linear-gradient(to right, #b51bff 0%, #b51bff ${value}%, #fff ${value}%, #fff 100%);`
            state.widthRange = `width: ${value}%;`
            state.leftRange = `left: ${value}%;`
            state.dashStyle = `left: ${value}%;`

            setTimeout(() => {
                getTime()
            }, 1000 * 60 * 60)
        }

        const bgToggle = (boolean) => {
            console.log(boolean)
            store.commit('setIsNight', boolean)
        }

        const dragstart = () => {
            document.addEventListener(
                'dragover',
                function (e) {
                    e = e || window.event
                    var dragX = e.pageX
                    var value = (dragX * 100) / window.innerWidth
                    state.dashStyle = `left: ${value}%;`
                    state.widthRange = `width: ${value}%;`
                    state.leftRange = `left: ${value}%;`
                },
                false
            )
        }

        const range = (start, end) => {
            return Array(end - start + 1)
                .fill()
                .map((_, idx) => start + idx)
        }

        const setLang = (lang) => {
            console.log(`lang: ${lang}`)
            // <input type="text" class="inputlang" v-model="$i18n.locale" />
        }

        onBeforeMount(() => {
            getTime()
        })

        watch(
            () => store.getters['showRangeValue'],
            (rangeValue) => {
                var value = ((rangeValue - 0) / (24 - 0)) * 100
                state.rangeStyle = `background: linear-gradient(to right, #b51bff 0%, #b51bff ${value}%, #fff ${value}%, #fff 100%);`
                state.widthRange = `width: ${value}%;`
                state.leftRange = `left: ${value}%;`
                if (rangeValue >= 6 && rangeValue <= 18) {
                    bgToggle(false)
                } else {
                    bgToggle(true)
                }
            }
        )

        watch(
            () => store.getters['showIsNight'],
            (isNight) => {
                if (isNight) {
                    state.leftRange = `left: 5%;`
                    state.widthRange = `width: 5%;`
                } else {
                    state.leftRange = `left: 95%;`
                    state.widthRange = `width: 95%;`
                }
            }
        )

        const saveLocale = (lang) => {
            localStorage.setItem('locale', lang)
            state.lang = lang.toUpperCase()
        }

        return {
            ...toRefs(state),
            bgToggle,
            dragstart,
            setLang,
            rangeValue: computed({
                get() {
                    return store.getters['showRangeValue']
                },
                set(newValue) {
                    // set something
                    store.commit('setRangeValue', newValue)
                },
            }),
            isNight: computed(() => store.getters['showIsNight']),
            saveLocale,
        }
    },
}
</script>

<style lang="scss">
@import '../../assets/css/home/section1.scss';
</style>
