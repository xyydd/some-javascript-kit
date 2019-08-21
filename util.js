import {isType} from './isType.js'

let util = {}

util.copy = (data) => {
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
        if (isType(d[argu], 'array')) {
          for (let i = 0; i < d[argu].length; i++) {
            return d[argu][i].indexOf(argumentObj[argu]) > -1
          }
        } else {
          return d[argu].indexOf(argumentObj[argu]) > -1
        }
      })
      dataClone = res
    }
  }
  return res
}

util.nat_splice = (obj, key) => {
  let clone = util.jsonHandle(obj)
  delete clone[key]
  return clone
}
util.unitConversion = function (value, unit) {
  let str = ''
  switch (unit.toLowerCase()) {
    case 'b':
    case 'kb':
    case 'mb':
    case 'gb':
    case 'tb':
    case 'pb':
    case 'eb':
    case 'zb':
    case 'yb':
      if (value <= 0) {
        value = 0
      } else {
        let k = 1024
        let sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        let c = Math.floor(Math.log(value) / Math.log(k))
        str = (value / Math.pow(k, c)).toFixed(2) + sizes[c]
      }
      break
    case 'uptime':
      console.log('uptime', value)
      let v = Number(value)
      let days = 0
      if (v > 86400) {
        days = Math.floor(moment.duration(v, 'seconds').asDays())
      }
      let hours = 0
      if (v > 3600) {
        hours = Math.floor(moment.duration(v - (days * 24 * 3600), 'seconds').asHours())
      }
      let minutes = 0
      if (v > 60) {
        minutes = Math.floor(moment.duration(v - (days * 24 * 3600) - (hours * 3600), 'seconds').asMinutes())
      }
      let sec = v - (days * 24 * 3600) - (hours * 3600) - (minutes * 60)
      str = `${days}天, ${hours}:${minutes}:${sec}`
      break
    default:
      str = value + unit
      break
  }
  return str
}
export const download = function (accept, url) {
  let $form = document.createElement('form')
  $form.setAttribute('method', 'GET')
  $form.setAttribute('id', 'temporary')
  $form.setAttribute('accept', accept)
  $form.setAttribute('action', url)
  document.body.appendChild($form)
  $form.submit()
  document.body.removeChild(document.getElementById('temporary'))
}
export const getRandomStr = function (len = 32) {
  const $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const maxPos = $chars.length
  let str = ''
  for (let i = 0; i < len; i++) {
    str += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return str
}
export default util
