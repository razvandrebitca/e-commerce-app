import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { FunctionsService } from '../services/functions.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.page.html',
  styleUrls: ['./productlist.page.scss'],
  inputs: ['recieved_data','term']
})
export class ProductlistPage implements OnInit {

  constructor(private fun: FunctionsService, private nav: NavController, private dataService:DataService) { }

  ngOnInit() {
  }
  open(data){
    // this.dataService.current_product  = data;
    this.fun.update(data);
    this.nav.navigateForward('/product-details');
  }
  calculateFullPrice(price:any,discount:any){
    return (100*price)/(100-discount);
  }
}
