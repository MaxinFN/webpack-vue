import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const isDev = process.env.NODE_ENV === 'devlopoment'
export default () => {
  return new Vuex.Store({
    strict: isDev,
    state: {
      a: 2
    },
    getters: {
    },
    mutations: {
      UPDATE_A (state, val = 0) {
        if (val !== 0) {
          console.log('mutations触发了')
          console.log(val)
          state.a += val
        }
      }
    },
    actions: {
    }
  })
}
