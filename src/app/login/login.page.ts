import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Storage } from "@ionic/storage";
import { TranslocoService } from '@ngneat/transloco';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  constructor(fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController,
    private storage:Storage,
    private readonly translocoService: TranslocoService
    ) {
    this.form = fb.group({
      email: [
        '',
        [Validators.required, Validators.email]
      ],
      password: [
        '',
        Validators.required
      ]
    });
  }
  public languagesList: 
  Array<Record< 'code' | 'name', string>> = [
  {
  code: 'ro',
  name: 'Română',
  },
  {
  code: 'en',
  name: 'English',
  }
];
public changeLanguage(languageCode: string): void {
  this.translocoService.setActiveLang(languageCode);
  languageCode === 'fa'
  ? (document.body.style.direction = 'rtl')
  : (document.body.style.direction = 'ltr');
}
  async warningToast() {
    const toast = await this.toastController.create({
      message: this.translocoService.translate('error'),
      duration: 2000,
      position: "top",
    });

    await toast.present();
  }
  async credentialsToast() {
    const toast = await this.toastController.create({
      message: this.translocoService.translate('error'),
      duration: 2000,
      position: "top",
    });

    await toast.present();
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

  login(): void {

    this.authService.login(this.controls.email.value, this.controls.password.value).subscribe({
      next: (res: any) => {
        if (res['token']!='') {
          this.storage.set('userData',res);
          this.router.navigate(['/home']);
          this.successToast();
        }
        else {
          this.credentialsToast();
        }
      },
      error: (error) => {
        this.warningToast();
      },
    })
  }
  ngOnInit() {
  }
  get controls() {
    return this.form.controls;
  }
}


