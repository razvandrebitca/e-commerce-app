import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.page.html',
  styleUrls: ['./create-product.page.scss'],
})
export class CreateProductPage implements OnInit {
  productGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl('')
  });
  constructor() { }

  ngOnInit() {
  }

}
