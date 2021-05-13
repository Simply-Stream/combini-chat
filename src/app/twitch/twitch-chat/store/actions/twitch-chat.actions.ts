import { createAction } from '@ngrx/store';
import { Message } from '../../twitch-chat-message/message';
import { Identity } from '../../models/identity';

export const connect = createAction(
  '[Twitch Chat] Connect',
  (channel: string[] = [], identity?: Identity | never) => ({
    channel,
    identity,
  }),
);

export const connectSuccess = createAction(
  '[Twitch Chat] Connect Success',
);

export const addChannels = createAction(
  '[Twitch Chat] Add Channels',
  (channels: string[]) => ({channels}),
);

export const addCombinedChatChannel = createAction(
  '[Twitch Chat] Add Combined Channel',
  (channel: string) => ({channel}),
);

export const addMessage = createAction(
  '[Twitch Chat] Add Message',
  (message: Message) => ({message}),
);

export const changeChannel = createAction(
  '[Twitch Chat] Change Channel',
  (channel: string) => ({channel}),
);

export const sendMessage = createAction(
  '[Twitch Chat] Send Message',
  (channel: string, message: string) => ({channel, message}),
);
