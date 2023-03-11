import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form: FormGroup;
  constructor(fb: FormBuilder, private authService: AuthService,private toastController: ToastController,private router: Router) { 
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
      message: "Error, could not register. Try again!",
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
      message: "Success, registered!",
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
			// .subscribe(
			// 	(data) => {
			// 		this.authService
			// 			.login(form.value.email, form.value.password)
			// 			.subscribe(
			// 				(data) => {},
			// 				(error) => {
			// 					console.log(error);
			// 				},
			// 				// () => {

			// 				// 	this.navCtrl.navigateRoot("/home", {
			// 				// 		animationDirection: "forward",
			// 				// 	});
			// 				// }
			// 			);
			// 		this.alertService.presentToast(data["message"]);
			// 	},
			// 	(error) => {
			// 		console.log(error);
			// 	},
			// 	() => {}
			// );
			// .subscribe({
			// 	next: () => {
			// 		this.alertService.successToast('Registered sucessfully');
			// 		this.navCtrl.navigateRoot("/login", {
			// 			animationDirection: "forward",
			// 		});

			// 	},
			// 	error: () => {
			// 		this.alertService.dangerToast('Error');
			// 	}
			// })
	}
  get controls() {
    return this.form.controls;
  }
}
