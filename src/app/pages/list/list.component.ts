import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  cartItems = 0;
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build',
  ];
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public items: Array<{ title: string; note: string; icon: string }> = [];

  constructor(public cart: CartService) {
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)],
      });
    }
    this.cart.getCartTotal().subscribe((val) => {
      this.cartItems = val;
    });
  }

  ngOnInit() {}
}
