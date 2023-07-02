import { Component, OnInit, ViewChild } from '@angular/core';
import {  IonContent, IonSlides, MenuController, ToastController } from '@ionic/angular';
import { TranslocoService } from '@ngneat/transloco';
import { DataService, HomeTab, Product } from 'src/app/services/data.service';
import { FunctionsService } from 'src/app/services/functions.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

  @ViewChild('Slides') slides: IonSlides;
  @ViewChild('Content') content: IonContent;
  @ViewChild('slider') slider: IonSlides;

  index = 0;
  segment = '';
  slideOpts = {
    effect: 'flip',
    zoom: false
  };

  data: Array<HomeTab> = [];

  product: Product;
  async successToast() {
    const toast = await this.toastController.create({
      message:this.translocoService.translate('success'),
      duration: 2000,
      position: "top",
      color:"success"
    });

    await toast.present();
  }
  constructor(
    private menuCtrl: MenuController,
    private fun: FunctionsService,
    private toastController:ToastController,
    private dataService: DataService,
    private readonly translocoService: TranslocoService
    ) {
    this.product = dataService.current_product;
  }

  ngOnInit() {
  }
  calculateFullPrice(price: any, discount: any) {
    if(discount > 0)
    return (100 * price) / (100 - discount);
    else 
    return price;
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false, 'start');
    this.menuCtrl.enable(false, 'end');
  }

  async change() {
    await this.slides.getActiveIndex().then(d => this.index = d);
    this.segment = this.data[this.index].title;
    this.drag();
  }

  onReviewClick(index) {
    this.segment = this.data[index].title;
    this.index = index;
    this.slides.slideTo(index);
    this.content.scrollToTop();
    this.drag();

  }

  goToCart() {
    this.dataService.cart.push(this.product)
    this.successToast();
  }

  update(i) {
    this.slides.slideTo(i);
  }

  drag() {
    let distanceToScroll = 0;
    for (const index in this.data) {
      if (parseInt(index) < this.index) {
        distanceToScroll = distanceToScroll + document.getElementById('seg_' + index).offsetWidth + 24;
      }
    }
    document.getElementById('dag').scrollLeft = distanceToScroll;
  }

  seg(event) {
    this.segment = event.detail.value;
  }

}
