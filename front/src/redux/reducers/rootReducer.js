import { combineReducers } from 'redux'
// import {
//   CONSOLE_LOG
// } from '../actions'

import { registration } from './registration'

import { authentication } from './authentication'


const rootReducer = combineReducers(
  {registration, authentication}
)

export default rootReducer
