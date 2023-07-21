const getters = {
  name: state => state.user.name,
  token: state => state.user.token,
  userData: state => state.user.userData,
  userName: state => state.user.userData.name,
  userSurname: state => state.user.userData.surname,
  userFullname: state => this.userName + " " + this.userSurname,
  userEmail: state => state.user.userData.email,
  userNumber: state => state.user.userData.number,
}
export default getters