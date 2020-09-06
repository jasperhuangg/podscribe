import {AppActionTypes, SET_APP_VISIBILITY} from "./types";

export function setAppVisibility(isVisible: boolean): AppActionTypes {
  return {
    type: SET_APP_VISIBILITY,
    payload: isVisible
  }
}
