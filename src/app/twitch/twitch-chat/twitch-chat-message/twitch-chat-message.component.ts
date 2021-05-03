import { Component, Input, OnInit } from '@angular/core';
import { Message } from './message';

@Component({
  selector: 'app-twitch-chat-message',
  template: `
    <div class="chat-message-wrapper" [class.highlighted]="message.self" [class.even]="index % 2">
      <!--      <span class="chat-message-badges">{{ message.userstate.badges }} </span>-->
      <span class="chat-message-channel">[{{ message.channel }}] </span>
      <span class="chat-message-user"
            [style]="{color: message.userstate?.color}"><b>{{ message.userstate.username }}</b>: </span>
      <span class="chat-message">{{ message.message }}</span>
    </div>
  `,
  styleUrls: ['./twitch-chat-message.component.scss'],
})
export class TwitchChatMessageComponent implements OnInit {
  @Input()
  public message: Message;

  @Input()
  public index: number = 0;

  constructor() {
  }

  ngOnInit(): void {
  }
}
