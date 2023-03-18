import { ReplyUserstate } from "app/twitch/twitch-chat/twitch-chat-message/models/reply-userstate";
import { Userstate } from "tmi.js";

export type UserState = Userstate | ReplyUserstate;

export interface Message {
  channel: string;
  userstate: UserState;
  message: string;
  background?: string;
  messageSent?: Date;
}
