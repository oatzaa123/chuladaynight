<template>
  <div id="section2">
    <div v-for="i in 5" :key="i" class="star-group">
      <div class="blur"></div>
      <div class="star"></div>
    </div>

    <div class="content"></div>
  </div>
</template>

<script>
export default {
  setup() {},
};
</script>

<style lang="scss">
@import "../../assets/css/home/section2.scss";
</style>
