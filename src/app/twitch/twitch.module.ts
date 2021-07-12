import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas, faSmile, faTimes } from "@fortawesome/free-solid-svg-icons";
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { OAuthModule } from 'angular-oauth2-oidc';
import { LinkyModule } from "ngx-linky";

import * as fromTwitch from '../reducers';
import { TwitchAuthenticationEffects } from './twitch-authentication/store/effects/twitch-authentication.effects';
import * as fromTwitchAuth from './twitch-authentication/store/reducers/twitch-authentication.reducer';
import { TwitchAuthenticationComponent } from './twitch-authentication/twitch-authentication.component';
import { TwitchButtonComponent } from './twitch-button/twitch-button.component';
import { EmotePipe } from './twitch-chat/pipes/emote.pipe';
import { SafeHtmlPipe } from './twitch-chat/pipes/safe-html.pipe';

import { TwitchChatEffects } from './twitch-chat/store/effects/twitch-chat.effects';
import * as fromTwitchChat from './twitch-chat/store/reducers/twitch-chat.reducer';
import { TwitchChatBadgeComponent } from './twitch-chat/twitch-chat-badge/twitch-chat-badge.component';
import { TwitchChatInputComponent } from './twitch-chat/twitch-chat-input/twitch-chat-input.component';
import { TwitchChatMessageComponent } from './twitch-chat/twitch-chat-message/twitch-chat-message.component';

import { ChannelSelectPipe } from './twitch-chat/twitch-chat-selector/pipes/channel-select.pipe';
import { TwitchChatSelectorAddComponent } from './twitch-chat/twitch-chat-selector/twitch-chat-selector-add/twitch-chat-selector-add.component';
import { TwitchChatSelectorRemoveComponent } from './twitch-chat/twitch-chat-selector/twitch-chat-selector-remove/twitch-chat-selector-remove.component';
import { TwitchChatSelectorComponent } from './twitch-chat/twitch-chat-selector/twitch-chat-selector.component';
import { TwitchChatComponent } from './twitch-chat/twitch-chat.component';

import { TwitchComponent } from './twitch.component';
import { TwitchChatEmoteMenuComponent } from './twitch-chat/twitch-chat-emote-menu/twitch-chat-emote-menu.component';

const components = [
  TwitchComponent,
  TwitchChatComponent,
  TwitchChatMessageComponent,
  TwitchChatInputComponent,
  TwitchChatSelectorComponent,
  TwitchChatSelectorAddComponent,
  TwitchChatSelectorRemoveComponent,
  TwitchAuthenticationComponent,
  TwitchChatBadgeComponent,
  TwitchButtonComponent,
];

const pipes = [
  ChannelSelectPipe,
  EmotePipe,
  SafeHtmlPipe,
];

@NgModule({
  declarations: [
    ...components,
    ...pipes,
    TwitchChatEmoteMenuComponent,
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
    FontAwesomeModule,
    FormsModule,
  ],
  exports: [
    TwitchComponent,
  ],
})
export class TwitchModule {
  constructor(private faLibrary: FaIconLibrary) {
    this.faLibrary.addIcons(faSmile, faTimes);
    this.faLibrary.addIconPacks(far, fas, fab);
  }
}
