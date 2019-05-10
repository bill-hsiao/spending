import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers/rootReducer'
import { middleWare } from './middleware/middleWare'

const loggerMiddleware = createLogger()

export default function configureStore(preloadedState) {
  return createStore( rootReducer, preloadedState, applyMiddleware(thunkMiddleware, loggerMiddleware, middleWare))
}
