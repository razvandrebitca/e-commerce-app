import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, IonSlides } from '@ionic/angular';
import { FunctionsService } from '../../services/functions.service';
import { DataService, HomeTab, Product } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TranslocoService } from '@ngneat/transloco';
@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
})
export class HomeComponent implements OnInit {
  public products;
  @ViewChild('Slides') slides: IonSlides;
  term='';
  segment = '';
  index = 0;
  data: Array<HomeTab> = [];
  sponsored: Array<Product> = [];
  product_data_1: Array<Product> = [];
  product_data_2: Array<Product> = [];
  product_data_3: Array<Product> = [];
  product_data_4: Array<Product> = [];
  product_data_5: Array<Product> = [];
  slideOpts = {
    effect: 'flip',
    zoom: false
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private menuCtrl: MenuController,
    private fun: FunctionsService,
    private dataService: DataService,
    private http: HttpClient,
    private readonly translocoService: TranslocoService
  ) {
  }
  public languagesList: 
  Array<Record< 'code' | 'name', string>> = [
  {
  code: 'ro',
  name: 'RO',
  },
  {
  code: 'en',
  name: 'EN',
  }
];
public changeLanguage(languageCode: string): void {
  this.translocoService.setActiveLang(languageCode);
  languageCode === 'fa'
  ? (document.body.style.direction = 'rtl')
  : (document.body.style.direction = 'ltr');
}
  ngOnInit(): void {
    this.http.get(environment.API_URL+'api/products/').subscribe((res: any) => {
      this.products = res.data;
    });
  } 

  ionViewDidEnter() {
    this.menuCtrl.enable(true, 'start');
    this.menuCtrl.enable(true, 'end');
  }

  seg(event) {
    this.segment = event.detail.value;
  }

  drag() {
    let distanceToScroll = 0;
    for (let index in this.data) {
      if (parseInt(index) < this.index) {
        distanceToScroll = distanceToScroll + document.getElementById('seg_' + index).offsetWidth + 24;
      }
    }
    document.getElementById('dag').scrollLeft = distanceToScroll;
  }

  preventDefault(e) {
    e.preventDefault();
  }

  async change() {
    await this.slides.getActiveIndex().then(data => this.index = data);
    this.segment = this.data[this.index].title;
    this.drag();
  }

 

  update(i) {
    this.slides.slideTo(i).then((res) => console.log('responseSlideTo', res));
  }
}

