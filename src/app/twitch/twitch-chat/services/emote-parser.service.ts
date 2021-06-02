import { Injectable } from '@angular/core';
import { Message } from '../twitch-chat-message/message';
import { EmoteParserInterface } from './emote-parser-interface';

@Injectable({
  providedIn: 'root',
})
export class EmoteParserService implements EmoteParserInterface {
  parse(message: Message): string {
    let parsedMessage = message.message;

    if (message.userstate.emotes) {
      Object.keys(message.userstate.emotes).forEach((emoteId) => {
        const pos = message.userstate.emotes[emoteId][0].split('-');

        // @TODO: Actually use what twitch sends us and only override these parts
        const emoteCode = message.message.slice(parseInt(pos[0]), parseInt(pos[1]) + 1);
        parsedMessage = parsedMessage
          .replace(
            new RegExp(emoteCode.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
            '<img title="' + emoteCode + '" alt="' + emoteCode + '" src="https://static-cdn.jtvnw.net/emoticons/v2/' + emoteId + '/default/dark/1.0">',
          );
      });
    }

    message.message = parsedMessage;

    return parsedMessage;
  }
}
