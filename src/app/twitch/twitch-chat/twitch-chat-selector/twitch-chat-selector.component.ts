import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-twitch-chat-selector',
  template: `
    <div class="chat-selector-tabs">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link"
             (click)="onClick($event, 'combined')"
             [class.active]="(activeChannel$|async) === 'combined'"
             href="#">{{ 'CHAT.COMBINED' |translate }}</a>
        </li>

        <li *ngFor="let channel of channels$ |async" class="nav-item">
          <span (click)="onClick($event, channel)" class="nav-link"
                [class.active]="channel === (activeChannel$ |async)">
            {{ channel }}
            <app-twitch-chat-selector-remove
              [channelName]="channel"
              (removeChannelSuccess)="onRemoveSuccess($event)"></app-twitch-chat-selector-remove>
          </span>
        </li>

        <li class="nav-item"><a class="nav-link" href="#" (click)="onAdd($event)">+</a></li>
      </ul>

      <app-twitch-chat-selector-add [visible]="modalVisible"
                                    (addChannelSuccess)="onAddSuccess($event)"
                                    (addChannelFailure)="onAddFailure($event)">
      </app-twitch-chat-selector-add>
    </div>
  `,
  styleUrls: ['./twitch-chat-selector.component.scss'],
})
export class TwitchChatSelectorComponent {
  @Input()
  public activeChannel$: Observable<string>;

  @Input()
  public channels$: Observable<string[]>;

  @Output()
  protected changeChannel: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  protected addChannel: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  protected removeChannel: EventEmitter<string> = new EventEmitter<string>();

  modalVisible = false;

  onClick($event: MouseEvent, channel: string): void {
    $event.preventDefault();
    this.changeChannel.emit(channel);
  }

  onAdd($event: MouseEvent): void {
    $event.preventDefault();
    this.modalVisible = true;
  }

  onAddSuccess(channel: string): void {
    this.addChannel.emit(channel);
    this.modalVisible = false;
  }

  onAddFailure(reason: string): void {
    this.modalVisible = false;
    console.log(reason);
  }

  onRemoveSuccess(channel: string): void {
    this.removeChannel.emit(channel);
  }
}
