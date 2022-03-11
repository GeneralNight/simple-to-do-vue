import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mode: true,
    tasksData: null
  },
  mutations: {
    SET_MODE(state, payload) {
      state.mode = payload
    },
    SET_LOAD_DATA(state, payload) {
      state.tasksData = payload
    }
  },
  actions: {
    loadData() {
        var tasksOnStorage = {
          title: window.localStorage.titleTaskData || '',
          tasks: JSON.parse(window.localStorage.tasks) || []
        }
        this.commit('SET_LOAD_DATA',tasksOnStorage)
    }
  },
  modules: {
  }
})
