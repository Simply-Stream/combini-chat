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
          <a (click)="onClick($event, channel)" class="nav-link" [class.active]="channel === (activeChannel$ |async)"
             href="#">{{ channel }}</a>
        </li>

        <li class="nav-item"><a class="nav-link" href="#">+</a></li>
      </ul>
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

  onClick($event: MouseEvent, channel: string): void {
    $event.preventDefault();
    this.changeChannel.emit(channel);
  }

  onAdd($event: MouseEvent): void {

  }
}
