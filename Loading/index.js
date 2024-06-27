import Loading from './AdntvLoading.vue';
import packageInfo from './package.json';
const install = (Vue) =>  {
  Vue.prototype.$Loading = (message) => {
    const LoadingConstructor = Vue.extend(Loading);
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
    return instance;
  };
  // Vue.directive('loading', {
  //   bind(el, binding) {
  //     if (binding.value) {}
  //   }
  // })
};
export default {
  version: packageInfo.version,
  install: install
};
