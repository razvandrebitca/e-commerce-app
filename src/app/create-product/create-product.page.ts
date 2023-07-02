import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { TranslocoService } from '@ngneat/transloco';
const IMAGE_DIR = 'stored-images';

interface LocalFile {
  name: string;
  path: string;
  data: string;
}

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.page.html',
  styleUrls: ['./create-product.page.scss'],
})

export class CreateProductPage implements OnInit {
  product: any = {};
  images: LocalFile[] = [];
  p: any;
  productGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    detail: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    stock: new FormControl('', Validators.required),
    discount: new FormControl('', Validators.required),
  });
  updateGroup = new FormGroup({
    name: new FormControl(''),
    detail: new FormControl(''),
    price: new FormControl(''),
    stock: new FormControl(''),
    discount: new FormControl(''),
  });
  edit = false;
  user = this.storage.get('userData');
  products: any;
  options: { headers: any; };
  userId: any = '';
  image_1: any = '';
  image_2: any = '';
  image_3: any = '';
  constructor(private toastController: ToastController, private http: HttpClient, public storage: Storage, public alertController: AlertController, private plt: Platform, private readonly translocoService: TranslocoService) {
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
      message:this.translocoService.translate('success'),
      duration: 2000,
      position: "top",
      color: "success"
    });

    await toast.present();
  }
  calculateFullPrice(price: any, discount: any) {
    if (discount > 0)
      return (100 * price) / (100 - discount);
    else
      return price;
  }
  createProduct() {
    let data = {};
    if (this.productGroup.controls['name'].value && this.productGroup.controls['detail'].value && this.productGroup.controls['price'].value && this.productGroup.controls['stock'].value && this.productGroup.controls['discount'].value && this.images.length == 3) {
      data = {
        'user_id': this.userId,
        'name': this.productGroup.controls['name'].value,
        'detail': this.productGroup.controls['detail'].value,
        'price': this.productGroup.controls['price'].value,
        'stock': this.productGroup.controls['stock'].value,
        'discount': this.productGroup.controls['discount'].value,
        'image_1': this.images[0].data,
        'image_2': this.images[1].data,
        'image_3': this.images[2].data
      }
      this.http.post(environment.API_URL + 'api/products', data, this.options).subscribe({
        next: () => {
          this.successToast();
          this.images = [];
          Filesystem.deleteFile({
            path: IMAGE_DIR,
            directory: Directory.Data
          })
          this.productGroup.controls['name'].reset();
          this.productGroup.controls['detail'].reset();
          this.productGroup.controls['price'].reset();
          this.productGroup.controls['stock'].reset();
          this.productGroup.controls['discount'].reset();
         
          this.http.get(environment.API_URL + 'api/products/' + this.userId).subscribe((res: any) => {
            this.products = res.data;

          });
        },
        error: () => {
          this.warningToast();
        }
      })
    }
  }
  updateProduct(product) {
    let data = {
      'user_id': this.userId,
      'name': this.updateGroup.controls['name'].value ? this.updateGroup.controls['name'].value : product.name,
      'detail': this.updateGroup.controls['detail'].value ? this.updateGroup.controls['detail'].value : product.detail,
      'price': this.updateGroup.controls['price'].value ? this.updateGroup.controls['price'].value : product.price,
      'stock': this.updateGroup.controls['stock'].value ? this.updateGroup.controls['stock'].value : product.stock,
      'discount': this.updateGroup.controls['discount'].value ? this.updateGroup.controls['discount'].value : product.discount,
      'image_1': this.image_1 ? this.image_1 : product.image_1,
      'image_2': this.image_2 ? this.image_2 : product.image_2,
      'image_3': this.image_3 ? this.image_3 : product.image_3,
    }
    this.http.patch(environment.API_URL + 'api/products/' + product.id, data, this.options).subscribe({
      next: () => {
        this.successToast();
        this.http.get(environment.API_URL + 'api/products/' + this.userId).subscribe((res: any) => {
          this.products = res.data;
          this.edit = false;
          this.updateGroup.controls.name.pristine;
          this.updateGroup.controls.detail.pristine;
          this.updateGroup.controls.stock.pristine;
          this.updateGroup.controls.discount.pristine;
          this.image_1 = '';
          this.image_2 = '';
          this.image_3 = '';
        });
      },
      error: () => {
        this.warningToast();
      }
    })
  }
  deleteProduct(id) {
    this.http.delete(environment.API_URL + 'api/products/' + id).subscribe({
      next: () => {
        this.successToast();
        this.http.get(environment.API_URL + 'api/products/' + this.userId).subscribe((res: any) => {
          this.products = res.data;
        });
        this.edit = false;
      }, error: () => {
        this.warningToast();
      }
    })
  }
  editProduct(data: any) {
    this.product = data;
    this.edit = true;
  }
  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos
    });

    if (image) {
      this.saveImage(image)
    }
  }
  async selectUpdateImage(id) {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos
    });

    if (image) {
      const base64Data = await this.readAsBase64(image);
      if (id == 1)
        this.image_1 = base64Data;
      else
        if (id == 2)
          this.image_2 = base64Data;
        else
          if (id == 3)
            this.image_3 = base64Data;
    }
  }
  async saveImage(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);
    const fileName = new Date().getTime() + '.jpeg';
    this.images.push({
      name: fileName,
      path: `${IMAGE_DIR}/${fileName}`,
      data: base64Data
    });
  }
  private async readAsBase64(photo: Photo) {
    const response = await fetch(photo.webPath);
    const blob = await response.blob();
    return await this.convertBlobToBase64(blob) as string;
  }
  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
  async deleteImage(i) {
    this.images.splice(i, 1);
  }
  ngOnInit() {
    this.storage.get("userData").then((data) => {
      this.userId = data[0].user.id;
      this.http.get(environment.API_URL + 'api/products/' + this.userId).subscribe((res: any) => {
        if (res)
          this.products = res.data;
      });
    });

  }
}
