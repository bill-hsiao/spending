import { 
    LOGIN_BEGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USERS_LOGOUT
 } from '../actions'

let user = JSON.parse(localStorage.getItem('user'))

// user = (user === undefined ? {} : user)

const initialState = user ? { loggedIn: true, user } : {}

export function authentication(state = initialState, action) {
  switch (action.type) {
    case LOGIN_BEGIN:
      return {
        loggingIn: true,
        user: action.payload.user
      }
    case LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.payload.user
      }
    case LOGIN_FAIL:
      return {}
    case USERS_LOGOUT:
      return {}
    default:
      return state
  }
}