import { Pipe, PipeTransform } from '@angular/core';
import { Message } from '../../twitch-chat-message/message';

@Pipe({
  name: 'channelSelect',
})
export class ChannelSelectPipe implements PipeTransform {
  transform(value: Message[] | [], channels: string[]): unknown {
    if (channels.length === 0) {
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
