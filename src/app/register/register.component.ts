import { Component, OnInit } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {MessagesModule} from 'primeng/primeng';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  
})
export class RegisterComponent implements OnInit {

  public myForm: FormGroup; 
  msgs: MessagesModule[] = [];

  	constructor(public fb: FormBuilder, public http: Http, private router: Router) { 
  		
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
  	}

  register () {
  	let formData = this.myForm.value;
  	var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('http://localhost:5000/registro', JSON.stringify(formData),{ headers: headers })      
  	.subscribe(data => {
              if (data.json().error == true){
                this.msgs = [];
                this.msgs.push({severity:'error', summary:'Error', detail:data.json().mensaje});
                setTimeout(() => {
                  this.msgs = [];}, 5000);
              }
              else{  
                this.msgs = [];
                this.msgs.push({severity:'success', summary:'', detail:data.json().mensaje});
                setTimeout(() => {
                this.msgs = [];
                this.router.navigate(['./login']);
                }, 5000);
              }
      }, error => {
          console.log(error.json());
      });

  }

}
