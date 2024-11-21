import Vue from 'vue';
import Loading from './AdntvLoading';
import packageInfo from './package.json';

const LoadingConstructor = Vue.extend(Loading);
const install = (Vue) => {
  Vue.prototype.$Loading = (message, loadingTime = 0) => {
    LoadingConstructor.prototype.close = function () {
      if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
      this.$destroy();
    };
    const instance = new LoadingConstructor({
      el: document.createElement('div'),
      propsData: {
        message,
      },
    });
    document.body.appendChild(instance.$el);
    if (!isNaN(loadingTime) && loadingTime > 0) {
      setTimeout(() => {
        Vue.prototype.$Loading.close();
      }, loadingTime);
    }
    return instance;
  };
  Vue.directive('loading', {
    bind(el, binding) {
      if (binding.value) {
        const instance = new LoadingConstructor({
          el: document.createElement('div'),
        });
        console.log(el, el.parentNode);
        el.appendChild(instance.$el);
        el.instance = {
          close: () => {
            el.removeChild(instance.$el);
          },
        };
      } else {
        if (el.instance) {
          el.instance.close();
        }
      }
    },
    update(el, binding) {
      if (binding.value !== binding.oldValue) {
        if (binding.value) {
          const instance = new LoadingConstructor({
            el: document.createElement('div'),
          });
          el.appendChild(instance.$el);
          el.instance = {
            close: () => {
              el.removeChild(instance.$el);
            },
          };
        } else {
          if (el.instance) {
            el.instance.close();
          }
        }
      }
    },
    unbind(el) {
      if (el.instance) {
        el.instance.close();
      }
    },
  });
};
export default {
  version: packageInfo.version,
  install: install,
};
