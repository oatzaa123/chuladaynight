<template>
  <div class="contact-bg" :class="{ bgnight: isNight }">
    <div id="contact" class="container">
      <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css" />
      <div class="row">
        <div class="map col-6">
          <img :src="require('../assets/images/contact/Image_9@4X.png')" />
        </div>
        <div class="contact-description col-6">
          <div class="logo-block">
            <div class="left">
              <div class="logo">
                <div class="title">CHULA</div>
                <div class="sub">DIGITAL ARTS PARK</div>
              </div>
              <div class="toggle" :class="{ day: !isNight, night: isNight }">
                <div
                  class="day"
                  :class="{ active: !isNight }"
                  @click="bgToggle(false)"
                >
                  DAY
                </div>
                <div class="n">&</div>
                <div
                  class="night"
                  :class="{ active: isNight }"
                  @click="bgToggle(true)"
                >
                  NIGHT
                </div>
              </div>
            </div>
            <div class="description">
              <div class="address">
                <p>553 1555, 1557 Rama IV Rd, Khwaeng Wang Mai,</p>
                <p>Pathum Wan, Krung Thep Maha Nakhon</p>
                <p>10330, Thailand</p>
              </div>
              <div class="email">
                <p>example@yahoo.com</p>
                <p>02-222-222</p>
              </div>
            </div>
          </div>

          <div class="icon-group">
            <div v-for="(item, index) in icon" :key="index">
              <img class="contact-icon" :src="item.path" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onBeforeMount, toRefs, computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const state = reactive({
      isNight: true,
      icon: [
        {
          path: require("../assets/images/home/footer/Group 118@2X.png"),
        },
        {
          path: require("../assets/images/home/footer/Group 117@2X.png"),
        },
        {
          path: require("../assets/images/home/footer/Group 122@2X.png"),
        },
      ],
    });

    const store = useStore();

    const getTime = () => {
      const date = new Date().getHours();
      store.commit("setRangeValue", date);
      setTimeout(() => {
        getTime();
      }, 1000 * 60 * 60);
    };

    const bgToggle = (boolean) => {
      store.commit("setIsNight", boolean);
    };

    onBeforeMount(() => {
      getTime();
    });

    // watch(
    //   () => store.getters["showRangeValue"],
    //   (rangeValue) => {
    //     var value = ((rangeValue - 0) / (24 - 0)) * 100;
    //     state.rangeStyle = `background: linear-gradient(to right, #b51bff 0%, #b51bff ${value}%, #fff ${value}%, #fff 100%);`;
    //     if (rangeValue <= 12) {
    //       bgToggle(false);
    //     } else {
    //       bgToggle(true);
    //     }
    //   }
    // );

    return {
      ...toRefs(state),
      bgToggle,
      rangeValue: computed({
        get() {
          return store.getters["showRangeValue"];
        },
        set(newValue) {
          // set something
          store.commit("setRangeValue", newValue);
        },
      }),
      isNight: computed(() => store.getters["showIsNight"]),
    };
  },
};
</script>
<style lang="scss">
@import "../assets/css/contact.scss";
</style>
