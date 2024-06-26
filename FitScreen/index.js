import packageInfo from './package.json';
import FitScreen from "./FitScreen.vue";

const install = (Vue) =>  {
  Vue.component(FitScreen.name, FitScreen);
};
export default {
  version: packageInfo.version,
  install: install
};
