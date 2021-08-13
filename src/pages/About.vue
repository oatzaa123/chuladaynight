<template>
  <!-- <div class="about-bg" :class="{ bgnight: isNight }"></div> -->

  <div id="about" class="container">
    <div class="row">
      <div class="logo-block">
        <!-- <div class="row"> -->
        <div class="left col-6">
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
        <div class="right col-6">
          <div class="title">ABOUT</div>
          <div class="description">
            <p>
              คณะศิลปกรรมศาสตร์
              มีห้องปฏิบัติการด้านสื่อดิจิทัลเพื่อนิสิตภายในรั้วมหาวิทยาลัย
              พื้นที่ส่วนใหญ่เปิดรองรับการปฏิบัติการด้านการเรียนการสอนเพื่อเหล่านิสิตภายในมหาวิทยาลัยทว่าทางมหาวิทยาลัยเล็งเห็นถึงศักยภาพและทรัพยากรที่มีคุณค่าและมีคุณภาพเพียงพอที่จะเผยแพร่สื่อเหล่านี้ออกสู่พื้นที่สาธารณะในทางหนึ่งเพื่อเป็นการเปิดโอกาสให้นิสิตนักศึกษาได้มีพื้นที่แสดงผลงาน
              แสดงออกทางความคิดแก่บุคคลภายนอก
              อีกทั้งยังเป็นการมอบประสบการณ์ใหม่ให้แก่ผู้ชมทั่วไปที่อาจยังไม่เข้าใจในงานศิลปะด้านมัลติมีเดีย
            </p>
          </div>
        </div>
        <!-- </div> -->
      </div>
    </div>
    <div class="row">
      <div class="about-description">
        <div class="header">Timeline {{ result }}</div>
        <div class="timeline">
          <div
            class="row timeline-item"
            v-for="item in timeline"
            :key="item.key"
          >
            <div class="col-5 image">
              <img :src="item.image" alt="" />
            </div>
            <div class="col-2 year">
              {{ item.year }}
            </div>
            <div class="col-5">
              <div class="title">
                {{ item.title }}
              </div>
              <div class="content">
                {{ item.content }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, computed, inject, onMounted } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const state = reactive({
      timeline: [
        {
          year: "20xx",
          image: require("../assets/images/abouts/Screen Shot 2020-08-17 at 6.54.08 PM.png"),
          title: "คณะศิลปกรรมศาสตร์",
          content:
            "คณะศิลปกรรมศาสตร์ มีห้องปฏิบัติการด้านสื่อดิจิทัลเพื่อนิสิตภายในรั้วมหาวิทยาลัย พื้นที่ส่วนใหญ่เปิดรองรับการปฏิบัติการด้านการเรียนการสอนเพื่อเหล่านิสิตภายในมหาวิทยาลัยทว่าทางมหาวิทยาลัยเล็งเห็นถึงศักยภาพและทรัพยากรที่มีคุณค่าและมีคุณภาพเพียงพอที่จะเผยแพร่สื่อเหล่านี้ออกสู่พื้นที่สาธารณะในทางหนึ่งเพื่อเป็นการเปิดโอกาสให้นิสิตนักศึกษาได้มีพื้นที่แสดงผลงาน แสดงออกทางความคิดแก่บุคคลภายนอก อีกทั้งยังเป็นการมอบประสบการณ์ใหม่ให้แก่ผู้ชมทั่วไปที่อาจยังไม่เข้าใจในงานศิลปะด้านมัลติมีเดีย",
        },
        {
          year: "20xx",
          image: require("../assets/images/abouts/Screen Shot 2020-08-17 at 6.54.08 PM.png"),
          title: "Setup",
          content:
            "คณะศิลปกรรมศาสตร์ มีห้องปฏิบัติการด้านสื่อดิจิทัลเพื่อนิสิตภายในรั้วมหาวิทยาลัย พื้นที่ส่วนใหญ่เปิดรองรับการปฏิบัติการด้านการเรียนการสอนเพื่อเหล่านิสิตภายในมหาวิทยาลัยทว่าทางมหาวิทยาลัยเล็งเห็นถึงศักยภาพและทรัพยากรที่มีคุณค่าและมีคุณภาพเพียงพอที่จะเผยแพร่สื่อเหล่านี้ออกสู่พื้นที่สาธารณะในทางหนึ่งเพื่อเป็นการเปิดโอกาสให้นิสิตนักศึกษาได้มีพื้นที่แสดงผลงาน แสดงออกทางความคิดแก่บุคคลภายนอก อีกทั้งยังเป็นการมอบประสบการณ์ใหม่ให้แก่ผู้ชมทั่วไปที่อาจยังไม่เข้าใจในงานศิลปะด้านมัลติมีเดีย",
        },
      ],
      result: "test",
    });

    const store = useStore();

    const globalStore = inject("globalStore");

    const setBackgroundImage = () => {
      globalStore.changeBackground(
        require("@/assets/images/home/section1/Rectangle 47.png")
      );
    };

    onMounted(() => {
      setBackgroundImage();
    });

    return {
      ...toRefs(state),
      isNight: computed(() => store.getters["showIsNight"]),
    };
  },
};
</script>

<style lang="scss">
@import "../assets/css/about.scss";
</style>
