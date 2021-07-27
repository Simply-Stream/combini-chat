import { createAction } from "@ngrx/store";
import { EmoteObj } from "tmi.js";

export const addEmoteset = createAction(
  '[Twitch Chat Emotes] Add Emoteset',
  (emotesets: EmoteObj) => ({emotesets}),
);
