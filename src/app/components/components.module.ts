import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

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
    InfiniteScrollModule,
    HttpClientModule,
    NgOptimizedImage,
    RouterModule,
    SweetAlert2Module.forRoot(),
  ],
  exports: [ProductsComponent, NavigationComponent],
})
export class ComponentsModule {}
