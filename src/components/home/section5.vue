<template>
  <div class="section5">
    <News :limit="3" parent="section5" />
  </div>
</template>

<script>
import News from "@/pages/New/News";
export default {
  components: {
    News,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss">
@import "../../assets/css/home/section5.scss";
</style>
