const isType = require('./isType.js');

function clone (target, map = new WeakMap()) {
  if (typeof target === 'object') {
    let clones = isType(target, 'array') ? [] : {};
    if (map.get(target)) {
      return map.get(target)
    }
    map.set(target, clones);
    for (const key in target) {
      clones[key] = clone(target[key])
    }
    return clones
  } else {
    return target
  }
}
