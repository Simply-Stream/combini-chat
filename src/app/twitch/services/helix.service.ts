import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { ChannelEmote } from "app/twitch/models/channel-emote";
import { GlobalEmote } from "app/twitch/models/global-emote";
import { User } from "app/twitch/models/user";
import { AppConfig } from "environments/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class HelixService {
  protected readonly TWITCH_HELIX_ENDPOINT = 'https://api.twitch.tv/helix/';

  constructor(protected http: HttpClient) {
  }

  public getChannelEmotes(channelId: string, accessToken: string): Observable<ChannelEmote[]> {
    return this.http.get<ChannelEmote[]>(
      `${ this.TWITCH_HELIX_ENDPOINT }chat/emotes`,
      {
        params: {broadcaster_id: channelId},
        headers: {
          Authorization: `Bearer ${ accessToken }`,
          'Client-Id': AppConfig.twitch.clientId,
        },
      },
    );
  }

  public getGlobalEmotes(accessToken: string): Observable<GlobalEmote[]> {
    return this.http.get<GlobalEmote[]>(
      `${ this.TWITCH_HELIX_ENDPOINT }chat/emotes/global`,
      {
        headers: {
          Authorization: `Bearer ${ accessToken }`,
          'Client-Id': AppConfig.twitch.clientId,
        },
      },
    );
  }

  public getUsers(channels: string[], accessToken: string): Observable<User[]> {
    return this.http.get<{ data: User[] }>(
      `${ this.TWITCH_HELIX_ENDPOINT }users`,
      {
        params: {login: channels},
        headers: {Authorization: `Bearer ${ accessToken }`, 'Client-Id': AppConfig.twitch.clientId},
      },
    )
      .pipe(
        map(data => data.data),
      );
  }

  public getEmotesets(emotesets: string[], accessToken: string): Observable<ChannelEmote[]> {
    return this.http.get<{ data: ChannelEmote[] }>(
      `${ this.TWITCH_HELIX_ENDPOINT }chat/emotes/set`,
      {
        params: {emote_set_id: emotesets},
        headers: {Authorization: `Bearer ${ accessToken }`, 'Client-Id': AppConfig.twitch.clientId},
      })
      .pipe(
        map(data => data.data),
      );
  }
}
