const VM_STORAGE = 'DD_'

const storage =  {
  save: function (name, item) {
    window.localStorage.setItem(VM_STORAGE + name, JSON.stringify(item))
  },
  fetch: function (name) {
    return JSON.parse(window.localStorage.getItem(VM_STORAGE + name))
  },
  clear: function (name) {
    window.localStorage.removeItem(VM_STORAGE + name)
  }
}

module.exports = storage
