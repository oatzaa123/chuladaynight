<template>
  <img :src="getImageURL(name, path)" />
</template>

<script>
export default {
  props: {
    imagePath: {
      type: String,
      default: `common`,
    },
    imageName: {
      type: String,
      default: `defaultuser.png`,
    },
  },
  setup(props) {
    const getImageURL = (imageName, imagePath) => {
      return `${process.env.VUE_APP_PATH_IMAGE}/${imagePath}/${imageName}`;
    };

    return {
      path: props.imagePath,
      name: props.imageName,
      getImageURL,
    };
  },
};
</script>

<style></style>
