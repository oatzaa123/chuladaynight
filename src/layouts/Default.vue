<template>
  <div
    class="default"
    :style="{
      backgroundImage: `url('${globalStore.state.mainBackground}')`,
    }"
  >
    <div class="overlay" :class="{ show: state.show }" @click="showMenu"></div>
    <div class="menu" @click="showMenu">
      <img :src="require('../assets/images/MENU@1X.png')" />
      <Menu :class="{ show: state.show }" />
    </div>
    <Suspense>
      <template #default>
        <router-view :key="$route.fullPath" />
      </template>
      <template #fallback>
        <!-- <span>Loading...</span> -->
        <Loading
          :active="true"
          :can-cancel="true"
          :is-full-page="true"
          loader="dots"
        ></Loading>
      </template>
    </Suspense>
  </div>
</template>

<script>
import { reactive, inject } from "vue";
import Loading from "vue3-loading-overlay";
import "vue3-loading-overlay/dist/vue3-loading-overlay.css";
import Menu from "./../components/menu/menu.vue";
export default {
  name: "default",
  components: {
    Menu,
    Loading,
  },
  setup: () => {
    const state = reactive({
      show: false,
      isLoading: false,
      fullPage: true,
    });
    const showMenu = () => {
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
  left: 0;
  top: 0;
  opacity: 0.6;
  width: 100%;
  height: 100%;
  background: black;
  z-index: -1;
  &.show {
    z-index: 1;
  }
}
.default {
  position: relative;
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
    right: 5%;
    cursor: pointer;
    z-index: 100;
  }
}
.default::backdrop {
  filter: blur(6px);
}

@media screen and (max-width: 1440px) {
  .default {
    .menu {
      right: 3%;
    }
  }
}

@media screen and (max-width: 768px) {
  .default {
    .menu {
      right: 2%;
      img {
        width: 50px;
      }
    }
  }
}

@media screen and (max-width: 426px) {
  .default {
    .menu {
      right: 2%;
      img {
        width: 40px;
      }
    }
  }
}

@media screen and (max-width: 426px) {
  .default {
    .menu {
      right: 2%;
      img {
        width: 35px;
      }
    }
  }
}
</style>
