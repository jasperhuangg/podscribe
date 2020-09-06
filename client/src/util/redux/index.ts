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

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer
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
        {setAppVisibility: (visible: boolean) => {dispatch(setAppVisibility(visible));}
        }:
        {}),
    }
  }

