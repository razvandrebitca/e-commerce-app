import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from './../../services/cart.service';
interface Product {
  name: string
  totalPrice: number
  href: string
  rating: number
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  cartItems = 0;
  slideOpts = {
    autoplay: {
      delay: 2000,
    },
    zoom: false,
    effect: 'flip',
  };
  sliderConfig = {
    zoom: false,
    slidesPerView: 1.8,
    spaceBetween: 10,
    centeredSlides: false,
  };
  products: Product[] = [];
  constructor(public cart: CartService, private productService: ProductService) {
    this.cart.getCartTotal().subscribe((val) => {
      this.cartItems = val;
    });
  }

  addCart() {
    const itemCount = this.cartItems + 1;
    this.cart.setCartTotal(itemCount);
  }
  selectProduct(id){
    this.productService.selectedProduct = id;
  }
  ngOnInit() {
    this.productService.getProducts().subscribe((res: any) => {
      this.products = res.data;
      this.productService.data = res.data;

    })


  }
}
