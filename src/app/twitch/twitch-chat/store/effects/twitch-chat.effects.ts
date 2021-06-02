import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { TwitchAuthenticationService } from '../../../twitch-authentication/serivces/twitch-authentication.service';
import * as TwitchAuthActions from '../../../twitch-authentication/store/actions/twitch-authentication.actions';
import { TwitchChatService } from '../../services/twitch-chat.service';
import { BttvEmoteService } from '../../services/bttv-emote.service';
import * as TwitchChatActions from '../actions/twitch-chat.actions';
import { connectSuccess } from '../actions/twitch-chat.actions';
import { State } from '../reducers/twitch-chat.reducer';
import { selectChannels } from '../selectors/twitch-chat.selectors';

@Injectable()
export class TwitchChatEffects {
  loginSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(TwitchAuthActions.loginSuccess),
      withLatestFrom(this.store.pipe(select(selectChannels))),
      tap(([action, latest]) => this.twitchService.connect(latest, this.authService.getIdentity())),
    ), {dispatch: false},
  );

  connect$ = createEffect(() => this.actions$
    .pipe(
      ofType(TwitchChatActions.connect),
      mergeMap(({channel, identity}) => this.twitchService.connect(channel, identity)
        .pipe(
          map(() => connectSuccess()),
          catchError(() => EMPTY),
        )),
    ),
  );

  addChannel$ = createEffect(() => this.actions$.pipe(
    ofType(TwitchChatActions.addChannels),
    tap(({channels}) => {
      channels.forEach(channel => {
        this.twitchService.join(channel);
      });
    }),
  ), {dispatch: false});

  sendMessage$ = createEffect(() => this.actions$.pipe(
    ofType(TwitchChatActions.sendMessage),
    tap(({channel, message}) => {
      this.twitchService.sendMessage(channel, message);
    }),
  ), {dispatch: false});

  roomState$ = createEffect(() => this.actions$.pipe(
    ofType(TwitchChatActions.roomState),
    mergeMap(({roomState}) => this.bttvEmotes.updateChannelEmotes(roomState['room-id']).pipe(
      map(() => TwitchChatActions.roomStateSuccess()),
      catchError(() => EMPTY),
    )),
  ));

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private twitchService: TwitchChatService,
    private authService: TwitchAuthenticationService,
    private bttvEmotes: BttvEmoteService,
  ) {
  }
}
