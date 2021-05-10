import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTwitchAuth from '../reducers/twitch-authentication.reducer';

export const selectTwitchAuthState = createFeatureSelector<fromTwitchAuth.State>(
  fromTwitchAuth.twitchAuthenticationFeatureKey,
);

export const selectIsLoggedIn = createSelector(
  selectTwitchAuthState,
  (state: fromTwitchAuth.State): boolean => state.isLoggedIn,
);

export const selectUsername = createSelector(
  selectTwitchAuthState,
  (state: fromTwitchAuth.State): string => state.username,
);
