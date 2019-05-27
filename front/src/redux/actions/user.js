import fetch from 'cross-fetch'
import { history } from '../../bin/history'
import { authHeader } from '../../bin/auth'

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


export function signUp(user) {
  const begin = () =>  ({ type: SIGNUP_BEGIN })
  const success = () => ({ type: SIGNUP_SUCCESS })
  const fail = () => ({ type: SIGNUP_FAIL })
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  }
  return async dispatch => {
    dispatch(begin(user))
    try {
      const response = await fetch(`http://localhost:5000/users/register`, requestOptions).then(handleErrors)
      user = await response.json()
      dispatch(success())
      history.push('/login')
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
      const response = await fetch(`http://localhost:5000/users/authenticate`, requestOptions).then(handleErrors)
      user = await response.json()
      history.push('/')
      dispatch(success(await user))
      localStorage.setItem('user', JSON.stringify(await user));
      return user
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

//preserve

// export function signUp(user) {
//   const begin = user =>  ({ type: SIGNUP_BEGIN })
//   const success = user => ({ type: SIGNUP_SUCCESS })
//   const fail = error => ({ type: SIGNUP_FAIL })
//   const requestOptions = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(user)
//   }
//   return dispatch => {
//     dispatch(begin(user));
//     return fetch(`http://localhost:5000/users/register`, requestOptions)
//       .then(handleErrors)
//       .then(json => {
//         dispatch(success())
//         history.push('/login');

//       })
//       .catch(error => dispatch(fail(error)));
//   }
  

// }

// export function login(user) {
//   const begin = user =>  ({ type: LOGIN_BEGIN, payload: { user } })
//   const success = user => ({ type: LOGIN_SUCCESS, payload: { user } })
//   const fail = error => ({ type: LOGIN_FAIL })
//   const requestOptions = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(user)
//   }
//   return async dispatch => {
//     dispatch(begin(user));
//     return await fetch(`http://localhost:5000/users/authenticate`, requestOptions)
//       .then(handleErrors)
//       .then(response => {
//         // history.push('/')

//         const user = response.json()
//         localStorage.setItem('user', JSON.stringify(user));
//         // return user})
//         })
//         .then(
//           user => {

//                     dispatch(success(user))
//                     history.push('/')

//         // .then(user => {
//           // console.log(user)
//           // localStorage.setItem('user', JSON.stringify(user));
//           // dispatch(success(user))
//           // history.push('/');

//           // return user
//         })
//       .catch(error => dispatch(fail(error)));
//   }
// }

//preserve
// export const login = async user => {
//   const begin = user =>  ({ type: LOGIN_BEGIN, payload: { user } })
//   const success = user => ({ type: LOGIN_SUCCESS, payload: { user } })
//   const fail = error => ({ type: LOGIN_FAIL })
//   const requestOptions = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(user)
//   }
//   return dispatch => {
//     dispatch(begin(user));

//   }
// }

  
//   dispatch => {
//     dispatch(begin(user));
//     return fetch(`http://localhost:5000/users/authenticate`, requestOptions)
//       .then(handleErrors)
//       .then(user => {
//         // history.push('/')
//         // return user.json()
//       // })
//       // .then(user => {
//         console.log(user)

//         localStorage.setItem('user', JSON.stringify(user));
//         dispatch(success(user))
//         history.push('/')

//       })
//         // user = await user.json()
//         // console.log(user)
//         // localStorage.setItem('user', JSON.stringify(user));
//         // dispatch(success(user))

//         // history.push('/')

//         // return user})
//         // return user
//         // })
//         // .then(
//           // user => {

//                     // dispatch(success(user))
//                     // history.push('/')

//         // .then(user => {
//           // console.log(user)
//           // localStorage.setItem('user', JSON.stringify(user));
//           // dispatch(success(user))
//           // history.push('/');

//           // return user
//         // }
//         // error => {
//             // dispatch(fail(error));
//             // dispatch(alertActions.error(error.toString()));
//         // )
//       .catch(error => dispatch(fail(error)));
//   }
// }





// ÷/
// export function login(user) {
//   const begin = user =>  ({ type: LOGIN_BEGIN, payload: { user } })
//   const success = user => ({ type: LOGIN_SUCCESS })
//   const fail = error => ({ type: LOGIN_FAIL })
//   const requestOptions = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(user)
//   }
//   return dispatch => {
//     dispatch(begin(user));
//     return fetch(`http://localhost:5000/users/authenticate`, requestOptions)
//       .then(handleErrors)
//       .then(response => { response.json()})
//       .then(json => {
//         const user = JSON.parse(json)
//         console.log(user)
//                   dispatch(success())
// //
//       })
//         // dispatch(success())

//         // if (response.token) {
//           // localStorage.setItem('user', JSON.stringify(response));
//           // console.log(response)
//           // dispatch(success())

//           // history.push('/');

//         // }
//         // return response

//         // dispatch(success())
//         // history.push('/');

//       // })
//       .catch(error => dispatch(fail(error)));
//   }
// }


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
  console.log(response)
  if (!response.ok || response.statusText === 'No Content') {
    throw Error(response.statusText);
  } 
  return response
}

// function handleResponse(response) {
//   return response.text().then(text => {
//       const data = text && JSON.parse(text);
//       if (!response.ok) {
//         throw Promise.reject(response.statusText);
//           // if (response.status === 401) {
//               // auto logout if 401 response returned from api
//               // logout();
//               // location.reload(true);
//           // }

//           // const error = (data && data.message) || response.statusText;
//           // return Promise.reject(error);/
//       } else {
//         return data;

//       }

//   });
// }