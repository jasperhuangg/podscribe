import {SyncEvent} from "../../../models/SyncEvent";

export const PLAYBACK_STATE = 'PLAYBACK_STATE'

export const SET_PLAYBACK_STATE = 'SET_PLAYBACK_STATE'

export interface PlaybackState {
  syncEvent: SyncEvent | null
}

interface PlaybackStateAction {
  type: typeof SET_PLAYBACK_STATE
  payload: SyncEvent|null
}


export type PlaybackActionTypes = PlaybackStateAction
