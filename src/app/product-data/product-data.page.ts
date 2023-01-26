import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController, IonSlides } from '@ionic/angular';
import { DataService, Product } from '../services/data.service';
import { FunctionsService } from '../services/functions.service';

@Component({
  selector: 'app-product-data',
  templateUrl: './product-data.page.html',
  styleUrls: ['./product-data.page.scss'],
  inputs: ['product', 'slider']
})
export class ProductDataPage implements OnInit {

  @Input() product: Product;
  @Input() slider: IonSlides;
  @Output() notify: EventEmitter<Number> = new EventEmitter<Number>();

  slideOpts = {
    effect: 'flip'
  };
  open = [false, false, false, false];
  liked = false;
  constructor(public alertController: AlertController,
  
    private fun: FunctionsService, private dataService: DataService) { }

  ngOnInit() {
  }

  goToReviews() {
    this.notify.emit(2);
  }

  toogle(i) {
    this.open[i] = !this.open[i];
  }

  remove() {
    this.slider.lockSwipes(true);
  }

  gainback() {
    this.slider.lockSwipes(false);
  }

  like() {
    console.log('like')
    this.liked = !this.liked;
  }

  

  async createAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Sorry',
      subHeader: 'App not found',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

 
}
