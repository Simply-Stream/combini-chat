import { createReducer, on } from '@ngrx/store';
import * as TwitchChatActions from '../actions/twitch-chat.actions';
import { Message } from '../../twitch-chat-message/message';

export const twitchChatFeatureKey = 'twitchChat';

export interface State {
  // Channel that are combined to a super-chat. Needs to be present in `channels` array
  combinedChatChannels: string[] | [],
  // Active tracked channel
  channels: string[] | [],
  // Tracked messages, per channel
  messages: Message[],
}

export const initialState: State = {
  combinedChatChannels: [],
  channels: [],
  messages: [],
};

export const reducer = createReducer(
  initialState,
  on(
    TwitchChatActions.connect,
    (state: State, {channel}) => ({
      ...state,
      channels: [...state.channels, ...channel],
    }),
  ),
  on(
    TwitchChatActions.addChannel,
    (state: State, {channel}) => ({
      ...state,
      channels: [...state.channels, channel],
    }),
  ),
  on(
    TwitchChatActions.addCombinedChatChannel,
    (state: State, {channel}) => ({
      ...state,
      combinedChannel: [...state.combinedChatChannels, channel],
    }),
  ),
  on(
    TwitchChatActions.addMessage,
    (state: State, {message}) =>
      ({
        ...state,
        messages: [...state.messages, message],
      }),
  ),
);
