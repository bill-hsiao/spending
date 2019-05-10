// import {
//   CONSOLE_LOG
// } from '../actions'
export const middleWare = store => next => action => {
  // store.dispatch(fetchSemester(action.semester))
  // if (action.type === CONSOLE_LOG) {
  //   console.log('dispatching', action)
  //   const hello = store.getState().init.world
  //   const world = store.getState().init.hello
  //   console.log(hello + ' ' + world)
  // }
  let result = next(action)
  console.log('next state', store.getState())
  return result
}
