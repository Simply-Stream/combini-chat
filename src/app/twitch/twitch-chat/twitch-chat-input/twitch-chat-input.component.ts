import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-twitch-chat-input',
  template: `
    <textarea class="chat-input form-control mt-2"
              [placeholder]="'CHAT.SEND_MESSAGE_TEXTAREA' | translate"
              maxlength="500" rows="1"
    ></textarea>
  `,
  styleUrls: ['./twitch-chat-input.component.scss'],
})
export class TwitchChatInputComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
