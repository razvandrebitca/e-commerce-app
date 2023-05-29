import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { ProductlistPage } from 'src/app/productlist/productlist.page';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslocoRootModule } from 'src/app/transloco-root.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
    ]),
    HttpClientModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    TranslocoRootModule,
  ],
  declarations: [HomeComponent, ProductlistPage],
  entryComponents: [ProductlistPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponentModule { }
