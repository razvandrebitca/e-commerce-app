import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from "@ionic/storage";
import { TranslocoService } from '@ngneat/transloco';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    {
      title: this.translocoService.translate('home'),
      url: '/home',
      icon: 'home',
    },
    {
      title: this.translocoService.translate('profile'),
      url: '/profile',
      icon: 'person',
    },
    {
      title: `${this.translocoService.translate('my_products')}`,
      url: '/my-products',
      icon: 'create',
    },
  ];
selectedFilter:any;
  userName;
  isLoggedIn: any = true;
  side_open = true;
  side_open1 = true;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private navCtrl: NavController,
    private readonly translocoService: TranslocoService
  ) {
    this.storage.create();
  }
  ngOnInit(): void {
    this.storage.get("userData").then((data) => {
      if (data.token) {
        this.navCtrl.navigateRoot("/home", {
          animationDirection: "forward",
        });
      }
    });
  }
  menu(b) {
    if (b) {
      this.side_open = false;
      this.side_open1 = true;
    }
    else {
      this.side_open = false;
      this.side_open1 = false;
    }
  }
  logout() {
    this.storage.clear();
  }

  back() {
    this.side_open = true;
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


}
