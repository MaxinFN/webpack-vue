/*
 * @Author: your name
 * @Date: 2020-08-18 19:51:46
 * @LastEditTime: 2021-07-27 11:40:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \m\src\index.js
 */
import Vue from 'vue'
import App from './app.vue'
// import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import xss from 'xss'
// import * as Socket from './global/socket'

import 'element-ui/lib/theme-chalk/index.css'
import createRouter from './config/router'
import createStore from './store/index'
import './assets/images/asfd.png'
import './assets/styles/test.css'
import '@/assets/styles/index.scss'
// src\assets\styles\index.scss
// 自定义指令
import directive from './directive'
import Global from './global'
import components from './components'
import '@/store/module/index.js'
// console.log('Socket--init', typeof Socket, Socket)
Vue.use(Global)
Vue.use(ElementUI)
Vue.use(components)
Object.defineProperty(Vue.prototype, '$xss', {
  value: xss
})

// 自定义指令
Object.keys(directive).forEach(name => {
  Vue.directive(name, directive[name])
})
// Socket.init()
// const root = document.createElement('div')
// document.body.appendChild(root)
// Vue.use(VueRouter)
const router = createRouter()
router.beforeEach((to, from, next) => {
  if (to.meta.title) document.title = to.meta.title
  next()
})
// 激活VueTools
if (window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = Vue
}
const store = createStore()
new Vue({
  render: h => {
    return h(App)
  },
  router,
  store
}).$mount('#root')
