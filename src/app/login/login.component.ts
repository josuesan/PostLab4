import { Component, OnInit } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {MessagesModule} from 'primeng/primeng';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	public myForm: FormGroup; 
  msgs: MessagesModule[] = [];
  	constructor(public fb: FormBuilder, public http: Http) { 
  		
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
                this.msgs = [];
                this.msgs.push({severity:'error', summary:'Error', detail:data.json().mensaje});
                setTimeout(() => {
                  this.msgs = [];}, 5000);
              }
              else{  
                this.msgs = [];
                this.msgs.push({severity:'success', summary:'', detail:data.json().token});
                setTimeout(() => {
                this.msgs = [];
                //this.router.navigate(['./login']);
                }, 5000);
               
              }       
      }, error => {
          console.log(error.json());
      });

  }
}
