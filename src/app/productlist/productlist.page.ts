import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FunctionsService } from '../services/functions.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.page.html',
  styleUrls: ['./productlist.page.scss'],
  inputs: ['recieved_data']
})
export class ProductlistPage implements OnInit {

  constructor(private fun: FunctionsService, private nav: NavController) { }

  ngOnInit() {
  }
  open(data){
    this.fun.update(data);
    this.nav.navigateForward('/product-details');
  }
}
