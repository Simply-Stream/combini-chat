import { Component } from '@angular/core';
import { Store } from "@ngrx/store";
import { TwitchAuthenticationService } from "app/twitch/twitch-authentication/serivces/twitch-authentication.service";
import { sendMessage } from "app/twitch/twitch-chat/store/actions/twitch-chat.actions";
import * as fromTwitchChat from "app/twitch/twitch-chat/store/reducers/twitch-chat.reducer";

@Component({
  selector: 'app-twitch-chat-input',
  template: `
    <div class="start-0 my-3 chat-input-wrapper">
      <textarea class="chat-input form-control" rows="1"
                [placeholder]="'CHAT.SEND_MESSAGE_TEXTAREA' | translate"
                maxlength="500" [(ngModel)]="textMessage" (keyup.enter)="onSendMessage()">
      </textarea>
      <div class="twitch-chat-button-panel">
        <app-twitch-chat-emote-menu></app-twitch-chat-emote-menu>
      </div>
    </div>

    <app-twitch-button [label]="'CHAT.SEND_MESSAGE' |translate" [disabled]="!isLoggedIn()"
                       (clickAction)="onSendMessage()" position="end"></app-twitch-button>
  `,
  styleUrls: ['./twitch-chat-input.component.scss'],
})
export class TwitchChatInputComponent {
  public textMessage;

  constructor(private store: Store<fromTwitchChat.State>, private auth: TwitchAuthenticationService) {
  }

  onSendMessage(): void {
    if (!this.textMessage) {
      return;
    }

    this.store.dispatch(sendMessage(this.textMessage));
    this.textMessage = '';
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn;
  }
}
