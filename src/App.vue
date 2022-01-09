<template>
  <div id="app">
    <!-- <Auth /> -->
    <router-view v-slot="{ Component }">
      <transition name="route" mode="out-in" @after-enter="afterEnter" appear>
        <component :is="Component"> </component>
      </transition>
    </router-view>
  </div>
</template>

<script>
import { provide } from "vue";
import globalStore from "@/globalStore/index.js";
// import Auth from "@/components/Auth";
export default {
  name: "App",
  components: {
    // Auth,
  },
  setup(_, { emit }) {
    provide("globalStore", globalStore);
    const afterEnter = () => {
      emit("scrollAfterEnter");
    };
    return { afterEnter };
  },
};
</script>

<style lang="scss">
@import "./assets/css/font.scss";

/** route transition */
#app {
  overflow: hidden;
}

.route-enter-from {
  opacity: 0;
}

.route-enter-active {
  transition: opacity 0.3s ease-out;
}

.route-leave-to {
  opacity: 0;
}

.route-leave-active {
  transition: all 0.3s ease-in;
  opacity: 0;
}
</style>
