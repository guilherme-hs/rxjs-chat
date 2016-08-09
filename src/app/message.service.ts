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

  markThreadAsRead: Subject<any> = new Subject<any>();


  constructor() {
    console.log('Initializing MessageService...');
    this.messages = this.updates
      .scan((messages: Message[], operation: IMessagesOperation) => {
      return operation(messages);
      },this.initialMessages)
      .publishReplay(1)
      .refCount();
    this.create
      .map(function (message:Message): IMessagesOperation{
        return (messages:Message[]) => messages.concat(message)
      })
      .subscribe(this.updates);
    this.newMessages.subscribe(this.create);
    this.markThreadAsRead
      .map( (thread: Thread) => {
        return (messages: Message[]) => {
          return messages.map( (message: Message) => {
            // note that we're manipulating `message` directly here. Mutability
            // can be confusing and there are lots of reasons why you might want
            // to, say, copy the Message object or some other 'immutable' here
            if (message.thread.id === thread.id) {
              message.isRead = true;
            }
            return message;
          });
        };
      })
      .subscribe(this.updates);

  };

  addMessage(message: Message): void {
    this.newMessages.next(message);
  }

  messagesForThreadUser(thread: Thread, user:User):Observable<Message>{
    return this.newMessages
      .filter((message:Message) => {
        return (message.thread.id === thread.id) && (message.author.id !== user.id);
      })
  }



}
