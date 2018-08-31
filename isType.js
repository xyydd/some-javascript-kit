export function isType (data, type) {
  if (arguments.length === 2) {
    // 数组，这里使用isArray，有的浏览器不支持Array.isArray，则用prototype.toString替代
    let t = type.toLowerCase()

    if (t === 'array') {
      if (!Array.isArray) {
        Array.isArray = function (arg) {
          return Object.prototype.toString.call(arg) === '[object Array]'
        }
      }
      return Array.isArray(data)
    }

    if (t === 'string') {
      return Object.prototype.toString.call(data) === '[object String]'
    }

    if (t === 'object') {
      return Object.prototype.toString.call(data) === '[object Object]'
    }
  }
}
