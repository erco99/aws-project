const getters = {
  name: state => state.user.name,
  token: state => state.user.token,
  userData: state => state.user.userData,
  userName: state => state.user.userData.name,
  userSurname: state => state.user.userData.surname,
  userFullname: state => state.user.userData.name + " " + state.user.userData.surname,
  userEmail: state => state.user.userData.email,
  userNumber: state => state.user.userData.number,
  routes: state => state.routes.routes,
  hourlyWeather: state => state.weather.weatherData.fullHourly,
  dailyWeather: state => state.weather.weatherData.fullDaily
}
export default getters