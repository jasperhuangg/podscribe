import {AuthActionTypes, LOGIN_USER, LOGOUT_USER} from './types'
import {TokenResponse} from "expo-app-auth";

export function loginUser(fields: [string, TokenResponse]): AuthActionTypes {
  return {
    type: LOGIN_USER,
    payload: fields
  }
}

export function logoutUser(): AuthActionTypes {
  return {
    type: LOGOUT_USER,
  }
}
