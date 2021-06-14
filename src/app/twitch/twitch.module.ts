import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { OAuthModule } from 'angular-oauth2-oidc';
import { LinkyModule } from "ngx-linky";

import * as fromTwitch from '../reducers';
import { TwitchAuthenticationEffects } from './twitch-authentication/store/effects/twitch-authentication.effects';
import * as fromTwitchAuth from './twitch-authentication/store/reducers/twitch-authentication.reducer';
import { TwitchAuthenticationComponent } from './twitch-authentication/twitch-authentication.component';
import { EmotePipe } from './twitch-chat/pipes/emote.pipe';

import { TwitchChatEffects } from './twitch-chat/store/effects/twitch-chat.effects';
import * as fromTwitchChat from './twitch-chat/store/reducers/twitch-chat.reducer';
import { TwitchChatBadgeComponent } from './twitch-chat/twitch-chat-badge/twitch-chat-badge.component';
import { TwitchChatInputComponent } from './twitch-chat/twitch-chat-input/twitch-chat-input.component';
import { TwitchChatMessageComponent } from './twitch-chat/twitch-chat-message/twitch-chat-message.component';

import { ChannelSelectPipe } from './twitch-chat/twitch-chat-selector/pipes/channel-select.pipe';
import { TwitchChatSelectorAddComponent } from './twitch-chat/twitch-chat-selector/twitch-chat-selector-add/twitch-chat-selector-add.component';
import { TwitchChatSelectorComponent } from './twitch-chat/twitch-chat-selector/twitch-chat-selector.component';
import { TwitchChatComponent } from './twitch-chat/twitch-chat.component';

import { TwitchComponent } from './twitch.component';

const components = [
  TwitchComponent,
  TwitchChatComponent,
  TwitchChatMessageComponent,
  TwitchChatInputComponent,
  TwitchChatSelectorComponent,
  TwitchChatSelectorAddComponent,
  TwitchAuthenticationComponent,
  TwitchChatBadgeComponent,
];

const pipes = [
  ChannelSelectPipe,
  EmotePipe,
];

@NgModule({
  declarations: [
    ...components,
    ...pipes,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    StoreModule.forFeature(fromTwitch.twitchFeatureKey, fromTwitch.reducers, {metaReducers: fromTwitch.metaReducers}),
    StoreModule.forFeature(fromTwitchChat.twitchChatFeatureKey, fromTwitchChat.reducer),
    StoreModule.forFeature(fromTwitchAuth.twitchAuthenticationFeatureKey, fromTwitchAuth.reducer),
    EffectsModule.forFeature([TwitchChatEffects, TwitchAuthenticationEffects]),
    RouterModule,
    OAuthModule.forRoot(),
    LinkyModule,
  ],
  exports: [
    TwitchComponent,
  ],
})
export class TwitchModule {
}
