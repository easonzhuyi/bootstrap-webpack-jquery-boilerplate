// import Vue from 'vue'
// import Vuex from 'vuex'
import formModels from './modules/formModels'
import widget from './modules/widget'
import getters from './getters'

// Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    formModels,
    widget
  },
  getters
})

export default store
