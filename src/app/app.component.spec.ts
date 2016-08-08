/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {UserService} from "./user.service";
import {MessageService} from "./message.service";

describe('App: RxjsChat', () => {
  beforeEach(() => {
    addProviders([AppComponent,UserService, MessageService]);
  });

  it('should create the app',
    inject([AppComponent], (app: AppComponent) => {
      expect(app).toBeTruthy();
    }));

  it('should have as title \'app works!\'',
    inject([AppComponent], (app: AppComponent) => {
      expect(app.title).toEqual('app works!');
    }));
});
