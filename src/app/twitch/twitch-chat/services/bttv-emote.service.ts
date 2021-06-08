import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BttvEmote } from "app/twitch/twitch-chat/models/bttv-emote";
import { BttvUserResponse } from "app/twitch/twitch-chat/models/bttv-user-response";
import { ChannelEmotes } from "app/twitch/twitch-chat/models/channel-emotes";
import { AppConfig } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BttvEmoteService {
  private globalEmotes: BttvEmote[];
  private channelEmotes: ChannelEmotes = {};

  constructor(private http: HttpClient) {
    console.log('BttvEmoteService');
  }

  // @TODO: Export all the types
  getChannelEmotes(channelId: string): {
    channelEmotes: BttvEmote[],
    sharedEmotes: BttvEmote[]
  } {
    if (channelId in this.channelEmotes) {
      return this.channelEmotes[channelId];
    }

    return {channelEmotes: [], sharedEmotes: []};
  }

  getGlobalEmotes(): BttvEmote[] {
    return this.globalEmotes || [];
  }

  updateChannelEmotes(channelId: string): Observable<ChannelEmotes> {
    return this.http.get<BttvUserResponse>(AppConfig.bttv.endpoints.api + 'cached/users/twitch/' + channelId).pipe(
      map(emotes => {
        this.channelEmotes[channelId] = {
          ...this.channelEmotes[channelId],
          sharedEmotes: emotes.sharedEmotes,
          channelEmotes: emotes.channelEmotes,
        };

        return this.channelEmotes;
      }),
    );
  }

  updateGlobalEmotes(): Observable<BttvEmote[]> {
    return this.http.get<BttvEmote[]>(AppConfig.bttv.endpoints.api + 'cached/emotes/global').pipe(
      map(emotes => {
        return this.globalEmotes = emotes;
      }),
    );
  }
}
