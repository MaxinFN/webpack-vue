import Vue from 'vue'
import App from './app.vue'
// import VueRouter from 'vue-router'

import createRouter from './config/router'
import createStore from './store/index'
import './assets/images/asfd.png'
import './assets/styles/test.css'

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
