import Cookies from 'js-cookie'

const tokenValue = 'token'

export function getToken() {
    return Cookies.get(tokenValue)
  }
  
  export function setToken(token) {
    return Cookies.set(tokenValue, token)
  }
  
  export function removeToken() {
    return Cookies.remove(tokenValue)
  }