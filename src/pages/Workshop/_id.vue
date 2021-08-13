<template>
    <div class="main-workshop-id">
        <div class="row" v-for="item in data" :key="item.id">
            <div class="col-12 col-md-8">
                <img class="workshop-img" :src="item.image" />
            </div>
            <div
                class="
                    workshop-content
                    col-6 col-md-4
                    d-flex
                    align-items-center
                    justify-content-center
                "
            >
                <div>
                    <h1>{{ item.title }}</h1>
                    <p>{{ item.description }}</p>
                    <p>สถานที่ {{ item.location }}</p>
                    <p>
                        ติดต่อสอบถามเพิ่มเติม <br />
                        {{ item.tel }}
                    </p>
                </div>
                <div class="icon">
                    <img
                        :src="require('@/assets/images/gallery/Group 128.svg')"
                        width="40"
                        height="40"
                    />
                    <div class="icon-img" v-for="item in icon" :key="item">
                        <div style="position: relative">
                            <img
                                style="position: relative; top: 0; left: 0"
                                :src="
                                    require('@/assets/images/icons/Path 19@4X.png')
                                "
                                width="40"
                                height="40"
                            />
                            <img
                                style="
                                    position: absolute;
                                    top: 10px;
                                    left: 10px;
                                "
                                :src="item.path"
                                width="20"
                                height="20"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs, computed } from 'vue'
