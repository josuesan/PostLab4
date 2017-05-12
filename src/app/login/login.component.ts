import { Component, OnInit } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MsgService } from '../msg.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	public myForm: FormGroup; 
  	constructor(public fb: FormBuilder, public http: Http, public servicio: MsgService) { 
  		
  		this.myForm = this.fb.group({
	  	username: ["",Validators.required],
	  	password: ["",Validators.compose([Validators.required,Validators.minLength(6)])]
  		});

  	}

  	ngOnInit() {
  	}

  log () {
  	let formData = this.myForm.value;
  	console.log(formData);
  	var headers = new Headers();
    headers.append('Content-Type', 'application/json');

  	this.http.post('http://localhost:5000/login', JSON.stringify(formData),{ headers: headers })      
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
               
              }       
      }, error => {
          console.log(error.json());
      });

  }
}
