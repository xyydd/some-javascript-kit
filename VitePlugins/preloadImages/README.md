# 使用

在vite.config.js中：


## 示例
```javascript
import preloadImages from './plugins/preloadImages';

export default defineConfig({
  plugins: [
    preloadImages({
      dir: [
        'src/assets/imgs',
      ],
      rel: 'preload', // preload || prefetch
    }),
  ]
});
```

## 配置

dir: 需要预加载的图片文件夹，可以是数组，也可以是字符串，只用于development环境，build时不需要填写该配置。

rel: 预加载的类型，可选值有preload和prefetch，默认为preload。
