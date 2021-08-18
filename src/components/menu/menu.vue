<template>
  <div class="right">
    <router-link
      :to="{ path: item.path }"
      v-for="item in Menu"
      :key="item.key"
      class="menu-link"
    >
      <div>{{ item.name }}</div>
    </router-link>
    <div class="menu-lang">
      <span class="th">TH</span>&nbsp;|&nbsp;<span class="en">EN</span>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    return {
      Menu: computed(() => store.getters["showMenuList"]),
    };
  },
};
</script>

<style lang="scss" scoped>
.right {
  width: 35%;
  line-height: 1.55;
  font-family: "Kanit-Medium";
  font-size: 17px;
  margin-top: 15px;
  opacity: 0;
  height: 0px;
  overflow: hidden;
  transition: opacity 1s, height 1s;
  &.show {
    opacity: 1;
    height: auto;
    overflow: unset;
  }
  .menu-link {
    color: #707070;
    text-decoration: unset;
    &.router-link-active {
      color: #ffffff;
    }
  }
  .menu-lang {
    display: flex;
    color: #707070;
    text-decoration: unset;
    span:nth-child(1) {
      margin-right: 1px;
    }
  }
}
</style>
