import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { from, Observable } from 'rxjs';
import { Identity } from '../../twitch-chat/models/identity';
import { authConfig } from './auth-config';

@Injectable({
  providedIn: 'root',
})
export class TwitchAuthenticationService {
  constructor(protected oauth: OAuthService) {
    this.oauth.configure(authConfig);
  }

  get isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  public checkLogin(): Observable<boolean> {
    return from(this.oauth.tryLogin().then((success) => {
      if (!success) {
        return this.oauth.hasValidAccessToken();
      }

      return success;
    }));
  }

  public login(): TwitchAuthenticationService {
    this.oauth.initLoginFlow();

    return this;
  }

  public logout(): TwitchAuthenticationService {
    this.oauth.logOut();

    return this;
  }

  public getIdentity(): Identity | never {
    if (this.isLoggedIn) {
      return {
        username: this.getUsername(),
        password: 'oauth:' + this.getAccessToken(),
      };
    }
  }

  public getAccessToken(): string {
    if (this.oauth.hasValidAccessToken()) {
      return this.oauth.getAccessToken();
    }

    return '';
  }

  public getUsername(): string {
    if (this.isLoggedIn) {
      const identityClaims = this.oauth.getIdentityClaims();

      return identityClaims ? identityClaims['preferred_username'] : '';
    }

    return '';
  }
}
