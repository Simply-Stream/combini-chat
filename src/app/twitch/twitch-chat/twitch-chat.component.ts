import { Component, OnInit } from '@angular/core';
import { Message } from './twitch-chat-message/message';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import * as fromTwitchChat from './store/reducers/twitch-chat.reducer';
import { selectMessages } from './store/selectors/twitch-chat.selectors';
import { connect } from './store/actions/twitch-chat.actions';

@Component({
  selector: 'app-twitch-chat',
  template: `
    <div class="h-100 d-flex flex-column">
      <div class="chat-header text-center">
        <h5 class="mb-0">Stream-Chat</h5>
      </div>

      <div class="chat-container flex-grow-1">
        <ng-container *ngFor="let message of allChat$ |async; index as i">
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
// @TODO: Implement pipe to crawl through channels or implement selector for this
export class TwitchChatComponent implements OnInit {
  public allChat$: Observable<Message[] | []> = this.store.pipe(select(selectMessages));

  constructor(private store: Store<fromTwitchChat.State>) {
  }

  ngOnInit(): void {
  }
}
