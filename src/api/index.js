const api = {}
const req = require.context('./', true, /^\.\/.*\.js$/)
console.log('req', req)
// 将指定字符串去掉变驼峰
function turnKey (str, reg = /_\w/g) {
  return str.replace(reg, (a) => {
    return a.split('')[1].toUpperCase()
  })
}

function setKey (data, key, value) {
  key = key.replace(/^\.\//, '')
  const index = key.indexOf('/')
  if (index > 0) {
    let _key = key.slice(0, index)
    _key = turnKey(_key, /(_|-)\w/g)
    data[_key] = data[_key] || {}
    return setKey(data[_key], key.slice(index + 1), value)
  }
  key = key.replace(/\.js$/, '')
  key = turnKey(key, /(_|-)\w/g)
  data[key] = value
}

const requireAll = requireContext => {
  return requireContext.keys().map(path => {
    (() => {
      console.log('path---', path)
      if (path.indexOf('index') > -1) return
      if (path.indexOf('sdk') > -1) return
      const data = require('.' + path.slice(1))
      setKey(api, path, data.default || data)
    })()
  })
}
requireAll(req)
console.log('api---', api)
export default api
