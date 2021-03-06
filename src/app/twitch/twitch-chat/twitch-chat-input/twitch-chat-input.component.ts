import { Component } from '@angular/core';
import { Store } from "@ngrx/store";
import { sendMessage } from "app/twitch/twitch-chat/store/actions/twitch-chat.actions";
import * as fromTwitchChat from "app/twitch/twitch-chat/store/reducers/twitch-chat.reducer";

@Component({
  selector: 'app-twitch-chat-input',
  template: `
    <div class="start-0 my-3">
      <input class="chat-input form-control mt-2"
             [placeholder]="'CHAT.SEND_MESSAGE_TEXTAREA' | translate"
             maxlength="500" [(ngModel)]="textMessage" (keyup.enter)="onSendMessage()"/>
    </div>
    <app-twitch-button (clickAction)="onSendMessage()" position="end"
                       [label]="'CHAT.SEND_MESSAGE' |translate"></app-twitch-button>
  `,
  styleUrls: ['./twitch-chat-input.component.scss'],
})
export class TwitchChatInputComponent {
  public textMessage;

  constructor(private store: Store<fromTwitchChat.State>) {
  }

  onSendMessage(): void {
    if (!this.textMessage) {
      return;
    }

    this.store.dispatch(sendMessage(this.textMessage));
    this.textMessage = '';
  }
}
