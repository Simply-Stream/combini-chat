import { Component, Input } from '@angular/core';
import { Message } from './message';

@Component({
  selector: 'app-twitch-chat-message',
  template: `
    <div class="chat-message-wrapper"
         [class.highlighted]="message.background === 'self'"
         [class.alternating]="message.background === 'alternate'">
      <div class="chat-message-channel small align-self-start">[{{ message.channel |slice:1 }}]</div>

      <div class="d-flex">
        <!--      <span class="chat-message-badges">{{ message.userstate.badges }} </span>-->
        <div class="align-self-stretch">
          <span class="chat-message-user fw-bold"
                [style]="{color: message.userstate?.color}">{{ message.userstate['display-name'] }}: </span>
          <span class="chat-message" [innerHTML]="message |emote"></span>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./twitch-chat-message.component.scss'],
})
export class TwitchChatMessageComponent {
  @Input()
  public message: Message;
}
