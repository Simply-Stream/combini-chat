import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfig } from '../../../../environments/environment';

export interface BttvChannelEmoteResponse {
  id: string;
  bots: string[];
  channelEmotes: BttvEmote[];
  sharedEmotes: BttvEmote[];
}

export interface BttvEmote {
  id: string;
  code: string;
  imageType: string;
  userId: string;
}

export interface ChannelEmotes {
  [channelId: string]: {
    channelEmotes: BttvEmote[],
    sharedEmotes: BttvEmote[]
  };
}

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
    return this.http.get<BttvChannelEmoteResponse>(AppConfig.bttv.endpoints.api + 'cached/users/twitch/' + channelId).pipe(
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
