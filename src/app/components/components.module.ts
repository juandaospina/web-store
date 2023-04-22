import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import {
  ProductsComponent,
  NavigationComponent,
  ProductComponent,
  ProductDetailComponent,
  ProductImageComponent,
} from './index';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    ProductsComponent,
    NavigationComponent,
    ProductComponent,
    ProductDetailComponent,
    ProductImageComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgOptimizedImage,
    SweetAlert2Module.forRoot(),
    InfiniteScrollModule,
  ],
  exports: [ProductsComponent, NavigationComponent],
})
export class ComponentsModule {}
