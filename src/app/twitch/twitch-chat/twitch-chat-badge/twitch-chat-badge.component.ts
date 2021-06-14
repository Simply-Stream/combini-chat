import { Component, Input } from '@angular/core';
import { Badge } from "app/twitch/twitch-chat/models/badge";

@Component({
  selector: 'app-twitch-chat-badge',
  template: `
    <img class="pe-1" [src]="badge.image_url_1x" [alt]="badge.title" [title]="badge.title"/>
  `,
  styleUrls: ['./twitch-chat-badge.component.scss'],
})
export class TwitchChatBadgeComponent {
  @Input()
  badge: Badge;
}
