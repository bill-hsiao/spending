import fetch from 'cross-fetch'
import { history } from '../bin/history'

export const ALERT_SUCCESS = 'ALERT_SUCCESS'
export const ALERT_ERROR = 'ALERT_ERROR'
export const ALERT_CLEAR = 'ALERT_CLEAR'

export const SIGNUP_BEGIN = 'SIGNUP_BEGIN'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAIL = 'SIGNUP_FAIL'

export const LOGIN_BEGIN = 'LOGIN_BEGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'

export const USERS_LOGOUT = 'USERS_LOGOUT'

export const USERS_GETALL_BEGIN = 'USERS_GETALL_BEGIN'
export const USERS_GETALL_SUCCESS = 'USERS_GETALL_SUCCESS'
export const USERS_GETALL_FAILURE = 'USERS_GETALL_FAILURE'

export const USERS_DELETE_BEGIN = 'USERS_DELETE_BEGIN'
export const USERS_DELETE_SUCCESS = 'USERS_DELETE_SUCCESS'
export const USERS_DELETE_FAILURE = 'USERS_DELETE_FAILURE'

export const signUpBegin = user => {
  return {
    type: SIGNUP_BEGIN,
    payload: { user }
  }
}

export const signUpSuccess = user => {
  return {
    type: SIGNUP_SUCCESS
  }
}

export const signUpFail = error => {
  return {
    type: SIGNUP_FAIL
  }
}

export function signUp(user) {
  // const begin = (user) =>  Object.assign({}, { type: SIGNUP_BEGIN, payload: { user } } )
  const begin = user =>  ({ type: SIGNUP_BEGIN, payload: { user } } )

  const success = user => {
    return { type: SIGNUP_SUCCESS }
  }

  const fail = error => {
    return { type: SIGNUP_FAIL }
  }
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  }
  

  return dispatch => {
    dispatch(begin(user));
    return fetch(`http://localhost:5000/users/register`, requestOptions)
      .then(handleErrors)
      .then(json => {
        dispatch(success())
        history.push('/login');

      })
      .catch(error => dispatch(fail(error)));
  }
  

}


export const loginBegin = user => {
  return {
    type: LOGIN_BEGIN,
    payload: { user }
  }
}

export const loginSuccess = user => {
  return {
    type: LOGIN_SUCCESS
  }
}

export const loginFail = error => {
  return {
    type: LOGIN_FAIL
  }
}


export function login(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  }
  return dispatch => {
    dispatch(loginBegin(user));
    return fetch(`http://localhost:5000/users/authenticate`, requestOptions)
      .then(handleErrors)
      .then(json => {
        dispatch(loginSuccess())
        history.push('/');

      })
      .catch(error => dispatch(loginFail(error)));
  }
}


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


function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
