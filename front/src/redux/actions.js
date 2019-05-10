export const ALERT_SUCCESS = 'ALERT_SUCCESS'
export const ALERT_ERROR = 'ALERT_ERROR'
export const ALERT_CLEAR = 'ALERT_CLEAR'

export const USERS_REGISTER_BEGIN = 'USERS_REGISTER_BEGIN'
export const USERS_REGISTER_SUCCESS = 'USERS_REGISTER_SUCCESS'
export const USERS_REGISTER_FAILURE = 'USERS_REGISTER_FAILURE'

export const USERS_LOGIN_BEGIN = 'USERS_LOGIN_BEGIN'
export const USERS_LOGIN_SUCCESS = 'USERS_LOGIN_SUCCESS'
export const USERS_LOGIN_FAILURE = 'USERS_LOGIN_FAILURE'

export const USERS_LOGOUT = 'USERS_LOGOUT'

export const USERS_GETALL_BEGIN = 'USERS_GETALL_BEGIN'
export const USERS_GETALL_SUCCESS = 'USERS_GETALL_SUCCESS'
export const USERS_GETALL_FAILURE = 'USERS_GETALL_FAILURE'

export const USERS_DELETE_BEGIN = 'USERS_DELETE_BEGIN'
export const USERS_DELETE_SUCCESS = 'USERS_DELETE_SUCCESS'
export const USERS_DELETE_FAILURE = 'USERS_DELETE_FAILURE'

export const alertSuccess = (message) => {
  return { 
    type: ALERT_SUCCESS,
    message
   }
}

export const alertError = (message) => {
  return { 
    type: ALERT_ERROR,
    message 
  }
}

export const alertClear = () => {
  return { 
    type: ALERT_CLEAR
  }
}