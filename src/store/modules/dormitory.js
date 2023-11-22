import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
 export default {

  namespaced: true,
  state: {
    dor:'',
    college:'',
  },
  mutations: {

    setDor(state, data) {
      state.dor=data
    },
    setCollege(state, data) {
      state.college=data
    }
  }

}

