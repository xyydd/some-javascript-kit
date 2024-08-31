<script lang="jsx">
import { ref, Teleport, Transition, onMounted, onBeforeMount } from 'vue';
function getParent(getContainer) {
  if (!getContainer) {
    return document.body;
  }
  if (typeof getContainer === 'string') {
    return document.querySelector(getContainer);
  }
  if (typeof getContainer === 'function') {
    return getContainer();
  }
  if (typeof getContainer === 'object' && getContainer instanceof window.HTMLElement) {
    return getContainer;
  }
}
export default {
  name: 'Modal',
  props: {
    getContainer: [String, Object, Function],
    visible: Boolean,
    destroyOnClose: Boolean,
    modalClass: String,
    modalStyle: Object,
    motionName: { type: String, default: 'modal-fade' },
    onEnter: Function,
  },
  emits: ['update:visible', 'closed', 'visibleChange'],
  setup(props, { slots, emit }) {
    let container;
    let domRef = ref();
    onBeforeMount(() => {
      container = getParent(props.getContainer);
    });

    onMounted(() => {
      // console.log('onMounted');
    });
    function onEnter() {
      // console.log('onEnter');
      // emit before onMounted
      props.onEnter?.({
        ele: domRef.value,
      });
    }
    function onAfterLeave() {
      emit('closed');
    }
    return () => {
      if (!container) {
        return;
      }
      const { visible, destroyOnClose, modalClass = '', modalStyle, motionName } = props;
      let content = null;
      if (visible || !destroyOnClose) {
        content = (
          <div class="modal-content" v-show={visible}>
            {slots.default?.()}
          </div>
        );
      }
      // const events = {
      //   // onEnter={onPrepare}
      //   //       onAfterEnter={() => onVisibleChanged(true)}
      //   //       onAfterLeave={() => onVisibleChanged(false)}
      // };
      return (
        <Teleport to={container}>
          <div class={['modal-wrapper', modalClass]} style={modalStyle} ref={domRef}>
            <Transition appear name={motionName} onEnter={onEnter} onAfterLeave={onAfterLeave}>
              {content}
            </Transition>
          </div>
        </Teleport>
      );
    };
  },
};
</script>
<style lang="scss" scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transform-origin: top left;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.2, 0.2);
}
</style>
