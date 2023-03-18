import { Pipe, PipeTransform } from '@angular/core';
import { GlobalEmote } from "app/twitch/models/global-emote";

@Pipe({
  name: 'emoteTemplate',
})
export class EmoteTemplatePipe implements PipeTransform {
  transform(emote: GlobalEmote, template: string): string {
    return template
      .replace('{{id}}', emote.id)
      .replace('{{format}}', 'default')
      .replace('{{theme_mode}}', 'dark')
      .replace('{{scale}}', emote.scale[0]);
  }
}
