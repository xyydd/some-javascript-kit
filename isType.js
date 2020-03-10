const isType = function (data, type) {
  return new Promise((resolve, reject) => {
    if (arguments.length === 2) {
      // 数组，这里使用isArray，有的浏览器不支持Array.isArray，则用prototype.toString替代
      let t = type.toLowerCase()
      if (t === 'array') {
        if (!Array.isArray) {
          Array.isArray = function (arg) {
            return Object.prototype.toString.call(arg) === '[object Array]'
          }
        }
        resolve(Array.isArray(data))
      }

      if (t === 'string') {
        resolve(Object.prototype.toString.call(data) === '[object String]')
      }

      if (t === 'object') {
        resolve(Object.prototype.toString.call(data) === '[object Object]')
      }

      if (t === 'number') {
        resolve(Object.prototype.toString.call(data) === '[object Number]')
      }
    } else {
      reject(new Error('miss arguments; arguments: (data, type)'))
    }
  })
}

module.exports = isType
