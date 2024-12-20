
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, NavController, AlertController } from '@ionic/angular';
import { DataService } from './data.service';
import { resolve } from 'q';


@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor(
    public dataService: DataService,
    private router: Router,
    private toastController: ToastController,
    private nav: NavController, public alertController: AlertController) { }

  navigate(link, forward?) {
    if (forward) {
      this.nav.navigateForward('/' + link);
    } else {
      this.router.navigateByUrl('/' + link);
    }
  }

  array(i) {

    const l = [];
    for (let j = 0; j < Math.round(i); j++) {
      l.push(1);
    }
    return l;
  }



  checkout() {
    this.nav.navigateForward('/checkout');
  }

  async presentToast(message, show_button, position, duration) {
    const toast = await this.toastController.create({
      message: message,
      // showCloseButton: show_button,
      position: position,
      duration: duration
    });
    toast.present();
  }

  back() {
    // this.nav.goBack();
    this.nav.back();
  }

  date(date) {
    const monthNames = [
      'January', 'February', 'March',
      'April', 'May', 'June', 'July',
      'August', 'September', 'October',
      'November', 'December'
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

  update(product) {
    this.dataService.current_product = product;
  }

  removeConform(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const alert = await this.alertController.create({
        header: 'Confirm',
        message: 'Are you sure you want to remove this item?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (cancel) => {
              console.log('Confirm Cancel: blah');
              resolve('cancel');
            }
          }, {
            text: 'Okay',
            handler: (ok) => {
              console.log('Confirm Okay');
              resolve('ok');
            }
          }
        ]
      });

      alert.present();
    });
  }

  calculate(price: any, discount: any) {
    if (discount > 0)
      return (100 * price) / (100 - discount);
    else
      return price;
  }
}
