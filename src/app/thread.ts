import {Util} from "./util";
import {Message} from "./message";

export class Thread {

  lastMessage:Message;

  constructor(public id?:string, public name?:string, public avatarSrc?:string){
    if(!id) this.id = Util.uuid();
  }
}
