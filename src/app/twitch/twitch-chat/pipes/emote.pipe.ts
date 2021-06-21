import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BttvParserService } from '../services/bttv-parser.service';
import { EmoteParserInterface } from '../services/emote-parser-interface';
import { EmoteParserService } from '../services/emote-parser.service';
import { Message } from 'app/twitch/twitch-chat/twitch-chat-message/models/message';

@Pipe({
  name: 'emote',
})
export class EmotePipe implements PipeTransform {
  protected parsers: EmoteParserInterface[];

  constructor(private sanitizer: DomSanitizer, emoteParser: EmoteParserService, bttvParser: BttvParserService) {
    this.parsers = [emoteParser, bttvParser];
  }

  transform(message: string, messageObject: Message): string {
    const parsedMessage: Message = {
      userstate: messageObject.userstate,
      message,
      channel: messageObject.channel,
      background: messageObject.background
    };

    for (const parser of this.parsers) {
      parser.parse(parsedMessage);
    }

    return parsedMessage.message;
  }
}
