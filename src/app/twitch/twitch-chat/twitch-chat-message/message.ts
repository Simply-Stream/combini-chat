import { ChatUserstate } from 'tmi.js';

export interface Message {
  channel: string;
  userstate: ChatUserstate;
  message: string;
  self: boolean;
}
