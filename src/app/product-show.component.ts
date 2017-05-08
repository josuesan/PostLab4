import { Component, EventEmitter, Output } from '@angular/core';
import { Http, Headers} from '@angular/http';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'product-show',
  templateUrl: './product-show.component.html',

})

export class Product {
  product='';

	constructor(public http: Http) { }

	@Output() Refresh = new EventEmitter();
	@Output() Edit = new EventEmitter();

	show(id){
		$("input").val('');
        $("#create").show();
        $("#edit").hide();
		var url = 'http://localhost:5000/db_products/' + id + ".json";
		this.http.get(url)
			.subscribe(res => this.product = res.json());
	}

	destroy(id){
		var url = 'http://localhost:5000/delete_product/' + id;
		this.http.delete(url)
			.subscribe(data => {
            	alert(data.json().success);
            	this.show(0);
            	this.Refresh.emit();
      		}, error => {
          		console.log(error.json());
      		});
	}

	edit(id){
		window.scrollTo(0, 0);
		var url = 'http://localhost:5000/db_products/' + id + ".json";
		this.http.get(url)
			.subscribe(res => this.product = res.json());
		this.Edit.emit(this.product);
	}

}

