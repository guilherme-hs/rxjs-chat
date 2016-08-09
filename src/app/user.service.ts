import { Injectable } from '@angular/core';
import {Subject, BehaviorSubject} from "rxjs/Rx";
import {User} from "./user";

@Injectable()
export class UserService {

  currentUser: Subject<User> = new BehaviorSubject<User>(null);

  constructor() {
    console.log('Initializing UserService...');
  }

  setCurrentUser(newUser:User){
    // console.log(`Setting the current user to:`,newUser);
    this.currentUser.next(newUser);
  }
}
