/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { ChatMessageComponent } from './chat-message.component';

describe('Component: ChatMessage', () => {
  it('should create an instance', () => {
    let component = new ChatMessageComponent();
    expect(component).toBeTruthy();
  });
});
