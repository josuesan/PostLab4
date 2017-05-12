import { Injectable } from '@angular/core';


@Injectable()
export class LocalStorageService {

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