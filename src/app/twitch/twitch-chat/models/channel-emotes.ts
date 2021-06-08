import { BttvEmote } from "app/twitch/twitch-chat/models/bttv-emote";

export interface ChannelEmotes {
  [channelId: string]: {
    channelEmotes: BttvEmote[],
    sharedEmotes: BttvEmote[]
  };
}
