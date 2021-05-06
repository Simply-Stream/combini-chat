import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';
import { TwitchRoutingModule } from './twitch/twitch-routing.module';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'twitch',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'}),
    TwitchRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
