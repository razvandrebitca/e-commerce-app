import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertController, IonSlides } from '@ionic/angular';
import { DataService, Product } from '../services/data.service';
import { FunctionsService } from '../services/functions.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.page.html',
  styleUrls: ['./create-product.page.scss'],
})
export class CreateProductPage implements OnInit {
   product: any={};
  @Input() slider: IonSlides;
  @Output() notify: EventEmitter<Number> = new EventEmitter<Number>();

  slideOpts = {
    effect: 'flip'
  };
  open = [false, false, false];
  liked = false;
  productGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl('')
  });
  edit=false;
  user=this.storage.get('userData');
  products: any;
  options: { headers: any; };
  constructor(private http:HttpClient,public storage: Storage,public alertController: AlertController,private fun: FunctionsService, private dataService: DataService) {   this.options = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    })}}

  ngOnInit() {
    this.http.get('http://localhost:8000/api/products/').subscribe((res: any) => {
      this.products = res.data;
    });
  }
  calculateFullPrice(price:any,discount:any){
    return (100*price)/(100-discount);
  }
createProduct(){

  this.http.post('http://localhost:8000/api/products',this.productGroup.value,this.options).subscribe({
    next:()=>{
      this.http.get('http://localhost:8000/api/products/').subscribe((res: any) => {
        this.products = res.data;
      });
    }
  })
}
editProduct(data:any){
  this.product = data;
  this.edit= true;
}

  toogle(i) {
    this.open[i] = !this.open[i];
  }

  
}
