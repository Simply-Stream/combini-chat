import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Message } from './twitch-chat-message/message';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import * as fromTwitchChat from './store/reducers/twitch-chat.reducer';
import { selectActiveChannel, selectChannels, selectMessages } from './store/selectors/twitch-chat.selectors';
import { addChannel, changeChannel, connect } from './store/actions/twitch-chat.actions';

@Component({
  selector: 'app-twitch-chat',
  template: `
    <div class="h-100 d-flex flex-column">
      <div class="chat-header text-center">
        <h5 class="mb-0">Stream-Chat</h5>
      </div>
      <app-twitch-chat-selector [channels$]="channels$"
                                [activeChannel$]="activeChannel$"
                                (addChannel)="onAddChannel($event)"
                                (changeChannel)="onChangeChannel($event)"></app-twitch-chat-selector>

      <div class="chat-container flex-grow-1 overflow-auto" (scroll)="scrolled()" #scrollframe>
        <ng-container
          *ngFor="let message of (allChat$ |async) |channelSelect:getActiveChannel(activeChannel$ |async, channels$ |async); index as i">
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
export class TwitchChatComponent implements OnInit, AfterViewInit {
  @ViewChild('scrollframe', {static: false}) scrollFrame: ElementRef;

  public allChat$: Observable<Message[] | []> = this.store.pipe(select(selectMessages));
  public channels$: Observable<string[]> = this.store.pipe(select(selectChannels));
  public activeChannel$: Observable<string> = this.store.pipe(select(selectActiveChannel));

  private scrollContainer: any;
  private mutationObserver: MutationObserver;
  private isNearBottom = true;

  constructor(private store: Store<fromTwitchChat.State>) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.scrollContainer = this.scrollFrame.nativeElement;
    this.mutationObserver = new MutationObserver(() => {
      if (this.isNearBottom) {
        this.scrollToBottom();
      }
    });
    this.mutationObserver.observe(this.scrollContainer, {childList: true});
  }

  onChangeChannel(channel: string): void {
    this.store.dispatch(changeChannel(channel));
  }

  onAddChannel(channel: string): void {
    this.store.dispatch(addChannel(channel));
  }

  scrolled(): void {
    this.isNearBottom = this.isUserNearBottom();
  }

  private scrollToBottom(): void {
    this.scrollContainer.scroll({
      top: this.scrollContainer.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  }

  private isUserNearBottom(): boolean {
    const threshold = 200;
    const position = Number(this.scrollContainer.scrollTop) + Number(this.scrollContainer.offsetHeight);
    const height = this.scrollContainer.scrollHeight;

    return position > height - threshold;
  }

  getActiveChannel(channels: string | null, allChannels?: string[]): string[] {
    if (channels === 'combined') {
      return allChannels;
    }

    return [channels];
  }
}
