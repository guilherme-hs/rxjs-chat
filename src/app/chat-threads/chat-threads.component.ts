import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Observable} from "rxjs";
import {ThreadService} from "../thread.service";
import {ChatThreadComponent} from "../chat-thread/chat-thread.component";
import {Thread} from "../thread";

@Component({
  moduleId: module.id,
  selector: 'app-chat-threads',
  templateUrl: 'chat-threads.component.html',
  styleUrls: ['chat-threads.component.css'],
  providers: [ThreadService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [ChatThreadComponent]
})
export class ChatThreadsComponent implements OnInit {

  threads:Observable<any>;

  constructor(public threadService:ThreadService) {
  }

  ngOnInit() {
    this.threads = this.threadService.orderedThreads;
  }

}
