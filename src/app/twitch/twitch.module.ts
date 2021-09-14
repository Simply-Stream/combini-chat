import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import * as faSolidIcons from "@fortawesome/free-solid-svg-icons";
import * as faRegularIcons from "@fortawesome/free-regular-svg-icons";
import * as faBrandsIcons from "@fortawesome/free-brands-svg-icons";
import { EffectsModule } from '@ngrx/effects';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { OAuthModule } from 'angular-oauth2-oidc';
import { TwitchUserEffects } from "app/twitch/store/effects/twitch-user.effects";
import { localStorageSync } from "ngrx-store-localstorage";
import { LinkyModule } from "ngx-linky";

import * as fromTwitch from './store/reducers';
import * as fromTwitchUser from './store/reducers/twitch-user.reducer';
import { TwitchAuthenticationEffects } from './twitch-authentication/store/effects/twitch-authentication.effects';
import * as fromTwitchAuth from './twitch-authentication/store/reducers/twitch-authentication.reducer';
import { TwitchAuthenticationComponent } from './twitch-authentication/twitch-authentication.component';
import { TwitchButtonComponent } from './twitch-button/twitch-button.component';
import { EmotePipe } from './twitch-chat/pipes/emote.pipe';
import { SafeHtmlPipe } from './twitch-chat/pipes/safe-html.pipe';

import { TwitchChatEffects } from './twitch-chat/store/effects/twitch-chat.effects';
import * as fromTwitchChatEmotes from './twitch-chat/store/reducers/twitch-chat-emotes.reducer';
import * as fromTwitchChat from './twitch-chat/store/reducers/twitch-chat.reducer';
import { TwitchChatBadgeComponent } from './twitch-chat/twitch-chat-badge/twitch-chat-badge.component';
import { TwitchChatEmoteMenuListComponent } from './twitch-chat/twitch-chat-emote-menu/twitch-chat-emote-menu-list/twitch-chat-emote-menu-list.component';
import { TwitchChatEmoteMenuComponent } from './twitch-chat/twitch-chat-emote-menu/twitch-chat-emote-menu.component';
import { TwitchChatInputComponent } from './twitch-chat/twitch-chat-input/twitch-chat-input.component';
import { TwitchChatMessageComponent } from './twitch-chat/twitch-chat-message/twitch-chat-message.component';

import { ChannelSelectPipe } from './twitch-chat/twitch-chat-selector/pipes/channel-select.pipe';
import { EmoteTemplatePipe } from './twitch-chat/twitch-chat-emote-menu/pipes/emote-template.pipe';
import { TwitchChatSelectorAddComponent } from './twitch-chat/twitch-chat-selector/twitch-chat-selector-add/twitch-chat-selector-add.component';
import { TwitchChatSelectorRemoveComponent } from './twitch-chat/twitch-chat-selector/twitch-chat-selector-remove/twitch-chat-selector-remove.component';
import { TwitchChatSelectorComponent } from './twitch-chat/twitch-chat-selector/twitch-chat-selector.component';
import { TwitchChatComponent } from './twitch-chat/twitch-chat.component';
import { TwitchInputComponent } from './twitch-input/twitch-input.component';

import { TwitchComponent } from './twitch.component';

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
  TwitchChatEmoteMenuComponent,
  TwitchChatEmoteMenuListComponent,
  TwitchInputComponent,
];

const pipes = [
  ChannelSelectPipe,
  EmotePipe,
  SafeHtmlPipe,
  EmoteTemplatePipe,
];

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: [
      {
        [fromTwitchChat.twitchChatFeatureKey]: {
          serialize: state => ({
            'activeChannels': state.activeChannels,
            'combinedChatChannels': state.combinedChatChannels,
            'channels': state.channels,
            'messages': [],
          }),
        },
      },
    ],
    rehydrate: true,
    checkStorageAvailability: true,
  })(reducer);
}

const metaReducers: Array<MetaReducer<any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [
    ...components,
    ...pipes,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    StoreModule.forRoot(fromTwitch.reducers, {metaReducers}),
    StoreModule.forFeature(fromTwitchChat.twitchChatFeatureKey, fromTwitchChat.reducer),
    StoreModule.forFeature(fromTwitchUser.twitchUserFeatureKey, fromTwitchUser.reducer),
    StoreModule.forFeature(fromTwitchChatEmotes.twitchChatEmotesFeatureKey, fromTwitchChatEmotes.reducer),
    StoreModule.forFeature(fromTwitchAuth.twitchAuthenticationFeatureKey, fromTwitchAuth.reducer),
    EffectsModule.forFeature([TwitchChatEffects, TwitchAuthenticationEffects]),
    RouterModule,
    OAuthModule.forRoot(),
    LinkyModule,
    FontAwesomeModule,
    FormsModule,
    EffectsModule.forFeature([TwitchUserEffects]),
  ],
  exports: [
    TwitchComponent,
  ],
})
export class TwitchModule {
  constructor(private faLibrary: FaIconLibrary) {
    this.faLibrary.addIcons(faSolidIcons.faSmile, faSolidIcons.faTimes, faSolidIcons.faPlus);
    this.faLibrary.addIconPacks(faRegularIcons.far, faSolidIcons.fas, faBrandsIcons.fab);
  }
}
