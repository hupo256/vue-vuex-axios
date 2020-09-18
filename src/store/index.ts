import Vue from 'vue'
import Vuex from 'vuex'
import Api from './service'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: 'jack',
    age: 25,
    actTag: false,
    list: [],
  },
  mutations: {
    increment (state, n) {
      state.age += n
    },
    touchList(state, arr){
      state.list = arr
    },
    toggleLi(state, num){
      state.actTag = num
    }
  },
  actions: {
    toage ({ commit }, data) {
      Api.indexToolList({}).then(res => {
        console.log(res)
      })
      commit('increment', data)
    },
    getList({ commit }){
      console.log(22)
      Api.indexToolList({}).then(res => {
        // console.log(res)
        commit('touchList', res)
      })
    }
  },
  modules: {
  }
})
