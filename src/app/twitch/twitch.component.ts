import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-twitch',
  template: `
    <div class="chat-header text-center">
      <h1 class="mb-0">Stream-Chat</h1>
    </div>
    <app-twitch-chat></app-twitch-chat>
  `,
  styleUrls: ['./twitch.component.scss'],
})
export class TwitchComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
  }
}
