import { createAction } from '@ngrx/store';
import { Message } from '../../twitch-chat-message/message';

export const connect = createAction(
  '[Twitch Chat] Connect',
  (channel: string[] = []) => ({channel}),
);

export const connectSuccess = createAction(
  '[Twitch Chat] Connect Success',
);

export const addChannel = createAction(
  '[Twitch Chat] Add Channel',
  (channel: string) => ({channel}),
);

export const addCombinedChatChannel = createAction(
  '[Twitch Chat] Add Combined Channel',
  (channel: string) => ({channel}),
);

export const addMessage = createAction(
  '[Twitch Chat] Add Message',
  (message: Message) => ({message}),
);
