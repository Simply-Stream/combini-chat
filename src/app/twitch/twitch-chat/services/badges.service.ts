import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { BadgeResponse } from "app/twitch/twitch-chat/models/badge-response";
import { AppConfig } from "environments/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class BadgesService {
  protected globalBadges: BadgeResponse['badge_sets'] = {};
  protected channelBadges: { [channelId: string]: BadgeResponse['badge_sets'] } = {};

  constructor(protected http: HttpClient) {
  }

  getBadges = (): { global: BadgeResponse['badge_sets'], channel: { [channelId: string]: BadgeResponse['badge_sets'] } } =>
    ({global: this.globalBadges, channel: this.channelBadges});


  /**
   * @returns {BadgeResponse["badge_sets"]}
   */
  getGlobalBadges = (): BadgeResponse['badge_sets'] => this.globalBadges;

  /**
   * @param {string} channelId
   * @returns {BadgeResponse["badge_sets"]}
   */
  getChannelBadges = (channelId: string): BadgeResponse['badge_sets'] => this.channelBadges[channelId] || {};

  /**
   * @returns {Observable<BadgeResponse["badge_sets"]>}
   */
  updateGlobalBadges(): Observable<BadgeResponse['badge_sets']> {
    return this.http.get<BadgeResponse>(AppConfig.twitch.endpoints.badges.global).pipe(
      map(response => this.globalBadges = response["badge_sets"]),
    );
  }

  /**
   * @param {string} channelId
   * @returns {Observable<BadgeResponse["badge_sets"]>}
   */
  updateChannelBadges(channelId: string): Observable<BadgeResponse['badge_sets']> {
    return this.http.get<BadgeResponse>(AppConfig.twitch.endpoints.badges.channel.replace('CHANNELID', channelId)).pipe(
      map(response => this.channelBadges[channelId] = response['badge_sets'] || {}),
    );
  }
}
