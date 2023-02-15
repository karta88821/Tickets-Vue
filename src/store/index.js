import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 響應式的資料狀態儲存, 資料狀態變化時，有用到的 component 都會即時更新
  state: {
    token: ''
  },
  getters: {
  },
  // 改變state(只處理同步函數，不處理非同步函數，例如：呼叫api)
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      localStorage.setItem("token", token)
    },

    resetState: (state) => {
      state.token = ''
    }
  },
  actions: {
  },
  modules: {
  }
})
