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
        galleryList: [
            {
                id: '1aa',
                path: require('@/assets/images/gallery/Image 25@4X.png'),
                title: 'INNOVATION ART 4',
                author: 'POOM JAI ARTIST',
                group: 'POOM JAI ART GROUP',
                description:
                    'โครงการ “Chula Art Town” เป็นความร่วมมือกันระหว่างสำนักงานจัดการทรัพย์สิน จุฬาลงกรณ์มหาวิทยาลัย (PMCU), บริษัท อุไรพาณิชย์ จำกัด และ ATM Spray ซึ่งให้การสนับสนุนอุปกรณ์สีสำหรับสร้างสรรค์ผลงาน เนื่องในวาระครบรอบ 36 ปี ของคณะศิลปกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย',
            },
            {
                id: '2ww',
                path: require('@/assets/images/gallery/Image 12@4X.png'),
                title: 'CHULA FAHMAI',
                author: 'aaa',
                group: 'aaa',
                description:
                    'โครงการ Chula Art Town เป็นความร่วมมือกันระหว่างสำนักงานจัดการทรัพย์สิน จุฬาลงกรณ์มหาวิทยาลัย (PMCU), บริษัท อุไรพาณิชย์ จำกัด และ ATM Sprayซึ่งให้การสนับสนุนอุปกรณ์สีสำหรับสร้างสรรค์ผลงานเนื่องในวาระครบรอบ 36 ปี ของคณะศิลปกรรมศาสตร์จุฬาลงกรณ์มหาวิทยาลัย โครงการ Chula Art Townเป็นความร่วมมือกันระหว่างสำนักงานจัดการทรัพย์สินจุฬาลงกรณ์มหาวิทยาลัย (PMCU), บริษัท อุไรพาณิชย์ จำกัดและ ATM Sprayซึ่งให้การสนับสนุนอุปกรณ์สีสำหรับสร้างสรรค์ผลงานเนื่องในวาระครบรอบ 36 ปี ของคณะศิลปกรรมศาสตร์จุฬาลงกรณ์มหาวิทยาลัย',
            },
            {
                id: '3qq',
                path: require('@/assets/images/gallery/Image 51@4X.png'),
                title: 'aaa',
                author: 'aaa',
                group: 'aaa',
                description:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident aliquid impedit, placeat minima eos laborum modi. Recusandae natus distinctio aut reprehenderit tempora accusamus possimus quaerat soluta! Voluptas ad in a!',
            },
            {
                id: '4vv',
                path: require('@/assets/images/gallery/Image 23@4X.png'),
                title: 'aaa',
                author: 'aaa',
                group: 'aaa',
                description:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident aliquid impedit, placeat minima eos laborum modi. Recusandae natus distinctio aut reprehenderit tempora accusamus possimus quaerat soluta! Voluptas ad in a!',
            },
            {
                id: '5gg',
                path: require('@/assets/images/gallery/Image 11@4X.png'),
                title: 'aaa',
                author: 'aaa',
                group: 'aaa',
                description:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident aliquid impedit, placeat minima eos laborum modi. Recusandae natus distinctio aut reprehenderit tempora accusamus possimus quaerat soluta! Voluptas ad in a!',
            },
        ],
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
        showGalleryList(state) {
            return state.galleryList
        },
    },
    modules: {},
})
