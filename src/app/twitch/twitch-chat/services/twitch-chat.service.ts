import { Injectable } from '@angular/core';
import { ChatUserstate, Client, RoomState } from 'tmi.js';
import { Store } from '@ngrx/store';

import * as fromTwitchChat from '../store/reducers/twitch-chat.reducer';
import * as TwitchChatActions from '../store/actions/twitch-chat.actions';
import { from, Observable } from 'rxjs';
import { Identity } from '../models/identity';
import { EmoteParserService } from './emote-parser.service';

@Injectable({
  providedIn: 'root',
})
export class TwitchChatService {
  protected listeners = [];

  protected defaultOptions = {
    options: {debug: false},
  };

  protected twitch?: Client;
  protected alternatingToggle = true;

  constructor(private store: Store<fromTwitchChat.State>, private emoteParser: EmoteParserService) {
  }

  /**
   * Connects to channels with given identity
   *
   * @param channels
   * @param callback
   * @param identity
   */
  public connect(channels: string[], identity?: Identity, callback?: ((channel: string, userstate: ChatUserstate, message: string, self: boolean) => void)): Observable<[string, number]> {
    if (this.twitch) {
      this.disconnect();
    }

    this.twitch = new Client({
      ...this.defaultOptions,
      channels,
      identity,
    });

    return from(this.twitch.connect().then((value: [server: string, port: number]) => {
      this.twitch.on('message', (channel: string, userstate: ChatUserstate, message: string, self: boolean) => {
        this.store.dispatch(TwitchChatActions.addMessage({
          channel,
          userstate,
          message,
          background: (self ? 'self' : ((this.alternatingToggle = !this.alternatingToggle) ? 'alternate' : null)),
        }));

        if (callback) {
          return callback(channel, userstate, message, self);
        }
      });

      this.twitch.on('roomstate', (channel: string, roomState: RoomState) =>
        this.store.dispatch(TwitchChatActions.roomState(roomState)),
      );

      return value;
    }));
  }

  /**
   * @param channel
   */
  public join(channel: string): Promise<[string]> {
    return this.twitch.join(channel);
  }

  public sendMessage(channel: string, message: string): Promise<[string]> {
    return this.twitch.say(channel, message);
  }

  /**
   * Disconnect from twitch chats
   */
  public disconnect(): void {
    this.twitch.disconnect();
  }

  public getChannels(): string[] {
    return this.twitch.getChannels();
  }
}
