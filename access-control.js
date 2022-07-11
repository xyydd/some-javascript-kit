import isType from '@/utils/isType';
/**
 * v-ac 权限控制指令
 * 用户所有权限应为一个数组, 数组中元素类型为String
 * 指令中的值也为数组
 * 无需校验权限值为：*
 */
let userAccess = [];

export function addUserAccess(ac) {
  userAccess = ac;
}

function checkAccess(el, binding) {
  const { value } = binding;
  const ALLOWALL = '*';
  let hasHandleAccess = true;
  if (value === ALLOWALL) {
    return;
  }
  if (isType(value, 'array')) {
    hasHandleAccess = userAccess.some((access) => { // 用户权限为*时，则默认有全部权限
      return access === ALLOWALL || value.includes(access);
    });
    if (!hasHandleAccess) {
      el.parentNode && el.parentNode.removeChild(el);
    }
  } else {
    throw new Error('请设置正确的权限标签值，权限标签值类型为Array.');
  }
}

export default {
  v2: {
    inserted: checkAccess,
  },
  v3: {
    mounted: checkAccess,
  },
};
