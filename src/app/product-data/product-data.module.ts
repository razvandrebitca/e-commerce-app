import {NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductDataPageRoutingModule } from './product-data-routing.module';

import { ProductDataPage } from './product-data.page';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from '../transloco-root.module';

@NgModule({
  imports: [
    NgxPaginationModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ProductDataPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslocoRootModule
  ],
  declarations: [ProductDataPage],
  

})
export class ProductDataPageModule { }
