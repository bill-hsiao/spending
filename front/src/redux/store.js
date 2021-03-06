import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './rootReducer'
import { middleWare } from './middleware/middleWare'

const loggerMiddleware = createLogger()

export const store = createStore(
  rootReducer, 
  applyMiddleware(
    thunkMiddleware, 
    loggerMiddleware, 
    middleWare)
)
