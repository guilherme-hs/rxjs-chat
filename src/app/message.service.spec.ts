/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { MessageService } from './message.service';
import {User} from "./user";
import {Message} from "./message";
import {Thread} from "./thread";

describe('Service: Message', () => {
  beforeEach(() => {
    addProviders([MessageService]);
  });

  it('should ...',
    inject([MessageService],
      (service: MessageService) => {
        expect(service).toBeTruthy();
      }));

  it('should test',
    inject([MessageService],
    (messageService: MessageService) => {
      let user:User = new User('Nate','');
      let thread: Thread = new Thread('t1', 'Nate', '');
      let m1: Message = new Message({
        author: user, text: 'Hi m1!', thread: thread
      });
      let m2: Message = new Message({
        author: user, text: 'Hi m2!', thread: thread
      });
      messageService.newMessages.subscribe((message:Message) => console.log(`=> newMessage: `,message));
      messageService.messages.subscribe((messages:Message[]) => console.log(`=> messages: `,messages.length));
      messageService.addMessage(m1);
      messageService.addMessage(m2);
    })
  );
});
