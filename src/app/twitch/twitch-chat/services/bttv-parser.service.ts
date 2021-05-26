import { Injectable } from '@angular/core';
import { EmoteParserInterface } from './emote-parser-interface';
import { Message } from '../twitch-chat-message/message';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface BttvEmote {
  id: string;
  code: string;
  imageType: string;
  userId: string;
}

interface BttvChannelEmoteResponse {
  id: string;
  bots: string[];
  channelEmotes: BttvEmote[];
  sharedEmotes: BttvEmote[];
}

interface ChannelEmotes {
  [channelId: string]: {
    channelEmotes: BttvEmote[],
    sharedEmotes: BttvEmote[]
  };
}

@Injectable({
  providedIn: 'root',
})
export class BttvParserService implements EmoteParserInterface {
  private globalEmotes: BttvEmote[];
  private channelEmotes: ChannelEmotes = {};

  constructor(private http: HttpClient) {
  }

  parse(message: Message): Observable<string> {
    return new Observable<string>(observer => {
      if (this.globalEmotes) {
        observer.next(this.parseEmotes(message));
        return observer.complete();
      }

      this.http.get<BttvEmote[]>(AppConfig.bttv.endpoints.api + 'cached/emotes/global').subscribe(emotes => {
        this.globalEmotes = emotes;
        observer.next(this.parseEmotes(message));
        observer.complete();
      });
    });
  }

  updateChannelEmotes(channelId: string): Observable<ChannelEmotes> {
    return this.http.get<BttvChannelEmoteResponse>(AppConfig.bttv.endpoints.api + 'cached/users/twitch/' + channelId).pipe(
      map((emotes) => {
        this.channelEmotes[channelId] = {
          ...this.channelEmotes[channelId],
          sharedEmotes: emotes.sharedEmotes,
          channelEmotes: emotes.channelEmotes,
        };

        return this.channelEmotes;
      }),
    );
  }

  protected parseEmotes(message: Message): string {
    for (const emote of this.globalEmotes) {
      if (message.message.indexOf(emote.code) >= 0) {
        message.message = message.message.replace(emote.code, '<img title="' + emote.code + '" alt="' + emote.code + '" src="' + AppConfig.bttv.endpoints.cdn + 'emote/' + emote.id + '/1x">');
      }
    }

    const roomId = message.userstate['room-id'];
    if (roomId in this.channelEmotes) {
      for (const emote of this.channelEmotes[roomId].sharedEmotes) {
        message.message = message.message.replace(emote.code, '<img title="' + emote.code + '" alt="' + emote.code + '" src="' + AppConfig.bttv.endpoints.cdn + 'emote/' + emote.id + '/1x">');
      }
    }

    return message.message;
  }
}
