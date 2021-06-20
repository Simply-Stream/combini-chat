import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Badge } from "app/twitch/twitch-chat/models/badge";
import { Message } from 'app/twitch/twitch-chat/twitch-chat-message/models/message';

@Component({
  selector: 'app-twitch-chat-message',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="chat-message-wrapper"
         [class.highlighted]="message.background === 'self'"
         [class.alternating]="message.background === 'alternate'">
      <div class="chat-message-channel small align-self-start">
        [{{ message.channel |slice:1 }}]
        <span *ngIf="message.userstate['reply-parent-msg-id']">
          Reply to @{{ message.userstate["reply-parent-display-name"] }}:
          {{ message.userstate["reply-parent-msg-body"] |slice:0:50 }}
        </span>
      </div>

      <div class="d-flex">
        <div class="align-self-stretch">
        <span class="chat-message-badges" *ngFor="let badge of parsedBadges">
          <app-twitch-chat-badge [badge]="badge"></app-twitch-chat-badge>
        </span>
          <span class="chat-message-user fw-bold"
                [style]="{color: message.userstate?.color}">{{ message.userstate['display-name'] }}: </span>
          <span class="chat-message"
                [innerHTML]="message.message |linky:{stripPrefix: false, stripTrailingSlash: false, truncate: {length: 64}, className: 'chat-message-link'} |emote:message |safeHtml"></span>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./twitch-chat-message.component.scss'],
})
export class TwitchChatMessageComponent implements OnInit {
  @Input()
  public message: Message;

  @Input()
  public badges: any;

  // @TODO: Refactor with ngOnInit bullshittery
  public parsedBadges: Badge[] = [];

  public ngOnInit(): void {
    if (!this.message.userstate["badges-raw"]) {
      return;
    }

    const badges = this.message.userstate["badges-raw"].split(',');
    if (badges.length > 0) {
      for (const badge of badges) {
        const splittedBadge = badge.split('/');

        if (this.badges.channel &&
          this.badges.channel[this.message.userstate["room-id"]] &&
          this.badges.channel[this.message.userstate["room-id"]][splittedBadge[0].trim()]) {
          const badgeVersions = this.badges.channel[this.message.userstate["room-id"]][splittedBadge[0].trim()];

          if (badgeVersions.versions[splittedBadge[1]]) {
            this.parsedBadges.push(badgeVersions.versions[splittedBadge[1]]);
          }

          // Continue when badge has been found and ignore global fallback
          continue;
        }

        if (this.badges.global && this.badges.global[splittedBadge[0]]) {
          this.parsedBadges.push(this.badges.global[splittedBadge[0]].versions[splittedBadge[1]]);
        }
      }
    }
  }
}
