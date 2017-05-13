import { Component, OnInit } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { MsgService } from '../msg.service';
import { LocalStorageService } from '../localstorage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(public http: Http, public servicio: MsgService, public serv: LocalStorageService) {}

  ngOnInit() {
  }

  logout (){
    var headers = new Headers();
    if (this.serv.get_local_storage()!= null) {
      headers.append( 'Authorization', this.serv.get_local_storage());
      headers.append( 'username', this.serv.get_username());
    }

    this.http.post('http://localhost:5000/logout',{ headers: headers })      
    .subscribe(data => {
            if (data.json().error == true){
                this.servicio.msgs = [];
                this.servicio.msgs.push({severity:'error', summary:'Error', detail:data.json().mensaje});
                setTimeout(() => {
                  this.servicio.msgs = [];}, 5000);
              }
              else{  
                this.servicio.msgs = [];
                this.servicio.msgs.push({severity:'success', summary:'', detail:data.json().mensaje});
                setTimeout(() => {
                this.servicio.msgs = [];
                //this.router.navigate(['./login']);
                }, 5000);
                var token = data.json().token;
                this.serv.delete_local_storage();
                this.serv.delete_username();
              }       
      }, error => {
          console.log(error.json());
      });


  }
}
