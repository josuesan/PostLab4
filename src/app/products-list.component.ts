import { Component, ViewChild, EventEmitter, Output  } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { Product }  from './product-show.component';


@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html'
})

export class ProductsList {
  products;

  @ViewChild(Product)
  private P: Product;

  	@Output() Editar = new EventEmitter();
	
	constructor(public http: Http) {
		this.http.get('http://localhost:5000/db_products.json')
			.subscribe(res => this.products = res.json());
	}

	refresh(){
		this.http.get('http://localhost:5000/db_products.json')
			.subscribe(res => this.products = res.json());
	}

	editar(event):void{
		this.Editar.emit(event);
	}

	show(id){
		this.P.show(id);
	}

	
}
