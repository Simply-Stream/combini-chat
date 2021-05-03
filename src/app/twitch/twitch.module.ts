import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TwitchComponent } from './twitch.component';
import { TwitchChatComponent } from './twitch-chat/twitch-chat.component';
import { TwitchChatMessageComponent } from './twitch-chat/twitch-chat-message/twitch-chat-message.component';
import { TwitchChatInputComponent } from './twitch-chat/twitch-chat-input/twitch-chat-input.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [TwitchComponent, TwitchChatComponent, TwitchChatMessageComponent, TwitchChatInputComponent],
  imports: [
    CommonModule,
    TranslateModule,
  ],
  exports: [
    TwitchComponent,
  ],
})
export class TwitchModule {
}
