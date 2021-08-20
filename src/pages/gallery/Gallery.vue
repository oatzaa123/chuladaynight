<template>
  <div class="container">
    <div class="title">
      <div class="group-title">
        <sup class="sup"><p>Gallery</p></sup>
        <h1 class="customText">DIGITAL ART</h1>
        <sub class="sub"><h5>SCULTURE</h5></sub>
      </div>
    </div>
    <div class="content">
      <div class="map">
        <div class="mappin">
          <div class="pin" v-for="(i, index) in 16" :key="index">
            <img
              v-if="position === index"
              :src="require('@/assets/images/gallery/Group 295.svg')"
            />
            <img
              v-else
              :src="require('@/assets/images/gallery/Group 295 (1).svg')"
            />
          </div>
          <img
            :src="require('../../assets/images/gallery/Group 828 (1).svg')"
          />
        </div>
      </div>
      <div class="content-view">
        <div
          v-for="(item, index) in data"
          :key="index"
          class="image-view"
          @mouseover="hoverImage(index)"
          @click.stop="onHandleClick(item.id)"
        >
          <img :src="item.profile" width="570" />
          <div class="overlay">
            <div class="text">
              <p class="text-title">{{ item.title }}</p>
              <div class="sub-text">
                <p>
                  <img
                    :src="require('../../assets/images/icons/user.png')"
                    width="20"
                    class="hover-img"
                  />
                  {{ item.author }}
                </p>
                <p>{{ item.group }}</p>
              </div>
              <span>{{ item.content[0].description }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, inject, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const globalStore = inject("globalStore");

    const map = ref([
      { path: require("../../assets/images/gallery/Group 828 (1).svg") },
      { path: require("../../assets/images/gallery/Group 828 (1).svg") },
      { path: require("../../assets/images/gallery/Group 828 (1).svg") },
      { path: require("../../assets/images/gallery/Group 828 (1).svg") },
      { path: require("../../assets/images/gallery/Group 828 (1).svg") },
    ]);

    const position = ref(0);
    const router = useRouter();

    const hoverImage = (index) => {
      position.value = index;
    };

    const onHandleClick = (id) => {
      router.push({ name: "Gallery-id", params: { id } });
    };

    const setBackgroundImage = () => {
      globalStore.changeBackground(
        require("@/assets/images/home/section1/Rectangle 47.png")
      );
    };

    onMounted(() => {
      setBackgroundImage();
    });

    return {
      data: computed(() => {
        return store.getters["showGalleryList"];
      }),
      position: computed(() => position.value),
      hoverImage,
      pictureHover: computed(() => {
        return map.value[position.value].path;
      }),
      onHandleClick,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/css/gallery.scss";
</style>
