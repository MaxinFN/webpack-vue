// 防抖
export function deBounce (fn, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

// 节流
export function throttle (fn, delay) {
  let flag = true
  return function (...args) {
    if (flag) return
    setTimeout(() => {
      fn.apply(this, args)
      flag = false
    }, delay)
  }
}

// compose复合函数
export function compose () {
  const args = [].slice.call(arguments)
  return function (x) {
    return args.reduceRight((init, cb) => {
      return cb(init)
    }, x)
  }
}

// pipe函数
export function pipe () {
  const args = [].slice.call(arguments)
  return function (x) {
    args.reduce((init, cb) => {
      return cb(init)
    }, x)
  }
}

// 缓存函数
export function momesize (fn) {
  const cache = {}
  return function (...args) {
    const _args = JSON.stringify(args)
    return cache[_args] || (cache[_args] = fn.apply(fn, args))
  }
}
