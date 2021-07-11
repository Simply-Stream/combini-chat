import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { ElectronService } from "app/core/services/electron/electron.service";
import { TwitchAuthenticationService } from "app/twitch/twitch-authentication/serivces/twitch-authentication.service";
import { checkLogin } from "app/twitch/twitch-authentication/store/actions/twitch-authentication.actions";
import * as fromTwitchAuthentication
  from "app/twitch/twitch-authentication/store/reducers/twitch-authentication.reducer";
import { AppConfig } from "environments/environment";

@Injectable({
  providedIn: 'root',
})
export class DesktopEventsService {
  constructor(
    protected electronService: ElectronService,
    protected router: Router,
    protected auth: TwitchAuthenticationService,
    protected store: Store<fromTwitchAuthentication.State>,
  ) {
  }

  public registerIpcEvents(): void {
    this.electronService.ipcRenderer.on(
      'redirectEvent',
      (event: any, url: string) => {
        const uri = new URL(url);

        if (`${uri.origin}${uri.pathname}` === AppConfig.twitch.redirectUrl) {
          // @TODO:
          window.location.hash = uri.hash;
          this.store.dispatch(checkLogin());
        } else {
          this.router.navigate([uri.pathname.substr(1)]);
        }
      },
    );
  }
}
