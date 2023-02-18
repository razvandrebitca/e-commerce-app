import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  constructor(fb: FormBuilder,
    private router: Router,
    private authService: AuthService) {  this.form = fb.group({
      email: [
        '',
        [Validators.required, Validators.email]
      ],
      password: [
        '',
        Validators.required
      ]
    });}
    login(): void {
    
      // this.authService.login(this.controls.email.value, this.controls.password.value)
      //   .subscribe((res: any) => {
      //     // Store the access token in the localstorage
      //     localStorage.setItem('access_token', res.token);
          // Navigate to home page
          this.router.navigate(['/']);
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
