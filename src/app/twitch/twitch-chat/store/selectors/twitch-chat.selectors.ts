import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTwitchChat from '../reducers/twitch-chat.reducer';
import { Message } from '../../twitch-chat-message/message';

export const selectTwitchChatState = createFeatureSelector<fromTwitchChat.State>(
  fromTwitchChat.twitchChatFeatureKey,
);

export const selectActiveChannel = createSelector(
  selectTwitchChatState,
  (state: fromTwitchChat.State) => state.activeChannel,
);

export const selectMessages = createSelector(
  selectTwitchChatState,
  (state: fromTwitchChat.State): Message[] | [] => state.messages,
);

export const selectChannels = createSelector(
  selectTwitchChatState,
  (state: fromTwitchChat.State): string[] => state.channels,
);
