import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ChannelEmote } from "app/twitch/models/channel-emote";
import { HelixService } from "app/twitch/services/helix.service";
import * as TwitchUserActions from "app/twitch/store/actions/twitch-user.actions";
import { updateEmoteSetsSuccess } from "app/twitch/store/actions/twitch-user.actions";
import { TwitchAuthenticationService } from "app/twitch/twitch-authentication/serivces/twitch-authentication.service";
import { EMPTY, forkJoin, Observable } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";


@Injectable()
export class TwitchUserEffects {
  updateEmoteSets$ = createEffect(() => this.actions$
    .pipe(
      ofType(TwitchUserActions.updateEmoteSets),
      // Parse emotes to make them usable for this application
      mergeMap(({emoteset}) => {
        const emotesets: string[] = emoteset.split(',');
        const forkedObservables: Observable<{ data: ChannelEmote[], template: string }>[] = [];

        for (let i = 0; i < Math.floor(emotesets.length / 25); i++) {
          forkedObservables.push(this.helix.getEmotesets(emotesets.slice(i * 25, i * 25 + 25), this.auth.getAccessToken()));
        }

        return forkJoin(forkedObservables).pipe(
          map(forkedEmotesets => {
            const sortedEmotesets: {
              template: string,
              types: {
                [emoteType: string]: {
                  [userId: string]: ChannelEmote[]
                },
              }
            } = {template: '', types: {}};

            forkedEmotesets.forEach(emotesets => {
              emotesets.data.forEach(((emote: ChannelEmote) => {
                if (!sortedEmotesets.types[emote.emote_type]) {
                  sortedEmotesets.types[emote.emote_type] = {
                    [emote.owner_id]: [],
                  };
                } else if (!sortedEmotesets.types[emote.emote_type][emote.owner_id]) {
                  sortedEmotesets.types[emote.emote_type][emote.owner_id] = [];
                }

                sortedEmotesets.types[emote.emote_type][emote.owner_id].push(emote);
              }));
            });

            sortedEmotesets.template = forkedEmotesets.pop().template;

            return sortedEmotesets;
          }),
          map((emotesets) => updateEmoteSetsSuccess({emotesets})),
          catchError(() => EMPTY),
        );
      })),
  );

  getSubscribedUserData$ = createEffect(() => this.actions$
    .pipe(
      ofType(TwitchUserActions.updateEmoteSetsSuccess),
      mergeMap(({emotesets}) => this.helix.getUsersById(Object.keys(emotesets.types.subscriptions), this.auth.getAccessToken())
        .pipe(
          map(users => TwitchUserActions.getUsersSuccess({users})),
          catchError(() => EMPTY),
        )),
    ));

  constructor(private actions$: Actions, private helix: HelixService, private auth: TwitchAuthenticationService) {
  }
}
