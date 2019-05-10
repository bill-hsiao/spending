import { combineReducers } from 'redux'
// import {
//   CONSOLE_LOG
// } from '../actions'


const initialState = {
  hello: 'world',
  world: 'hello'
}

function init(state = initialState, action) {
  switch (action.type) {
    // case CONSOLE_LOG:
    // console.log(state.hello, state.world);
    //   return state
    default:
      return state
  }
}


const rootReducer = combineReducers(
  {init}
)

export default rootReducer
