<template>
    <div class="news">
        <div class="container">
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
                        @page="onChangePage"
                        :totalItems="totalItems"
                        :perPage="perPage"
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
        const perPage = ref(5)

        const setBackgroundImage = () => {
            globalStore.changeBackground(
                require('@/assets/images/BACKGROUND@2X.png')
            )
        }

        const data = ref([
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

        const onChangePage = (val = 1) => {
            const start = (val - 1) * perPage.value + 1 - 1
            const end = val * perPage.value - 1
            newData.value = data.value.filter(
                (_, index) => index >= start && index <= end
            )
        }

        onMounted(() => {
            setBackgroundImage()
            onChangePage()
        })

        return {
            data: computed(() => newData.value),
            totalItems: data.value.length,
            perPage: perPage.value,
            onChangePage,
        }
    },
}
</script>

<style lang="scss">
@import '@/assets/css/container.scss';
.news {
    .container {
        padding-top: var(--bs-gutter-x, 0rem);
        font-family: 'Kanit-Regular';
        .news-title {
            padding-bottom: 3rem;
        }
        .new-content {
            // display: flex;
            // justify-content: space-around;
            .new-img {
                display: flex;
                align-items: center;
                border-right: 2px solid #ba25ff;
                justify-content: flex-end;
                padding-bottom: 25px;
                padding-right: 25px;
                img {
                    width: 100%;
                }
            }
            .new-content-text {
                position: relative;
                margin-top: -10px;
                margin-bottom: 10px;
                padding-left: 25px;
                overflow-wrap: break-word;
                span {
                    font-size: 12px;
                    color: #ba1bff;
                }
                p {
                    color: rgba(255, 255, 255, 0.6);
                    font-size: 14px;
                }
                h3 {
                    font-weight: bold;
                    font-size: 18px;
                }
                &::before {
                    content: '';
                    position: absolute;
                    top: 10px;
                    left: -6px;
                    width: 10px;
                    height: 10px;
                    border: 3px solid #ba1bff;
                    border-width: none;
                    border-radius: 50%;
                    background: #ba1bff;
                }
            }
        }
        color: #ffffff;
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
            left: 37.8%;
            font-size: 60px;
            top: 40%;
            text-shadow: none;
        }
        .paginate-left {
            border-right: 2px solid #ba25ff;
            height: 200px;
        }
    }
}
</style>
