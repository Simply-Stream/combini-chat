import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { updateCurrentUser, updateEmoteSets } from "app/twitch/store/actions/twitch-user.actions";
import { HtmlSanitizerService } from "app/twitch/twitch-chat/services/html-sanitizer.service";
import { AppConfig } from "environments/environment";
import { from, Observable } from 'rxjs';
import { ChatUserstate, Client, RoomState } from 'tmi.js';
import { Identity } from '../models/identity';
import { TwitchChatActions } from '../store/actions';
import { fromTwitchChat } from '../store/reducers';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  protected listeners = [];

  protected defaultOptions = {
    options: {debug: !AppConfig.production},
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

    // We need this event, but it's not been added to the events list, even though it's emitted by TMI.js
    // @ts-ignore
    this.twitch.on('globaluserstate', (tags) => {
      this.store.dispatch(updateCurrentUser(tags));
      this.store.dispatch(updateEmoteSets({emoteset: `${ tags['emote-sets'] }`}));
    });

    // @TODO: Throw this either into an EventEmitter or into the store directly
    return from(this.twitch.connect().then((value: [server: string, port: number]) => {
      if (!AppConfig.production) {
        // this.twitch.on('raw_message', rawMessage => console.log(rawMessage));
      }

      // this.twitch.on('disconnected', () => this.twitch.removeAllListeners());
      this.twitch.on('message', (channel: string, userstate: ChatUserstate, message: string, self: boolean) => {
        // console.log(message, userstate);
        // @TODO: Clean message string from HTML
        this.store.dispatch(TwitchChatActions.addMessage({
          channel,
          userstate,
          message: this.htmlSanitizer.sanitize(message),
          // @TODO: Remove the background-alternation from this property
          background: ((this.alternatingToggle = !this.alternatingToggle) ? 'alternate' : null),
          messageSent: new Date(parseInt(userstate['tmi-sent-ts']) ?? null)
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
