import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-twitch-chat-selector-remove',
  template: `
    <fa-icon (click)="removeChannel()" [icon]="faTimes"></fa-icon>
  `,
  styleUrls: ['./twitch-chat-selector-remove.component.scss']
})
export class TwitchChatSelectorRemoveComponent {
  faTimes = faTimes;

  @Input()
  channelName: string = '';

  @Output()
  removeChannelSuccess = new EventEmitter<string>();

  constructor() {
  }

  removeChannel(): void {
    this.removeChannelSuccess.emit(this.channelName);
  }
}
