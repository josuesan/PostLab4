import { Component, ViewChild, AfterViewInit} from '@angular/core';
import { Http, Headers} from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ProductsList }  from './products-list.component';
import {MessagesModule} from 'primeng/primeng';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'products-form',
  templateUrl: './products-form.component.html'
})

export class ProductsForm implements AfterViewInit{
  private ide: number;
  msgs: MessagesModule[] = [];
  public myForm = this.fb.group({
  	name: [""],
  	price: [""],
    description: [""],
    img: [""],
    sell: [""],
    category: [""]
  });

  @ViewChild(ProductsList)
  private PL: ProductsList;

  ngAfterViewInit() {}
  constructor(public fb: FormBuilder, public http: Http) {}


  new () {
  	let formData = this.myForm.value;
  	var headers = new Headers();
    headers.append('Content-Type', 'application/json');

  	this.http.post('http://localhost:5000/crear', JSON.stringify(formData),{ headers: headers })      
  	.subscribe(data => {
            this.msgs = [];
            this.msgs.push({severity:'success', summary:'', detail:data.json().mensaje});
            $("input").val('');
            this.PL.refresh();
            setTimeout(() => {
            this.msgs = []; }, 5000);
           
      }, error => {
          console.log(error.json());
      });
  }

   edit (id) {
    let formData = this.myForm.value;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.put('http://localhost:5000/editar/'+id, JSON.stringify(formData),{ headers: headers })      
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
                  $("input").val('');
                  $("#create").show();
                  $("#edit").hide();
                  this.PL.show(id);
                  this.PL.refresh();
                  setTimeout(() => {
                  this.msgs = []; }, 5000);
              }
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
      img:event.img,
      sell:event.sell,
      category:event.category
    });
    this.ide = event.id;
  }



}


