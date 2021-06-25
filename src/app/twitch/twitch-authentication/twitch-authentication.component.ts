import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { checkLogin, login, logout } from './store/actions/twitch-authentication.actions';
import * as fromTwitchAuthentication from './store/reducers/twitch-authentication.reducer';
import { selectIsLoggedIn, selectUsername } from './store/selectors/twitch-authentication.selectors';

@Component({
  selector: 'app-twitch-authentication',
  template: `
    <div *ngIf="isLoggedIn$ |async else loginButton">
      <a href="#" (click)="onLogout()">{{ username$ |async }}</a>
    </div>

    <ng-template #loginButton>
      <app-twitch-button (clickAction)="onLogin()" [label]="'AUTH.LOGIN' |translate"></app-twitch-button>
    </ng-template>
  `,
  styleUrls: ['./twitch-authentication.component.scss'],
})
export class TwitchAuthenticationComponent {
  isLoggedIn$: Observable<boolean> = this.store.pipe(select(selectIsLoggedIn));
  username$: Observable<string> = this.store.pipe(select(selectUsername));

  constructor(protected store: Store<fromTwitchAuthentication.State>) {
    this.store.dispatch(checkLogin());
  }

  public onLogin(): void {
    this.store.dispatch(login());
  }

  public onLogout(): void {
    this.store.dispatch(logout());
  }
}
