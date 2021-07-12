import { Component } from '@angular/core';

@Component({
  selector: 'app-twitch-chat-emote-menu',
  template: `
    <button title="Emotes Menu" class="twitch-emote-menu-trigger">
      <fa-icon [icon]="['far', 'smile']"></fa-icon>
    </button>
  `,
  styleUrls: ['./twitch-chat-emote-menu.component.scss'],
})
export class TwitchChatEmoteMenuComponent {
}
