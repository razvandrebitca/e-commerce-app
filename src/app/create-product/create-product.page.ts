import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonSlides, ToastController } from '@ionic/angular';
import { DataService, Product } from '../services/data.service';
import { FunctionsService } from '../services/functions.service';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.page.html',
  styleUrls: ['./create-product.page.scss'],
})
export class CreateProductPage implements OnInit {
  product: any = {};



  p:any;
  productGroup = new FormGroup({
    name: new FormControl('',Validators.required),
    detail: new FormControl('',Validators.required),
    price: new FormControl('',Validators.required),
    stock: new FormControl('',Validators.required),
    discount: new FormControl('',Validators.required),
  });
  updateGroup = new FormGroup({
    name: new FormControl(''),
    detail: new FormControl(''),
    price: new FormControl(''),
    stock: new FormControl(''),
    discount: new FormControl(''),
  });
  edit = false;
  user = this.storage.get('userData');
  products: any;
  options: { headers: any; };
  userId: any = '';
  constructor(private toastController: ToastController, private http: HttpClient, public storage: Storage, public alertController: AlertController, private fun: FunctionsService, private dataService: DataService) {
    this.options = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    }

  }
  async warningToast() {
    const toast = await this.toastController.create({
      message: "Error",
      duration: 2000,
      position: "top",
      color: "danger"
    });

    await toast.present();
  }


  async successToast() {
    const toast = await this.toastController.create({
      message: "Success",
      duration: 2000,
      position: "top",
      color: "success"
    });

    await toast.present();
  }
  
  calculateFullPrice(price: any, discount: any) {
    if(discount > 0)
    return (100 * price) / (100 - discount);
    else 
    return price;
  }
  createProduct() {
    let data ={};
    if(this.productGroup.controls['name'].value && this.productGroup.controls['detail'].value && this.productGroup.controls['price'].value && this.productGroup.controls['stock'].value  && this.productGroup.controls['discount'].value){
     data = {
      'user_id': this.userId,
      'name': this.productGroup.controls['name'].value,
      'detail': this.productGroup.controls['detail'].value,
      'price': this.productGroup.controls['price'].value,
      'stock': this.productGroup.controls['stock'].value,
      'discount': this.productGroup.controls['discount'].value,
    }
    this.http.post(environment.API_URL+'api/products', data, this.options).subscribe({
      next: () => {
        this.successToast();
        this.http.get(environment.API_URL+'api/products/'+this.userId).subscribe((res: any) => {
          this.products = res.data;
        });
      },
      error: () => {
        this.warningToast();
      }
    })
  }
  }
  updateProduct(id) {
    let data = {
      'user_id': this.userId,
      'name': this.updateGroup.controls['name'].value,
      'detail': this.updateGroup.controls['detail'].value,
      'price': this.updateGroup.controls['price'].value,
      'stock': this.updateGroup.controls['stock'].value,
      'discount': this.updateGroup.controls['discount'].value,
    }
    this.http.patch(environment.API_URL+'api/products/' + id, data, this.options).subscribe({
      next: () => {
        this.successToast();
        this.http.get(environment.API_URL+'api/products/'+this.userId).subscribe((res: any) => {
          this.products = res.data;
          this.edit = false;
        });
      },
      error: () => {
        this.warningToast();
      }
    })
  }
  deleteProduct(id) {

    this.http.delete(environment.API_URL+'api/products/' + id).subscribe({
      next: () => {
        this.successToast();
        this.http.get(environment.API_URL+'api/products/'+this.userId).subscribe((res: any) => {
          this.products = res.data;
        });
        this.edit = false;
      }, error: () => {
        this.warningToast();
      }
    })
  }
  editProduct(data: any) {
    this.product = data;
    this.edit = true;
  }

 
  ngOnInit() {

    this.storage.get("userData").then((data) => {
      this.userId = data[0].user.id;
      this.http.get(environment.API_URL+'api/products/'+this.userId).subscribe((res: any) => {
        if(res)
        this.products = res.data;
      });
    });

  }

}
