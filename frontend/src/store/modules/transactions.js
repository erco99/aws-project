import { getTransactions, sendMoney } from '@/api/credits'

const state = {
  transactions: []
}

const mutations = {
  SET_TRANSACTIONS: (state, data) => {
    state.transactions = data
  },
  ADD_TRANSACTION: (state, transaction) => {
    state.transactions.push(transaction)
  }
}

const actions = {
  getTransactions({commit}, email) {
    return new Promise((resolve, reject) => {
      getTransactions(email).then(response => {
        const { data } = response
        commit('SET_TRANSACTIONS', data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  sendMoney({commit}, data) {
    return new Promise((resolve, reject) => {
      sendMoney(data).then(() => {
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