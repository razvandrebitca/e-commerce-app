import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateProductPageRoutingModule } from './create-product-routing.module';

import { CreateProductPage } from './create-product.page';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslocoRootModule } from '../transloco-root.module';

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    IonicModule,
    CreateProductPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslocoRootModule,
  ],
  declarations: [CreateProductPage]
})
export class CreateProductPageModule {}
