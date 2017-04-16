import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router }  from '@angular/router';
import { ChatService } from './../../services/chat.service';

@Component({
    selector: 'chat-page',
    templateUrl: './chat.html',
    styleUrls: ['./chat.scss']
})

export class ChatPage implements OnInit, OnDestroy {
  messages = [];
  connection;
  message;
  joined;
  left;
  typing;



  constructor( private chatSrvc: ChatService, private router: Router ) {
  }

  sendMessage(){
    this.chatSrvc.sendMessage(this.message);
    this.message = '';
  }

  ngOnInit() {
    // if( ! this.chatSrvc.connected ) this.router.navigate(['']);
    this.connection = this.chatSrvc.getMessages().subscribe(message => {
      console.log( message );
      this.messages.push(message);
    })

    this.joined = this.chatSrvc.getUserjoined().subscribe( join =>{
      console.log( `${join['username']} joined the room` );
    })

    this.left = this.chatSrvc.userLeft().subscribe( left =>{
      console.log( `${left['username']} left the room` );
    })

    this.typing = this.chatSrvc.getTyping().subscribe( ontyping =>{
      console.log('typing', ontyping );
    })
    
  }
  
  ngOnDestroy() {
    this.connection.unsubscribe();
  }

  onEnter( event ) {
    if( event.keyCode == 13 ){
       this.sendMessage();
    console.log( this.messages)
    }
    this.chatSrvc.setTyping();
  }

}