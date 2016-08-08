import {User} from "./user";
import {Thread} from "./thread";
import {Util} from "./util";
export class Message {

  id: string;
  sentAt: Date;
  isRead: boolean;
  author: User;
  text: string;
  thread: Thread;

  constructor(obj?: any) {
    this.id              = obj && obj.id              || Util.uuid();
    this.isRead          = obj && obj.isRead          || false;
    this.sentAt          = obj && obj.sentAt          || new Date();
    this.author          = obj && obj.author          || null;
    this.text            = obj && obj.text            || null;
    this.thread          = obj && obj.thread          || null;
  }

}
