# some-javascript-kit
![GitHub](https://img.shields.io/github/license/xyydd/some-javascript-kit?color=green)

## JQuery

### gallery.js

### Introduction

Gallery components based on `jQuery` and `Bootstrap`

#### Installation

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" integrity="undefined" crossorigin="anonymous">
<script
  src="https://code.jquery.com/jquery-1.12.4.min.js"
  integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ="
  crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js"></script>
<script type="text/javascript" src="./some-javascript-kit/JQuery/gallery.js"></script>
```
#### Usage

```javascript
var galleryInstance = $.gallery({
  selectedLimit: 2
}) // init set options
galleryInstance.setData(
    [
      'https://www.ydtx08.cn/damon-album/6.jpg',
      'https://www.ydtx08.cn/damon-album/6.jpg',
      'https://www.ydtx08.cn/damon-album/6.jpg',
      'https://www.ydtx08.cn/damon-album/6.jpg'
    ], // picture array
    10 // total page count
)
galleryInstance.show()
galleryInstance.customConfirm = function (selected) {
  console.log('Selected Pictures: ', selected)
}
galleryInstance.on('page-change', function (currentPage) {
      galleryInstance.setData([
                                    'https://www.ydtx08.cn/damon-album/5.jpg',
                                    'https://www.ydtx08.cn/damon-album/5.jpg',
                                    'https://www.ydtx08.cn/damon-album/5.jpg',
                                    'https://www.ydtx08.cn/damon-album/5.jpg'
                                  ], 10)
  })
```

#### Options

##### isUpload

Whether to enable the upload button

```javascript
var galleryInstance = $.gallery({
  	selectedLimit: 2,
    isUpload: true,
    upload: function (e) {
        var files = e.target.files || e.dataTransfer.files || e.dataTransfer.getData;
        var data = new FormData()
        for (var i = 0; i < files.length; i++) {
            data.append("files[]", files[i]);
        }
        $.ajax({
            type: 'POST',
            url: '/upload/image',
            data: data,
            error: function (e) {
                layer.msg("上传失败, 错误："+e.statusText);
            },
            success:function(data) {
                if (data.code == 0 && data.status_code == 200) {
                    galleryInstance.changePage(1)
                    getPictures()
                } else {
                    layer.msg("上传失败");
                }
            }
        });
    }
})
function getPictures () {
    $.ajax({
        url: '',
        type: 'get',
        success: function (res) {
            galleryInstance.setData(res.data, Math.ceil(res.total/20))
        }
    })
}
```

##### totalPage

All the page number

##### currentPage

The current page number

##### selectedLimit

Select the maximum number of images

##### data

Image array

##### selectedPictures

The selected image

##### confirm

The confirm function

##### cancel

The cancel function

##### upload

The upload function

## index.js:

### Installation

```shell
git clone https://github.com/xyydd/some-javascript-kit.git
```

or

```shell
npm i -S some-javascript-kit
```

#### Browser

```html
<script type="text/javascript" src="./some-javascript-kit/index.js"></script>
```

#### Module

```javascript
import { isType } from './some-javascript-kit/index.js'
```

### Introduction

```javascript
// There are several methods in index.js that can be accessed from outside
isType // Judgment type
deecopy // from https://github.com/ConardLi/ConardLi.github.io/blob/master/demo/deepClone/src/clone_6.js
session // Browser local session
storage // Browser local storage
dataURLtoBlob // base64 to Blob
getBase64Image // image to base64
trim// remove spaces before and after sentences
search// search some object from array
unitConversion// Conversion unit.support b-yb and time.
download// to download file use form
getRandomStr// get random character, you can set the character length
```
### Usage

##### isType

This method now supports judging array, string, object, number

```javascript
const arr = []
isType(arr, 'array') // true
const obj = []
isType(obj, 'array') // false
```

##### deecopy

```javascript
let copyData = deecopy(data)
```

##### session

```javascript
session.save('dataName', data)
session.fetch('dataName')
session.clear('dataName')
```

##### storage

```javascript
storage.save('dataName', data)
storage.fetch('dataName')
storage.clear('dataName')
```

##### dataURLtoBlob

```javascript
const blob = dataURLtoBlob(base64)
```

##### getBase64Image

```javascript
const img = new Image()
let base64
img.src = 'http://XXXXXX'
img.onload = function () {
  base64 = getBase64Image(img)
}
```

##### trim

```javascript
let str = '  demo  '
str = trim(str) // 'demo'
```

##### search

```javascript
let data = [{
  name: 'nathan'
}, {
  name: 'eric'
}]
const res = search(data, {name: 'nathan'})
```

##### unitConversion

```javascript
let value = 1024
const unit = 'b'
const conversion = unitConversion(value, unit)
```

##### download

```javascript
const url = 'http://XXXXX'
download('.json', url)
```

##### getRandomStr

```javascript
const _id = getRandomStr(32)
```

## CanvasDraw.js

### Introduction

```
Make the portrait on the canvas always center
```

### Usage

```javascript
const CanvasDraw = require('./CanvasDraw.js')
const canvasDraw = new CanvasDraw(ctx, canvasWidth, canvasHeight)
const img = new Image()
img.src = 'http://....'
img.onload = function () {
    canvasDraw.handleDraw(img, imgWidth, imgHeight)
}
```

## mt.js

### Introduction

Avoid websites being embedded in iframes

### Usage

```
Copy the code to the top level of your project
```

## gesture.js

### Introduction

```
Gestures library
```

### gestures methods

+ flick
+ tap
+ pressstart
+ pressend
+ panstart
+ pan
+ panend

### Usage

```javascript
import {enableGesture} from "./gesture.js";
enableGesture(document.documentElement)

document.documentElement.addEventListener('flick', (event) => {
console.log('flick event trigger', event)
})
```

## ScrollAnimation

### Usage

```javascript
const myDiv = document.querySelector('#box');
const scrollAnimation = new ScrollAnimation(myDiv, {
  animationData: [
    { key: 'left', unit: 'px', defaultValue: 100, currentValue: 100, target: 800, duration: 2000, startTime: 0 },
    { key: 'rotateX', showInStyle: false, unit: 'deg', defaultValue: 0, currentValue: 1, target: 270, duration: 1000, startTime: 2000 },
    { key: 'rotateY', showInStyle: false, unit: 'deg', defaultValue: 0, currentValue: 1, target: 180, duration: 1000, startTime: 2000 },
    {
      key: 'transform',
      dataIndex: [1, 2],
      notPartInCalc: true,
      defaultValueFormatter: (v1Option, v2Option) => {
        return `rotateX(${v1Option.currentValue}${v1Option.unit}) rotateY(${v2Option.currentValue}${v2Option.unit})`
      },
      currentValueFormatter: (v1Option, v2Option) => {
        return `rotateX(${v1Option.currentValue}${v1Option.unit}) rotateY(${v2Option.currentValue}${v2Option.unit})`
      },
    }
  ]
});
```

### Option

#### animationData

type: Array

##### animationDataItem

type: Object

key: Dom节点样式名，比如top

defaultValue: 当前样式的默认值

currentValue: 当前样式滚动时的值

target: 当前样式滚动结束后最后的目标值

duration: 当前样式，从滚动开始到结束所需的理想时间

startTime: 当前样式在整体滚动范围内的开始时间

showInStyle: 当前样式是否显示在样式中

notPartInCalc: 当前样式是否参与滚动计算

dataIndex: 在当前样式需要别的样式来做组合时，别的样式的index值，比如`transform`

defaultValueFormatter: `arg: 设置的dataIndex中的index对应的样式配置`,详细请看例子

currentValueFormatter: 同上

## FitScreen

使整个容器自适应屏幕

### Usage

`vue2`,把整个文件夹放到scr/components文件夹下面

```javascript
// main.js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FitScreen from './components/FitScreen';

Vue.use(FitScreen);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

```

```Vue
// App.vue
<template>
  <fit-screen :is-scale="true" :default-width="1920" :default-height="1080">
      <div id="app">
        <router-view />
      </div>
  </fit-screen>
</template>

<script>
export default {
}
</script>

<style lang="scss"></style>

```

### Options

#### isScale

type: Boolean

default: true

是否开始缩放

#### defaultWidth

type: Number

default: 1920

默认宽度

#### defaultHeight

type: Number

default: 1080

默认高度
