const state = {
  name: 'PROVANOME',
}

const mutations = {
  SET_NAME: (state, name) => {
    state.name = name
  },
}

const actions = {
    getName( {commit} ) {
        commit('SET_NAME', 'prova')
    }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
