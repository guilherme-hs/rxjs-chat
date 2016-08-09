/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { ChatThreadComponent } from './chat-thread.component';
import {ThreadService} from "../thread.service";
import {MessageService} from "../message.service";

describe('Component: ChatThread', () => {
  it('should create an instance', () => {
    let component = new ChatThreadComponent(new ThreadService(new MessageService()));
    expect(component).toBeTruthy();
  });
});
