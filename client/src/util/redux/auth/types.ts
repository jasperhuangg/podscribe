import {TokenResponse} from "expo-app-auth";

export const AUTH_STATE = 'AUTH_STATE'

export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'

export interface AuthState {
  uid: string | null
  tokens: TokenResponse | null
}

interface LoginUserAction {
  type: typeof LOGIN_USER
  payload: [string, TokenResponse]
}

interface LogoutUserAction {
  type: typeof LOGOUT_USER
}

export type AuthActionTypes = LoginUserAction | LogoutUserAction
