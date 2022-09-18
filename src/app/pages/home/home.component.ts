import { Component, OnInit } from '@angular/core';
import { CartService } from './../../services/cart.service';
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

  constructor(public cart: CartService) {
    this.cart.getCartTotal().subscribe((val) => {
      this.cartItems = val;
    });
  }

  addCart() {
    const itemCount = this.cartItems + 1;
    this.cart.setCartTotal(itemCount);
  }

  ngOnInit() {}
}
