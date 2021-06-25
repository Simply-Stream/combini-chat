import { ChatUserstate } from "tmi.js";

export interface ReplyUserstate extends ChatUserstate {
  "reply-parent-display-name": string;
  "reply-parent-msg-body": string;
  "reply-parent-msg-id": string;
  "reply-parent-user-id": string;
  "reply-parent-user-login": string;
}
