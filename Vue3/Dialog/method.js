import { computePosition, offset } from '@floating-ui/dom';
import PopupBox from './PopupBox';
import { createModal, getContent } from './factory';

let level1PopupEle;
export const level1Dialog = (() => {
  const dialog = createModal({
    destroyOnCloseRef: true,
    modalStyle: {
      position: 'absolute',
      left: '564px',
      top: '149px',
    },
  });
  let lastOption = null;

  function openDialog(opt) {
    const { title, closeable = true } = opt;
    lastOption = opt;
    function onClose() {
      level1Dialog.close();
    }
    dialog.open({
      onEnter(ev) {
        level1PopupEle = ev.ele;
      },
      content: (
        <PopupBox title={title} closeable={closeable} onClose={onClose}>
          {getContent(opt)}
        </PopupBox>
      ),
    });
  }
  function closeDialog(cb) {
    lastOption?.onClose?.();
    level2Dialog.close();
    dialog.close(() => {
      lastOption = null;
      cb?.();
    });
  }
  return {
    open(opt) {
      if (lastOption) {
        closeDialog(() => {
          openDialog(opt);
        });
      } else {
        openDialog(opt);
      }
    },
    close: closeDialog,
  };
})();

export const level2Dialog = (() => {
  const dialog = createModal({ destroyOnCloseRef: true });
  let lastOption;
  function openDialog(opt) {
    const { title, closeable = true } = opt;
    lastOption = opt;
    function onClose() {
      level2Dialog.close();
    }
    dialog.open({
      async onEnter({ ele: popupEle }) {
        const layout = await computePosition(level1PopupEle, popupEle, {
          placement: 'right-start',
          middleware: [offset(12)],
        });
        Object.assign(popupEle.style, {
          position: `${layout.strategy}`,
          left: `${layout.x}px`,
          top: `${layout.y}px`,
        });
      },
      content: (
        <PopupBox title={title} closeable={closeable} onClose={onClose}>
          {getContent(opt)}
        </PopupBox>
      ),
    });
  }
  function closeDialog(cb) {
    lastOption?.onClose?.();
    dialog.close(() => {
      lastOption = null;
      cb?.();
    });
  }
  return {
    open(opt) {
      if (lastOption) {
        closeDialog(() => {
          openDialog(opt);
        });
      } else {
        openDialog(opt);
      }
    },
    close: closeDialog,
  };
})();
