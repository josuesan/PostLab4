import { Component, OnInit } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	public myForm: FormGroup; 
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
            alert(data.json().success); 
            console.log(data.json());        
      }, error => {
          console.log(error.json());
      });

  }
}
