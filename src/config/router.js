import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)
// 防止内存溢出
export default () => {
  return new Router({
    mode: 'history',
    routes
    // base: '/base/'
  })
}
