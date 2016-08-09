//Place this at the top near your imports
/// <reference path="../../../../../typings/globals/underscore/index.d.ts" />
import * as _ from 'underscore';


import { Injectable } from '@angular/core';
import {Observable, Subject, BehaviorSubject} from "rxjs/Rx";
import {MessageService} from "./message.service";
import {Thread} from "./thread";
import {Message} from "./message";

@Injectable()
export class ThreadService {

  threads: Observable<{[key:string]:Thread}>;

  orderedThreads: Observable<Thread[]>;

  currentThread: Subject<Thread> = new BehaviorSubject<Thread>(new Thread());

  setCurrentThread(newThread:Thread):void{
    console.log('Setting the current Thread to:',newThread);
    this.currentThread.next(newThread);
  }

  currentThreadMessages:Observable<Message[]>;

  constructor(public messageService:MessageService) {
    this.threads = this.messageService.messages
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
      });
    this.orderedThreads = this.threads.map((threadGroups: {[key:string]:Thread}) => {
      let threads: Thread[] = _.values(threadGroups);
      return _.sortBy(threads, (t:Thread) => t.lastMessage.sentAt).reverse();
    });
    this.currentThread.subscribe(this.messageService.markThreadAsRead);

    this.currentThreadMessages = this.currentThread
      .combineLatest(this.messageService.messages,(currentThread:Thread,messages:Message[]) => {
        if(currentThread && messages.length>0){
          return _.chain(messages)
            .filter((message:Message)=>(message.thread.id === currentThread.id))
            .map((message:Message) => {
              message.isRead = true;
              return message;
            })
            .value();
        }else{
          return [];
        }
      })
  }

}
