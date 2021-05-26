import { Pipe, PipeTransform } from '@angular/core';
import { EmoteParserService } from '../services/emote-parser.service';
import { Message } from '../twitch-chat-message/message';
import { BttvParserService } from '../services/bttv-parser.service';
import { Observable } from 'rxjs';

@Pipe({
  name: 'emote',
})
export class EmotePipe implements PipeTransform {
  constructor(private emoteParser: EmoteParserService, private bttvParser: BttvParserService) {
  }

  transform(message: Message): Observable<string> {
    const parsedMessage: Message = {
      userstate: message.userstate,
      message: message.message,
      channel: message.channel,
      background: message.background,
    };

    if (parsedMessage.userstate.emotes) {
      this.emoteParser.parse(parsedMessage);
    }

    return this.bttvParser.parse(parsedMessage);
  }
}
