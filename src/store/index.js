import Vue from 'vue'
import Vuex from 'vuex'

import modules from './module/index'

Vue.use(Vuex)
const isDev = process.env.NODE_ENV === 'devlopoment'
export default () => {
  return new Vuex.Store({
    strict: isDev,
    modules
  })
}
