<template>
  <div class="contact-bg" :class="{ bgnight: isNight }">
    <div id="contact" class="container">
      <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css" />
      <div class="row">
        <div class="map col-6">
          <img :src="require('../assets/images/contact/map.png')" />
        </div>
        <div class="contact-description col-6">
          <div class="logo-block">
            <div class="left">
              <div class="logo">
                <div class="title">CHULA</div>
                <div class="sub">DIGITAL ARTS PARK</div>
              </div>
              <div class="toggle" :class="{ day: !isNight, night: isNight }">
                <div class="day" :class="{ active: !isNight }">DAY</div>
                <div class="n">&</div>
                <div class="night" :class="{ active: isNight }">NIGHT</div>
              </div>
            </div>
            <div class="description">
              <div class="title">Company contact</div>
              <div class="company">{{ $t("footer_company_name") }}</div>
              <div class="address">{{ $t("footer_company_address") }}</div>
              <div class="address">{{ $t("footer_company_address2") }}</div>
            </div>
            <div class="email">
              <div>{{ $t("footer_company_address3") }}</div>
              <div>{{ $t("footer_company_address4") }}</div>
            </div>

            <div class="icon-group">
              <div
                v-for="(item, index) in icon"
                :key="index"
                class="contact-icon"
              >
                <img :src="item.path" width="40" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end row -->
      <div class="row">
        <div class="direction col-12">
          <div class="title">Direction to join</div>
          <div class="subtitle">
            สายรถประจำทางขสมก.ที่ผ่านจุฬาลงกรณ์มหาวิทยาลัย
          </div>
          <div class="description">
            ถนนพระราม 1 ได้แก่ สาย 11 25 54 73 73ก 79 และ 204
          </div>
          <div class="description">
            ถนนพระราม 4 ได้แก่ สาย 21 34 47 50 67 93 และ 141
          </div>
          <div class="description">
            ถนนพญาไท ได้แก่ สาย 27 29 36 36 ก 65 และ 501
          </div>
          <div class="description">
            ถนนอังรีดูนังต์ ได้แก่ สาย 16 21 และ 141
          </div>

          <br />

          <div class="description">
            <span class="subtitle">สถานีรถไฟฟ้าบีทีเอส (BTS)</span> ลงที่
            สถานีสยาม หรือสถานีสนามกีฬาแห่งชาติ
            แล้วใช้บริการรถโดยสารภายในจุฬาลงกรณ์มหาวิทยาลัย
            เพื่อเดินทางเข้ามาในมหาวิทยาลัย
          </div>

          <br />

          <div class="description">
            <span class="subtitle">รถไฟฟ้ามหานคร (MRT)</span> ลงที่สถานีสามย่าน
            ใช้ทางออกหมายเลข 2 จะเจออาคารจัตุรัสจามจุรี
            ซึ่งใช้เป็นจุดเริ่มต้นเพื่อเดินทางไปยังจุดอื่นๆต่อไป
            โดยเดินผ่านอุโมงค์ใต้ดิน
            ที่เชื่อมต่อระหว่างตัวสถานีสามย่านไปยังโครงการสามย่านมิตรทาวน์ได้โดยตรง
            แล้วขึ้นไปใช้ทางออกด้านติดถนนพระรามสี่เลี้ยวขวาเดินทางซอยจุฬา 15
            เดินไปจนถึงประติมากรรมชิ้นแรก “ไมตรี-ผูกพัน”(ชุดน้ำชา)
            จะอยู่ในซอยซ้ายมือหน้าศาลเจ้าพ่อเสือ จากนั้นโดยสารรถประจำทาง
            หรือสามล้อรับจ้างหรือมอเตอร์ไซด์รับจ้าง ใช้เส้นทางซอยจุฬา 12
            และเลี้ยวซ้ายเข้าสวนหลวงสแควร์ หรืออุทยาน 100 ปี
            ไปชมประติมากรรมชิ้นอื่นๆ
          </div>

          <br />

          <div class="subtitle">แนะนำเส้นทางขับรถมาสวนหลวงสแควร์</div>
          <div class="description">
            1.ถนนพญาไท จากแยกปทุมวันเลี้ยวขวาเข้าซอยจุฬาฯ 12
            ขับตรงไปเรื่อยๆผ่านแยกตัดซอยจุฬาฯ9 เลี้ยวซ้ายเพื่อเข้าลานจอดรถ
            จากแยกสามย่านเลี้ยวซ้ายเข้าซอยจุฬาฯ 42
            ขับตรงไปถึงสามแยกเลี้ยวขวาซอยจุฬาฯ9 ขับตรงไปเรื่อยๆผ่าน I’m Park
            เลี้ยวซ้ายเพื่อเข้าลานจอดรถ
          </div>
          <div class="description">
            2.จากถนนบรรทัดทอง เลี้ยวซ้ายเข้าซอยจุฬาฯ 12 และเลี้ยวขวาที่ซอยจุฬาฯ
            7เลี้ยวขวาเข้าซอยจุฬาฯ 16 และเลี้ยวซ้ายที่ซอยจุฬาฯ 9
          </div>
          <div class="description">
            3.จากถนนพระราม 4 เลี้ยวซ้ายเข้าซอยจุฬาฯ 9 ขับตรงไปเรื่อยๆผ่าน I’m
            Park และเลี้ยวซ้ายอีกครั้งเพื่อเข้าลานจอดรถ
          </div>
        </div>
      </div>
      <!-- end row -->
    </div>
  </div>
</template>

<script>
import { reactive, onBeforeMount, toRefs, computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const state = reactive({
      icon: [
        {
          path: require("@/assets/images/icons/Group 327@2x.png"),
        },
        {
          path: require("@/assets/images/icons/Group 344@2x.png"),
        },
        {
          path: require("@/assets/images/icons/Group 328.svg"),
        },
      ],
    });

    const store = useStore();

    const getTime = () => {
      const date = new Date().getHours();
      store.commit("setRangeValue", date);
      setTimeout(() => {
        getTime();
      }, 1000 * 60 * 60);
    };

    const bgToggle = (boolean) => {
      store.commit("setIsNight", boolean);
    };

    onBeforeMount(() => {
      getTime();
    });

    return {
      ...toRefs(state),
      bgToggle,
      rangeValue: computed({
        get() {
          return store.getters["showRangeValue"];
        },
        set(newValue) {
          // set something
          store.commit("setRangeValue", newValue);
        },
      }),
      isNight: computed(() => store.getters["showIsNight"]),
    };
  },
};
</script>
<style lang="scss">
@import "../assets/css/contact.scss";
</style>
