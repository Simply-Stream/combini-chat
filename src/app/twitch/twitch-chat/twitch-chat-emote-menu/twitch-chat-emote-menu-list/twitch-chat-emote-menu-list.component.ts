import { Component, Input } from '@angular/core';
import { ChannelEmote } from "app/twitch/models/channel-emote";
import { User } from "app/twitch/models/user";

@Component({
  selector: 'app-twitch-chat-emote-menu-list',
  template: `
    <div class="emote-menu-list-wrapper">
      <div class="emote-menu-list-picker">
        <div class="emote-menu-list-header">
          <div class="emote-menu-list-search">
            <div class="emote-menu-list-search-input">
              <app-twitch-input class="w-100" type="text"
                                [placeholder]="'CHAT.EMOTES.SEARCH' |translate"></app-twitch-input>
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
            <div class="emote-menu-list-emotes">
              <div class="emote-menu-list-emotes-container d-flex flex-column"
                   *ngFor="let channel of channels">
                <div class="p-3">
                  <!-- content block -->
                  <div class="emote-menu-list-emotes-header d-flex">
                    <div class="d-flex align-items-center p-2">
                      <figure class="m-0">
                        <img width="28" class="rounded-circle" [src]="channel.profile_image_url"
                             [alt]="channel.display_name"/>
                      </figure>

                      <div class="px-1"></div>

                      <p class="align-middle m-0">
                        {{ channel.display_name }}
                      </p>
                    </div>
                  </div>

                  <!-- flex blocks for single emotes -->
                  <div class="d-flex emote-menu-list-emotes-content">
                    <figure class="px-1" *ngFor="let emote of emotes?.subscriptions[channel.id]">
                      <img class="mx-1"
                           [src]="emote |emoteTemplate:template"
                           [alt]="emote.name" [title]="emote.name">
                    </figure>
                  </div>
                </div>
              </div>
            </div>

            <div class="emote-menu-list-channels-container align-self-end">
              <div class="emote-menu-list-channels">
                <div class="my-3" *ngFor="let channel of channels">
                  <figure class="m-0 px-3">
                    <img class="rounded-circle" width="20"
                         [alt]="channel.display_name" [src]="channel.profile_image_url">
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./twitch-chat-emote-menu-list.component.scss'],
})
export class TwitchChatEmoteMenuListComponent {
  @Input()
  public emotes: {
    [emoteType: string]: {
      [userId: string]: ChannelEmote[]
    }
  };

  @Input()
  public channels: User[];

  @Input()
  public template: string;
}
