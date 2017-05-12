import { Injectable } from '@angular/core';
import {Message} from 'primeng/primeng';

@Injectable()
export class MsgService {

  public msgs: Message[] = [];

  public get_local_storage(){
    return localStorage.getItem('Session-Token');
  }

  public set_local_storage(token){
    console.log("hola");
    localStorage.setItem('Session-Token', token);
    sessionStorage.setItem('Session-Token', token);
  }
  
  public delete_local_storage(){
    localStorage.removeItem('Session-Token');
  }
}