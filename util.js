import {appRoutes,
  otherRouter,
  loginRouter} from '@/router/router'
import Cookie from 'js-cookie'
let util = {}

util.breadPath = (pathName) => {
  let path = [ // 当前面包屑路径
    {
      path: '/home',
      name: 'index',
      title: '首页'
    }
  ]
  appRoutes.forEach(items => {
    if (items.children) {
      if (items.children.length <= 1) {
        if (items.children[0].name === pathName) {
          let cPath = {path: items.path + '/' + items.children[0].path, name: pathName, title: items.children[0].title}
          path.push(cPath)
        }
      } else {
        items.children.forEach(item => {
          if (item.name === pathName) {
            if (items.name !== 'index') {
              let cPath = [
                {title: items.title},
                {name: pathName, title: item.title}
              ]
              path.push(...cPath)
            } else {
              let cPath = {name: pathName, title: item.title}
              path.push(cPath)
            }
          }
        })
      }
    }
  })
  return path
}
util.changeCurrentPath = (path, towhere = false) => {
  if (!towhere) { // 自己手动定义path，来设置面包屑数组
    let storePath = Cookie.get('path')
    if (storePath === undefined) {
      Cookie.set('path', path)
      return false
    } else {
      return true
    }
  } else { // 自动识别路由生成面包屑数组
    let r = [...appRoutes, ...otherRouter, loginRouter]
    let res = util.routerMatch(path, r)
    Cookie.set('path', res.breadPath)
  }
}

util.routerMatch = (path, r) => {
  let index = {path: '/', title: '首页', name: 'index'}
  let res = []
  r.forEach(items => {
    if (items.children && items.children.length > 0) {
      if (items.path !== path) {
        items.children.forEach(item => {
          let p = ''
          if (items.path === '/') {
            p = '/' + item.path
            if (p === path) {
              res = {isMatch: true, breadPath: [index, {title: items.title, name: items.name}, {title: item.title, name: item.name}]}
            }
          } else {
            p = items.path + '/' + item.path
            if (p === path) {
              res = {isMatch: true, breadPath: [index, {title: items.title, name: items.name}, {title: item.title, name: item.name}]}
            }
          }
        })
      } else {
        res = {isMatch: true, breadPath: [index]}
      }
    } else {
      let b = items.path.indexOf(':')
      if (b !== -1) {
        let arr1 = items.path.split(':')
        let p1 = arr1[0].slice(0, arr1[0].length - 1)
        let arr2 = path.split('/')
        let p2 = ''
        for (let i = 1; i < arr2.length - 1; i++) {
          if (i === 0) {
            p2 = '/' + arr2[i]
          } else {
            p2 = p2 + '/' + arr2[i]
          }
        }
        if (p1 === p2) {
          res = {isMatch: true, breadPath: [index]}
        }
      } else {
        if (items.path === path) {
          res = {isMatch: true, breadPath: [index]}
        }
      }
    }
  })
  return res
}

util.clearOne = (arr, name) => {
  let clone = JSON.parse(JSON.stringify(arr))
  arr.forEach((items, index) => {
    if (items.name === name) {
      clone.splice(index, 1)
    }
  })
  return clone
}
util.jsonHandle = (data) => {
  return JSON.parse(JSON.stringify(data))
}
util.getBase64Image = (img) => {
  let canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  let ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, img.width, img.height)
  let ext = img.src.substring(img.src.lastIndexof('.') + 1).toLowerCase()
  let dataURL = canvas.toDataURL('image/' + ext)
  return dataURL
}
util.trim = (str) => {
  return str.replace(/(^\s*)|(\s*$)/g, '')
}
util.search = (data, argumentObj) => { // 查询
  let res = data
  let dataClone = data
  for (let argu in argumentObj) {
    if (argumentObj[argu].length > 0) {
      res = dataClone.filter(d => {
        return d[argu].indexOf(argumentObj[argu]) > -1
      })
      dataClone = res
    }
  }
  return res
}

export default util
