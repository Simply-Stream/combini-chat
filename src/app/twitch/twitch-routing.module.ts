import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TwitchChatComponent } from './twitch-chat/twitch-chat.component';
import { TwitchComponent } from './twitch.component';

const routes: Routes = [
  {
    path: 'twitch',
    component: TwitchComponent,
    children: [
      {path: '', redirectTo: 'chat', pathMatch: 'full'},
      {path: 'chat', component: TwitchChatComponent},
    ],
  },
  {
    path: 'callback',
    redirectTo: 'twitch',
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TwitchRoutingModule {
}
