import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController, IonSlides, ToastController } from '@ionic/angular';
import { DataService, Product } from '../services/data.service';
import { FunctionsService } from '../services/functions.service';
import { FormGroup} from '@angular/forms';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';
import { TranslocoService } from '@ngneat/transloco';
@Component({
  selector: 'app-product-data',
  templateUrl: './product-data.page.html',
  styleUrls: ['./product-data.page.scss'],
  imports: [NgbRatingModule],
  inputs: ['product', 'slider']
})
export class ProductDataPage implements OnInit {
  stars: number;
  @Input() product: Product;
  @Input() slider: IonSlides;
  @Output() notify: EventEmitter<Number> = new EventEmitter<Number>();
  productData;
  public form: FormGroup;
  slideOpts = {
    effect: 'flip'
  };
  p: any;
  open = [false, false];
  liked = false;
  userId: any;
  review: any;
  comments: any;
  edit: boolean = false;
  comment: any = '';
  edited_comment: any = '';
  edited_stars: any;
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

  constructor(public alertController: AlertController, private fun: FunctionsService, private dataService: DataService, private toastController: ToastController, private http: HttpClient, public storage: Storage,private readonly translocoService: TranslocoService) {

    this.stars = 0;
    this.edited_stars = 0;
  }
  editComment(data: any) {

    this.comment = data;
    this.edit = true;

  }


  ngOnInit() {
    this.storage.get("userData").then((data) => {
      this.userId = data[0].user.id;
      this.http.get(environment.API_URL + 'api/reviews/' + this.productData.id).subscribe((data: any) => {
        this.comments = data;
      })
    });
    this.productData = this.product;

  }
  deleteComment(id) {
    this.http.delete(environment.API_URL + 'api/delete-review/' + id).subscribe({
      next: () => {
        this.successToast();
        this.edit = false;
        this.storage.get("userData").then((data) => {
          this.userId = data[0].user.id;
          this.http.get(environment.API_URL + 'api/reviews/' + this.productData.id).subscribe((data: any) => {
            this.comments = data;
          })
        });
        this.edit = false;
      }, error: () => {
        this.warningToast();
      }
    })
  }
  sendReview() {
    let data = {};

    data = {
      "product_id": this.productData.id,
      "user_id": this.userId,
      "review": this.review,
      "star": this.stars
    }
    if (this.review && this.stars != 0)
      this.http.post(environment.API_URL + 'api/reviews', data).subscribe({
        next: () => {
          this.successToast();
          this.review = '';
          this.stars = 0;
          this.http.get(environment.API_URL + 'api/products/' + this.product.id).subscribe((res: any) => {
            this.productData = res.data[0];
          })
          this.http.get(environment.API_URL + 'api/reviews/' +  this.productData.id).subscribe((data: any) => {
            this.comments = data;
          })
        },
        error: () => {
          this.warningToast();
        }
      })

  }
  updateReview(review, star, id) {
    let data = {};

    data = {
      "id": id,
      "product_id": this.productData.id,
      "user_id": this.userId,
      "review": this.edited_comment ? this.edited_comment : review,
      "star": this.edited_stars ? this.edited_stars : star
    }
    this.http.patch(environment.API_URL + 'api/update-review', data).subscribe({
      next: () => {
        this.successToast();
        this.edit = false;
        this.edited_comment = '';
        this.edited_stars = 0;
        this.http.get(environment.API_URL + 'api/products/' + this.product.id).subscribe((res: any) => {
          this.productData = res.data[0];
        })
        this.http.get(environment.API_URL + 'api/reviews/'+this.productData.id).subscribe((data: any) => {
          this.comments = data;
        })
      },
      error: () => {
        this.warningToast();
      }
    })

  }
  starClicked(i: number) {
    this.stars = i;
  }
  editStarClicked(i: number) {
    this.edited_stars = i;
  }
  goToReviews() {
    this.notify.emit(2);
  }

  toogle(i) {
    this.open[i] = !this.open[i];
  }
}
