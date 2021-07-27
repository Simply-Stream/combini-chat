import { Component } from '@angular/core';

@Component({
  selector: 'app-twitch-chat-emote-menu',
  template: `
    <app-twitch-chat-emote-menu-list *ngIf="showList"></app-twitch-chat-emote-menu-list>

    <button (click)="toggleList()"
            title="Emotes Menu" class="twitch-emote-menu-trigger">
      <fa-icon [icon]="['far', 'smile']"></fa-icon>
    </button>
  `,
  styleUrls: ['./twitch-chat-emote-menu.component.scss'],
})
export class TwitchChatEmoteMenuComponent {
  public showList = false;

  public toggleList(): void {
    this.showList = !this.showList;
  }
}
