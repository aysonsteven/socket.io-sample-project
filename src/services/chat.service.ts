import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

export class ChatService {
  private url = 'http://172.20.10.5:5000';  
  private socket = io(this.url);
  FADE_TIME = 150; // ms
  TYPING_TIMER_LENGTH = 400; // ms
  COLORS = [
    '#e21400', '#91580f', '#f8a700', '#f78b00',
    '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
    '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
  ];

  window = (window);
  usernameInput = ('.usernameInput'); // Input for username
  messages = ('.messages'); // Messages area
  inputMessage = ('.inputMessage'); // Input message input box

  loginPage = ('.login.page'); // The login page
  chatPage = ('.chat.page'); // The chatroom page

  // Prompt for setting a username
  username;
  connected = false;
  typing = false;
  lastTypingTime;
  currentInput: any;

  addParticipantsMessage (data) {
    let message: string = '';
    if ( data.numUsers === 1) message += "There's 1 participant";
    else message += `There are ${data.numUsers} participants`;

    if( message) console.log( message );
     
  }

  getUsername( ) {
    this.socket.on('login' , data =>{
      console.log( data )
    })
  }


  setUsername( val , callback? ) {
    this.socket = io( this.url );
    this.username = val.trim();
    if( this.username ) this.socket.emit('add user', val);
    this.socket.on('login', data =>{
      this.connected = true;
      let message = "welcome to my first socketio project";
    });
    this.addParticipantsMessage( val );

    this.socket.on('add-message', data =>{
      this.addChatMessage( data );
      
    })
    this.getUsername();
    if( this.username && this.connected ) callback();
    
  }


  addChatMessage( data, options? ) {
    console.log( data );
    // let typingMessages = this.getTypingMessages( data );
    options = options || {};
    // if( typingMessages.length != 0 ){
    //   options.fade = false;
    //   typingMessages.remove();
    // }    
  }


  // getTypingMessages( data ) {
  //   return ('.typing.message').filter(  (i) =>{
  //     return data['username'] === data.username;
  //   });

  // }


  getTyping() {
    let observable = new Observable( observer =>{
      this.socket = io( this.url );
      this.socket.on('typing', (x) =>{
        observer.next(x);
      });
      return () => this.socket.disconnect();
    });
    return observable;
  }

  setTyping() {
    if( this.connected && !this.typing  ){
      this.typing = true;
      this.socket.emit('typing');
      this.lastTypingTime = (new Date()).getTime();

      setTimeout( () => {
        let typingTimer = (new Date()).getTime();
        let timeDiff = typingTimer - this.lastTypingTime;
        if( timeDiff >= this.TYPING_TIMER_LENGTH && this.typing ){
          this.socket.emit('stop typing');
          this.typing = false;
        }
      }, this.TYPING_TIMER_LENGTH);
    }
  }


  sendMessage(message){
    // this.socket = io();
    if( message && this.connected ) {
      this.addChatMessage( {
        username: this.username,
        message: message
      })
    }
    this.socket.emit('add-message', {
      username: this.username,
      message: message
    });    
  }

  
  
  getMessages() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('add-message', (data) => {
        console.log("service", data);
        observer.next(data);    
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;
  }
  getUserjoined () {
    let observable =  new Observable( observer =>{
      this.socket = io( this.url );
      this.socket.on('user joined', data => {
        observer.next( data );
        this.addParticipantsMessage( data);
      });
      return () => this.socket.disconnect();
    })
    return observable;
  }

  userLeft() {
    let observable =  new Observable( observer =>{
      this.socket = io( this.url );
      this.socket.on('user left' , data =>{
        observer.next( data );
      });
      return () => this.socket.disconnect();
    })
    return observable;
  }
  
    
}