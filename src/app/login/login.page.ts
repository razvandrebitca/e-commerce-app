import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Storage } from "@ionic/storage";
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
    private storage:Storage
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
  async warningToast() {
    const toast = await this.toastController.create({
      message: "Error, could not login. Try again!",
      duration: 2000,
      position: "top",
    });

    await toast.present();
  }
  async credentialsToast() {
    const toast = await this.toastController.create({
      message: "Error, wrong credentials. Try again!",
      duration: 2000,
      position: "top",
    });

    await toast.present();
  }

  async successToast() {
    const toast = await this.toastController.create({
      message: "Success, logged in!",
      duration: 2000,
      position: "top",
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
    //   .subscribe((res: any) => {
    //     // Store the access token in the localstorage
    //     localStorage.setItem('access_token', res.token);
    // Navigate to home page
    // this.router.navigate(['/']);
    // }, (err: any) => {
    //   // This error can be internal or invalid credentials
    //   // You need to customize this based on the error.status code

    // });

  }
  ngOnInit() {
  }
  get controls() {
    return this.form.controls;
  }
}


