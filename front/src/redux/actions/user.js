import fetch from 'cross-fetch'
import { history } from '../../bin/history'
import { authHeader } from '../../bin/auth'


export const SIGNUP_BEGIN = 'SIGNUP_BEGIN'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAIL = 'SIGNUP_FAIL'

export const LOGIN_BEGIN = 'LOGIN_BEGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'

export const USERS_LOGOUT = 'USERS_LOGOUT'


export function signUp(user) {
  const begin = () =>  ({ type: SIGNUP_BEGIN })
  const success = (user) => ({ type: SIGNUP_SUCCESS })
  const fail = () => ({ type: SIGNUP_FAIL })
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  }
  return async dispatch => {
    dispatch(begin(user))
    try {
      const response = await fetch(`${window.location.origin}/users/register`, requestOptions).then(handleErrors)
      user = await response.json()
      if (user) {
        dispatch(success())
        history.push('/login')

      }
      // dispatch(success())
      // console.log(dispatch)
      // history.push('/login')
    } catch (error) {
      console.log(error)
      dispatch(fail())
    }
  }
}
export function login(user) {
  const begin = user =>  ({ type: LOGIN_BEGIN, payload: { user } })
  const success = user => ({ type: LOGIN_SUCCESS, payload: { user } })
  const fail = error => ({ type: LOGIN_FAIL })
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  }
  return async dispatch => {
    dispatch(begin(user));
    try {
      const response = await fetch(`${window.location.origin}/users/authenticate`, requestOptions).then(handleErrors)
      user = await response.json()
      dispatch(success(await user))
      localStorage.setItem('user', JSON.stringify(await user));
      history.push('/')

      // return user
    } catch (error) {
      console.log(error)
      dispatch(fail(error));

    }
  }
}
export function logout() {
  localStorage.removeItem('user')
  return { type: USERS_LOGOUT }
}


function handleErrors(response) {
  console.log(response)
  if (!response.ok || response.statusText === 'No Content') {
    throw Error(response.statusText);
  } 
  return response
}
