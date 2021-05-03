import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-twitch',
  template: `
    <div class="twitch-container">
      <app-twitch-chat></app-twitch-chat>
    </div>
  `,
  styleUrls: ['./twitch.component.scss'],
})
export class TwitchComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
  }
}
