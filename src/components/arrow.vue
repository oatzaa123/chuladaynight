<template>
  <div class="left-arrow" :style="customClassLeft">
    <button @click.prevent="onBackwardClick" class="btn customButton">
      <div class="arrow"></div>
      <div class="left"></div>
    </button>
    <slot name="left-text" />
  </div>
  <slot name="middle-button"></slot>
  <div class="right-arrow" :style="customClassRight">
    <slot name="right-text" />
    <button @click.prevent="onForwardClick" class="btn customButton">
      <div class="arrow"></div>
      <div class="right"></div>
    </button>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "@/configs/axios";
export default {
  props: ["customClassLeft", "customClassRight", "name", "type"],
  async setup(props) {
    const router = useRouter();
    const route = useRoute();
    const data = ref(null);

    const onForwardClick = async () => {
      const { id } = route.params;
      try {
        // nextPage(id)
        const url =
          props.type === "news"
            ? `/news/${id}/nextNews`
            : `/workshop/${id}/nextWorkshop`;
        const res = await axios.get(url);
        data.value = res.data.data[props.type];
        if (res.data.data) {
          router.push({
            name: props.name,
            params: { id: data.value._id },
          });
        }
      } catch (error) {
        throw new Error(error);
      }
    };

    const onBackwardClick = async () => {
      const { id } = route.params;
      try {
        // perviousPage(id)
        const url =
          props.type === "news"
            ? `/news/${id}/perviousNews`
            : `/workshop/${id}/perviousWorkshop`;
        const res = await axios.get(url);
        data.value = res.data.data[props.type];
        if (res.data.data) {
          router.push({
            name: props.name,
            params: { id: data.value._id },
          });
        }
      } catch (error) {
        throw new Error(error);
      }
    };

    return {
      onForwardClick,
      onBackwardClick,
    };
  },
};
</script>

<style lang="scss">
.left-arrow {
  position: fixed;
  left: 5%;
  top: 50%;
}
.right-arrow {
  position: fixed;
  right: 5%;
  top: 50%;
}
.customButton {
  background-color: #7948e6;
  color: #ffffff;
  border-radius: 100%;
  // border: none;
  position: relative;
  width: 48px;
  height: 48px;
  .arrow {
    border: 0.5px solid white;
    width: 25px;
    position: absolute;
  }
  .left {
    border: solid white;
    position: absolute;
    border-width: 0 2px 2px 0;
    padding: 4px;
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
    top: 19px;
  }
  .right {
    border: solid white;
    position: absolute;
    border-width: 2px 0px 0px 2px;
    padding: 4px;
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
    top: 19px;
    right: 22%;
  }
}

@media screen and (max-width: 426px) {
  .customButton {
    width: 40px;
    height: 40px;
    .arrow {
      border: 0.5px solid white;
      width: 10px;
      position: absolute;
    }
    .left {
      border: solid white;
      position: absolute;
      border-width: 0 2px 2px 0;
      padding: 3px;
      transform: rotate(135deg);
      -webkit-transform: rotate(135deg);
      top: 15.5px;
    }
    .right {
      border: solid white;
      position: absolute;
      border-width: 2px 0px 0px 2px;
      padding: 3px;
      transform: rotate(135deg);
      -webkit-transform: rotate(135deg);
      top: 15.5px;
      right: 40%;
    }
  }
}
</style>
