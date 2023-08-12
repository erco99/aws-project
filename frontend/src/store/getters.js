const getters = {
  name: state => state.user.name,
  token: state => state.user.token,
  userData: state => state.user.userData,
  userName: state => state.user.userData.name,
  userSurname: state => state.user.userData.surname,
  userFullname: state => state.user.userData.name + " " + state.user.userData.surname,
  userEmail: state => state.user.userData.email,
  userNumber: state => state.user.userData.number,
  userRole: state => state.user.userData.role,
  userBalance: state => state.user.userData.balance,
  userPaymentMethod: state => state.user.userData.payment_method,
  routes: state => state.routes.routes,
  hourlyWeather: state => state.weather.weatherData.fullHourly,
  dailyWeather: state => state.weather.weatherData.fullDaily,
  weatherDataReady: state => state.weather.dataReady,
  transactions: state => state.transactions.transactions
}
export default getters