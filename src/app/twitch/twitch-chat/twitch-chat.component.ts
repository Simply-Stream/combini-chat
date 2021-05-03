import { Component, OnInit } from '@angular/core';
import { TwitchChatService } from '../../core/services/twitch/twitch-chat.service';
import { ChatUserstate } from 'tmi.js';
import { Message } from './twitch-chat-message/message';

@Component({
  selector: 'app-twitch-chat',
  template: `
    <div class="h-100 d-flex flex-column">
      <div class="chat-header text-center">
        <h5 class="mb-0">Stream-Chat</h5>
      </div>

      <div class="chat-container flex-grow-1">
        <ng-container *ngFor="let message of chatMessages; index as i">
          <app-twitch-chat-message [message]="message"></app-twitch-chat-message>
        </ng-container>
      </div>

      <div class="container-fluid align-self-end mb-2">
        <app-twitch-chat-input></app-twitch-chat-input>
      </div>
    </div>
  `,
  styleUrls: ['./twitch-chat.component.scss'],
})
export class TwitchChatComponent implements OnInit {
  private readonly MAX_CHAT_MESSAGES = 200;

  public chatMessages: Message[] = [];
  protected alternatingFlag = false;

  constructor(private twitch: TwitchChatService) {
  }

  ngOnInit(): void {
    this.twitch.connect(
      [],
      ((channel: string, userstate: ChatUserstate, message: string, self: boolean) => {
        console.log({channel, userstate, message, self});

        this.chatMessages.push({
          channel,
          userstate,
          message,
          background: (self ? 'self' : (this.alternatingFlag ? 'alternate' : null)),
        });
        this.alternatingFlag = !this.alternatingFlag;

        // Just throw away the first message
        if (this.chatMessages.length > this.MAX_CHAT_MESSAGES) {
          this.chatMessages.shift();
        }
      }),
    );
  }
}
