import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from './../../services/chat.service';

@Component({
    selector:'entrance-page',
    templateUrl: './entrance.html',
    styleUrls: ['./entrance.scss']
})

export class EntrancePage {
    username: string;

    constructor( 
        private router: Router,
        private chatSrvc: ChatService
         ) {}


    onEnter( event ) {
        if( event.keyCode ==13 ){
            this.chatSrvc.setUsername( this.username );
            this.router.navigate( [ '/chatpage', this.username ] );
        }
    }
}