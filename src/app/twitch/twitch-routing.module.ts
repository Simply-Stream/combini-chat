import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TwitchChatComponent } from './twitch-chat/twitch-chat.component';

const routes: Routes = [
  {
    path: 'twitch',
    component: TwitchChatComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TwitchRoutingModule {
}
