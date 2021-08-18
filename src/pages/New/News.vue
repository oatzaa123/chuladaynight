<template>
  <div class="news">
    <div class="container" @scroll="scroll($event)">
      <!-- <div class="dot" :style="dot"></div> -->
      <div class="news-title">
        <h1>
          NEWS & EVENT
          <p class="n">Art</p>
        </h1>
      </div>
      <div
        class="new-content"
        v-for="item in data"
        :key="item"
        @click="seeDetail(item.id)"
      >
        <div class="row">
          <div class="col-5 col-sm-5 new-img">
            <img
              :src="require('@/assets/images/workshop/image-workshop.png')"
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
        <div
          class="paginate-left col-5 col-sm-5"
          :class="[parent ? 'parent' : '']"
        ></div>
        <div class="col-7 col-sm-7 paginate-right">
          <Paginate
            v-show="!parent"
            :totalItems="totalItems"
            :pageLimit="pageLimit"
            pageNeighbours="1"
            :onPageChanged="onPageChanged"
          />
          <router-link to="/News">
            <button class="btn btn-custom" v-if="parent">
              ดูข่าวสารทั้งหมด &#8594;
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import Paginate from "@/components/paginate";
export default {
  components: {
    Paginate,
  },
  props: {
    limit: {
      type: Number,
      default: 5,
    },
    parent: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const globalStore = inject("globalStore");
    const currentPage = ref(null);
    const totalPages = ref(null);
    const router = useRouter();

    const setBackgroundImage = () => {
      globalStore.changeBackground(
        // require("@/assets/images/BACKGROUND@2X.png")
        require("@/assets/images/home/section1/Rectangle 47.png")
      );
    };

    var dot = ref({ top: 145 });

    const content = ref([
      {
        id: 1,
        createAt: "12 มกราคม 2064",
        image: require("@/assets/images/workshop/image-workshop.png"),
        title: "งานเปิดตัวโครงการ",
        description:
          "คณะศิลปกรรมศาสตร์มีห้องปฏิบัติการด้านสื่อดิจิทัลเพื่อนิสิตภายในรั้วมหาวิทยาลัยพื้นที่ส่วนใหญ่เปิดรองรับการปฏิบัติการด้านการเรียนการสอนเพื่อเหล่านิสิตภายในมหาวิทยาลัยทว่าทางมหาวิทยาลัยเล็งเห็นถึงศักยภาพและทรัพยากรที่มีคุณค่าและมีคุณภาพเพียงพอที่จะเผยแพร่สื่อเหล่านี้ออกสู่พื้นที่สาธารณะในทางหนึ่งเพื่อเป็นการเปิดโอกาสให้นิสิตนักศึกษาได้มีพื้นที่แสดงผลงานแสดงออกทางความคิดแก่บุคคลภายนอกอีกทั้งยังเป็นการมอบประสบการณ์ใหม่ให้แก่ผู้ชมทั่วไปที่อาจยังไม่เข้าใจในงานศิลปะด้านมัลติมีเดีย",
      },
      {
        id: 2,
        createAt: "12 มกราคม 2064",
        image: require("@/assets/images/workshop/image-workshop.png"),
        title: "งานเปิดตัวโครงการ",
        description:
          "คณะศิลปกรรมศาสตร์มีห้องปฏิบัติการด้านสื่อดิจิทัลเพื่อนิสิตภายในรั้วมหาวิทยาลัยพื้นที่ส่วนใหญ่เปิดรองรับการปฏิบัติการด้านการเรียนการสอนเพื่อเหล่านิสิตภายในมหาวิทยาลัยทว่าทางมหาวิทยาลัยเล็งเห็นถึงศักยภาพและทรัพยากรที่มีคุณค่าและมีคุณภาพเพียงพอที่จะเผยแพร่สื่อเหล่านี้ออกสู่พื้นที่สาธารณะในทางหนึ่งเพื่อเป็นการเปิดโอกาสให้นิสิตนักศึกษาได้มีพื้นที่แสดงผลงานแสดงออกทางความคิดแก่บุคคลภายนอกอีกทั้งยังเป็นการมอบประสบการณ์ใหม่ให้แก่ผู้ชมทั่วไปที่อาจยังไม่เข้าใจในงานศิลปะด้านมัลติมีเดีย",
      },
      {
        id: 3,
        createAt: "12 มกราคม 2064",
        image: require("@/assets/images/workshop/image-workshop.png"),
        title: "งานเปิดตัวโครงการ",
        description:
          "คณะศิลปกรรมศาสตร์มีห้องปฏิบัติการด้านสื่อดิจิทัลเพื่อนิสิตภายในรั้วมหาวิทยาลัยพื้นที่ส่วนใหญ่เปิดรองรับการปฏิบัติการด้านการเรียนการสอนเพื่อเหล่านิสิตภายในมหาวิทยาลัยทว่าทางมหาวิทยาลัยเล็งเห็นถึงศักยภาพและทรัพยากรที่มีคุณค่าและมีคุณภาพเพียงพอที่จะเผยแพร่สื่อเหล่านี้ออกสู่พื้นที่สาธารณะในทางหนึ่งเพื่อเป็นการเปิดโอกาสให้นิสิตนักศึกษาได้มีพื้นที่แสดงผลงานแสดงออกทางความคิดแก่บุคคลภายนอกอีกทั้งยังเป็นการมอบประสบการณ์ใหม่ให้แก่ผู้ชมทั่วไปที่อาจยังไม่เข้าใจในงานศิลปะด้านมัลติมีเดีย",
      },
      {
        id: 4,
        createAt: "12 มกราคม 2064",
        image: require("@/assets/images/workshop/image-workshop.png"),
        title: "งานเปิดตัวโครงการ",
        description:
          "คณะศิลปกรรมศาสตร์มีห้องปฏิบัติการด้านสื่อดิจิทัลเพื่อนิสิตภายในรั้วมหาวิทยาลัยพื้นที่ส่วนใหญ่เปิดรองรับการปฏิบัติการด้านการเรียนการสอนเพื่อเหล่านิสิตภายในมหาวิทยาลัยทว่าทางมหาวิทยาลัยเล็งเห็นถึงศักยภาพและทรัพยากรที่มีคุณค่าและมีคุณภาพเพียงพอที่จะเผยแพร่สื่อเหล่านี้ออกสู่พื้นที่สาธารณะในทางหนึ่งเพื่อเป็นการเปิดโอกาสให้นิสิตนักศึกษาได้มีพื้นที่แสดงผลงานแสดงออกทางความคิดแก่บุคคลภายนอกอีกทั้งยังเป็นการมอบประสบการณ์ใหม่ให้แก่ผู้ชมทั่วไปที่อาจยังไม่เข้าใจในงานศิลปะด้านมัลติมีเดีย",
      },
      {
        id: 5,
        createAt: "12 มกราคม 2064",
        image: require("@/assets/images/workshop/image-workshop.png"),
        title: "งานเปิดตัวโครงการ",
        description:
          "คณะศิลปกรรมศาสตร์มีห้องปฏิบัติการด้านสื่อดิจิทัลเพื่อนิสิตภายในรั้วมหาวิทยาลัยพื้นที่ส่วนใหญ่เปิดรองรับการปฏิบัติการด้านการเรียนการสอนเพื่อเหล่านิสิตภายในมหาวิทยาลัยทว่าทางมหาวิทยาลัยเล็งเห็นถึงศักยภาพและทรัพยากรที่มีคุณค่าและมีคุณภาพเพียงพอที่จะเผยแพร่สื่อเหล่านี้ออกสู่พื้นที่สาธารณะในทางหนึ่งเพื่อเป็นการเปิดโอกาสให้นิสิตนักศึกษาได้มีพื้นที่แสดงผลงานแสดงออกทางความคิดแก่บุคคลภายนอกอีกทั้งยังเป็นการมอบประสบการณ์ใหม่ให้แก่ผู้ชมทั่วไปที่อาจยังไม่เข้าใจในงานศิลปะด้านมัลติมีเดียaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
      {
        id: 6,
        createAt: "20 มกราคม 2064",
        image: require("@/assets/images/workshop/image-workshop.png"),
        title: "งานเปิดตัวโครงการ",
        description:
          "คณะศิลปกรรมศาสตร์มีห้องปฏิบัติการด้านสื่อดิจิทัลเพื่อนิสิตภายในรั้วมหาวิทยาลัยพื้นที่ส่วนใหญ่เปิดรองรับการปฏิบัติการด้านการเรียนการสอนเพื่อเหล่านิสิตภายในมหาวิทยาลัยทว่าทางมหาวิทยาลัยเล็งเห็นถึงศักยภาพและทรัพยากรที่มีคุณค่าและมีคุณภาพเพียงพอที่จะเผยแพร่สื่อเหล่านี้ออกสู่พื้นที่สาธารณะในทางหนึ่งเพื่อเป็นการเปิดโอกาสให้นิสิตนักศึกษาได้มีพื้นที่แสดงผลงานแสดงออกทางความคิดแก่บุคคลภายนอกอีกทั้งยังเป็นการมอบประสบการณ์ใหม่ให้แก่ผู้ชมทั่วไปที่อาจยังไม่เข้าใจในงานศิลปะด้านมัลติมีเดียaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
      {
        id: 7,
        createAt: "20 มกราคม 2064",
        image: require("@/assets/images/workshop/image-workshop.png"),
        title: "งานเปิดตัวโครงการ",
        description:
          "คณะศิลปกรรมศาสตร์มีห้องปฏิบัติการด้านสื่อดิจิทัลเพื่อนิสิตภายในรั้วมหาวิทยาลัยพื้นที่ส่วนใหญ่เปิดรองรับการปฏิบัติการด้านการเรียนการสอนเพื่อเหล่านิสิตภายในมหาวิทยาลัยทว่าทางมหาวิทยาลัยเล็งเห็นถึงศักยภาพและทรัพยากรที่มีคุณค่าและมีคุณภาพเพียงพอที่จะเผยแพร่สื่อเหล่านี้ออกสู่พื้นที่สาธารณะในทางหนึ่งเพื่อเป็นการเปิดโอกาสให้นิสิตนักศึกษาได้มีพื้นที่แสดงผลงานแสดงออกทางความคิดแก่บุคคลภายนอกอีกทั้งยังเป็นการมอบประสบการณ์ใหม่ให้แก่ผู้ชมทั่วไปที่อาจยังไม่เข้าใจในงานศิลปะด้านมัลติมีเดียaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
      {
        id: 8,
        createAt: "20 มกราคม 2064",
        image: require("@/assets/images/workshop/image-workshop.png"),
        title: "งานเปิดตัวโครงการ",
        description:
          "คณะศิลปกรรมศาสตร์มีห้องปฏิบัติการด้านสื่อดิจิทัลเพื่อนิสิตภายในรั้วมหาวิทยาลัยพื้นที่ส่วนใหญ่เปิดรองรับการปฏิบัติการด้านการเรียนการสอนเพื่อเหล่านิสิตภายในมหาวิทยาลัยทว่าทางมหาวิทยาลัยเล็งเห็นถึงศักยภาพและทรัพยากรที่มีคุณค่าและมีคุณภาพเพียงพอที่จะเผยแพร่สื่อเหล่านี้ออกสู่พื้นที่สาธารณะในทางหนึ่งเพื่อเป็นการเปิดโอกาสให้นิสิตนักศึกษาได้มีพื้นที่แสดงผลงานแสดงออกทางความคิดแก่บุคคลภายนอกอีกทั้งยังเป็นการมอบประสบการณ์ใหม่ให้แก่ผู้ชมทั่วไปที่อาจยังไม่เข้าใจในงานศิลปะด้านมัลติมีเดียaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
      {
        id: 9,
        createAt: "20 มกราคม 2064",
        image: require("@/assets/images/workshop/image-workshop.png"),
        title: "งานเปิดตัวโครงการ",
        description:
          "คณะศิลปกรรมศาสตร์มีห้องปฏิบัติการด้านสื่อดิจิทัลเพื่อนิสิตภายในรั้วมหาวิทยาลัยพื้นที่ส่วนใหญ่เปิดรองรับการปฏิบัติการด้านการเรียนการสอนเพื่อเหล่านิสิตภายในมหาวิทยาลัยทว่าทางมหาวิทยาลัยเล็งเห็นถึงศักยภาพและทรัพยากรที่มีคุณค่าและมีคุณภาพเพียงพอที่จะเผยแพร่สื่อเหล่านี้ออกสู่พื้นที่สาธารณะในทางหนึ่งเพื่อเป็นการเปิดโอกาสให้นิสิตนักศึกษาได้มีพื้นที่แสดงผลงานแสดงออกทางความคิดแก่บุคคลภายนอกอีกทั้งยังเป็นการมอบประสบการณ์ใหม่ให้แก่ผู้ชมทั่วไปที่อาจยังไม่เข้าใจในงานศิลปะด้านมัลติมีเดียaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
      {
        id: 10,
        createAt: "20 มกราคม 2064",
        image: require("@/assets/images/workshop/image-workshop.png"),
        title: "งานเปิดตัวโครงการ",
        description:
          "คณะศิลปกรรมศาสตร์มีห้องปฏิบัติการด้านสื่อดิจิทัลเพื่อนิสิตภายในรั้วมหาวิทยาลัยพื้นที่ส่วนใหญ่เปิดรองรับการปฏิบัติการด้านการเรียนการสอนเพื่อเหล่านิสิตภายในมหาวิทยาลัยทว่าทางมหาวิทยาลัยเล็งเห็นถึงศักยภาพและทรัพยากรที่มีคุณค่าและมีคุณภาพเพียงพอที่จะเผยแพร่สื่อเหล่านี้ออกสู่พื้นที่สาธารณะในทางหนึ่งเพื่อเป็นการเปิดโอกาสให้นิสิตนักศึกษาได้มีพื้นที่แสดงผลงานแสดงออกทางความคิดแก่บุคคลภายนอกอีกทั้งยังเป็นการมอบประสบการณ์ใหม่ให้แก่ผู้ชมทั่วไปที่อาจยังไม่เข้าใจในงานศิลปะด้านมัลติมีเดียaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
    ]);

    const newData = ref([]);

    const onPageChanged = (data) => {
      const { currentPage: cPage, totalPages: totalPage, pageLimit } = data;
      const offset = (cPage - 1) * pageLimit;
      const currentData = content.value.slice(offset, offset + pageLimit);
      currentPage.value = cPage;
      totalPages.value = totalPage;
      newData.value = currentData;
    };

    const scroll = (e) => {
      if (e.target.scrollTop >= 125) {
        dot = { top: e.target.scrollTop };
      } else {
        dot = { top: 145 };
      }
    };

    const seeDetail = (id) => {
      router.push({ name: "News-id", params: { id } });
    };

    onMounted(() => {
      setBackgroundImage();
    });

    return {
      data: computed(() => newData.value),
      totalItems: content.value.length,
      totalPages: totalPages.value,
      currentPage: currentPage.value,
      pageLimit: props.limit,
      onPageChanged,
      scroll,
      dot: computed(() => dot.value),
      seeDetail,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/css/container.scss";
@import "@/assets/css/news.scss";
.news {
  .container {
    padding-top: var(--bs-gutter-x, 0);
    overflow-y: unset;
    max-height: unset;
    .btn-custom {
      position: relative;
      font-size: 15px;
      font-family: "Prompt";
      border-radius: 20px;
      background-color: #7948e6;
      color: #fff;
      border: 1px solid #7948e6;
      padding: 8px 15px;
      &::before {
        content: "";
        position: absolute;
        top: 15px;
        left: -32px;
        width: 10px;
        height: 10px;
        border: 3px solid #ba1bff;
        border-width: none;
        border-radius: 50%;
        background: #ba1bff;
      }
    }
  }
}
</style>
