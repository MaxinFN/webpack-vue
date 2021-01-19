/**
 *
 * @param {Object} data
 */
// function formatParams (data) {
//   const arr = []
//   for (var name in data) {
//     arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]))
//   }
//   // 版本号
//   arr.push(('v=' + Math.random()).replace('.', ''))
//   return arr.join('&')
// }

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

// getZIndex 处理层级问题
export function getZIndex () {
  const arr = [...document.body.querySelectorAll('*')].map(item => window.getComputedStyle(item).zIndex).filter(item => item)
  arr.push(200)
  return Math.max(...arr) + 1
}

// ajax
// export function ajax (options = {}) {
//   var options = options
//   // 请求方式
//   options.type = (options.type || 'GET').toUpperCase()
//   // 响应格式
//   options.dataType = options.dataType || 'application/json'
//   // 请求参数
//   var params = formatParams(options.data)

//   var xhr
//   if (window.XMLHttpRequest) {
//     xhr = new XMLHttpRequest()
//   } else {
//     xhr = new ActiveXObject('Microsoft.XMLHTTP')
//   }

//   if (options.type === 'GET') {
//     xhr.open('get', options.url + '?' + params, true)
//     xhr.send(null)
//   } else if (options.type === 'POST') {
//     xhr.open('post', options.url, true)
//     // 设置表单提交时的内容类型
//     // Content-type数据请求的格式
//     xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
//     xhr.send(params)
//   }

//   // 请求超时
//   setTimeout(function () {
//     if (xhr.readyState != 4) {
//       xhr.abort()
//     }
//   }, options.timeout)

//   // 服务器返回结果
//   xhr.onreadystateChange = function () {
//     // readyState为文档载入状态
//     if (xhr.readyState == 4) {
//       // http状态码
//       var status = xhr.status
//       if (status >= 200 && status <= 300 || status == 304) {
//         options.success && options.success(xhr.responseText, xhr.responseXML)
//       } else {
//         options.error && options.error(xhr.responseText, status)
//       }
//     }
//   }
// }
//  //基本的使用实例
// ajax({
//   url:"http://server-name/login",
//   type:'post',
//   data:{
//       username:'username',
//       password:'password'
//   },
//   dataType:'json',
//   timeout:10000,
//   contentType:"application/json",
//   success:function(data){
// 。。。。。。//服务器返回响应，根据响应结果，分析是否登录成功
//   },
//   //异常处理
//   error:function(e){
//       console.log(e);
//   }
// })

/**
* 数据去重
* @function
* @memberOf serviceUtilsArray
* @param arr 需要去重的数组
* @param func 去重时获取唯一数据的方法
* @returns {Array} 返回去重后的数组 不会打乱顺序
*/
export function unique (arr, func = a => a) {
  const rt = []
  const hasKeys = []
  arr.forEach(a => {
    const key = func(a)
    if (hasKeys.indexOf(key) === -1) {
      hasKeys.push(key)
      rt.push(a)
    }
  })
  return rt
}

// concat 多维数组展开为一维
// export function concat (arr) {
//   if (!Array.isArray(arr)) return arr
//   let rt = []
//   arr.forEach(item => {
//     rt = rt.concat(array.concat(item))
//   })
//   return rt
// }
