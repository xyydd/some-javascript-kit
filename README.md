# some-javascript-kit
![GitHub](https://img.shields.io/github/license/xyydd/some-javascript-kit?color=green) ![Travis (.org)](https://img.shields.io/travis/xyydd/some-javascript-kit)

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
 dev  dev
