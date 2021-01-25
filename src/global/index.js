import api from '../api/index'

export default {
  install (Vue, options = {}) {
    const G = {
      ...options,
      api
    }
    window.Z = {
      ...options,
      ...window.Z,
      ...G
    }
    Vue.prototype.G = G
    Vue.prototype.Z = window.Z
  }
}
