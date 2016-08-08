import { Injectable } from '@angular/core';
import {Message} from "./message";
import {Subject, Observable} from "rxjs/Rx";
import {User} from "./user";
import {Thread} from "./thread";

export interface IMessagesOperation extends Function{
  (messages:Message[]): Message[];
}

@Injectable()
export class MessageService {

  initialMessages: Message[] = [];

  newMessages:Subject<Message> = new Subject<Message>();

  /**
   * returns the array with the most up to date
   */
  messages:Observable<Message[]>;

  updates:Subject<any> = new Subject<any>();

  create:Subject<Message> = new Subject<Message>();


  constructor() {
    console.log('Initializing MessageService...');
    this.messages = this.updates
      .scan((messages: Message[], operation: IMessagesOperation) => {
      return operation(messages);
      },this.initialMessages)
      .publishReplay(1)
      .refCount();
    this.newMessages.subscribe(this.create);
  };

  addMessage(message:Message){
    this.create
      .map(function (message:Message): IMessagesOperation{
        return (messages:Message[]) => messages.concat(message)
      })
      .subscribe(this.updates);
  }

  messagesForThreadUser(thread: Thread, user:User):Observable<Message>{
    return this.newMessages
      .filter((message:Message) => {
        return (message.thread.id === thread.id) && (message.author.id !== user.id);
      })
  }

}
