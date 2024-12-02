
import { Component, OnInit, Input } from '@angular/core';
import { FunctionsService } from 'src/app/services/functions.service';
import { DataService,Cart } from 'src/app/services/data.service';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { OrderService } from 'src/app/services/order.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { TranslocoService } from '@ngneat/transloco';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  inputs:['product']
})
export class CheckoutPage implements OnInit {
  addNewPayment = false;
  cardNumber='';
  cvv='';
  expiryDate='';
  addressLine='';
  userEmail='';
  city='';
  country='';
  zip='';
  data: Array<Cart> = [];
  countries: any[] = [];
  constructor(private menuCtrl: MenuController, private fun: FunctionsService, private dataService: DataService,private orderService: OrderService,private http: HttpClient, public storage: Storage,
    private toastController: ToastController, private readonly translocoService: TranslocoService, private countryService: CountriesService
  ) { 
    this.data = dataService.cart;
    this.countryService.getCountries().subscribe((data) => {
      this.countries = data.countries;
    });
  }

  ngOnInit() {
    this.storage.get("userData").then((data) => {
      this.userEmail = data[0].user.email;
    });
  
  }

  ionViewDidEnter(){
    this.menuCtrl.enable(false, 'start');
    this.menuCtrl.enable(false, 'end');
  }
  async successToast() {
    const toast = await this.toastController.create({
      message: this.translocoService.translate('success'),
      duration: 2000,
      position: "top",
      color:"success"
    });

    await toast.present();
  }
  async warningToast() {
    const toast = await this.toastController.create({
      message: this.translocoService.translate('error'),
      duration: 2000,
      position: "top",
    });

    await toast.present();
  }
  selectCountry(country: string) {
    this.country = country;
  }
  done(){
   let order = {
      addressLine: this.addressLine,
      city: this.city,
      country: this.country,
      zip: this.zip,
      email:this.userEmail,
      products:this.data,
  
    };
    this.orderService.sendOrder(order).subscribe(response => {
      this.successToast()
      this.fun.navigate('home',false);
    }, error => {
      this.warningToast()
      this.fun.navigate('home',false);
    });
    
  }
}
