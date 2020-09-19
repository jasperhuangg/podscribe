import {AuthActionTypes, AuthState, LOGIN_USER, LOGOUT_USER} from './types'

const initialState: AuthState = {
  tokens: null,
  uid: null
}

export function authReducer(
  state = initialState,
  action: AuthActionTypes
): AuthState {
  switch (action.type) {
    case LOGIN_USER:
      return {
        uid: action.payload[0],
        tokens: action.payload[1]
      }
    case LOGOUT_USER:
      return {
        uid: null,
        tokens: null
      }
    default:
      return state
  }
}
