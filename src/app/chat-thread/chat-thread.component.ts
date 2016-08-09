import { Component, OnInit } from '@angular/core';
import {Thread} from "../thread";
import {ThreadService} from "../thread.service";

@Component({
  moduleId: module.id,
  selector: 'app-chat-thread',
  templateUrl: 'chat-thread.component.html',
  styleUrls: ['chat-thread.component.css'],
  inputs:['thread']
})
export class ChatThreadComponent implements OnInit {

  thread:Thread;
  selected:boolean = false;

  constructor(public threadService:ThreadService) {
  }

  ngOnInit() {
    this.threadService.currentThread
      .subscribe((currentThread: Thread) => {
        this.selected = currentThread && this.thread && currentThread.id === this.thread.id
      });
  }

  clicked(event:any):void{
    console.log(`Thread: ${this.thread.id} Clicked!!!`);
    this.threadService.setCurrentThread(this.thread);
    event.preventDefault();
  }


}
