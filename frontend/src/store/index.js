import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import routes from './modules/routes'
import weather from "@/store/modules/weather";

const store = new Vuex.Store({
  getters, 
  modules: {
    user,
    routes,
    weather
  }
})

export default store