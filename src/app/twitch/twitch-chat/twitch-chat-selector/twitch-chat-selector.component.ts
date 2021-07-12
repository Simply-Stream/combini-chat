import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-twitch-chat-selector',
  template: `
    <div class="chat-selector-tabs">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <!-- @TODO: Replace 'isCombined' method by something that does not called that often -->
          <span class="channel-selector-link nav-link"
                (click)="onClick($event, channels)"
                [class.active]="isCombined(channels, activeChannels) && activeChannels.length">
            {{ 'CHAT.COMBINED' |translate }}
          </span>
        </li>

        <li *ngFor="let channel of channels" class="nav-item">
          <!-- @TODO: Replace 'isCombined' method by something that does not called that often -->
          <span (click)="onClick($event, [channel])" class="channel-selector-link nav-link"
                [class.active]="!isCombined(channels, activeChannels) && activeChannels.indexOf(channel) >= 0">
            {{ channel }}
            <app-twitch-chat-selector-remove
              [channelName]="channel"
              (removeChannelSuccess)="onRemoveSuccess($event)"></app-twitch-chat-selector-remove>
          </span>
        </li>

        <li class="nav-item"><a class="channel-selector-link nav-link" href="#" (click)="onAdd($event)">+</a></li>
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
  public activeChannels: string[] | null;

  @Input()
  public channels: string[];

  @Output()
  protected changeChannel: EventEmitter<string[]> = new EventEmitter<string[]>();

  @Output()
  protected addChannel: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  protected removeChannel: EventEmitter<string> = new EventEmitter<string>();

  modalVisible = false;

  onClick($event: MouseEvent, channels: string[]): void {
    $event.preventDefault();
    this.changeChannel.emit(channels);
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
  }

  onRemoveSuccess(channel: string): void {
    this.removeChannel.emit(channel);
  }

  isCombined(channels: string[], activeChannels: string[]): boolean {
    for (const channel of channels) {
      if (activeChannels.indexOf(channel) < 0) {
        return false;
      }
    }

    return true;
  }
}
