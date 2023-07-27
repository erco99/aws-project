import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import routes from './modules/routes'


const store = new Vuex.Store({
  getters, 
  modules: {
    user,
    routes
  }
})

export default store