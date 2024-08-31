import { shallowRef, createApp, h } from 'vue';
import Modal from './Modal';
import globalRegister from './globalRegister';

function isDefined(v) {
  return !Object.is(v, undefined);
  // return true;
}

export function getContent({ content, component, props }) {
  if (content) {
    return content;
  }
  if (component) {
    return h(component, { ...props });
  }
  return null;
}

export function createModal(options = {}) {
  const componentRef = shallowRef(options.component);
  const contentRef = shallowRef(options.content);
  const propsRef = shallowRef(options.props);
  const modalStyleRef = shallowRef(options.modalStyle);
  const destroyOnCloseRef = shallowRef(options.destroyOnClose);
  const visible = shallowRef();

  let app = null;
  const container = document.createElement('div');
  function open(opt = {}) {
    const { content, component, props, modalStyle, destroyOnClose, ...otherOption } = opt;
    Object.assign(options, otherOption);
    if (isDefined(content)) {
      contentRef.value = content;
    }
    if (isDefined(component)) {
      componentRef.value = component;
    }
    if (isDefined(props)) {
      propsRef.value = props;
    }
    if (isDefined(modalStyle)) {
      modalStyleRef.value = modalStyle;
    }
    if (isDefined(destroyOnClose)) {
      destroyOnCloseRef.value = destroyOnClose;
    }
    visible.value = true;
    if (app) {
      return;
    }
    app = createApp({
      render() {
        return (
          <Modal
            v-model:visible={visible.value}
            modalStyle={modalStyleRef.value}
            destroyOnClose={destroyOnCloseRef.value}
            onEnter={options.onEnter}
            onClosed={onClosed}
          >
            {getContent({
              content: contentRef.value,
              component: componentRef.value,
              props: propsRef.value,
            })}
          </Modal>
        );
      },
    });
    globalRegister(app);
    app.mount(container);
    return app;
  }
  let closeCallback;
  function close(cb) {
    closeCallback = cb;
    visible.value = false;
  }
  function onClosed() {
    closeCallback?.();
    options.closed?.();
  }

  function destroy() {
    if (app) {
      app.unmount();
      app = null;
      return;
    }
  }
  return {
    open,
    close,
    destroy,
    getApp() {
      return app;
    },
  };
}
