# babel.config.js

```javascript
module.exports = {
  presets: [
    ['@vue/app', {
      polyfills: [
        'es.promise',
        'es.symbol'
      ]
    }]
  ]
};

```

# package.json 或者 browserslist

```json
{
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "Chrome 40.0"
  ]
}
```
