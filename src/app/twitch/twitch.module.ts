import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { OAuthModule } from 'angular-oauth2-oidc';

import { TwitchComponent } from './twitch.component';
import { TwitchChatComponent } from './twitch-chat/twitch-chat.component';
import { TwitchChatMessageComponent } from './twitch-chat/twitch-chat-message/twitch-chat-message.component';
import { TwitchChatInputComponent } from './twitch-chat/twitch-chat-input/twitch-chat-input.component';
import { TwitchChatSelectorComponent } from './twitch-chat/twitch-chat-selector/twitch-chat-selector.component';
import { TwitchChatSelectorAddComponent } from './twitch-chat/twitch-chat-selector/twitch-chat-selector-add/twitch-chat-selector-add.component';
import { TwitchAuthenticationComponent } from './twitch-authentication/twitch-authentication.component';

import * as fromTwitch from '../reducers';
import * as fromTwitchChat from './twitch-chat/store/reducers/twitch-chat.reducer';
import * as fromTwitchAuth from './twitch-authentication/store/reducers/twitch-authentication.reducer';

import { TwitchChatEffects } from './twitch-chat/store/effects/twitch-chat.effects';
import { TwitchAuthenticationEffects } from './twitch-authentication/store/effects/twitch-authentication.effects';

import { ChannelSelectPipe } from './twitch-chat/twitch-chat-selector/pipes/channel-select.pipe';
import { EmotePipe } from './twitch-chat/pipes/emote.pipe';

const components = [
  TwitchComponent,
  TwitchChatComponent,
  TwitchChatMessageComponent,
  TwitchChatInputComponent,
  TwitchChatSelectorComponent,
  TwitchChatSelectorAddComponent,
  TwitchAuthenticationComponent,
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
  ],
  exports: [
    TwitchComponent,
  ],
})
export class TwitchModule {
}
