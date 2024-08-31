<template>
  <div class="popup-box">
    <button class="close-btn" @click="handleClose" v-if="closeable"></button>
    <div class="header">
      <slot name="title">
        <span>{{ title }}</span>
      </slot>
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>
<script setup>
defineOptions({
  name: 'PopupBox',
});
defineProps({
  title: String,
  closeable: Boolean,
});
const emit = defineEmits(['close']);
function handleClose() {
  emit('close');
}
</script>
<style lang="scss" scoped>
.popup-box {
  width: max-content;
  position: relative;
  background: rgba(25, 31, 34, 0.2);
  border-radius: 8px 0px 8px 8px;
  border: 1px solid rgba(19, 251, 255, 0.12);
  backdrop-filter: blur(1px);
  padding: 12px;
  .header {
    height: 28px;
    font-family: SourceHanSansSC-Bold, SourceHanSansSC;
    font-weight: bold;
    color: #ffffff;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border-bottom: 1px solid;
    border-image: linear-gradient(to right, #ffffff, rgba(255, 255, 255, 0.2)) 1;
    margin-bottom: 12px;
  }
  .close-btn {
    position: absolute;
    right: 12px;
    top: 12px;
    display: block;
    width: 16px;
    height: 16px;
    background: url('./imgs/close.png') no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
    border: none;
    outline: none;
  }
}
</style>
