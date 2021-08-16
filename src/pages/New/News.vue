<template>
    <div class="news">
        <div class="container" @scroll="scroll($event)">
            <div class="dot" :style="dot"></div>
            <div class="news-title">
                <h1>
                    NEWS & EVENT
                    <p class="n">Art</p>
                </h1>
            </div>
            <div class="new-content" v-for="item in data" :key="item">
                <div class="row">
                    <div class="col-5 col-sm-5 new-img">
                        <img
                            :src="
                                require('@/assets/images/workshop/image-workshop.png')
                            "
                        />
                    </div>
                    <div class="new-content-text col-7 col-sm-7">
                        <span>{{ item.createAt }}</span>
                        <h3>{{ item.title }}</h3>
                        <p>{{ item.description }}</p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="paginate-left col-5 col-sm-5"></div>
                <div class="col-7 col-sm-7">
                    <Paginate
                        totalItems="100"
                        :pageLimit="pageLimit"
                        pageNeighbours="1"
                        :onPageChanged="onPageChanged"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { inject, onMounted, ref, computed } from 'vue'
import Paginate from '@/components/paginate'
export default {
    components: {
        Paginate,
    },
    setup() {
        const globalStore = inject('globalStore')
        const pageLimit = ref(5)
        const currentPage = ref(null)
        const totalPages = ref(null)

        const setBackgroundImage = () => {
            globalStore.changeBackground(
                // require("@/assets/images/BACKGROUND@2X.png")
                require('@/assets/images/home/section1/Rectangle 47.png')
            )
        }

        var dot = ref({ top: 145 })

        const content = ref([
            {
                createAt: '12 มกราคม 2064',
                image: require('@/assets/images/workshop/image-workshop.png'),
                title: 'งานเปิดตัวโครงการ',
                description:
                    'คณะศิลปกรรมศาสตร์มีห้องปฏิบัติการด้านสื่อดิจิทัลเพื่อนิสิตภายในรั้วมหาวิทยาลัยพื้นที่ส่วนใหญ่เปิดรองรับการปฏิบัติการด้านการเรียนการสอนเพื่อเหล่านิสิตภายในมหาวิทยาลัยทว่าทางมหาวิทยาลัยเล็งเห็นถึงศักยภาพและทรัพยากรที่มีคุณค่าและมีคุณภาพเพียงพอที่จะเผยแพร่สื่อเหล่านี้ออกสู่พื้นที่สาธารณะในทางหนึ่งเพื่อเป็นการเปิดโอกาสให้นิสิตนักศึกษาได้มีพื้นที่แสดงผลงานแสดงออกทางความคิดแก่บุคคลภายนอกอีกทั้งยังเป็นการมอบประสบการณ์ใหม่ให้แก่ผู้ชมทั่วไปที่อาจยังไม่เข้าใจในงานศิลปะด้านมัลติมีเดีย',
            },
            {
                createAt: '12 มกราคม 2064',
                image: require('@/assets/images/workshop/image-workshop.png'),
                title: 'งานเปิดตัวโครงการ',
                description:
                    'คณะศิลปกรรมศาสตร์มีห้องปฏิบัติการด้านสื่อดิจิทัลเพื่อนิสิตภายในรั้วมหาวิทยาลัยพื้นที่ส่วนใหญ่เปิดรองรับการปฏิบัติการด้านการเรียนการสอนเพื่อเหล่านิสิตภายในมหาวิทยาลัยทว่าทางมหาวิทยาลัยเล็งเห็นถึงศักยภาพและทรัพยากรที่มีคุณค่าและมีคุณภาพเพียงพอที่จะเผยแพร่สื่อเหล่านี้ออกสู่พื้นที่สาธารณะในทางหนึ่งเพื่อเป็นการเปิดโอกาสให้นิสิตนักศึกษาได้มีพื้นที่แสดงผลงานแสดงออกทางความคิดแก่บุคคลภายนอกอีกทั้งยังเป็นการมอบประสบการณ์ใหม่ให้แก่ผู้ชมทั่วไปที่อาจยังไม่เข้าใจในงานศิลปะด้านมัลติมีเดีย',
            },
            {
                createAt: '12 มกราคม 2064',
                image: require('@/assets/images/workshop/image-workshop.png'),
                title: 'งานเปิดตัวโครงการ',
                description:
                    'คณะศิลปกรรมศาสตร์มีห้องปฏิบัติการด้านสื่อดิจิทัลเพื่อนิสิตภายในรั้วมหาวิทยาลัยพื้นที่ส่วนใหญ่เปิดรองรับการปฏิบัติการด้านการเรียนการสอนเพื่อเหล่านิสิตภายในมหาวิทยาลัยทว่าทางมหาวิทยาลัยเล็งเห็นถึงศักยภาพและทรัพยากรที่มีคุณค่าและมีคุณภาพเพียงพอที่จะเผยแพร่สื่อเหล่านี้ออกสู่พื้นที่สาธารณะในทางหนึ่งเพื่อเป็นการเปิดโอกาสให้นิสิตนักศึกษาได้มีพื้นที่แสดงผลงานแสดงออกทางความคิดแก่บุคคลภายนอกอีกทั้งยังเป็นการมอบประสบการณ์ใหม่ให้แก่ผู้ชมทั่วไปที่อาจยังไม่เข้าใจในงานศิลปะด้านมัลติมีเดีย',
            },
            {
                createAt: '12 มกราคม 2064',
                image: require('@/assets/images/workshop/image-workshop.png'),
                title: 'งานเปิดตัวโครงการ',
                description:
                    'คณะศิลปกรรมศาสตร์มีห้องปฏิบัติการด้านสื่อดิจิทัลเพื่อนิสิตภายในรั้วมหาวิทยาลัยพื้นที่ส่วนใหญ่เปิดรองรับการปฏิบัติการด้านการเรียนการสอนเพื่อเหล่านิสิตภายในมหาวิทยาลัยทว่าทางมหาวิทยาลัยเล็งเห็นถึงศักยภาพและทรัพยากรที่มีคุณค่าและมีคุณภาพเพียงพอที่จะเผยแพร่สื่อเหล่านี้ออกสู่พื้นที่สาธารณะในทางหนึ่งเพื่อเป็นการเปิดโอกาสให้นิสิตนักศึกษาได้มีพื้นที่แสดงผลงานแสดงออกทางความคิดแก่บุคคลภายนอกอีกทั้งยังเป็นการมอบประสบการณ์ใหม่ให้แก่ผู้ชมทั่วไปที่อาจยังไม่เข้าใจในงานศิลปะด้านมัลติมีเดีย',
            },
            {
                createAt: '12 มกราคม 2064',
                image: require('@/assets/images/workshop/image-workshop.png'),
                title: 'งานเปิดตัวโครงการ',
                description:
                    'คณะศิลปกรรมศาสตร์มีห้องปฏิบัติการด้านสื่อดิจิทัลเพื่อนิสิตภายในรั้วมหาวิทยาลัยพื้นที่ส่วนใหญ่เปิดรองรับการปฏิบัติการด้านการเรียนการสอนเพื่อเหล่านิสิตภายในมหาวิทยาลัยทว่าทางมหาวิทยาลัยเล็งเห็นถึงศักยภาพและทรัพยากรที่มีคุณค่าและมีคุณภาพเพียงพอที่จะเผยแพร่สื่อเหล่านี้ออกสู่พื้นที่สาธารณะในทางหนึ่งเพื่อเป็นการเปิดโอกาสให้นิสิตนักศึกษาได้มีพื้นที่แสดงผลงานแสดงออกทางความคิดแก่บุคคลภายนอกอีกทั้งยังเป็นการมอบประสบการณ์ใหม่ให้แก่ผู้ชมทั่วไปที่อาจยังไม่เข้าใจในงานศิลปะด้านมัลติมีเดียaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            },
            {
                createAt: '20 มกราคม 2064',
                image: require('@/assets/images/workshop/image-workshop.png'),
                title: 'งานเปิดตัวโครงการ',
                description:
                    'คณะศิลปกรรมศาสตร์มีห้องปฏิบัติการด้านสื่อดิจิทัลเพื่อนิสิตภายในรั้วมหาวิทยาลัยพื้นที่ส่วนใหญ่เปิดรองรับการปฏิบัติการด้านการเรียนการสอนเพื่อเหล่านิสิตภายในมหาวิทยาลัยทว่าทางมหาวิทยาลัยเล็งเห็นถึงศักยภาพและทรัพยากรที่มีคุณค่าและมีคุณภาพเพียงพอที่จะเผยแพร่สื่อเหล่านี้ออกสู่พื้นที่สาธารณะในทางหนึ่งเพื่อเป็นการเปิดโอกาสให้นิสิตนักศึกษาได้มีพื้นที่แสดงผลงานแสดงออกทางความคิดแก่บุคคลภายนอกอีกทั้งยังเป็นการมอบประสบการณ์ใหม่ให้แก่ผู้ชมทั่วไปที่อาจยังไม่เข้าใจในงานศิลปะด้านมัลติมีเดียaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            },
            {
                createAt: '20 มกราคม 2064',
                image: require('@/assets/images/workshop/image-workshop.png'),
                title: 'งานเปิดตัวโครงการ',
                description:
                    'คณะศิลปกรรมศาสตร์มีห้องปฏิบัติการด้านสื่อดิจิทัลเพื่อนิสิตภายในรั้วมหาวิทยาลัยพื้นที่ส่วนใหญ่เปิดรองรับการปฏิบัติการด้านการเรียนการสอนเพื่อเหล่านิสิตภายในมหาวิทยาลัยทว่าทางมหาวิทยาลัยเล็งเห็นถึงศักยภาพและทรัพยากรที่มีคุณค่าและมีคุณภาพเพียงพอที่จะเผยแพร่สื่อเหล่านี้ออกสู่พื้นที่สาธารณะในทางหนึ่งเพื่อเป็นการเปิดโอกาสให้นิสิตนักศึกษาได้มีพื้นที่แสดงผลงานแสดงออกทางความคิดแก่บุคคลภายนอกอีกทั้งยังเป็นการมอบประสบการณ์ใหม่ให้แก่ผู้ชมทั่วไปที่อาจยังไม่เข้าใจในงานศิลปะด้านมัลติมีเดียaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            },
            {
                createAt: '20 มกราคม 2064',
                image: require('@/assets/images/workshop/image-workshop.png'),
                title: 'งานเปิดตัวโครงการ',
                description:
                    'คณะศิลปกรรมศาสตร์มีห้องปฏิบัติการด้านสื่อดิจิทัลเพื่อนิสิตภายในรั้วมหาวิทยาลัยพื้นที่ส่วนใหญ่เปิดรองรับการปฏิบัติการด้านการเรียนการสอนเพื่อเหล่านิสิตภายในมหาวิทยาลัยทว่าทางมหาวิทยาลัยเล็งเห็นถึงศักยภาพและทรัพยากรที่มีคุณค่าและมีคุณภาพเพียงพอที่จะเผยแพร่สื่อเหล่านี้ออกสู่พื้นที่สาธารณะในทางหนึ่งเพื่อเป็นการเปิดโอกาสให้นิสิตนักศึกษาได้มีพื้นที่แสดงผลงานแสดงออกทางความคิดแก่บุคคลภายนอกอีกทั้งยังเป็นการมอบประสบการณ์ใหม่ให้แก่ผู้ชมทั่วไปที่อาจยังไม่เข้าใจในงานศิลปะด้านมัลติมีเดียaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            },
            {
                createAt: '20 มกราคม 2064',
                image: require('@/assets/images/workshop/image-workshop.png'),
                title: 'งานเปิดตัวโครงการ',
                description:
                    'คณะศิลปกรรมศาสตร์มีห้องปฏิบัติการด้านสื่อดิจิทัลเพื่อนิสิตภายในรั้วมหาวิทยาลัยพื้นที่ส่วนใหญ่เปิดรองรับการปฏิบัติการด้านการเรียนการสอนเพื่อเหล่านิสิตภายในมหาวิทยาลัยทว่าทางมหาวิทยาลัยเล็งเห็นถึงศักยภาพและทรัพยากรที่มีคุณค่าและมีคุณภาพเพียงพอที่จะเผยแพร่สื่อเหล่านี้ออกสู่พื้นที่สาธารณะในทางหนึ่งเพื่อเป็นการเปิดโอกาสให้นิสิตนักศึกษาได้มีพื้นที่แสดงผลงานแสดงออกทางความคิดแก่บุคคลภายนอกอีกทั้งยังเป็นการมอบประสบการณ์ใหม่ให้แก่ผู้ชมทั่วไปที่อาจยังไม่เข้าใจในงานศิลปะด้านมัลติมีเดียaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            },
            {
                createAt: '20 มกราคม 2064',
                image: require('@/assets/images/workshop/image-workshop.png'),
                title: 'งานเปิดตัวโครงการ',
                description:
                    'คณะศิลปกรรมศาสตร์มีห้องปฏิบัติการด้านสื่อดิจิทัลเพื่อนิสิตภายในรั้วมหาวิทยาลัยพื้นที่ส่วนใหญ่เปิดรองรับการปฏิบัติการด้านการเรียนการสอนเพื่อเหล่านิสิตภายในมหาวิทยาลัยทว่าทางมหาวิทยาลัยเล็งเห็นถึงศักยภาพและทรัพยากรที่มีคุณค่าและมีคุณภาพเพียงพอที่จะเผยแพร่สื่อเหล่านี้ออกสู่พื้นที่สาธารณะในทางหนึ่งเพื่อเป็นการเปิดโอกาสให้นิสิตนักศึกษาได้มีพื้นที่แสดงผลงานแสดงออกทางความคิดแก่บุคคลภายนอกอีกทั้งยังเป็นการมอบประสบการณ์ใหม่ให้แก่ผู้ชมทั่วไปที่อาจยังไม่เข้าใจในงานศิลปะด้านมัลติมีเดียaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            },
        ])

        const newData = ref([])

        const onPageChanged = (data) => {
            const {
                currentPage: cPage,
                totalPages: totalPage,
                pageLimit,
            } = data
            const offset = (cPage - 1) * pageLimit
            const currentData = content.value.slice(offset, offset + pageLimit)
            currentPage.value = cPage
            totalPages.value = totalPage
            newData.value = currentData
        }

        const scroll = (e) => {
            if (e.target.scrollTop >= 125) {
                dot = { top: e.target.scrollTop }
            } else {
                dot = { top: 145 }
            }
        }

        onMounted(() => {
            setBackgroundImage()
        })

        return {
            data: computed(() => newData.value),
            totalItems: content.value.length,
            totalPages: totalPages.value,
            currentPage: currentPage.value,
            pageLimit: pageLimit.value,
            onPageChanged,
            scroll,
            dot: computed(() => dot.value),
        }
    },
}
</script>

<style lang="scss">
@import '@/assets/css/container.scss';
@import '@/assets/css/news.scss';
</style>
