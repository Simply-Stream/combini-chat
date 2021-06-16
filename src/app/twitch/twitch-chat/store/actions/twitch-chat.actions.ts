import { createAction } from '@ngrx/store';
import { RoomState } from 'tmi.js';
import { Identity } from '../../models/identity';
import { Message } from 'app/twitch/twitch-chat/twitch-chat-message/models/message';

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

export const roomState = createAction(
  '[Twitch Chat] Room State',
  (roomState: RoomState) => ({roomState}),
);

export const roomStateSuccess = createAction(
  '[Twitch Chat] Room State Success',
);

export const updateGlobalBadges = createAction(
  '[Twitch Chat] Update Global Badges',
);

export const updateGlobalBadgesSuccess = createAction(
  '[Twitch Chat] Update Global Badges Success',
);

export const updateChannelBadges = createAction(
  '[Twitch Chat] Update Channel Badges',
  (channelId: string) => ({channelId}),
);

export const updateChannelBadgesSuccess = createAction(
  '[Twitch Chat] Update Channel Badges Success',
);

export const updateGlobalEmotes = createAction(
  '[Twitch Chat] Update Global Emotes',
);

export const updateGlobalEmotesSuccess = createAction(
  '[Twitch Chat] Update Global Emotes Success',
);

export const updateChannelEmotes = createAction(
  '[Twitch Chat] Update Channel Emotes',
  (channelId: string) => ({channelId}),
);

export const updateChannelEmotesSuccess = createAction(
  '[Twitch Chat] Update Channel Emotes Success',
);
