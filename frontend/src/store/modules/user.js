import {login, logout, register, verifyOTP, user} from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/authentication'

const state = {
  name: 'PROVANOME',
  token: getToken(),
  userData: {}
}

const mutations = {
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER_DATA: (state, userData) => {
    state.userData = userData
  }
}

const actions = {
  getName( {commit} ) {
      commit('SET_NAME', 'prova')
  },

  register({ commit }, registerData) {
    return new Promise((resolve, reject) => {
      register(registerData).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error.toJSON())
      })
    })
  },

  verifyOTP({ commit }, otpData) {
    return new Promise((resolve, reject) => {
      verifyOTP(otpData).then(() => {
        resolve()
      }).catch(error => {
        reject(error.toJSON())
      })
    })
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
  },

  user({ commit }) {
    return new Promise((resolve, reject) => {
      user().then((response) => {
        commit('SET_USER_DATA', response.data.user_data)
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
