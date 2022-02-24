/*
 * @Author: your name
 * @Date: 2021-07-27 16:08:01
 * @LastEditTime: 2021-07-27 17:03:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \m\axios\index.js
 */
import axios from 'axios'

// 去除obejct && string两边空格
function trim (data) {
  if (data instanceof FormData || data instanceof File || data instanceof Blob) { return data }
  if (data) {
    if (typeof data === 'object') {
      if (Array.isArray(data)) {
        data.forEach((cell, i) => {
          data[i] = trim(cell)
        })
      } else {
        for (const key in data) {
          data[key] = trim(data[key])
        }
      }
    } else if (typeof data === 'string') {
      return data.trim()
    }
  }
}

// 转化GET请求，data参数为url地址参数
const formatGET = (config) => {
  const data = config.data
  if (['get'].indexOf(config.method.toLowerCase()) > -1 && data &&
    config.url.indexOf('?') < 0
  ) {
    config.url = config.url + '?' + Object.keys(data).map(
      (key) => {
        if (data[key] === '' || data[key] === null || data[key] === undefined) { return null }
        return `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
      }
    ).filter(
      (item) => (item !== null && item !== undefined)
    ).join('&')
  }
  return config
}
console.log('formatGET', formatGET)

axios.interceptors.request.use(config => {
  const _config = config._config || (config.data && config.data._config) || {}
  if (_config) {
  }
})

const fetch = {
  request (method, url, data = {}, config) {
    console.log('request----', method, url, data, config)
    if (!url && typeof method === 'object') {
      url = method.url
      data = method.data || method.params
      method = method.method
    }
    method = method.toLowerCase()
    if (data) data = trim(data)
    if (!navigator.onLine) {
      if (process.env.PLATFORM === 'mobile') {
        console.log('网络异常，请确认你的手机处于联网状态！')
      } else {
        console.log('网络异常，请确认你的电脑处于联网状态！')
      }
      // trigger('loading', 0)
      return Promise.reject(new Error('网络异常，请确认你的电脑处于联网状态！'))
    }
    data = data || {}
    return axios.request({ url, data, method, ...data._config, ...config })
  },
  get (url, data = {}, progress = false) {
    return this.request('get', url, data, progress)
  },
  post (url, data = {}, progress = false) {
    return this.request('post', url, data, progress)
  },
  delete (url, data = {}, progress = false) {
    return this.request('delete', url, data, progress)
  },
  put (url, data = {}, progress = false) {
    return this.request('put', url, data, progress)
  }
}

export default fetch.request
