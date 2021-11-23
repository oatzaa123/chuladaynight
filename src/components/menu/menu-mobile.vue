<template>
  <div class="menu-mobile">
    <router-link
      :to="{ path: item.path }"
      v-for="item in Menu"
      :key="item.key"
      class="menu-link"
    >
      <div>{{ $t(item.name) }}</div>
    </router-link>
    <div class="menu-lang">
      <div @click="saveLocale('th')">
        <input type="radio" id="th" value="th" v-model="$i18n.locale" />
        TH
      </div>
      &nbsp;|&nbsp;
      <div @click="saveLocale('en')">
        <input type="radio" id="en" value="en" v-model="$i18n.locale" />EN
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    const saveLocale = (lang) => {
      localStorage.setItem("locale", lang);
    };

    return {
      Menu: computed(() => store.getters["showMenuList"]),
      saveLocale,
    };
  },
};
</script>

<style lang="scss" scoped>
.menu-mobile {
  line-height: 1.55;
  font-family: "Kanit-Medium";
  font-size: 17px;
  margin-top: 15px;
  opacity: 0;
  height: 0px;
  overflow: hidden;
  transition: opacity 1s, height 1s;
  position: absolute;
  z-index: 10;
  @media screen and (max-width: 768px) {
    font-size: 15px;
    margin-top: 10px;
  }
  @media screen and (max-width: 426px) {
    font-size: 13px;
    margin-top: 10px;
  }
  @media screen and (max-width: 376px) {
    font-size: 10px;
    margin-top: 10px;
  }
  &.show {
    opacity: 1;
    height: auto;
    width: 100%;
    overflow: unset;
    z-index: 10;
  }
  .menu-link {
    color: #707070;
    text-decoration: unset;
    &.router-link-active {
      color: #ffffff;
    }
    &:hover {
      color: rgba(255, 255, 255, 1);
    }
  }
  .menu-lang {
    display: flex;
    color: #707070;
    text-decoration: unset;
    z-index: 10;
    span:nth-child(1) {
      margin-right: 1px;
    }
    div {
      position: relative;
      input[type="radio"] {
        cursor: pointer;
        opacity: 0;
        position: absolute;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
