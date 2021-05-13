import { Injectable } from '@angular/core';
import { Message } from '../twitch-chat-message/message';

@Injectable({
  providedIn: 'root',
})
export class EmoteParserService {
  parse(message: Message): string {
    let parsedMessage = message.message;

    if (message.userstate.emotes) {
      Object.keys(message.userstate.emotes).forEach((emoteId) => {
        const pos = message.userstate.emotes[emoteId][0].split('-');

        const emoteCode = message.message.slice(parseInt(pos[0]), parseInt(pos[1]) + 1);
        parsedMessage = message.message
          .replace(
            new RegExp(emoteCode.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
            '<img title="' + emoteCode + '" alt="' + emoteCode + '" src="https://static-cdn.jtvnw.net/emoticons/v2/' + emoteId + '/default/dark/1.0">',
          );
      });
    }

    return parsedMessage;
  }
}
