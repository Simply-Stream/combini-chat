import { Component } from '@angular/core';

@Component({
  selector: 'app-twitch-chat-emote-menu-list',
  template: `
    <div class="emote-menu-list-wrapper">
      <div class="emote-menu-list-picker">
        <div class="emote-menu-list-header">
          <div class="emote-menu-list-search">
            <div class="emote-menu-list-search-input">
              <app-twitch-input type="text" [placeholder]="'CHAT.EMOTES.SEARCH' |translate"></app-twitch-input>
              <div class="emote-menu-list-close">
                <div class="emote-menu-list-close-button">
                  <button>
                    <fa-icon [icon]="['fas', 'times']"></fa-icon>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="emote-menu-list-body">
          <div class="emote-menu-list">
            <div class="emote-menu-list-emotes"></div>
            <div class="emote-menu-list-channels"></div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./twitch-chat-emote-menu-list.component.scss'],
})
export class TwitchChatEmoteMenuListComponent {

}
