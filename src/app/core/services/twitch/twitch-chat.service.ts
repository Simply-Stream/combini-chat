import { Injectable } from '@angular/core';
import { ChatUserstate, Client } from 'tmi.js';

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

  constructor() {
  }

  /**
   * Connects to channels with given identity
   *
   * @param channels
   * @param callback
   * @param identity
   */
  public connect(channels: string[], callback?: ((channel: string, userstate: ChatUserstate, message: string, self: boolean) => void), identity?: Identity): void {
    if (this.twitch) {
      this.disconnect();
    }

    this.twitch = new Client({
      ...this.defaultOptions,
      channels,
      identity,
    });
    this.twitch.connect();

    if (callback) {
      this.twitch.on('message', callback);
    }
  }

  /**
   * Disconnect from twitch chats
   */
  public disconnect(): void {
    this.twitch.disconnect();
  }
}
