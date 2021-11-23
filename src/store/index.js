import { createStore } from "vuex";

export default createStore({
  state: {
    menuList: [
      { name: "menu_Home", path: "/Home" },
      { name: "menu_Gallery", path: "/Gallery" },
      { name: "menu_WorkShop", path: "/WorkShop" },
      { name: "menu_News", path: "/News" },
      { name: "menu_About", path: "/About" },
      { name: "menu_Contact", path: "/Contact" },
    ],
    isNight: true,
    rangeValue: 12,
    galleryList: [
      {
        id: "1aa",
        profile: require("@/assets/images/gallery/Image 1@2x.png"),
        title: "INNOVATION ART 4",
        author: "POOM JAI ARTIST",
        group: "POOM JAI ART GROUP",
        phone: "090 000 0000",
        content: [
          {
            image: require("@/assets/images/gallery/Image 1@2x.png"),
            description:
              "โครงการ “Chula Art Town” เป็นความร่วมมือกันระหว่างสำนักงานจัดการทรัพย์สิน จุฬาลงกรณ์มหาวิทยาลัย (PMCU), บริษัท อุไรพาณิชย์ จำกัด และ ATM Spray ซึ่งให้การสนับสนุนอุปกรณ์สีสำหรับสร้างสรรค์ผลงาน เนื่องในวาระครบรอบ 36 ปี ของคณะศิลปกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
          },
          {
            image: require("@/assets/images/gallery/Image 1@2x.png"),
            description:
              "โครงการ “Chula Art Town” เป็นความร่วมมือกันระหว่างสำนักงานจัดการทรัพย์สิน จุฬาลงกรณ์มหาวิทยาลัย (PMCU), บริษัท อุไรพาณิชย์ จำกัด และ ATM Spray ซึ่งให้การสนับสนุนอุปกรณ์สีสำหรับสร้างสรรค์ผลงาน เนื่องในวาระครบรอบ 36 ปี ของคณะศิลปกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
          },
        ],
      },
      {
        id: "2ww",
        profile: require("@/assets/images/gallery/Image 12@4X.png"),
        title: "CHULA FAHMAI",
        author: "aaa",
        group: "aaa",
        content: [
          {
            image: require("@/assets/images/gallery/Image 12@4X.png"),
            description:
              "โครงการ “Chula Art Town” เป็นความร่วมมือกันระหว่างสำนักงานจัดการทรัพย์สิน จุฬาลงกรณ์มหาวิทยาลัย (PMCU), บริษัท อุไรพาณิชย์ จำกัด และ ATM Spray ซึ่งให้การสนับสนุนอุปกรณ์สีสำหรับสร้างสรรค์ผลงาน เนื่องในวาระครบรอบ 36 ปี ของคณะศิลปกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
          },
          {
            image: require("@/assets/images/gallery/Image 12@4X.png"),
            description:
              "โครงการ “Chula Art Town” เป็นความร่วมมือกันระหว่างสำนักงานจัดการทรัพย์สิน จุฬาลงกรณ์มหาวิทยาลัย (PMCU), บริษัท อุไรพาณิชย์ จำกัด และ ATM Spray ซึ่งให้การสนับสนุนอุปกรณ์สีสำหรับสร้างสรรค์ผลงาน เนื่องในวาระครบรอบ 36 ปี ของคณะศิลปกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
          },
        ],
      },
      {
        id: "3qq",
        profile: require("@/assets/images/gallery/Image 51@4X.png"),
        title: "aaa",
        author: "aaa",
        group: "aaa",
        content: [
          {
            image: require("@/assets/images/gallery/Image 51@4X.png"),
            description:
              "โครงการ “Chula Art Town” เป็นความร่วมมือกันระหว่างสำนักงานจัดการทรัพย์สิน จุฬาลงกรณ์มหาวิทยาลัย (PMCU), บริษัท อุไรพาณิชย์ จำกัด และ ATM Spray ซึ่งให้การสนับสนุนอุปกรณ์สีสำหรับสร้างสรรค์ผลงาน เนื่องในวาระครบรอบ 36 ปี ของคณะศิลปกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
          },
        ],
      },
      {
        id: "4vv",
        profile: require("@/assets/images/gallery/Image 23@4X.png"),
        title: "aaa",
        author: "aaa",
        group: "aaa",
        content: [
          {
            image: require("@/assets/images/gallery/Image 23@4X.png"),
            description:
              "โครงการ “Chula Art Town” เป็นความร่วมมือกันระหว่างสำนักงานจัดการทรัพย์สิน จุฬาลงกรณ์มหาวิทยาลัย (PMCU), บริษัท อุไรพาณิชย์ จำกัด และ ATM Spray ซึ่งให้การสนับสนุนอุปกรณ์สีสำหรับสร้างสรรค์ผลงาน เนื่องในวาระครบรอบ 36 ปี ของคณะศิลปกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
          },
        ],
      },
      {
        id: "5gg",
        profile: require("@/assets/images/gallery/Image 11@4X.png"),
        title: "aaa",
        author: "aaa",
        group: "aaa",
        content: [
          {
            image: require("@/assets/images/gallery/Image 11@4X.png"),
            description:
              "โครงการ “Chula Art Town” เป็นความร่วมมือกันระหว่างสำนักงานจัดการทรัพย์สิน จุฬาลงกรณ์มหาวิทยาลัย (PMCU), บริษัท อุไรพาณิชย์ จำกัด และ ATM Spray ซึ่งให้การสนับสนุนอุปกรณ์สีสำหรับสร้างสรรค์ผลงาน เนื่องในวาระครบรอบ 36 ปี ของคณะศิลปกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
          },
        ],
      },
    ],
    newsList: [
      {
        id: 1,
        titleImage: require("@/assets/images/workshop/IMAGE 2563-08-17 153820@2x.png"),
        titleText: "งานเปิดตัวโครงการศิปละที่ยิ่งใหญ่แห่งปี 2020",
        newsDate: "12 มกราคม 2064",
        titleDescription: "lorem",
        content: [
          {
            contentType: "text",
            contentText: "...",
          },
          {
            contentType: "image",
            contentText: require("@/assets/images/workshop/IMAGE 2563-08-17 153820@2x.png"),
          },
          {
            contentType: "text",
            contentText: "...",
          },
        ],
      },
      {
        id: 2,
        titleImage: require("@/assets/images/workshop/IMAGE 2563-08-17 153820@2x.png"),
        titleText: "งานเปิดตัวโครงการศิปละที่ยิ่งใหญ่แห่งปี 2020",
        newsDate: "12 มกราคม 2065",
        titleDescription: "lorem",
        content: [
          {
            contentType: "text",
            contentText: "...",
          },
          {
            contentType: "image",
            contentText: require("@/assets/images/workshop/IMAGE 2563-08-17 153820@2x.png"),
          },
          {
            contentType: "text",
            contentText: "...",
          },
        ],
      },
      {
        id: 3,
        titleImage: require("@/assets/images/workshop/IMAGE 2563-08-17 153820@2x.png"),
        titleText: "งานเปิดตัวโครงการศิปละที่ยิ่งใหญ่แห่งปี 2020",
        newsDate: "12 มกราคม 2066",
        titleDescription: "lorem",
        content: [
          {
            contentType: "text",
            contentText: "...",
          },
          {
            contentType: "image",
            contentText: require("@/assets/images/workshop/IMAGE 2563-08-17 153820@2x.png"),
          },
          {
            contentType: "text",
            contentText: "...",
          },
        ],
      },
    ],
    backgroundImage: null,
    isAuthenticated: localStorage.getItem("isAuthenticated") || false,
    scrollId: "",
  },
  mutations: {
    setRangeValue: (state, payload) => {
      state.rangeValue = payload;
    },
    setIsNight: (state, payload) => {
      state.isNight = payload;
    },
    setBackgroundImage: (state, payload) => {
      state.backgroundImage = payload;
    },
    setIsAuthenticated: (state, payload) => {
      state.isAuthenticated = payload;
    },
    setScrollId: (state, payload) => {
      state.scrollId = payload;
    },
  },
  actions: {},
  getters: {
    showMenuList(state) {
      return state.menuList;
    },
    showIsNight(state) {
      return state.isNight;
    },
    showRangeValue(state) {
      return state.rangeValue;
    },
    showGalleryList(state) {
      return state.galleryList;
    },
    showNewsList(state) {
      return state.newsList;
    },
    showBackgroundImage(state) {
      return state.backgroundImage;
    },
  },
  modules: {},
});
