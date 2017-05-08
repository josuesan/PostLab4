import { Component, EventEmitter, Output } from '@angular/core';
import { Http, Headers} from '@angular/http';
import {MessagesModule} from 'primeng/primeng';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'product-show',
  templateUrl: './product-show.component.html',

})

export class Product {
  product='';

  msgs: MessagesModule[] = [];

	constructor(public http: Http) { }

	@Output() Refresh = new EventEmitter();
	@Output() Edit = new EventEmitter();

	show(id){
		$("input").val('');
        $("#create").show();
        $("#edit").hide();
		var url = 'http://localhost:5000/listar/' + id;
		this.http.get(url)
			.subscribe(data => {
	            	this.product = data.json();
      		}, error => {
          		console.log(error.json());
      		});   		
	}

	destroy(id){
		var url = 'http://localhost:5000/borrar/' + id;
		this.http.delete(url)
			.subscribe(data => {
				if(data.json().error == true){
					this.msgs = [];
                	this.msgs.push({severity:'error', summary:'', detail:data.json().mensaje});
                	setTimeout(() => {
    					this.msgs = []; }, 5000);
				}
		      	else
		      	{
		            this.msgs = [];
                	this.msgs.push({severity:'success', summary:'', detail:data.json().mensaje});
		            this.show(0);               	
		            this.Refresh.emit();
		            setTimeout(() => {
    					this.msgs = []; }, 5000);
		      	}
      		}, error => {
          		console.log(error.json());
      		});

		
	}

	edit(id){
		window.scrollTo(0, 0);
		var url = 'http://localhost:5000/listar/' + id;
		this.http.get(url)
			.subscribe(data => {
					if(data.json().error == true){
						this.msgs = [];
                		this.msgs.push({severity:'error', summary:'', detail:data.json().mensaje});
                		setTimeout(() => {
    					this.msgs = []; }, 5000);
					}
      				else
      				{
            			this.product = data.json();
            			this.Edit.emit(this.product);
      				}
      		}, error => {
          		console.log(error.json());
      		});	
	}

}

