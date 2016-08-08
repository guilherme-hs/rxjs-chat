import {Util} from "./util";
export class User {
  id:string;

  constructor(public name:string, public avatarSrc:string){
    this.id = Util.uuid();
  }

}
