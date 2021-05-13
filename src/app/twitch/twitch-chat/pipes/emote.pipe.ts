import { Pipe, PipeTransform } from '@angular/core';
import { EmoteParserService } from '../services/emote-parser.service';
import { ChatUserstate } from 'tmi.js';
import { Message } from '../twitch-chat-message/message';

@Pipe({
  name: 'emote',
})
export class EmotePipe implements PipeTransform {
  constructor(private emoteParser: EmoteParserService) {
  }

  transform(message: Message): unknown {
    if (message.userstate.emotes) {
      return this.emoteParser.parse(message);
    }

    return message.message;
  }
}
