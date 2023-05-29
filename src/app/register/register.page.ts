import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form: FormGroup;
  constructor(fb: FormBuilder, private authService: AuthService,private toastController: ToastController,private router: Router,private readonly translocoService: TranslocoService) { 
    this.form = fb.group({
      fName: [
        '',
        Validators.required
      ],
      lName: [
        '',
        Validators.required
      ],
      email: [
        '',
        [Validators.required, Validators.email]
      ],
      password: [
        '',
        Validators.required
      ],
      c_password: [
        '',
        Validators.required
      ]
    });
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
    });

    await toast.present();
  }

  ngOnInit() {
  }
  register() {
		this.authService
			.register(
				this.controls.lName.value + ' ' + this.controls.fName.value ,
				this.controls.email.value,
        this.controls.password.value,
				this.controls.password.value
			).subscribe({
        next: (res: any) => {
          if (res['token']!='') {
            localStorage.setItem('token', res.token);
            this.router.navigate(['/login']);
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
  get controls() {
    return this.form.controls;
  }
}
