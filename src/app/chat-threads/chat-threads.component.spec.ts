/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { ChatThreadsComponent } from './chat-threads.component';
import {MessageService} from "../message.service";
import {ThreadService} from "../thread.service";

describe('Component: ChatThreads', () => {
  it('should create an instance', () => {
    let component = new ChatThreadsComponent(new ThreadService(new MessageService()));
    expect(component).toBeTruthy();
  });
});
