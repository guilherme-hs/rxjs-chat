import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {MessageService} from "./message.service";
import {Thread} from "./thread";
import {Message} from "./message";

@Injectable()
export class ThreadService {

  threads: Observable<{[key:string]:Thread}>;

  constructor(messageService:MessageService) {
    this.threads = messageService.messages
      .map((messages:Message[]) => {
        let threads: {[key:string]:Thread} = {};
        messages.map((message:Message) => {
          threads[message.thread.id] = threads[message.thread.id] || message.thread;
          let messagesThread: Thread = threads[message.thread.id];
          if (!messagesThread.lastMessage ||
            messagesThread.lastMessage.sentAt < message.sentAt) {
            messagesThread.lastMessage = message;
          }
        })
        return threads;
      })
  }

}
