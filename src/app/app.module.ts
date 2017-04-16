import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes }  from '@angular/router';

import { AppComponent } from './app.component';

//service
import { ChatService } from './../services/chat.service';
//page
import { ChatPage } from './../pages/chat/chat';
import { EntrancePage } from './../pages/entrance/entrance';
const route: Routes = [
  { path :'' , component : EntrancePage },
  { path: 'chatpage/:username', component: ChatPage }
];
@NgModule({
  declarations: [
    AppComponent,
    ChatPage,
    EntrancePage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot( route )
  ],
  providers: [ ChatService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
