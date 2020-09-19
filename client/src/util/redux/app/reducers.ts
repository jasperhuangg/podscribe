import {AppActionTypes, AppState, SET_APP_VISIBILITY} from "./types";

const initialState: AppState = {
  visible: true
}

export function appReducer(
  state = initialState,
  action: AppActionTypes
): AppState {
  switch (action.type) {
    case SET_APP_VISIBILITY:
      return {
        visible: action.payload
      }
    default:
      return state
  }
}
