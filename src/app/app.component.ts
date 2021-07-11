import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DesktopEventsService } from "app/core/services/desktop-events.service";
import { AppConfig } from 'environments/environment';
import { ElectronService } from './core/services';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private electronService: ElectronService,
    private translate: TranslateService,
    private desktopEvents: DesktopEventsService,
  ) {
    this.translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);
      desktopEvents.registerIpcEvents();
    } else {
      console.log('Run in browser');
    }
  }
}
