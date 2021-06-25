import { createReducer, on } from '@ngrx/store';
import { Message } from 'app/twitch/twitch-chat/twitch-chat-message/models/message';
import * as TwitchChatActions from '../actions/twitch-chat.actions';

export const twitchChatFeatureKey = 'twitchChat';

export interface State {
  activeChannels: string[],
  // Active tracked channel
  channels: string[],
  // Tracked messages, per channel
  messages: Message[],
}

export const initialState: State = {
  activeChannels: [],
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
    TwitchChatActions.addChannels,
    (state: State, {channels}) => ({
      ...state,
      channels: [...state.channels, ...channels],
      activeChannels: [...state.activeChannels, ...channels]
    }),
  ),
  on(
    TwitchChatActions.removeChannel,
    (state: State, {channel}) => ({
      ...state,
      channels: [...state.channels.filter(chan => chan !== channel)],
      activeChannels: [...state.activeChannels.filter(chan => chan !== channel)],
      messages: [...state.messages.filter(message => message.channel !== '#' + channel)],
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
  on(
    TwitchChatActions.changeChannel,
    (state: State, {channels}) => {
      return ({
        ...state,
        activeChannels: [...channels],
      });
    },
  ),
);
