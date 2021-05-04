import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTwitchChat from '../reducers/twitch-chat.reducer';
import { Message } from '../../twitch-chat-message/message';

export const selectTwitchChatState = createFeatureSelector<fromTwitchChat.State>(
  fromTwitchChat.twitchChatFeatureKey,
);

export const selectMessages = createSelector(
  selectTwitchChatState,
  (state: fromTwitchChat.State): Message[] | [] => state.messages,
);
