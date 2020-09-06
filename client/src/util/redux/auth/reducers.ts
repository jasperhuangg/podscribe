import {AuthActionTypes, AuthState, LOGIN_USER, LOGOUT_USER} from './types'

const initialState: AuthState = {
  tokens: null
}

export function authReducer(
  state = initialState,
  action: AuthActionTypes
): AuthState {
  switch (action.type) {
    case LOGIN_USER:
      return {
        tokens: action.payload
      }
    case LOGOUT_USER:
      return {
        tokens: null
      }
    default:
      return state
  }
}
