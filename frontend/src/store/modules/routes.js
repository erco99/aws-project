import { main_routes } from '@/router'
0
const state = {
  routes: [],
}

const mutations = {
  SET_ROUTES: (state) => {
    state.routes = main_routes
  }
}

const actions = {
  generateRoutes({ commit }) {
    return new Promise(resolve => {
      commit('SET_ROUTES')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}