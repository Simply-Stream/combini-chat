import { createAction } from '@ngrx/store';
import { ChannelEmote } from "app/twitch/models/channel-emote";

export const updateCurrentUser = createAction(
  '[Twitch User] Update Current User',
  (user: any) => ({user}),
);

export const updateEmoteSets = createAction(
  '[Twitch User] Update Emote Sets',
  (emoteset: string) => ({emoteset}),
);

export const updateEmoteSetsSuccess = createAction(
  '[Twitch User] Update Emote Sets Success',
  (emotesets: ChannelEmote[]) => ({emotesets}),
);
