<template>
  <video ref="videoPlayer" class="video-js" height="500"></video>
</template>

<script>
import videojs from "video.js";
import "video.js/dist/video-js.css";

export default {
  name: "VideoPlayer",
  props: {
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      player: null,
    };
  },
  mounted() {
    console.log("...", this.options);
    this.player = videojs(
      this.$refs.videoPlayer,
      this.options,
      function onPlayerReady() {
        console.log("onPlayerReady", this);
      }
    );
  },
};
</script>

<style lang="scss">
.video-js {
  width: 100%;
  object-fit: scale-down;
}
</style>
