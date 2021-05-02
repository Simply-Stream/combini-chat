import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `
    <div class="container">
      <h1 class="title">
        {{ 'PAGES.HOME.TITLE' | translate }}
      </h1>

      <a routerLink="/detail">{{ 'PAGES.HOME.GO_TO_DETAIL' | translate }}</a>
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
