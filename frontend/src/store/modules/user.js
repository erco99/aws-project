import {
  login,
  logout,
  register,
  newOTP,
  verifyOTP,
  user,
  refresh,
  cancelRegistration,
  changePassword,
  resetPassword,
  changeAvatar, getAllPlayedBookings
} from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/authentication'
import { paymentMethodInsert, depositWithdrawMoney, deletePaymentMethod} from '@/api/credits';
import store from "@/store";

const state = {
  token: getToken(),
  userData: {},
}

const mutations = {

  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER_DATA: (state, userData) => {
    state.userData = userData
  },
  SET_PAYMENT_METHOD: (state, payment_method) => {
    state.userData.payment_method = payment_method
  },
  UNSET_PAYMENT_METHOD: (state) => {
    state.userData.payment_method = null
  },
  SET_USER_AVATAR: (state, avatar) => {
    state.userData.avatar = avatar;
  },
  CLEAN_USER_DATA: (state) => {
    state.userData = {}
  },
  INC_USER_BALANCE: (state, amount) => {
    state.userData.balance = state.userData.balance + amount
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
        reject(error)
      })
    })
  },

  newOTP({ commit }, data) {paymentMethodInsert
    return new Promise((resolve, reject) => {
      newOTP(data).then(() => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  verifyOTP({ commit }, otpData) {
    return new Promise((resolve, reject) => {
      verifyOTP(otpData).then(() => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  cancelRegistration({ commit }, data) {
    return new Promise((resolve, reject) => {
      cancelRegistration(data).then(() => {
        resolve()
      }).catch(error => {
        reject(error)
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
        reject(error)
      })
    })
  },

  refresh({ commit }) {
    return new Promise((resolve, reject) => {
      refresh().then(response => {
        const { access_token } = response.data
        commit('SET_TOKEN', access_token)
        setToken(access_token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        commit('SET_TOKEN', '')
        commit('CLEAN_USER_DATA')
        removeToken()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  resetPassword({ commit }, email) {
    return new Promise((resolve, reject) => {
      resetPassword(email).then(() => {
        console.log("email sent")
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  changePassword({ commit }, data) {
    return new Promise((resolve, reject) => {
      changePassword(data).then(() => {
        console.log("Password changed")
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  user({ commit }) {
    return new Promise((resolve, reject) => {
      user().then((response) => {
        const user_data = response.data.user_data
        user_data.role = user_data.role.key
        commit('SET_USER_DATA', user_data)
        resolve(user_data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  paymentMethodInsert({ commit }, cardData) {
    return new Promise((resolve, reject) => {
      paymentMethodInsert(cardData).then((response) => {
        commit("SET_PAYMENT_METHOD", response.data.payment_method)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  depositWithdrawMoney({commit}, amount) {
    return new Promise((resolve, reject) => {
      depositWithdrawMoney(amount).then(() => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  deletePaymentMethod({commit}, email) {
    return new Promise((resolve, reject) => {
      deletePaymentMethod(email).then(() => {
        commit("UNSET_PAYMENT_METHOD")
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  changeAvatar({ commit }, avatar) {
    return new Promise((resolve, reject) => {
      changeAvatar({ email: state.userData.email, avatar }).then((response) => {
        commit("SET_USER_AVATAR", response.data.avatar)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  getAllPlayedBookings({ commit }) {
    return new Promise((resolve, reject) => {
      getAllPlayedBookings({ email: state.userData.email }).then((response) => {
        resolve(response.data.playedBookings)
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
