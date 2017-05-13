import { Component, OnInit } from '@angular/core';
import { MsgService } from '../msg.service';
import { LocalStorageService } from '../localstorage.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Http, Headers} from '@angular/http';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
	
  public myForm: FormGroup;
  constructor(public fb: FormBuilder, public http: Http, public servicio: MsgService, public serv: LocalStorageService) { 

	this.myForm = this.fb.group({
      username: ["",Validators.required],
	  	email: ["",Validators.compose([Validators.required,Validators.email ])],
	  	password: ["",Validators.compose([Validators.required,Validators.minLength(6)])],
      name: ["",Validators.required],
      lastname: ["",Validators.required],
      birthdate: ["",Validators.required],
      gender: ["",Validators.compose([Validators.required,Validators.minLength(6)])]
  		});
  }

  ngOnInit() {
 
    var headers = new Headers();
    if (this.serv.get_local_storage()!= null) {
      headers.append( 'Authorization', this.serv.get_local_storage());
      headers.append( 'username', this.serv.get_username());
    }
    console.log(this.serv.get_username())
    this.http.get('http://localhost:5000/perfil',{ headers: headers })      
    .subscribe(data => {
            if (data.json().error == true){
                this.servicio.msgs = [];
                this.servicio.msgs.push({severity:'error', summary:'Error', detail:data.json().mensaje});
                setTimeout(() => {
                  this.servicio.msgs = [];}, 5000);
              }
              else{  
                this.myForm.setValue({username:data.json().username,
			      email:data.json().email,
			      name:data.json().nombre,
			      lastname:data.json().apellido,
			      birthdate:data.json().nacimiento,
			      gender:data.json().genero,
			      password:''
    			});
              }       
      }, error => {
          console.log(error.json());
      });


  }
}
