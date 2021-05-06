import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-twitch-chat-selector-add',
  template: `
    <div class="modal" [class.d-block]="visible">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ 'CHAT.CHANNEL.ADD.MODAL_TITLE' |translate }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="input-group mb-3">
              <input [value]="channelToAdd" (input)="channelToAdd = $event.target.value" type="text"
                     class="form-control channel-add-input" [placeholder]="'CHAT.CHANNEL.ADD.ENTER' |translate">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" (click)="onChannelAddFailure('canceled')"
                    data-bs-dismiss="modal">{{ 'CHAT.CHANNEL.ADD.CANCEL' |translate }}</button>
            <button type="button" class="btn btn-primary"
                    (click)="onChannelAddSuccess()">{{ 'CHAT.CHANNEL.ADD.SAVE' |translate }}</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./twitch-chat-selector-add.component.scss'],
})
// @TODO: This needs a major refactoring
export class TwitchChatSelectorAddComponent {
  @Input()
  visible = false;

  @Output()
  addChannelSuccess = new EventEmitter<string>();

  @Output()
  addChannelFailure = new EventEmitter<string>();

  channelToAdd = '';

  onChannelAddSuccess(): void {
    this.addChannelSuccess.emit(this.channelToAdd);
    this.channelToAdd = '';
  }

  onChannelAddFailure(reason: string): void {
    this.addChannelSuccess.emit(reason);
  }
}
