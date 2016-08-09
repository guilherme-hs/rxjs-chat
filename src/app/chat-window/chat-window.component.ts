import {Component, OnInit, ChangeDetectionStrategy, ElementRef} from '@angular/core';
import {ChatMessageComponent} from "../chat-message/chat-message.component";
import {FORM_DIRECTIVES} from "@angular/forms";
import {Observable} from "rxjs";
import {Thread} from "../thread";
import {User} from "../user";
import {Message} from "../message";
import {MessageService} from "../message.service";
import {ThreadService} from "../thread.service";
import {UserService} from "../user.service";

@Component({
  moduleId: module.id,
  selector: 'app-chat-window',
  templateUrl: 'chat-window.component.html',
  styleUrls: ['chat-window.component.css'],
  providers:[MessageService,ThreadService,UserService],
  directives:[ChatMessageComponent,FORM_DIRECTIVES],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWindowComponent implements OnInit {

  messages:Observable<any>;
  currentThread: Thread;
  draftMessage: Message;
  currentUser: User;
  threadserv:ThreadService;

  constructor(public messageService:MessageService,
              public threadService:ThreadService,
              public userService:UserService,
              public el:ElementRef) {
    this.threadserv = threadService;
    this.threadserv.currentThread.subscribe((thread:Thread) => {
      console.log('Notified on:', thread);
    })
  }

  ngOnInit() {
    console.log('Thread')
    this.messages = this.threadService.currentThreadMessages;
    this.draftMessage = new Message();
    this.threadService.currentThread.subscribe((thread:Thread) => {
      console.log(`Current Thread on Chat Window set to: `, thread);
      this.currentThread = thread;
    });
    this.userService.currentUser.subscribe((user: User) => {
      this.currentUser = user
    });
    this.messages.subscribe((messages:Message[]) => {
      setTimeout(() => {
        this.scrollToBottom();
      });
    });
  }

  sendMessage():void{
    let m:Message = this.draftMessage;
    m.author = this.currentUser;
    m.thread = this.currentThread;
    m.isRead = true;
    this.messageService.addMessage(m);
    this.draftMessage = new Message();
  }

  onEnter(event:any):void{
    this.sendMessage();
    event.preventDefault();
  }

  scrollToBottom():void{
    let scrollPane: any = this.el.nativeElement.querySelector('.msg-container-base');
    scrollPane.scrollTop = scrollPane.scrollHeight;
  }

}
