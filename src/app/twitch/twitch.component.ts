import { Component } from '@angular/core';

@Component({
  selector: 'app-twitch',
  template: `
    <nav class="navbar">
      <div class="container-fluid">
        <a class="navbar-brand">Combini</a>
        <app-twitch-authentication></app-twitch-authentication>
      </div>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./twitch.component.scss'],
})
export class TwitchComponent {
}
