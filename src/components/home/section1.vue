<template>
    <div class="home">
        <div class="animation-cloud"></div>
        <div class="section1" :class="{ bgnight: isNight }">
            <div v-for="i in 7" :key="i" class="star-group">
                <div class="blur"></div>
                <div class="star"></div>
            </div>
            <div
                class="overlay"
                :class="{ show: showLang }"
                @click="showLang = false"
            ></div>
            <div class="lang">
                <div @click.stop="showLang = !showLang">
                    <span>{{ lang }}</span>
                </div>
                <!-- &nbsp;|&nbsp;
                <div @click="saveLocale('en')">
                    <input
                        type="radio"
                        id="en"
                        value="en"
                        v-model="$i18n.locale"
                    />
                    EN
                </div> -->
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
                        <div class="title">CHULA</div>
                        <div class="sub">DIGITAL ARTS PARK</div>
                    </div>
                    <div
                        class="toggle"
                        :class="{ day: !isNight, night: isNight }"
                    >
                        <div
                            class="day"
                            :class="{ active: !isNight }"
                            @click="bgToggle(false)"
                        >
                            DAY
                        </div>
                        <div class="n">&</div>
                        <div
                            class="night"
                            :class="{ active: isNight }"
                            @click="bgToggle(true)"
                        >
                            NIGHT
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
            <img
                :src="
                    require('../../assets/images/home/section1/L_DN2_20202.png')
                "
            />
            <img
                :style="widthRange"
                :src="
                    require('../../assets/images/home/section1/L_DN2N_20202.png')
                "
            />
            <img
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
            />

            <div class="slide-bar">
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
            ></div>
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
            // isNight: true,
            Menu: [
                { name: 'menu_Home', path: '/Home' },
                { name: 'menu_Gallery', path: '/Gallery' },
                { name: 'menu_WorkShop', path: '/WorkShop' },
                { name: 'menu_News', path: '/News' },
                { name: 'menu_About', path: '/About' },
                { name: 'menu_Contact', path: '/Contact' },
            ],
            lang:
                localStorage.getItem('locale').toUpperCase() ||
                process.env.VUE_APP_I18N_LOCALE,
            showLang: false,
        })

        const store = useStore()

        const getTime = () => {
            var day = range(6, 17)
            var night = [...range(18, 24), ...range(1, 5)]
            var hour = new Date().getHours()
            var value = 0

            if (night.includes(hour)) {
                let key = Object.keys(night).filter((i) => night[i] == hour)
                value = ((parseInt(key[0]) + 1) / 12) * 100
            }

            if (day.includes(hour)) {
                let key = Object.keys(day).filter((i) => day[i] == hour)
                value = 100 - ((parseInt(key[0]) + 1) / 12) * 100
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
