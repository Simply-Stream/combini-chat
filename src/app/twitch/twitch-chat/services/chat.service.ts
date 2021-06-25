import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HtmlSanitizerService } from "app/twitch/twitch-chat/services/html-sanitizer.service";
import { from, Observable } from 'rxjs';
import { ChatUserstate, Client, RoomState } from 'tmi.js';
import { Identity } from '../models/identity';
import * as TwitchChatActions from '../store/actions/twitch-chat.actions';
import * as fromTwitchChat from '../store/reducers/twitch-chat.reducer';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  protected listeners = [];

  protected defaultOptions = {
    options: {debug: false},
  };

  protected twitch?: Client;
  protected alternatingToggle = true;

  constructor(private store: Store<fromTwitchChat.State>, private htmlSanitizer: HtmlSanitizerService) {
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

    // @TODO: Throw this either into an EventEmitter or into the store directly
    return from(this.twitch.connect().then((value: [server: string, port: number]) => {
      this.twitch.on('message', (channel: string, userstate: ChatUserstate, message: string, self: boolean) => {
        // @TODO: Clean message string from HTML
        this.store.dispatch(TwitchChatActions.addMessage({
          channel,
          userstate,
          message: this.htmlSanitizer.sanitize(message),
          // @TODO: Remove the background-alternation from this property
          background: ((this.alternatingToggle = !this.alternatingToggle) ? 'alternate' : null),
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

  /**
   * @param channel
   */
  public part(channel: string): Promise<[string]> {
    return this.twitch.part(channel);
  }

  /**
   * @param {string} channel
   * @param {string} message
   * @returns {Promise<[string]>}
   */
  public sendMessage(channel: string, message: string): Promise<[string]> {
    return this.twitch.say(channel, message);
  }

  /**
   * Disconnect from twitch chats
   */
  public disconnect(): void {
    this.twitch.disconnect();
  }

  /**
   * @returns {string[]}
   */
  public getChannels(): string[] {
    return this.twitch.getChannels();
  }
}
