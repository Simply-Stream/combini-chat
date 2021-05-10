import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromTwitchAuthentication from './store/reducers/twitch-authentication.reducer';
import { selectIsLoggedIn, selectUsername } from './store/selectors/twitch-authentication.selectors';
import { Observable } from 'rxjs';
import { checkLogin, login, logout } from './store/actions/twitch-authentication.actions';

@Component({
  selector: 'app-twitch-authentication',
  template: `
    <div *ngIf="isLoggedIn$ |async else loginButton">
      <a href="#" (click)="onLogout()">{{ username$ |async }}</a>
    </div>

    <ng-template #loginButton>
      <button class="btn btn-twitch-primary" (click)="onLogin()">{{ 'AUTH.LOGIN' |translate }}</button>
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
