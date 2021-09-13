import { Component } from '@angular/core';
import { select, Store } from "@ngrx/store";
import { selectEmoteSets } from "app/twitch/store/selectors/twitch-user.selectors";

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
          <div class="emote-menu-list d-flex">
            <div class="emote-menu-list-emotes flex-fill">
              <div class="emote-menu-list-emotes-container" *ngFor="let channels of (emotes$ |async)?.subscriptions |keyvalue"> <!-- content block -->
                <div class="emote-menu-list-emotes-header">{{ channels.key }}</div>

                <!-- flex blocks for single emotes -->
                <div class="d-flex emote-menu-list-emotes-content">
                  <figure *ngFor="let emote of channels.value">
                    <img [src]="emote.images.url_1x" [alt]="emote.name" [title]="emote.name">
                  </figure>
                </div>
              </div>
            </div>
            <div class="emote-menu-list-channels align-self-end">
              CHANNELS
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./twitch-chat-emote-menu-list.component.scss'],
})
export class TwitchChatEmoteMenuListComponent {
  public emotes$ = this.store.pipe(select(selectEmoteSets));

  // @TODO: Move to parent component
  constructor(public store: Store) {
  }
}
