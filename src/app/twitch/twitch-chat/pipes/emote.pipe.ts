import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BttvParserService } from '../services/bttv-parser.service';
import { EmoteParserInterface } from '../services/emote-parser-interface';
import { EmoteParserService } from '../services/emote-parser.service';
import { Message } from '../twitch-chat-message/message';

@Pipe({
  name: 'emote',
})
export class EmotePipe implements PipeTransform {
  protected parsers: EmoteParserInterface[];

  constructor(private sanitizer: DomSanitizer, emoteParser: EmoteParserService, bttvParser: BttvParserService) {
    this.parsers = [emoteParser, bttvParser];
  }

  transform(message: Message): Message {
    const parsedMessage: Message = {
      userstate: message.userstate,
      message: message.message,
      channel: message.channel,
      background: message.background,
    };

    for (const parser of this.parsers) {
      parser.parse(parsedMessage);
    }

    return parsedMessage;
  }
}
