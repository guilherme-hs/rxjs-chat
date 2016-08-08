import { Component } from '@angular/core';
import {UserService} from "./user.service";
import {User} from "./user";
import {MessageService} from "./message.service";

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers:[UserService,MessageService]
})
export class AppComponent {
  title = 'app works!';
  version = '1.0.0';

  constructor(public userService:UserService, messageService:MessageService){
    console.log(`Initializing RxJS-Chat ${this.version}`);
    // let newUser:User = new User('guilherme','avatar.png');
    // userService.setCurrentUser(newUser);
  };
}