import { useRoute } from 'vue-router'
export default {
    setup() {
        const state = reactive({
            icon: [
                {
                    path: require('@/assets/images/icons/White and black Facebook icon.png'),
                },
                {
                    path: require('@/assets/images/icons/instagram_icon_125245.png'),
                },
                {
                    path: require('@/assets/images/icons/Group 121@4X.png'),
                },
            ],
            data: [
                {
                    id: 1,
                    title: 'CHULA ART TOWN’S WORKSHOP',
                    description:
                        'เวิร์คช้อปการสร้างสรรค์ Street Art โดย ศิลปินผู้เชี่ยวชาญ สำหรับ นักเรียน นักศึกษา อายุ 14 ปีขึ้นไป วันที่ 11 พฤษภาคม 2562 ลงทะเบียน 9:30 เริ่มงาน 10:00 - 16:00',
                    location: 'ตลาดสะพานเหลือง (ถนน 100 ปี จุฬาฯ)',
                    tel: '0818035281',
                    image: require('@/assets/images/workshop/IMAGE 2563-08-17 153820@2x.png'),
                },
                {
                    id: 2,
                    title: 'CHULA ART TOWN’S WORKSHOPs',
                    description:
                        'เวิร์คช้อปการสร้างสรรค์ Street Art โดย ศิลปินผู้เชี่ยวชาญ สำหรับ นักเรียน นักศึกษา อายุ 14 ปีขึ้นไป วันที่ 11 พฤษภาคม 2562 ลงทะเบียน 9:30 เริ่มงาน 10:00 - 16:00',
                    location: 'ตลาดสะพานเหลือง (ถนน 100 ปี จุฬาฯ)',
                    tel: '0818035281',
                    image: require('@/assets/images/workshop/image-workshop.png'),
                },
                {
                    id: 3,
                    title: 'CHULA ART TOWN’S WORKSHOP',
                    description:
                        'เวิร์คช้อปการสร้างสรรค์ Street Art โดย ศิลปินผู้เชี่ยวชาญ สำหรับ นักเรียน นักศึกษา อายุ 14 ปีขึ้นไป วันที่ 11 พฤษภาคม 2562 ลงทะเบียน 9:30 เริ่มงาน 10:00 - 16:00',
                    location: 'ตลาดสะพานเหลือง (ถนน 100 ปี จุฬาฯ)',
                    tel: '0818035281',
                    image: require('@/assets/images/workshop/IMAGE 2563-08-17 153820@2x.png'),
                },
                {
                    id: 4,
                    title: 'CHULA ART TOWN’S WORKSHOP',
                    description:
                        'เวิร์คช้อปการสร้างสรรค์ Street Art โดย ศิลปินผู้เชี่ยวชาญ สำหรับ นักเรียน นักศึกษา อายุ 14 ปีขึ้นไป วันที่ 11 พฤษภาคม 2562 ลงทะเบียน 9:30 เริ่มงาน 10:00 - 16:00',
                    location: 'ตลาดสะพานเหลือง (ถนน 100 ปี จุฬาฯ)',
                    tel: '0818035281',
                    image: require('@/assets/images/workshop/IMAGE 2563-08-17 153820@2x.png'),
                },
                {
                    id: 5,
                    title: 'CHULA ART TOWN’S WORKSHOP',
                    description:
                        'เวิร์คช้อปการสร้างสรรค์ Street Art โดย ศิลปินผู้เชี่ยวชาญ สำหรับ นักเรียน นักศึกษา อายุ 14 ปีขึ้นไป วันที่ 11 พฤษภาคม 2562 ลงทะเบียน 9:30 เริ่มงาน 10:00 - 16:00',
                    location: 'ตลาดสะพานเหลือง (ถนน 100 ปี จุฬาฯ)',
                    tel: '0818035281',
                    image: require('@/assets/images/workshop/IMAGE 2563-08-17 153820@2x.png'),
                },
                {
                    id: 6,
                    title: 'CHULA ART TOWN’S WORKSHOP',
                    description:
                        'เวิร์คช้อปการสร้างสรรค์ Street Art โดย ศิลปินผู้เชี่ยวชาญ สำหรับ นักเรียน นักศึกษา อายุ 14 ปีขึ้นไป วันที่ 11 พฤษภาคม 2562 ลงทะเบียน 9:30 เริ่มงาน 10:00 - 16:00',
                    location: 'ตลาดสะพานเหลือง (ถนน 100 ปี จุฬาฯ)',
                    tel: '0818035281',
                    image: require('@/assets/images/workshop/IMAGE 2563-08-17 153820@2x.png'),
                },
                {
                    id: 7,
                    title: 'CHULA ART TOWN’S WORKSHOP',
                    description:
                        'เวิร์คช้อปการสร้างสรรค์ Street Art โดย ศิลปินผู้เชี่ยวชาญ สำหรับ นักเรียน นักศึกษา อายุ 14 ปีขึ้นไป วันที่ 11 พฤษภาคม 2562 ลงทะเบียน 9:30 เริ่มงาน 10:00 - 16:00',
                    location: 'ตลาดสะพานเหลือง (ถนน 100 ปี จุฬาฯ)',
                    tel: '0818035281',
                    image: require('@/assets/images/workshop/IMAGE 2563-08-17 153820@2x.png'),
                },
                {
                    id: 8,
                    title: 'CHULA ART TOWN’S WORKSHOP',
                    description:
                        'เวิร์คช้อปการสร้างสรรค์ Street Art โดย ศิลปินผู้เชี่ยวชาญ สำหรับ นักเรียน นักศึกษา อายุ 14 ปีขึ้นไป วันที่ 11 พฤษภาคม 2562 ลงทะเบียน 9:30 เริ่มงาน 10:00 - 16:00',
                    location: 'ตลาดสะพานเหลือง (ถนน 100 ปี จุฬาฯ)',
                    tel: '0818035281',
                    image: require('@/assets/images/workshop/IMAGE 2563-08-17 153820@2x.png'),
                },
                {
                    id: 9,
                    title: 'CHULA ART TOWN’S WORKSHOP',
                    description:
                        'เวิร์คช้อปการสร้างสรรค์ Street Art โดย ศิลปินผู้เชี่ยวชาญ สำหรับ นักเรียน นักศึกษา อายุ 14 ปีขึ้นไป วันที่ 11 พฤษภาคม 2562 ลงทะเบียน 9:30 เริ่มงาน 10:00 - 16:00',
                    location: 'ตลาดสะพานเหลือง (ถนน 100 ปี จุฬาฯ)',
                    tel: '0818035281',
                    image: require('@/assets/images/workshop/IMAGE 2563-08-17 153820@2x.png'),
                },
                {
                    id: 10,
                    title: 'CHULA ART TOWN’S WORKSHOP',
                    description:
                        'เวิร์คช้อปการสร้างสรรค์ Street Art โดย ศิลปินผู้เชี่ยวชาญ สำหรับ นักเรียน นักศึกษา อายุ 14 ปีขึ้นไป วันที่ 11 พฤษภาคม 2562 ลงทะเบียน 9:30 เริ่มงาน 10:00 - 16:00',
                    location: 'ตลาดสะพานเหลือง (ถนน 100 ปี จุฬาฯ)',
                    tel: '0818035281',
                    image: require('@/assets/images/workshop/IMAGE 2563-08-17 153820@2x.png'),
                },
                {
                    id: 11,
                    title: 'CHULA ART TOWN’S WORKSHOP',
                    description:
                        'เวิร์คช้อปการสร้างสรรค์ Street Art โดย ศิลปินผู้เชี่ยวชาญ สำหรับ นักเรียน นักศึกษา อายุ 14 ปีขึ้นไป วันที่ 11 พฤษภาคม 2562 ลงทะเบียน 9:30 เริ่มงาน 10:00 - 16:00',
                    location: 'ตลาดสะพานเหลือง (ถนน 100 ปี จุฬาฯ)',
                    tel: '0818035281',
                    image: require('@/assets/images/workshop/IMAGE 2563-08-17 153820@2x.png'),
                },
                {
                    id: 12,
                    title: 'CHULA ART TOWN’S WORKSHOP',
                    description:
                        'เวิร์คช้อปการสร้างสรรค์ Street Art โดย ศิลปินผู้เชี่ยวชาญ สำหรับ นักเรียน นักศึกษา อายุ 14 ปีขึ้นไป วันที่ 11 พฤษภาคม 2562 ลงทะเบียน 9:30 เริ่มงาน 10:00 - 16:00',
                    location: 'ตลาดสะพานเหลือง (ถนน 100 ปี จุฬาฯ)',
                    tel: '0818035281',
                    image: require('@/assets/images/workshop/IMAGE 2563-08-17 153820@2x.png'),
                },
            ],
        })

        const route = useRoute()

        return {
            ...toRefs(state),
            data: computed(() => {
                return state.data.filter(
                    (item) => item.id.toString() === route.params.id
                )
            }),
        }
    },
}
</script>

<style lang="scss">
.main-workshop-id {
    font-family: 'Kanit-Regular';
    color: #ffffff;
    .workshop-img {
        width: 100%;
        height: 100%;
    }
    .workshop-content {
        font-size: 14px;
        position: relative;
        h1 {
            margin-bottom: 2.5rem;
            font-size: 26;
            font-weight: bold;
        }
        p {
            margin-bottom: 2.5rem;
        }
    }
    .icon {
        position: absolute;
        bottom: 2%;
        display: flex;
        img:nth-child(1) {
            margin: 0 10px;
        }
        .icon-img {
            img {
                margin: 0 10px;
            }
        }
    }
}
</style>
