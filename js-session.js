const VM_STORAGE = 'DD_'

export default {
  save: function (name, item) {
    window.sessionStorage.setItem(VM_STORAGE + name, JSON.stringify(item))
  },
  fetch: function (name) {
    let res = window.sessionStorage.getItem(VM_STORAGE + name)
    if (res) {
      res = JSON.parse(res)
    }
    return res
  },
  clear: function (name) {
    window.sessionStorage.removeItem(VM_STORAGE + name)
  }
}
