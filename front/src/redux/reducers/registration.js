import { 
    SIGNUP_BEGIN,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL
} from '../actions'

export function registration(state = {}, action) {
  switch (action.type) {
    case SIGNUP_BEGIN:
      return { registering: true }
    case SIGNUP_SUCCESS:
      return {}
    case SIGNUP_FAIL:
      return {}
    default:
      return state
  }
}