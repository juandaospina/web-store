import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import {
  HomeComponent,
  CategoryComponent,
  MyCartComponent,
  NotFoundComponent,
  RegisterComponent,
  RecoveryComponent,
  LoginComponent,
  ProfileComponent,
} from './index';
import { ComponentsModule } from '../components/components.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';


@NgModule({
  declarations: [
    CategoryComponent,
    HomeComponent,
    RegisterComponent,
    RecoveryComponent,
    MyCartComponent,
    NotFoundComponent,
    LoginComponent,
    ProfileComponent,
    ProductDetailComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    NgOptimizedImage
  ],
  exports: [
    HomeComponent
  ]
})
export class PagesModule {}
