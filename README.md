# some-javascript-kit
![GitHub](https://img.shields.io/github/license/xyydd/some-javascript-kit?color=green) ![Travis (.org)](https://img.shields.io/travis/xyydd/some-javascript-kit)

## index.js:

### Installation

```shell
git clone https://github.com/xyydd/some-javascript-kit.git
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
isType // Judgment type,Instructions： isType(data, 'array')
deecopy // from https://github.com/ConardLi/ConardLi.github.io/blob/master/demo/deepClone/src/clone_6.js --> deepcopy.js
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