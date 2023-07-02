import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonList, MenuController, ModalController, NavController } from '@ionic/angular';
import { Cart, DataService } from 'src/app/services/data.service';
import { FunctionsService } from 'src/app/services/functions.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @ViewChild('slidingList') slidingList: IonList;

  customAlertOptions: any = {
    header: 'Select Quantity',
    translucent: true
  };

  code = '';
  show = true;
  data: Array<Cart> = [];
  stock = [];
  constructor(
    private menuCtrl: MenuController,
    public dataService: DataService,
    public fun: FunctionsService,
    private modalController: ModalController,
    private nav: NavController,
    public alertController: AlertController) {
    this.data = dataService.cart;
    if (this.data.length === 0) { this.show = false; }
   
  }

  ngOnInit() {
  }
  countStock(n: any) {
    this.stock = [];
    for (let i = 1; i <= n; i++)
      this.stock[i] = i;
      return this.stock;
  }
  ionViewDidEnter() {
    this.menuCtrl.enable(true, 'start');
    this.menuCtrl.enable(false, 'end');
  }

  async open_modal(b) {
    let modal;
    if (b) {
      modal = await this.modalController.create({
        component: '',
        componentProps: { value: '', title: 'Terms of Use' }
      });
    } else {
      modal = await this.modalController.create({
        component: '',
        componentProps: { value:'', title: 'Privacy Policy' }
      });
    }
    return await modal.present();
  }

  calculate(i) {
    let res = 0;
    if (i === 0) {
      for (const j of this.data) {
        if (j.product.offer) {
          res += this.fun.calculate(j.product.cost_price, j.product.discount) * j.quantity;
        } else {
          res += j.product.cost_price * j.quantity;
        }
      }
    }
    if (i === 1) {
      for (const j of this.data) {
        res += j.product.shipping;
      }
    }
    return res;
  }


  fix(a) {
    return a.toFixed(2);
  }

  add() {
    const res = this.calculate(1) + this.calculate(0);
    return res;
  }

  browse() {
    this.fun.navigate('/home', false);
  }

  async remove(j) {
    this.fun.removeConform().then(res => {
      if (res === 'ok') {
        this.slidingList.closeSlidingItems();
        this.data.splice(j, 1);
        if (this.data.length === 0) {
          this.show = !this.show;
        }
      }
    });
  }
}
