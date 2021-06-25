import { Component, OnInit } from '@angular/core';
import { BadgesService } from "app/twitch/twitch-chat/services/badges.service";
import { BttvEmoteService } from './twitch-chat/services/bttv-emote.service';

@Component({
  selector: 'app-twitch',
  template: `
    <div class="twitch-container d-flex flex-column overflow-hidden">
      <nav class="twitch-header navbar">
        <div class="container-fluid">
          <a class="navbar-brand">Combini</a>
          <app-twitch-authentication></app-twitch-authentication>
        </div>
      </nav>

      <div class="flex-fill">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styleUrls: ['./twitch.component.scss'],
})
export class TwitchComponent implements OnInit {
  constructor(private bttvEmotes: BttvEmoteService, private badge: BadgesService) {
  }

  ngOnInit(): void {
    // @TODO: Move into effects
    this.bttvEmotes.updateGlobalEmotes().subscribe();
    this.badge.updateGlobalBadges().subscribe();
  }
}
