import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

const globalRegister = (app) => {
  // 参数：其组件目录的相对路径,是否查询其子目录,匹配基础组件文件名的正则表达式
  const requireComponent = require.context('.', true, /[A-Z|a-z]\w+\.(vue)$/);

  requireComponent.keys().forEach((fileName) => {
    const componentConfig = requireComponent(fileName);
    const len = fileName.split('/').length - 1;
    let name;

    if (len === 1) {
      name = fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '');
    } else if (fileName.indexOf('index') > -1) {
      name = fileName.split('/')[1];
    } else {
      return;
    }
    // 获取组件的 PascalCase 命名
    const componentName = upperFirst(camelCase(name));
    // 全局注册组件
    app.component(componentName, componentConfig.default || componentConfig);
  });
};

export default globalRegister;
