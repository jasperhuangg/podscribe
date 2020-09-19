import {SyncEvent} from "../../../models/SyncEvent";
import {PlaybackActionTypes, SET_PLAYBACK_STATE} from "./types";

export function setPlaybackState(syncEvent: SyncEvent|null): PlaybackActionTypes {
  return {
    type: SET_PLAYBACK_STATE,
    payload: syncEvent
  }
}

