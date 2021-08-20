<template>
    <div class="main-workshop-id">
        <div class="row" v-for="item in data" :key="item._id">
            <div class="col-12 col-md-8">
                <img
                    v-if="item.image"
                    class="workshop-img"
                    :src="getImage(item.image)"
                />
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
                    <p>สถานที่ {{ item.locationName }}</p>
                    <p>
                        ติดต่อสอบถามเพิ่มเติม <br />
                        {{ item.contact.telephone }}
                    </p>
                </div>
                <div class="icon">
                    <img
                        :src="require('@/assets/images/gallery/Group 128.svg')"
                        width="40"
                        height="40"
                    />
                    <div class="icon-img" v-for="item in icon" :key="item">
                        <img :src="item.path" width="40" height="40" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs, inject } from 'vue'
import { useRoute } from 'vue-router'
import useWorkshop from '@/hooks/useWorkshop'
export default {
    setup() {
        const state = reactive({
            icon: [
                {
                    path: require('@/assets/images/icons/Group 327@2x.png'),
                },
                {
                    path: require('@/assets/images/icons/Group 344@2x.png'),
                },
                {
                    path: require('@/assets/images/icons/Group 328.svg'),
                },
            ],
            // data: [
            //   {
            //     id: 1,
            //     title: "CHULA ART TOWN’S WORKSHOP",
            //     description:
            //       "เวิร์คช้อปการสร้างสรรค์ Street Art โดย ศิลปินผู้เชี่ยวชาญ สำหรับ นักเรียน นักศึกษา อายุ 14 ปีขึ้นไป วันที่ 11 พฤษภาคม 2562 ลงทะเบียน 9:30 เริ่มงาน 10:00 - 16:00",
            //     location: "ตลาดสะพานเหลือง (ถนน 100 ปี จุฬาฯ)",
            //     tel: "0818035281",
            //     image: require("@/assets/images/workshop/IMAGE 2563-08-17 153820@2x.png"),
            //   },
            //   {
            //     id: 2,
            //     title: "CHULA ART TOWN’S WORKSHOPs",
            //     description:
            //       "เวิร์คช้อปการสร้างสรรค์ Street Art โดย ศิลปินผู้เชี่ยวชาญ สำหรับ นักเรียน นักศึกษา อายุ 14 ปีขึ้นไป วันที่ 11 พฤษภาคม 2562 ลงทะเบียน 9:30 เริ่มงาน 10:00 - 16:00",
            //     location: "ตลาดสะพานเหลือง (ถนน 100 ปี จุฬาฯ)",
            //     tel: "0818035281",
            //     image: require("@/assets/images/workshop/image-workshop.png"),
            //   },
            //   {
            //     id: 3,
            //     title: "CHULA ART TOWN’S WORKSHOP",
            //     description:
            //       "เวิร์คช้อปการสร้างสรรค์ Street Art โดย ศิลปินผู้เชี่ยวชาญ สำหรับ นักเรียน นักศึกษา อายุ 14 ปีขึ้นไป วันที่ 11 พฤษภาคม 2562 ลงทะเบียน 9:30 เริ่มงาน 10:00 - 16:00",
            //     location: "ตลาดสะพานเหลือง (ถนน 100 ปี จุฬาฯ)",
            //     tel: "0818035281",
            //     image: require("@/assets/images/workshop/IMAGE 2563-08-17 153820@2x.png"),
            //   },
            //   {
            //     id: 4,
            //     title: "CHULA ART TOWN’S WORKSHOP",
            //     description:
            //       "เวิร์คช้อปการสร้างสรรค์ Street Art โดย ศิลปินผู้เชี่ยวชาญ สำหรับ นักเรียน นักศึกษา อายุ 14 ปีขึ้นไป วันที่ 11 พฤษภาคม 2562 ลงทะเบียน 9:30 เริ่มงาน 10:00 - 16:00",
            //     location: "ตลาดสะพานเหลือง (ถนน 100 ปี จุฬาฯ)",
            //     tel: "0818035281",
            //     image: require("@/assets/images/workshop/IMAGE 2563-08-17 153820@2x.png"),
            //   },
            //   {
            //     id: 5,
            //     title: "CHULA ART TOWN’S WORKSHOP",
            //     description:
            //       "เวิร์คช้อปการสร้างสรรค์ Street Art โดย ศิลปินผู้เชี่ยวชาญ สำหรับ นักเรียน นักศึกษา อายุ 14 ปีขึ้นไป วันที่ 11 พฤษภาคม 2562 ลงทะเบียน 9:30 เริ่มงาน 10:00 - 16:00",
            //     location: "ตลาดสะพานเหลือง (ถนน 100 ปี จุฬาฯ)",
            //     tel: "0818035281",
            //     image: require("@/assets/images/workshop/IMAGE 2563-08-17 153820@2x.png"),
            //   },
            //   {
            //     id: 6,
            //     title: "CHULA ART TOWN’S WORKSHOP",
            //     description:
            //       "เวิร์คช้อปการสร้างสรรค์ Street Art โดย ศิลปินผู้เชี่ยวชาญ สำหรับ นักเรียน นักศึกษา อายุ 14 ปีขึ้นไป วันที่ 11 พฤษภาคม 2562 ลงทะเบียน 9:30 เริ่มงาน 10:00 - 16:00",
            //     location: "ตลาดสะพานเหลือง (ถนน 100 ปี จุฬาฯ)",
            //     tel: "0818035281",
            //     image: require("@/assets/images/workshop/IMAGE 2563-08-17 153820@2x.png"),
            //   },
            //   {
            //     id: 7,
            //     title: "CHULA ART TOWN’S WORKSHOP",
            //     description:
            //       "เวิร์คช้อปการสร้างสรรค์ Street Art โดย ศิลปินผู้เชี่ยวชาญ สำหรับ นักเรียน นักศึกษา อายุ 14 ปีขึ้นไป วันที่ 11 พฤษภาคม 2562 ลงทะเบียน 9:30 เริ่มงาน 10:00 - 16:00",
            //     location: "ตลาดสะพานเหลือง (ถนน 100 ปี จุฬาฯ)",
            //     tel: "0818035281",
            //     image: require("@/assets/images/workshop/IMAGE 2563-08-17 153820@2x.png"),
            //   },
            //   {
            //     id: 8,
            //     title: "CHULA ART TOWN’S WORKSHOP",
            //     description:
            //       "เวิร์คช้อปการสร้างสรรค์ Street Art โดย ศิลปินผู้เชี่ยวชาญ สำหรับ นักเรียน นักศึกษา อายุ 14 ปีขึ้นไป วันที่ 11 พฤษภาคม 2562 ลงทะเบียน 9:30 เริ่มงาน 10:00 - 16:00",
            //     location: "ตลาดสะพานเหลือง (ถนน 100 ปี จุฬาฯ)",
            //     tel: "0818035281",
            //     image: require("@/assets/images/workshop/IMAGE 2563-08-17 153820@2x.png"),
            //   },
            //   {
            //     id: 9,
            //     title: "CHULA ART TOWN’S WORKSHOP",
            //     description:
            //       "เวิร์คช้อปการสร้างสรรค์ Street Art โดย ศิลปินผู้เชี่ยวชาญ สำหรับ นักเรียน นักศึกษา อายุ 14 ปีขึ้นไป วันที่ 11 พฤษภาคม 2562 ลงทะเบียน 9:30 เริ่มงาน 10:00 - 16:00",
            //     location: "ตลาดสะพานเหลือง (ถนน 100 ปี จุฬาฯ)",
            //     tel: "0818035281",
            //     image: require("@/assets/images/workshop/IMAGE 2563-08-17 153820@2x.png"),
            //   },
            //   {
            //     id: 10,
            //     title: "CHULA ART TOWN’S WORKSHOP",
            //     description:
            //       "เวิร์คช้อปการสร้างสรรค์ Street Art โดย ศิลปินผู้เชี่ยวชาญ สำหรับ นักเรียน นักศึกษา อายุ 14 ปีขึ้นไป วันที่ 11 พฤษภาคม 2562 ลงทะเบียน 9:30 เริ่มงาน 10:00 - 16:00",
            //     location: "ตลาดสะพานเหลือง (ถนน 100 ปี จุฬาฯ)",
            //     tel: "0818035281",
            //     image: require("@/assets/images/workshop/IMAGE 2563-08-17 153820@2x.png"),
            //   },
            //   {
            //     id: 11,
            //     title: "CHULA ART TOWN’S WORKSHOP",
            //     description:
            //       "เวิร์คช้อปการสร้างสรรค์ Street Art โดย ศิลปินผู้เชี่ยวชาญ สำหรับ นักเรียน นักศึกษา อายุ 14 ปีขึ้นไป วันที่ 11 พฤษภาคม 2562 ลงทะเบียน 9:30 เริ่มงาน 10:00 - 16:00",
            //     location: "ตลาดสะพานเหลือง (ถนน 100 ปี จุฬาฯ)",
            //     tel: "0818035281",
            //     image: require("@/assets/images/workshop/IMAGE 2563-08-17 153820@2x.png"),
            //   },
            //   {
            //     id: 12,
            //     title: "CHULA ART TOWN’S WORKSHOP",
            //     description:
            //       "เวิร์คช้อปการสร้างสรรค์ Street Art โดย ศิลปินผู้เชี่ยวชาญ สำหรับ นักเรียน นักศึกษา อายุ 14 ปีขึ้นไป วันที่ 11 พฤษภาคม 2562 ลงทะเบียน 9:30 เริ่มงาน 10:00 - 16:00",
            //     location: "ตลาดสะพานเหลือง (ถนน 100 ปี จุฬาฯ)",
            //     tel: "0818035281",
            //     image: require("@/assets/images/workshop/IMAGE 2563-08-17 153820@2x.png"),
            //   },
            // ],
        })

        const globalStore = inject('globalStore')

        globalStore.changeBackground(
            require('@/assets/images/workshop/Rectangle 47@2x.png')
        )

        const route = useRoute()
        const { data, getOne, errorMessage } = useWorkshop()

        try {
            getOne(route.params.id)
        } catch (error) {
            throw new Error(errorMessage)
        }

        const getImage = (imageName) => {
            return `http://localhost:5000/images/${imageName}`
        }

        return {
            ...toRefs(state),
            data,
            getImage,
            // data: computed(() => {
            //     return state.data.filter(
            //         (item) => item.id.toString() === route.params.id
            //     )
            // }),
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
