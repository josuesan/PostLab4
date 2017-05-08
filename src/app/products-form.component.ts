import { Component, ViewChild, AfterViewInit} from '@angular/core';
import { Http, Headers} from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ProductsList }  from './products-list.component';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'products-form',
  templateUrl: './products-form.component.html'
})

export class ProductsForm implements AfterViewInit{
  private ide: number;

  public myForm = this.fb.group({
  	name: [""],
  	price: [""],
    description: [""],
    img: [""]
  });

  @ViewChild(ProductsList)
  private PL: ProductsList;

  ngAfterViewInit() {}
  constructor(public fb: FormBuilder, public http: Http) {}


  new () {
  	let formData = this.myForm.value;
  	var headers = new Headers();
    headers.append('Content-Type', 'application/json');

  	this.http.post('http://localhost:5000/add_product', JSON.stringify(formData),{ headers: headers })      
  	.subscribe(data => {
            alert(data.json().success);
            $("input").val('');
            this.PL.refresh();
           
      }, error => {
          console.log(error.json());
      });
  }

   edit (id) {
    let formData = this.myForm.value;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.put('http://localhost:5000/update_product/'+id, JSON.stringify(formData),{ headers: headers })      
    .subscribe(data => {
            alert(data.json().success);
            $("input").val('');
            $("#create").show();
            $("#edit").hide();
            this.PL.show(id);
            this.PL.refresh();
      }, error => {
          console.log(error.json());
      });
  }

  mostrar(event):void{
    console.log(event);
    $("#edit").show();
    $("#create").hide();
    this.myForm.setValue({name:event.name,
      price:event.price,
      description:event.description,
      img:event.img
    });
    this.ide = event.id;
  }



}


