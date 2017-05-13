import { Component, EventEmitter, Output } from '@angular/core';
import { Http, Headers} from '@angular/http';
import {MessagesModule} from 'primeng/primeng';
import { MsgService } from './msg.service';
import { LocalStorageService } from './localstorage.service';



declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'product-show',
  templateUrl: './product-show.component.html',

})

export class Product {
  product='';

	constructor(public http: Http, public servicio: MsgService, public serv: LocalStorageService) { }

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
		var headers = new Headers();
    	if (this.serv.get_local_storage()!= null) {
      		headers.append( 'Authorization', this.serv.get_local_storage());
      		headers.append( 'username', this.serv.get_username());
    	}

	
		this.http.delete(url,{ headers: headers })
			.subscribe(data => {
				if(data.json().error == true){
					this.servicio.msgs = [];
                	this.servicio.msgs.push({severity:'error', summary:'', detail:data.json().mensaje});
                	setTimeout(() => {
    					this.servicio.msgs = []; }, 5000);
				}
		      	else
		      	{
		            this.servicio.msgs = [];
                	this.servicio.msgs.push({severity:'success', summary:'', detail:data.json().mensaje});
		            this.show(0);               	
		            this.Refresh.emit();
		            setTimeout(() => {
    					this.servicio.msgs = []; }, 5000);
		      	}
      		}, error => {
          		console.log(error.json());
      		});

		
	}

	edit(id){
		window.scrollTo(0, 0);

		var url = 'http://localhost:5000/listar/' + id;
		var headers = new Headers();
    	if (this.serv.get_local_storage()!= null) {
      		headers.append( 'Authorization', this.serv.get_local_storage());
      		headers.append( 'username', this.serv.get_username());
    	}

		this.http.get(url,{ headers: headers })
			.subscribe(data => {
					if(data.json().error == true){
						this.servicio.msgs = [];
                		this.servicio.msgs.push({severity:'error', summary:'', detail:data.json().mensaje});
                		setTimeout(() => {
    					this.servicio.msgs = []; }, 5000);
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

