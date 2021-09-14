import { createAction, props } from '@ngrx/store';
import { ChannelEmote } from "app/twitch/models/channel-emote";
import { User } from "app/twitch/models/user";

export const updateCurrentUser = createAction(
  '[Twitch User] Update Current User',
  (user: any) => ({user}),
);

export const updateEmoteSets = createAction(
  '[Twitch User] Update Emote Sets',
  props<{ emoteset: string }>(),
);

export const updateEmoteSetsSuccess = createAction(
  '[Twitch User] Update Emote Sets Success',
  props<{
    emotesets: {
      [emoteType: string]: {
        [userId: string]: ChannelEmote[]
      }
    }
  }>(),
);

export const getUsersSuccess = createAction(
  '[Twitch User] Get Users Success',
  props<{ users: User[] }>(),
);
