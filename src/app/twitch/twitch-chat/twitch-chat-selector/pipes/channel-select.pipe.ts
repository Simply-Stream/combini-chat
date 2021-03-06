import { Pipe, PipeTransform } from '@angular/core';
import { Message } from 'app/twitch/twitch-chat/twitch-chat-message/models/message';

@Pipe({
  name: 'channelSelect',
})
export class ChannelSelectPipe implements PipeTransform {
  transform(value: Message[] | [], channels: string[]): Message[] | [] {
    if (!channels || channels.length === 0) {
      return value;
    }

    const messages: Message[] = [];

    for (const message of value) {
      if (channels.includes(message.channel.substr(1))) {
        messages.push(message);
      }
    }

    return messages;
  }
}
