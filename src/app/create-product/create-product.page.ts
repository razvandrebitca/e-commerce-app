import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
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


  p:any;
  productGroup = new FormGroup({
    name: new FormControl('',Validators.required),
    detail: new FormControl('',Validators.required),
    price: new FormControl('',Validators.required),
    stock: new FormControl('',Validators.required),
    discount: new FormControl('',Validators.required),
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
  constructor(private toastController: ToastController, private http: HttpClient, public storage: Storage, public alertController: AlertController, private plt: Platform) {
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
      message: "Error",
      duration: 2000,
      position: "top",
      color: "danger"
    });

    await toast.present();
  }


  async successToast() {
    const toast = await this.toastController.create({
      message: "Success",
      duration: 2000,
      position: "top",
      color: "success"
    });

    await toast.present();
  }
  
  calculateFullPrice(price: any, discount: any) {
    if(discount > 0)
    return (100 * price) / (100 - discount);
    else 
    return price;
  }
  createProduct() {
    let data ={};
    if(this.productGroup.controls['name'].value && this.productGroup.controls['detail'].value && this.productGroup.controls['price'].value && this.productGroup.controls['stock'].value  && this.productGroup.controls['discount'].value){
     data = {
      'user_id': this.userId,
      'name': this.productGroup.controls['name'].value,
      'detail': this.productGroup.controls['detail'].value,
      'price': this.productGroup.controls['price'].value,
      'stock': this.productGroup.controls['stock'].value,
      'discount': this.productGroup.controls['discount'].value,
      'image_1':this.images[0].data,
      'image_2':this.images[1].data,
      'image_3':this.images[2].data
    }
    this.http.post(environment.API_URL+'api/products', data, this.options).subscribe({
      next: () => {
        this.successToast();
        this.http.get(environment.API_URL+'api/products/'+this.userId).subscribe((res: any) => {
          this.products = res.data;
        });
      },
      error: () => {
        this.warningToast();
      }
    })
  }
  }
  updateProduct(id) {
    let data = {
      'user_id': this.userId,
      'name': this.updateGroup.controls['name'].value,
      'detail': this.updateGroup.controls['detail'].value,
      'price': this.updateGroup.controls['price'].value,
      'stock': this.updateGroup.controls['stock'].value,
      'discount': this.updateGroup.controls['discount'].value,
    }
    this.http.patch(environment.API_URL+'api/products/' + id, data, this.options).subscribe({
      next: () => {
        this.successToast();
        this.http.get(environment.API_URL+'api/products/'+this.userId).subscribe((res: any) => {
          this.products = res.data;
          this.edit = false;
        });
      },
      error: () => {
        this.warningToast();
      }
    })
  }
  deleteProduct(id) {

    this.http.delete(environment.API_URL+'api/products/' + id).subscribe({
      next: () => {
        this.successToast();
        this.http.get(environment.API_URL+'api/products/'+this.userId).subscribe((res: any) => {
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
  async loadFiles() {
		this.images = [];
		Filesystem.readdir({
			path: IMAGE_DIR,
			directory: Directory.Data
		})
			.then(
				(result) => {
					this.loadFileData(result.files.map((x) => x.name));
				},
				async (err) => {
					// Folder does not yet exists!
					await Filesystem.mkdir({
						path: IMAGE_DIR,
						directory: Directory.Data
					});
				}
			)
			.then((_) => {
				
			});
	}

	// Get the actual base64 data of an image
	// base on the name of the file
	async loadFileData(fileNames: string[]) {
		for (let f of fileNames) {
			const filePath = `${IMAGE_DIR}/${f}`;

			const readFile = await Filesystem.readFile({
				path: filePath,
				directory: Directory.Data
			});

			this.images.push({
				name: f,
				path: filePath,
				data: `data:image/jpeg;base64,${readFile.data}`
			});
		}
	}
  async selectImage() {
    const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos // Camera, Photos or Prompt!
    });

    if (image) {
        this.saveImage(image)
    }
}

// Create a new file from a capture image
async saveImage(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);

    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
        path: `${IMAGE_DIR}/${fileName}`,
        data: base64Data,
        directory: Directory.Data
    });

    // Reload the file list
    // Improve by only loading for the new image and unshifting array!
    this.loadFiles();
}

  // https://ionicframework.com/docs/angular/your-first-app/3-saving-photos
  private async readAsBase64(photo: Photo) {
    if (this.plt.is('hybrid')) {
        const file = await Filesystem.readFile({
            path: photo.path
        });

        return file.data;
    }
    else {
        // Fetch the photo, read as a blob, then convert to base64 format
        const response = await fetch(photo.webPath);
        const blob = await response.blob();

        return await this.convertBlobToBase64(blob) as string;
    }
}

// Helper function
convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
});
async startUpload(file: LocalFile) {
  const response = await fetch(file.data);
  const blob = await response.blob();
  const formData = new FormData();
  formData.append('file', blob, file.name);
  this.uploadData(formData);
}

// Upload the formData to our API
async uploadData(formData: FormData) {
  
 
  // Use your own API!
  const url = 'http://localhost:8888/images/upload.php';

  this.http.post(url, formData)
      .pipe(
          finalize(() => {
             
          })
      )
      .subscribe(res => {
          if (res['success']) {
             
          } else {
              
          }
      });
}

async deleteImage(file: LocalFile) {
  await Filesystem.deleteFile({
      directory: Directory.Data,
      path: file.path
  });
  this.loadFiles();
  
}
  ngOnInit() {

    this.storage.get("userData").then((data) => {
      this.userId = data[0].user.id;
      this.http.get(environment.API_URL+'api/products/'+this.userId).subscribe((res: any) => {
        if(res)
        this.products = res.data;
      });
    });

  }

}
