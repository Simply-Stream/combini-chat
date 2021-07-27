import { createReducer, on } from '@ngrx/store';
import { EmoteObj } from "tmi.js";
import { TwitchChatEmotesActions } from '../actions';

export const twitchChatEmotesFeatureKey = 'twitchChatEmotes';

export interface State {
  emotesets: EmoteObj;
}

export const initialState: State = {
  emotesets: {},
};

export const reducer = createReducer(
  initialState,
  on(TwitchChatEmotesActions.addEmoteset, (state: State, {emotesets}) => ({...state, emotesets})),
);

