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
const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8]
};
target.target = target
const result = clone(target);
console.log(result);
