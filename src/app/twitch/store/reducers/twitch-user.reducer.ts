import { createReducer, on } from '@ngrx/store';
import { ChannelEmote } from "app/twitch/models/channel-emote";
import { User } from "app/twitch/models/user";
import * as TwitchActions from "app/twitch/store/actions/twitch-user.actions";

export const twitchUserFeatureKey = 'twitchUser';

export interface State {
  currentUser: User;
  'emote-sets': ChannelEmote[]
}

export const initialState: State = {
  currentUser: null,
  "emote-sets": [],
};

export const reducer = createReducer(
  initialState,
  on(TwitchActions.updateCurrentUser, (state, {user}) => ({...state, currentUser: user})),
  on(TwitchActions.updateEmoteSetsSuccess, (state, {emotesets}) => ({
    ...state,
    'emote-sets': {...state['emote-sets'], ...emotesets},
  })),
);

