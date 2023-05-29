import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductDetailsPageRoutingModule } from './product-details-routing.module';

import { ProductDetailsPage } from './product-details.page';
import { ProductDataPage } from 'src/app/product-data/product-data.page';
import { TranslocoRootModule } from 'src/app/transloco-root.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductDetailsPageRoutingModule,
    ReactiveFormsModule,
    TranslocoRootModule
  ],
  declarations: [ProductDetailsPage,ProductDataPage],
  entryComponents: [ProductDataPage],
  
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductDetailsPageModule {}
