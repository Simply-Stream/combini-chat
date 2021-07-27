import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTwitchUser from 'app/twitch/store/reducers/twitch-user.reducer';

export const selectTwitchUserState = createFeatureSelector<fromTwitchUser.State>(
  fromTwitchUser.twitchUserFeatureKey,
);

export const selectCurrentUser = createSelector(
  selectTwitchUserState,
  (state: fromTwitchUser.State) => state.currentUser,
);

export const selectEmoteSets = createSelector(
  selectTwitchUserState,
  (state: fromTwitchUser.State) => state["emote-sets"],
);
