// import { Component, OnInit } from '@angular/core';
// import { ProductService } from 'src/app/services/product.service';
// import { CartService } from './../../services/cart.service';
// interface Product {
//   name: string
//   totalPrice: number
//   href: string
//   rating: number
// }
// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.scss'],
// })
// export class HomeComponent implements OnInit {
//   cartItems = 0;
//   slideOpts = {
//     autoplay: {
//       delay: 2000,
//     },
//     zoom: false,
//     effect: 'flip',
//   };
//   sliderConfig = {
//     zoom: false,
//     slidesPerView: 1.8,
//     spaceBetween: 10,
//     centeredSlides: false,
//   };
//   products: Product[] = [];
//   constructor(public cart: CartService, private productService: ProductService) {
//     this.cart.getCartTotal().subscribe((val) => {
//       this.cartItems = val;
//     });
//   }

//   addCart() {
//     const itemCount = this.cartItems + 1;
//     this.cart.setCartTotal(itemCount);
//   }
//   selectProduct(id){
//     this.productService.selectedProduct = id;
//   }
//   ngOnInit() {
//     this.productService.getProducts().subscribe((res: any) => {
//       this.products = res.data;
//       this.productService.data = res.data;

//     })


//   }
// }

import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, IonSlides } from '@ionic/angular';
import { FunctionsService } from '../../services/functions.service';
import { DataService, HomeTab, Product } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
})
export class HomeComponent implements OnInit {
  public products;
  @ViewChild('Slides') slides: IonSlides;
  term='';
  segment = '';
  index = 0;
  data: Array<HomeTab> = [];
  sponsored: Array<Product> = [];
  product_data_1: Array<Product> = [];
  product_data_2: Array<Product> = [];
  product_data_3: Array<Product> = [];
  product_data_4: Array<Product> = [];
  product_data_5: Array<Product> = [];
  slideOpts = {
    effect: 'flip',
    zoom: false
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private menuCtrl: MenuController,
    private fun: FunctionsService,
    private dataService: DataService,
    private http: HttpClient
  ) {
    this.data = dataService.tabs;
    this.sponsored = dataService.sponsored;
    this.product_data_1 = dataService.products_1;
    this.product_data_2 = dataService.products_2;
    this.product_data_3 = dataService.products_3;
    this.product_data_4 = dataService.products_4;
    this.product_data_5 = dataService.products_5;
    const d = this.activatedRoute.snapshot.paramMap.get('id');
    if (d) {
      this.segment = this.data[parseInt(d, 10)].title;
    } else {
      this.segment = this.data[0].title;
    }
  }
  ngOnInit(): void {
    this.http.get('http://localhost:8000/api/products/').subscribe((res: any) => {
      this.products = res.data;
    });
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(true, 'start');
    this.menuCtrl.enable(true, 'end');
  }

  seg(event) {
    this.segment = event.detail.value;
  }

  drag() {
    let distanceToScroll = 0;
    for (let index in this.data) {
      if (parseInt(index) < this.index) {
        distanceToScroll = distanceToScroll + document.getElementById('seg_' + index).offsetWidth + 24;
      }
    }
    document.getElementById('dag').scrollLeft = distanceToScroll;
  }

  preventDefault(e) {
    e.preventDefault();
  }

  async change() {
    await this.slides.getActiveIndex().then(data => this.index = data);
    this.segment = this.data[this.index].title;
    this.drag();
  }

  side_open() {
    this.menuCtrl.toggle('end');
  }

  update(i) {
    this.slides.slideTo(i).then((res) => console.log('responseSlideTo', res));
  }
}

