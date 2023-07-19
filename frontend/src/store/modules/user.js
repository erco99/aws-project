import { login, logout } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/authentication'

const state = {
  name: 'PROVANOME',
  token: getToken()
}

const mutations = {
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

const actions = {
    getName( {commit} ) {
        commit('SET_NAME', 'prova')
    },

    login({ commit }, loginData) {
      return new Promise((resolve, reject) => {
        login(loginData).then(response => {
          const { data } = response
          commit('SET_TOKEN', data.access_token)
          setToken(data.access_token)
          resolve()
        }).catch(error => {
          reject(error.toJSON())
        })
      })
    },

  logout({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_TOKEN', '')
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
