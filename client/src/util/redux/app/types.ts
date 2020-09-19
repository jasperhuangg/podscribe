import {TokenResponse} from "expo-app-auth";

export const APP_STATE = 'APP_STATE'

export const SET_APP_VISIBILITY = 'SET_APP_VISIBILITY'

export interface AppState {
  visible: boolean
}

interface AppVisibilityAction {
  type: typeof SET_APP_VISIBILITY
  payload: boolean
}

export type AppActionTypes = AppVisibilityAction
