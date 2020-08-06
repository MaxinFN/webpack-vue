import Vue from 'vue'
import App from './app.vue'
// import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import xss from 'xss'

import 'element-ui/lib/theme-chalk/index.css'
import createRouter from './config/router'
import createStore from './store/index'
import './assets/images/asfd.png'
import './assets/styles/test.css'

Vue.use(ElementUI)
Object.defineProperty(Vue.prototype, '$xss', {
  value: xss
})
// const root = document.createElement('div')
// document.body.appendChild(root)
// Vue.use(VueRouter)
const router = createRouter()
const store = createStore()
new Vue({
  render: h => {
    return h(App)
  },
  router,
  store
}).$mount('#root')
