<template>
  <div ref="fitScreen"></div>
</template>
<script>
import debounce from "./utils/debounce";
export default {
  name: 'FitScreen',
  props: {
    isScale: {
      type: Boolean,
      default: true,
    },
    defaultWidth: {
      type: Number,
      default: 1920
    },
    defaultHeight: {
      type: Number,
      default: 1080
    },
  },
  data() {
    return {
    };
  },
  methods: {
    fitScreen: debounce(function () {
      if (!this.isScale) {
        if (this.$el) {
          this.$el.style.width = `${this.defaultWidth}px`;
          this.$el.style.height = `${this.defaultHeight}px`;
          this.$el.style.transform = "none";
          this.$el.style.top = "0px";
          this.$el.style.left = "0px";
        }
      } else {
        const pcWidth = document.documentElement.clientWidth || document.body.clientWidth;
        const pcHeight =
            document.documentElement.clientHeight || document.body.clientHeight;
        const whFlag = pcWidth / this.defaultWidth > pcHeight / this.defaultHeight;
        const scale = whFlag
            ? Math.round((pcHeight / this.defaultHeight) * 1000) / 1000
            : Math.round((pcWidth / this.defaultWidth) * 1000) / 1000;
        if (this.$refs.fitScreen) {
          this.$refs.fitScreen.style.width = `${this.defaultWidth}px`;
          this.$refs.fitScreen.style.height = `${this.defaultHeight}px`;
          this.$refs.fitScreen.style.transform = `scale(${scale})`;

          const top = whFlag
              ? -(this.defaultHeight * (1 - scale)) / 2
              : -(
                  (this.defaultHeight * (1 - scale)) / 2 -
                  (pcHeight - this.defaultHeight * scale) / 2
              );

          const left = whFlag
              ? -(
                  (this.defaultWidth * (1 - scale)) / 2 -
                  (pcWidth - this.defaultWidth * scale) / 2
              )
              : -(this.defaultWidth * (1 - scale)) / 2;

          this.$refs.fitScreen.style.top = top + "px";
          this.$refs.fitScreen.style.left = left + "px";
        }
      }
    }, 100),
  },
}
</script>
