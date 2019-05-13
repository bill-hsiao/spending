import { combineReducers } from 'redux'
import { registration } from './reducers/registration'
import { authentication } from './reducers/authentication'


const rootReducer = combineReducers(
  { registration, authentication }
)

export default rootReducer
