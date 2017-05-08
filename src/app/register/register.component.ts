import { Component, OnInit } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public myForm: FormGroup; 
  	constructor(public fb: FormBuilder, public http: Http) { 
  		
  		this.myForm = this.fb.group({
	  	mail: ["",Validators.compose([Validators.required,Validators.email ])],
	  	password: ["",Validators.compose([Validators.required,Validators.minLength(5)])]
  		});

  	}

  	ngOnInit() {
  	}

  register () {
  	let formData = this.myForm.value;
  	console.log(formData);
  	var headers = new Headers();
    headers.append('Content-Type', 'application/json');

  	/*this.http.post('http://localhost:5000/login', JSON.stringify(formData),{ headers: headers })      
  	.subscribe(data => {
            alert(data.json().success);
            this.PL.refresh();
           
      }, error => {
          console.log(error.json());
      });*/

  }

}
