import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BadgesService } from "app/twitch/twitch-chat/services/badges.service";
import { Message } from 'app/twitch/twitch-chat/twitch-chat-message/models/message';
import { Observable } from 'rxjs';
import { addChannels, changeChannel, connect, removeChannel } from './store/actions/twitch-chat.actions';

import * as fromTwitchChat from './store/reducers/twitch-chat.reducer';
import { selectActiveChannel, selectChannels, selectMessages } from './store/selectors/twitch-chat.selectors';

@Component({
  selector: 'app-twitch-chat',
  template: `
    <div class="chat-app d-flex flex-column h-100">
      <div class="chat-header text-center">
        <h5 class="mb-0">Stream-Chat</h5>
      </div>
      <app-twitch-chat-selector [channels$]="channels$"
                                [activeChannel$]="activeChannel$"
                                (addChannel)="onAddChannel($event)"
                                (removeChannel)="onRemoveChannel($event)"
                                (changeChannel)="onChangeChannel($event)"></app-twitch-chat-selector>

      <div class="chat-container flex-fill overflow-scroll" (scroll)="scrolled()" #scrollframe>
        <!-- @TODO: @see https://angular.io/guide/dynamic-component-loader and replace ngFor? -->
        <!--
        @TODO: This needs to be replaced by a faster method, like simply appending to the dom without re-rendering
               everything before
        -->
        <ng-container
          *ngFor="let message of (allChat$ |async) |channelSelect:getActiveChannel(activeChannel$ |async, channels$ |async); index as i">
          <app-twitch-chat-message [message]="message" [badges]="badges.getBadges()"></app-twitch-chat-message>
        </ng-container>
      </div>

      <div class="container-fluid mb-2">
        <app-twitch-chat-input></app-twitch-chat-input>
      </div>
    </div>
  `,
  styleUrls: ['./twitch-chat.component.scss'],
})
// @TODO: Implement pipe to crawl through channels or implement selector for this
export class TwitchChatComponent implements AfterViewInit {
  @ViewChild('scrollframe', {static: false}) scrollFrame: ElementRef;

  public allChat$: Observable<Message[] | []> = this.store.pipe(select(selectMessages));
  public channels$: Observable<string[]> = this.store.pipe(select(selectChannels));
  public activeChannel$: Observable<string> = this.store.pipe(select(selectActiveChannel));
  private scrollContainer: any;
  private mutationObserver: MutationObserver;
  private isNearBottom = true;

  constructor(private store: Store<fromTwitchChat.State>, public badges: BadgesService) {
    this.store.dispatch(connect());
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

  onAddChannel(channels: string): void {
    const channelToAdd = channels.split(' ');
    this.store.dispatch(addChannels(channelToAdd));
  }

  onRemoveChannel(channel: string): void {
    this.store.dispatch(removeChannel(channel));
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
