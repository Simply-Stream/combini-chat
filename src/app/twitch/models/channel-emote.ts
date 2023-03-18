import { GlobalEmote } from "app/twitch/models/global-emote";

export interface ChannelEmote extends GlobalEmote {
  tier?: string;
  emote_type: string;
  emote_set_id: string;
  owner_id: string;
}
