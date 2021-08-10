import { createStore } from 'vuex'

export default createStore({
    state: {
        menuList: [
            { name: 'Home', path: '/' },
            { name: 'Gallery', path: '/Gallery' },
            { name: 'WorkShop', path: '/WorkShop' },
            { name: 'News', path: '/News' },
            { name: 'About', path: '/About' },
            { name: 'Contact', path: '/Contact' },
        ],
        isNight: true,
        rangeValue: 12,
    },
    mutations: {
        setRangeValue: (state, payload) => {
            state.rangeValue = payload
        },
        setIsNight: (state, payload) => {
            state.isNight = payload
        },
    },
    actions: {},
    getters: {
        showMenuList(state) {
            return state.menuList
        },
        showIsNight(state) {
            return state.isNight
        },
        showRangeValue(state) {
            return state.rangeValue
        },
    },
    modules: {},
})
