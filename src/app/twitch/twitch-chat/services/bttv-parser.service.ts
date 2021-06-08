import { Injectable } from '@angular/core';
import { BttvEmote } from "app/twitch/twitch-chat/models/bttv-emote";
import { EmoteSanitizerService } from "app/twitch/twitch-chat/services/emote-sanitizer.service";
import { AppConfig } from 'environments/environment';
import { Message } from '../twitch-chat-message/message';
import { BttvEmoteService } from './bttv-emote.service';
import { EmoteParserInterface } from './emote-parser-interface';

@Injectable({
  providedIn: 'root',
})
export class BttvParserService implements EmoteParserInterface {
  constructor(protected bttvEmotes: BttvEmoteService, protected emoteSanitizer: EmoteSanitizerService) {
  }

  parse(message: Message): string {
    return this.parseEmotes(message);
  }

  protected replaceEmote(emote: BttvEmote, message: string): string {
    const emoteCode = this.emoteSanitizer.sanitize(emote.code);
    const regExp = new RegExp(`((?!\\w)|\\s|^)${ emoteCode }((?!\\w)|\\s|$)`, 'g');

    return message.replace(regExp, `$1${ this.constructImage(emote) }$2`);
  }

  /**
   * @param {BttvEmote} emote
   * @returns {string}
   * @protected
   *
   * @TODO: Find a more angular-like way of doing this
   */
  protected constructImage(emote: BttvEmote): string {
    return `<img title="${ emote.code }" alt="${ emote.code }" src="${ AppConfig.bttv.endpoints.cdn }emote/${ emote.id }/1x">`;
  }

  protected parseEmotes(message: Message): string {
    const channelId = message.userstate['room-id'];
    const channelEmotes = this.bttvEmotes.getChannelEmotes(channelId);
    const emoteSets = [
      this.bttvEmotes.getGlobalEmotes(),
      channelEmotes['channelEmotes'],
      channelEmotes['sharedEmotes'],
    ];

    for (const emoteSet of emoteSets) {
      for (const emote of emoteSet) {
        if (message.message.indexOf(emote.code) < 0) {
          continue;
        }

        message.message = this.replaceEmote(emote, message.message);
      }
    }

    return message.message;
  }
}
