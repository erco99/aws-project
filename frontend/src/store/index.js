import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import routes from './modules/routes'
import weather from "@/store/modules/weather";
import transactions from './modules/transactions';
import notifications from "@/store/modules/notifications";

const store = new Vuex.Store({
  getters, 
  modules: {
    user,
    routes,
    weather,
    transactions,
    notifications
  }
})

export default store