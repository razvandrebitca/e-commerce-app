import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';
import { TranslocoService } from '@ngneat/transloco';
interface LocalFile {
  name: string;
  path: string;
  data: string;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  password: any = '';
  p: any;
  updateGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
  });
  edit = false;
  user = this.storage.get('userData');
  products: any;
  options: { headers: any; };
  userId: any = '';
  userName: any = '';
  userEmail: any = '';
  constructor(private toastController: ToastController, private http: HttpClient, public storage: Storage, public alertController: AlertController,private readonly translocoService: TranslocoService) {
    this.options = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    }

  }
  async warningToast() {
    const toast = await this.toastController.create({
      message: this.translocoService.translate('error'),
      duration: 2000,
      position: "top",
      color: "danger"
    });

    await toast.present();
  }


  async successToast() {
    const toast = await this.toastController.create({
      message: this.translocoService.translate('success'),
      duration: 2000,
      position: "top",
      color: "success"
    });

    await toast.present();
  }

  updateProfile() {
    let data = {
      'id': this.userId,
      'name': this.updateGroup.controls['name'].value ? this.updateGroup.controls['name'].value : this.userName,
      'email': this.updateGroup.controls['email'].value ? this.updateGroup.controls['email'].value : this.userEmail,
    }
    this.http.patch(environment.API_URL + 'api/update-user/', data, this.options).subscribe({
      next: (data: any) => {
        this.successToast();
        this.userId = data.id;
        this.userName = data.name;
        this.userEmail = data.email;
        this.storage.set('updatedUser', data);
        this.updateGroup.controls['name'].reset();
        this.updateGroup.controls['email'].reset();

      },
      error: () => {
        this.warningToast();
      }
    })
  }
  updatePassword() {
    let data = {
      'id': this.userId,
      'name': this.userName,
      'email': this.userEmail,
      'password': this.password,
    }
    if (this.password != '')
      this.http.patch(environment.API_URL + 'api/update-user-password/', data, this.options).subscribe({
        next: (data: any) => {
          this.successToast();
          this.password = '';
        },
        error: () => {
          this.warningToast();
        }
      })
  }
 
 

  ngOnInit() {
    this.storage.get('updatedUser').then((data) => {
      if (data) {
        this.userId = data.id;
        this.userName = data.name;
        this.userEmail = data.email;
      
      }
      else {
        this.storage.get("userData").then((data) => {
          this.userId = data[0].user.id;
          this.userName = data[0].user.name;
          this.userEmail = data[0].user.email;
        });
      }
    })
  }
}
