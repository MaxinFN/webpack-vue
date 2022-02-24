// 手写filter
function _filter (arr, func) {
  if (Array.isArray(arr) || !arr.length || typeof func !== 'function') {
    return []
  }
  var result = []
  for (let i = 0;i < arr.length; i++) {
    const item = arr[i]
    if (func(item, i)) {
      result.push(item)
    }
  }
  return result
}

// 手写map
function _map (arr, func) {
  if (Array.isArray(arr) || !arr.length || typeof func !== 'function') {
    return []
  }
  var result = []
  for (let i = 0;i < arr.length; i++) {
    result.push(func(arr[i], i))
  }
  return result
}

// 手写reduce
function _map (arr, func) {
  if (Array.isArray(arr) || !arr.length || typeof func !== 'function') {
    return []
  }
  var value = arr[0]
  for (let i = 1;i < arr.length; i++) {
    const item = arr[i]
    value = func(value, item, i, arr)
  }
  return value
}

// 手写promise
// 定义三种状态的常量
const PENDING = 'pengding'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function Promise (executor) {
  var _this = this
  // promise的状态
  _this.state = PENDING
  // 成功的结果
  _this.value = null
  // 失败的原因
  _this.reason = null
  // 成功的回调队列
  _this.fulfilled = []
  // 失败的回调队列
  _this.rejected = []

  function resolve (value) {
    if (_this.state === PENDING) {
      _this.state = FULFILLED
      _this.value = value
      _this.fulfilled.forEach(func => func(value))
    }
  }

  function reject (reason) {
    if (_this.state === PENDING) {
      _this.state = REJECTED
      _this.value = value
      _this.rejected.forEach(func => func(reason))
    }
  }

  try {
    executor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

Promise .prototype.then = function (onFulfilled, onRejected) {
  if (this.state === PENDING) {
    typeof onFulfilled === 'function' && this.fulfilled.push(onFulfilled)
    typeof onRejected === 'function' && this.rejected.push(onRejected)
  }

  if (this.state === FULFILLED) {
    typeof onFulfilled === 'function' && onFulfilled()
  }
  if (this.state === REJECTED) {
    typeof onRejected === 'function' && onRejected()
  }
}