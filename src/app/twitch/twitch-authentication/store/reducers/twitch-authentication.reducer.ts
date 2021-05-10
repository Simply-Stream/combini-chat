import { createReducer, on } from '@ngrx/store';
import * as TwitchAuthenticationActions from '../actions/twitch-authentication.actions';

export const twitchAuthenticationFeatureKey = 'twitchAuthentication';

export interface State {
  loading: boolean;
  isLoggedIn: boolean;
  username?: string;
  accessToken?: string;
}

export const initialState: State = {
  loading: false,
  isLoggedIn: false,
};

export const reducer = createReducer(
  initialState,
  on(
    TwitchAuthenticationActions.login,
    (state: State) => ({...state, loading: true}),
  ),
  on(
    TwitchAuthenticationActions.logout,
    (state: State) => ({...state, loading: false, isLoggedIn: false, accessToken: null}),
  ),
  on(
    TwitchAuthenticationActions.loginSuccess,
    (state: State, {accessToken, username}) => ({...state, loading: false, isLoggedIn: true, accessToken, username}),
  ),
  on(
    TwitchAuthenticationActions.loginFailure,
    (state: State) => ({...state, loading: false, isLoggedIn: false}),
  ),
);
