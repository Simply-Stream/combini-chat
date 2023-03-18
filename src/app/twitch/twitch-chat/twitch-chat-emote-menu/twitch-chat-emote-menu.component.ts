import { Component, Input } from '@angular/core';
import { select, Store } from "@ngrx/store";
import {
  selectEmoteSets,
  selectEmoteTemplate,
  selectSubscribedChannels,
} from "app/twitch/store/selectors/twitch-user.selectors";

@Component({
  selector: 'app-twitch-chat-emote-menu',
  template: `
    <app-twitch-chat-emote-menu-list *ngIf="showList"
                                     [channels]="channels$ |async"
                                     [emotes]="emotes$ |async"
                                     [template]="template$ |async"
    ></app-twitch-chat-emote-menu-list>

    <button [disabled]="disabled" (click)="toggleList()"
            title="Emotes Menu" class="twitch-emote-menu-trigger">
      <fa-icon [icon]="['far', 'smile']"></fa-icon>
    </button>
  `,
  styleUrls: ['./twitch-chat-emote-menu.component.scss'],
})
export class TwitchChatEmoteMenuComponent {
  @Input()
  public disabled = false;

  public showList = false;

  public emotes$ = this.store.pipe(select(selectEmoteSets));
  public channels$ = this.store.pipe(select(selectSubscribedChannels));
  public template$ = this.store.pipe(select(selectEmoteTemplate));

  constructor(protected store: Store) {
  }

  public toggleList(): void {
    this.showList = !this.showList;
  }
}
