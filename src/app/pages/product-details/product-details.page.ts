import { Component, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { ProductService } from 'src/app/services/product.service';
interface Product{
  name:string
  totalPrice:number
  href:string
  rating:number
  description:string
}

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

  selectedSize: number;
  selectedColor: number;
  activeVariation: string;
  products:Product[]=[];
  index: any;

  constructor(
    private animatioCntrl: AnimationController,
    private productService: ProductService
  ) {
 
  }

  ngOnInit() {
    this.activeVariation = 'size';
    // this.productService.getProducts().subscribe((res: any) => {
    //   this.products = res.data;
    // })
    this.products=this.productService.data;
   this.index = this.productService.selectedProduct;
  }

  segmentChanged(e: any) {
    this.activeVariation = e.detail.value;

    if (this.activeVariation == 'color') {
      this.animatioCntrl.create()
        .addElement(document.querySelector('.sizes'))
        .duration(500)
        .iterations(1)
        .fromTo('transform', 'translateX(0px)', 'translateX(100%)')
        .fromTo('opacity', '1', '0.2')
        .play();

      this.animatioCntrl.create()
        .addElement(document.querySelector('.colors'))
        .duration(500)
        .iterations(1)
        .fromTo('transform', 'translateX(-100%)', 'translateX(0)')
        .fromTo('opacity', '0.2', '1')
        .play();
    } else {
      this.animatioCntrl.create()
        .addElement(document.querySelector('.sizes'))
        .duration(500)
        .iterations(1)
        .fromTo('transform', 'translateX(100%)', 'translateX(0)')
        .fromTo('opacity', '0.2', '1')
        .play();

      this.animatioCntrl.create()
        .addElement(document.querySelector('.colors'))
        .duration(500)
        .iterations(1)
        .fromTo('transform', 'translateX(0px)', 'translateX(-100%)')
        .fromTo('opacity', '1', '0.2')
        .play();
    }
  }

  changeSize(size: number) {
    this.selectedSize = size;
  }

  changeColor(color: number) {
    this.selectedColor = color;
  }


}
