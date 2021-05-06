import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TwitchComponent } from './twitch.component';
import { TwitchChatComponent } from './twitch-chat/twitch-chat.component';
import { TwitchChatMessageComponent } from './twitch-chat/twitch-chat-message/twitch-chat-message.component';
import { TwitchChatInputComponent } from './twitch-chat/twitch-chat-input/twitch-chat-input.component';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import * as fromTwitch from '../reducers';
import * as fromTwitchChat from './twitch-chat/store/reducers/twitch-chat.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TwitchChatEffects } from './twitch-chat/store/effects/twitch-chat.effects';
import { RouterModule } from '@angular/router';
import { TwitchChatSelectorComponent } from './twitch-chat/twitch-chat-selector/twitch-chat-selector.component';

@NgModule({
  declarations: [
    TwitchComponent,
    TwitchChatComponent,
    TwitchChatMessageComponent,
    TwitchChatInputComponent,
    TwitchChatSelectorComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    StoreModule.forFeature(fromTwitch.twitchFeatureKey, fromTwitch.reducers, {metaReducers: fromTwitch.metaReducers}),
    StoreModule.forFeature(fromTwitchChat.twitchChatFeatureKey, fromTwitchChat.reducer),
    EffectsModule.forFeature([TwitchChatEffects]),
    RouterModule,
  ],
  exports: [
    TwitchComponent,
  ],
})
export class TwitchModule {
}
