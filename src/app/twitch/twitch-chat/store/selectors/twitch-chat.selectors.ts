import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Message } from 'app/twitch/twitch-chat/twitch-chat-message/models/message';
import * as fromTwitchChat from '../reducers/twitch-chat.reducer';

export const selectTwitchChatState = createFeatureSelector<fromTwitchChat.State>(
  fromTwitchChat.twitchChatFeatureKey,
);

export const selectActiveChannels = createSelector(
  selectTwitchChatState,
  (state: fromTwitchChat.State) => state.activeChannels,
);

export const selectMessages = createSelector(
  selectTwitchChatState,
  (state: fromTwitchChat.State): Message[] | [] => state.messages,
);

export const selectChannels = createSelector(
  selectTwitchChatState,
  (state: fromTwitchChat.State): string[] => state.channels,
);
