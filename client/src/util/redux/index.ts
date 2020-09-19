import {
  combineReducers,
  createStore,
  applyMiddleware
} from 'redux'
import thunkMiddleware from "redux-thunk";
import {authReducer} from './auth/reducers'
import {AUTH_STATE,LOGIN_USER, LOGOUT_USER} from "./auth/types";
import {TokenResponse} from "expo-app-auth";
import {loginUser, logoutUser} from "./auth/actions";
import {appReducer} from "./app/reducers";
import {APP_STATE, SET_APP_VISIBILITY} from "./app/types";
import {setAppVisibility} from "./app/actions";
import {playbackReducer} from "./playback/reducers";
import {PLAYBACK_STATE, SET_PLAYBACK_STATE} from "./playback/types";
import {SyncEvent} from "../../models/SyncEvent";
import {setPlaybackState} from "./playback/actions";

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  playback: playbackReducer
})

export const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware)
)

export const statePropsMapperFactory = (fields: string[]) =>
  (state: any) => {
    return {
      ...(fields.includes(AUTH_STATE) ?
          {tokens: state.auth.tokens} :
          {}),
      ...(fields.includes(APP_STATE) ?
          {visible: state.app.visible} :
          {}),
      ...(fields.includes(PLAYBACK_STATE) ?
          {syncEvent: state.playback.syncEvent} :
          {}),
    }
  }

export const dispatchPropsMapperFactory = (actions: string[]) =>
  (dispatch: any) => {
    return {
      ...(actions.includes(LOGIN_USER) ?
        {loginUser: (tokens: TokenResponse) => {dispatch(loginUser(tokens))}
        }:
        {}),
      ...(actions.includes(LOGOUT_USER) ?
        {logoutUser: () => {dispatch(logoutUser());}
        }:
        {}),
      ...(actions.includes(SET_APP_VISIBILITY) ?
        {setAppVisibility: (visible: boolean) => {dispatch(setAppVisibility(visible))}
        }:
        {}),
      ...(actions.includes(SET_PLAYBACK_STATE) ?
        {setPlaybackState: (syncEvent: SyncEvent | null) => {dispatch(setPlaybackState(syncEvent))}
        }:
        {}),
    }
  }

