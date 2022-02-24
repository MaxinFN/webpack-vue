const modules = {}
const filePaths = require.context('./', true, /^\.\/.*\.js$/)

const turnKey = (str, reg = /_\w/g) => {
  return str.replace(reg, (a) => {
    return a.split('')[1].toUpperCase()
  })
}

const setKey = (data, key, value) => {
  key = key.replace(/^\.\//, '')
  key = key.replace(/\.js$/, '')
  key = turnKey(key, /(_|-)\w/g)
  data[key] = value
}

const all = (requireContext) => {
  console.log('filePaths', requireContext.keys())
  requireContext.keys().forEach(path => {
    if (path.indexOf('index') !== -1) { return }
    console.warn('path--context', path)
    const data = require('' + path)
    console.log('data')
    setKey(modules, path, data.default || data)
    console.warn('modules', modules)
  })
}
all(filePaths)
export default modules
