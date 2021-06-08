import { BttvEmote } from "app/twitch/twitch-chat/models/bttv-emote";

export interface BttvUserResponse {
  id: string;
  bots: string[];
  channelEmotes: BttvEmote[];
  sharedEmotes: BttvEmote[];
}
