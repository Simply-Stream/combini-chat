import { Injectable } from '@angular/core';
import { ChatUserstate, Client } from 'tmi.js';
import { Store } from '@ngrx/store';

import * as fromTwitchChat from '../store/reducers/twitch-chat.reducer';
import * as TwitchChatActions from '../store/actions/twitch-chat.actions';
import { from, Observable } from 'rxjs';

interface Identity {
  username: string;
  password: string | (() => (string | Promise<string>));
}

@Injectable({
  providedIn: 'root',
})
export class TwitchChatService {
  protected defaultOptions = {
    options: {debug: false},
  };

  protected twitch?: Client;
  protected alternatingToggle = true;

  constructor(private store: Store<fromTwitchChat.State>) {
  }

  /**
   * Connects to channels with given identity
   *
   * @param channels
   * @param callback
   * @param identity
   */
  public connect(channels: string[], callback?: ((channel: string, userstate: ChatUserstate, message: string, self: boolean) => void), identity?: Identity): Observable<[string, number]> {
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

      return value;
    }));
  }

  /**
   * @param channel
   */
  public join(channel: string): Promise<[string]> {
    return this.twitch.join(channel);
  }

  /**
   * Disconnect from twitch chats
   */
  public disconnect(): void {
    this.twitch.disconnect();
  }
}
