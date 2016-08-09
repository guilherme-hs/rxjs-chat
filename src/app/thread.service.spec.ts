/* tslint:disable:no-unused-variable */

/// <reference path="../../../../../typings/globals/underscore/index.d.ts" />
import {User} from "./user";
declare var _;

import { addProviders, async, inject } from '@angular/core/testing';
import { ThreadService } from './thread.service';
import {MessageService} from "./message.service";
import {Thread} from "./thread";
import {Message} from "./message";

describe('Service: Thread', () => {
  beforeEach(() => {
    addProviders([ThreadService,MessageService]);
  });

  it('should ...',
    inject([ThreadService],
      (service: ThreadService) => {
        expect(service).toBeTruthy();
      }));

  it('should collect the Threads from Messages',
    inject([],() => {
      let nate: User = new User('Nate Murray', '');
      let felipe: User = new User('Felipe Coury', '');

      let t1: Thread = new Thread('t1', 'Thread 1', '');
      let t2: Thread = new Thread('t2', 'Thread 2', '');

      let m1: Message = new Message({author: nate,text: 'Hi!', thread: t1});
      let m2: Message = new Message({author: felipe,text: 'Where did you get that hat?', thread: t1});

      let messageService: MessageService = new MessageService();
      let threadService: ThreadService = new ThreadService(messageService);

      threadService.threads
        .subscribe( (threadIdx: { [key: string]: Thread }) => {
          let threads: Thread[] = _.values(threadIdx);
          let threadNames: string = _.map(threads, (t: Thread) => t.name)
            .join(', ');
          console.log(`=> threads (${threads.length}): ${threadNames} `);
        });

      messageService.addMessage(m1);
      messageService.addMessage(m2);

    }));
});
