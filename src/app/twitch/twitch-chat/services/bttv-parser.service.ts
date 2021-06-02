import { Injectable } from '@angular/core';
import { AppConfig } from '../../../../environments/environment';
import { Message } from '../twitch-chat-message/message';
import { BttvEmoteService } from './bttv-emote.service';
import { EmoteParserInterface } from './emote-parser-interface';

@Injectable({
  providedIn: 'root',
})
export class BttvParserService implements EmoteParserInterface {
  constructor(private bttvEmotes: BttvEmoteService) {
  }

  parse(message: Message): string {
    return this.parseEmotes(message);
  }

  protected parseEmotes(message: Message): string {
    for (const emote of this.bttvEmotes.getGlobalEmotes()) {
      if (message.message.indexOf(emote.code) >= 0) {
        const emoteCode = emote.code.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regExp = new RegExp(`($|\\s)${ emoteCode }(^|\\s)`);

        message.message = message.message.replace(
          new RegExp(regExp, 'g'),
          '<img title="' + emote.code + '" alt="' + emote.code + '" src="' + AppConfig.bttv.endpoints.cdn + 'emote/' + emote.id + '/1x">',
        );
      }
    }

    const channelId = message.userstate['room-id'];
    const channelEmotes = this.bttvEmotes.getChannelEmotes(channelId);

    if (channelEmotes.channelEmotes.length > 0) {
      for (const emote of channelEmotes.sharedEmotes) {
        message.message = message.message.replace(
          new RegExp(emote.code.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
          '<img title="' + emote.code + '" alt="' + emote.code + '" src="' + AppConfig.bttv.endpoints.cdn + 'emote/' + emote.id + '/1x">',
        );
      }
    }

    return message.message;
  }
}
