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
                profile: require('@/assets/images/gallery/Image 1@2x.png'),
                title: 'INNOVATION ART 4',
                author: 'POOM JAI ARTIST',
                group: 'POOM JAI ART GROUP',
                phone: '090 000 0000',
                content: [
                    {
                        image: require('@/assets/images/gallery/Image 1@2x.png'),
                        description:
                            'โครงการ “Chula Art Town” เป็นความร่วมมือกันระหว่างสำนักงานจัดการทรัพย์สิน จุฬาลงกรณ์มหาวิทยาลัย (PMCU), บริษัท อุไรพาณิชย์ จำกัด และ ATM Spray ซึ่งให้การสนับสนุนอุปกรณ์สีสำหรับสร้างสรรค์ผลงาน เนื่องในวาระครบรอบ 36 ปี ของคณะศิลปกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย',
                    },
                    {
                        image: require('@/assets/images/gallery/Image 1@2x.png'),
                        description:
                            'โครงการ “Chula Art Town” เป็นความร่วมมือกันระหว่างสำนักงานจัดการทรัพย์สิน จุฬาลงกรณ์มหาวิทยาลัย (PMCU), บริษัท อุไรพาณิชย์ จำกัด และ ATM Spray ซึ่งให้การสนับสนุนอุปกรณ์สีสำหรับสร้างสรรค์ผลงาน เนื่องในวาระครบรอบ 36 ปี ของคณะศิลปกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย',
                    },
                ],
            },
            {
                id: '2ww',
                profile: require('@/assets/images/gallery/Image 12@4X.png'),
                title: 'CHULA FAHMAI',
                author: 'aaa',
                group: 'aaa',
                content: [
                    {
                        image: require('@/assets/images/gallery/Image 12@4X.png'),
                        description:
                            'โครงการ “Chula Art Town” เป็นความร่วมมือกันระหว่างสำนักงานจัดการทรัพย์สิน จุฬาลงกรณ์มหาวิทยาลัย (PMCU), บริษัท อุไรพาณิชย์ จำกัด และ ATM Spray ซึ่งให้การสนับสนุนอุปกรณ์สีสำหรับสร้างสรรค์ผลงาน เนื่องในวาระครบรอบ 36 ปี ของคณะศิลปกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย',
                    },
                    {
                        image: require('@/assets/images/gallery/Image 12@4X.png'),
                        description:
                            'โครงการ “Chula Art Town” เป็นความร่วมมือกันระหว่างสำนักงานจัดการทรัพย์สิน จุฬาลงกรณ์มหาวิทยาลัย (PMCU), บริษัท อุไรพาณิชย์ จำกัด และ ATM Spray ซึ่งให้การสนับสนุนอุปกรณ์สีสำหรับสร้างสรรค์ผลงาน เนื่องในวาระครบรอบ 36 ปี ของคณะศิลปกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย',
                    },
                ],
            },
            {
                id: '3qq',
                profile: require('@/assets/images/gallery/Image 51@4X.png'),
                title: 'aaa',
                author: 'aaa',
                group: 'aaa',
                content: [
                    {
                        image: require('@/assets/images/gallery/Image 51@4X.png'),
                        description:
                            'โครงการ “Chula Art Town” เป็นความร่วมมือกันระหว่างสำนักงานจัดการทรัพย์สิน จุฬาลงกรณ์มหาวิทยาลัย (PMCU), บริษัท อุไรพาณิชย์ จำกัด และ ATM Spray ซึ่งให้การสนับสนุนอุปกรณ์สีสำหรับสร้างสรรค์ผลงาน เนื่องในวาระครบรอบ 36 ปี ของคณะศิลปกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย',
                    },
                ],
            },
            {
                id: '4vv',
                profile: require('@/assets/images/gallery/Image 23@4X.png'),
                title: 'aaa',
                author: 'aaa',
                group: 'aaa',
                content: [
                    {
                        image: require('@/assets/images/gallery/Image 23@4X.png'),
                        description:
                            'โครงการ “Chula Art Town” เป็นความร่วมมือกันระหว่างสำนักงานจัดการทรัพย์สิน จุฬาลงกรณ์มหาวิทยาลัย (PMCU), บริษัท อุไรพาณิชย์ จำกัด และ ATM Spray ซึ่งให้การสนับสนุนอุปกรณ์สีสำหรับสร้างสรรค์ผลงาน เนื่องในวาระครบรอบ 36 ปี ของคณะศิลปกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย',
                    },
                ],
            },
            {
                id: '5gg',
                profile: require('@/assets/images/gallery/Image 11@4X.png'),
                title: 'aaa',
                author: 'aaa',
                group: 'aaa',
                content: [
                    {
                        image: require('@/assets/images/gallery/Image 11@4X.png'),
                        description:
                            'โครงการ “Chula Art Town” เป็นความร่วมมือกันระหว่างสำนักงานจัดการทรัพย์สิน จุฬาลงกรณ์มหาวิทยาลัย (PMCU), บริษัท อุไรพาณิชย์ จำกัด และ ATM Spray ซึ่งให้การสนับสนุนอุปกรณ์สีสำหรับสร้างสรรค์ผลงาน เนื่องในวาระครบรอบ 36 ปี ของคณะศิลปกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย',
                    },
                ],
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
