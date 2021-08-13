<template>
  <div class="overlay" :class="{ show: state.show }" @click="showMenu"></div>
  <div
    class="default"
    :style="{
      backgroundImage: `url('${globalStore.state.mainBackground}')`,
    }"
  >
    <div class="menu" @click="showMenu">
      <img :src="require('../assets/images/MENU@1X.png')" />
      <Menu :class="{ show: state.show }" />
    </div>
    <router-view />
  </div>
</template>

<script>
import { reactive, inject } from "vue";
import Menu from "./../components/menu/menu.vue";
export default {
  name: "default",
  components: {
    Menu,
  },
  setup: () => {
    const state = reactive({ show: false });
    const showMenu = () => {
      console.log("show");
      state.show = !state.show;
    };

    const globalStore = inject("globalStore");

    return {
      globalStore,
      state,
      showMenu,
    };
  },
};
</script>

<style lang="scss" scoped>
.overlay {
  position: absolute;
  z-index: -1;
  //   z-index: 1;
  right: 0;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.6;
  &.show {
    z-index: 1;
  }
}
.default {
  font-family: "Kanit-Regular";
  padding: 1.5rem;
  // background-image: url('../assets/images/home/section1/Rectangle 47.png');
  min-height: 100vh;
  background-size: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%;
  .menu {
    position: absolute;
    right: 6%;
    cursor: pointer;
    z-index: 100;
  }
}
.default::backdrop {
  filter: blur(6px);
}
</style>
