const state = {
  namespaced: true,
  state: {
    a: 2
  },
  getters: {
  },
  mutations: {
    UPDATE_A (state, val = 0) {
      setTimeout(() => {
        state.a += 100
        console.log('mutations触发了111')
        console.log('this.state', this.state)
      }, 0)
      if (val !== 0) {
        console.log('mutations触发了')
        console.log(val)
        state.a += val
        console.log('this.state8888', this.state)
      }
    }
  },
  actions: {
  }
}
export default state
