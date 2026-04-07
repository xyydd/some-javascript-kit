# 用法

```javascript
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const gitRevisionPlugin = new GitRevisionPlugin({ branch: true });
const GitRemoteUrlWebpackPlugin = require('./GitRemoteUrlWebpackPlugin');

module.exports = {
  publicPath: '/', // 根路径
  outputDir: 'dist', // 构建输出目录 npm run build
  assetsDir: 'assets', // 静态资源目录(js,css,img,fonts)
  lintOnSave: true, // 是否开启eslint保存检测，有效值: true || false || 'error'
  configureWebpack: {
    plugins: [
      gitRevisionPlugin,
      new GitRemoteUrlWebpackPlugin(),
    ],
  },
  devServer: {
    open: true, // 使用npm run serve 之后是否自动在游览器中打开项目
    host: 'localhost', // 主机名字
    port: 8008, // 端口号
    https: false, // true启动游览器会给出一些警告
    hotOnly: false, // 热更新 webpack已经有
    disableHostCheck: true,
    proxy: {
      // 配置跨域，请求后端接口，样例
      '/api': {
        // target: process.env.NODE_ENV === 'development' ? 'http://172.16.25.235:8071' : process.env.VUE_APP_TITLE === 'test' ? 'http://172.16.25.235:8071' : 'http://39.98.188.17:8081/prod',
        // target: 'http://47.96.112.228:8098',
        // target: 'http://172.16.17.130:8098',
        target: 'https://hzqz.huzhou.gov.cn:8330',
        ws: true, // 是否跨域
        changeOrigin: true,
        // pathRewrite: {
        //   '^/api': '',
        // },
      },
    },
  },
};

```
