<template>
  <a-spin :spinning="loading" style="z-index:10001;position: absolute;top: 0px;left: 0px;" :tip="message">
    <div style="height: 100vh;width: 100vw;"></div>
  </a-spin>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    message: {
      type: String,
    },
  },
  data() {
    return {
      loading: true,
    };
  },
};
</script>

<style scoped>

</style>
