import { Component, OnInit } from '@angular/core';
import { TwitchChatService } from '../../core/services/twitch/twitch-chat.service';
import { ChatUserstate } from 'tmi.js';
import { Message } from './twitch-chat-message/message';

@Component({
  selector: 'app-twitch-chat',
  template: `
    <div class="chat-container">
      <div *ngFor="let message of chatMessages; index as i">
        <app-twitch-chat-message [message]="message" [index]="i"></app-twitch-chat-message>
      </div>
    </div>

    <app-twitch-chat-input></app-twitch-chat-input>
  `,
  styleUrls: ['./twitch-chat.component.scss'],
})
export class TwitchChatComponent implements OnInit {
  private readonly MAX_CHAT_MESSAGES = 200;

  public chatMessages: Message[] = [];

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
          self,
        });

        // Just throw away the first message
        if (this.chatMessages.length > this.MAX_CHAT_MESSAGES) {
          this.chatMessages.shift();
        }
      }),
    );
  }
}
