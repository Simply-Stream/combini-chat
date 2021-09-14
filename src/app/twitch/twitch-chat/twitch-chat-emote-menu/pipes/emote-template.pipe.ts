import { Pipe, PipeTransform } from '@angular/core';
import { ChannelEmote } from "app/twitch/models/channel-emote";

@Pipe({
  name: 'emoteTemplate',
})
export class EmoteTemplatePipe implements PipeTransform {
  transform(emote: ChannelEmote, template: string): string {
    return template
      .replace('{{id}}', emote.id)
      .replace('{{format}}', 'default')
      .replace('{{theme_mode}}', 'dark')
      .replace('{{scale}}', emote.scale[0]);
  }
}
