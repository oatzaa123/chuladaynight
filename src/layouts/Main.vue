<template>
  <div class="main">
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
    <Footer />
  </div>
</template>

<script>
import { reactive } from "vue";
import Footer from "@/components/footer/footer.vue";
import Loading from "vue3-loading-overlay";
import "vue3-loading-overlay/dist/vue3-loading-overlay.css";
export default {
  components: {
    Footer,
    Loading,
  },
  setup: () => {
    const state = reactive({
      show: false,
      isLoading: false,
      fullPage: true,
    });

    return {
      state,
    };
  },
};
</script>

<style lang="scss">
// .main {
//     background-color: #030124;
//     padding-bottom: 100px;
// }
</style>
