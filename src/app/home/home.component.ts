import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `
    <div class="container">
      <app-twitch></app-twitch>
    </div>
  `,
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

}
