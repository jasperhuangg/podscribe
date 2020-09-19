import {PlaybackActionTypes, PlaybackState, SET_PLAYBACK_STATE} from "./types";

const initialState: PlaybackState = {
  syncEvent: null
}

export function playbackReducer(
  state = initialState,
  action: PlaybackActionTypes
): PlaybackState {
  switch (action.type) {
    case SET_PLAYBACK_STATE:
      return {
        syncEvent: action.payload
      }
    default:
      return state
  }
}
