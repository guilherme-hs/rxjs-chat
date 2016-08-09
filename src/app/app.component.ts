import { Component } from '@angular/core';
import {UserService} from "./user.service";
import {User} from "./user";
import {MessageService} from "./message.service";
import {ThreadService} from "./thread.service";

import {ChatThreadsComponent} from "./chat-threads/chat-threads.component";
import {Thread} from "./thread";
import {Message} from "./message";
import * as moment from 'moment';
import {ChatWindowComponent} from "./chat-window/chat-window.component";



@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers:[UserService,MessageService,ThreadService],
  directives:[ChatThreadsComponent,ChatWindowComponent]
})
export class AppComponent {
  title = 'app works!';
  version = '1.0.0';

  constructor(public userService:UserService, messageService:MessageService, threadService:ThreadService){
    console.log(`Initializing RxJS-Chat ${this.version}`);
    // let newUser:User = new User('guilherme','avatar.png');
    // userService.setCurrentUser(newUser);
    ChatExampleData.init(messageService, threadService, userService);
  };
}

// the person using the app us Juliet
let me: User      = new User('Juliet', './images/avatars/female-avatar-1.png');
let ladycap: User = new User('Lady Capulet', './images/avatars/female-avatar-2.png');
let echo: User    = new User('Echo Bot', './images/avatars/male-avatar-1.png');
let rev: User     = new User('Reverse Bot', './images/avatars/female-avatar-4.png');
let wait: User    = new User('Waiting Bot', './images/avatars/male-avatar-2.png');

let tLadycap: Thread = new Thread('tLadycap', ladycap.name, ladycap.avatarSrc);
let tEcho: Thread    = new Thread('tEcho', echo.name, echo.avatarSrc);
let tRev: Thread     = new Thread('tRev', rev.name, rev.avatarSrc);
let tWait: Thread    = new Thread('tWait', wait.name, wait.avatarSrc);

let initialMessages: Array<Message> = [
  new Message({
    author: me,
    sentAt: moment().subtract(45, 'minutes').toDate(),
    text: 'Yet let me weep for such a feeling loss.',
    thread: tLadycap
  }),
  new Message({
    author: ladycap,
    sentAt: moment().subtract(20, 'minutes').toDate(),
    text: 'So shall you feel the loss, but not the friend which you weep for.',
    thread: tLadycap
  }),
  new Message({
    author: echo,
    sentAt: moment().subtract(1, 'minutes').toDate(),
    text: `I\'ll echo whatever you send me`,
    thread: tEcho
  }),
  new Message({
    author: rev,
    sentAt: moment().subtract(3, 'minutes').toDate(),
    text: `I\'ll reverse whatever you send me`,
    thread: tRev
  }),
  new Message({
    author: wait,
    sentAt: moment().subtract(4, 'minutes').toDate(),
    text: `I\'ll wait however many seconds you send to me before responding. Try sending '3'`,
    thread: tWait
  }),
];

export class ChatExampleData {
  static init(messageService: MessageService,
              threadsService: ThreadService,
              userService: UserService): void {

    // TODO make `messages` hot
    messageService.messages.subscribe(() => ({}));

    // set "Juliet" as the current user
    console.log('Setting current user:', me);
    userService.setCurrentUser(me);

    // create the initial messages
    initialMessages.map( (message: Message) => {
      messageService.addMessage(message);
    } );

    console.log('threadsService:', threadsService);
    threadsService.setCurrentThread(tEcho);

    this.setupBots(messageService);
  }

  static setupBots(messagesService: MessageService): void {

    // echo bot
    messagesService.messagesForThreadUser(tEcho, echo)
      .forEach( (message: Message): void => {
          messagesService.addMessage(
            new Message({
              author: echo,
              text: message.text,
              thread: tEcho
            })
          );
        },
        null);


    // reverse bot
    messagesService.messagesForThreadUser(tRev, rev)
      .forEach( (message: Message): void => {
          messagesService.addMessage(
            new Message({
              author: rev,
              text: message.text.split('').reverse().join(''),
              thread: tRev
            })
          );
        },
        null);

    // waiting bot
    messagesService.messagesForThreadUser(tWait, wait)
      .forEach( (message: Message): void => {

          let waitTime: number = parseInt(message.text, 10);
          let reply: string;

          if (isNaN(waitTime)) {
            waitTime = 0;
            reply = `I didn\'t understand ${message}. Try sending me a number`;
          } else {
            reply = `I waited ${waitTime} seconds to send you this.`;
          }

          setTimeout(
            () => {
              messagesService.addMessage(
                new Message({
                  author: wait,
                  text: reply,
                  thread: tWait
                })
              );
            },
            waitTime * 1000);
        },
        null);


  }
}

