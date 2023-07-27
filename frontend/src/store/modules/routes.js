import { main_routes } from '@/router'
0
const state = {
  routes: [],
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.routes = routes
  }
}

const actions = {
  generateRoutes({ commit }) {
    return new Promise(resolve => {
      let filtered_routes = []
      main_routes.forEach(route => {
        if(route.component.name == "Layout" && route.children) {
          route.children.forEach(child => {
            const component_path = child.path
            const component_name = child.name
  
            filtered_routes.push({path: component_path, name: component_name})
          })
        }
      });
      commit('SET_ROUTES', filtered_routes)
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