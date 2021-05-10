import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TwitchChatService } from '../../services/twitch-chat.service';
import * as TwitchChatActions from '../actions/twitch-chat.actions';
import { connectSuccess } from '../actions/twitch-chat.actions';
import * as TwitchAuthActions from '../../../twitch-authentication/store/actions/twitch-authentication.actions';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { State } from '../reducers/twitch-chat.reducer';
import { selectChannels } from '../selectors/twitch-chat.selectors';
import { TwitchAuthenticationService } from '../../../serivces/twitch-authentication.service';

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
        ),
      ),
    ),
  );

  addChannel$ = createEffect(() => this.actions$.pipe(
    ofType(TwitchChatActions.addChannel),
    tap(({channel}) => {
      this.twitchService.join(channel);
    }),
  ), {dispatch: false});

  sendMessage$ = createEffect(() => this.actions$.pipe(
    ofType(TwitchChatActions.sendMessage),
    tap(({channel, message}) => {
      this.twitchService.sendMessage(channel, message);
    }),
  ), {dispatch: false});

  constructor(private actions$: Actions, private store: Store<State>, private twitchService: TwitchChatService, private authService: TwitchAuthenticationService) {
  }
}
