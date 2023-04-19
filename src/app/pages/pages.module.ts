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
  ],
  imports: [
    CommonModule,
    ComponentsModule,
  ],
  exports: [
    HomeComponent
  ]
})
export class PagesModule {}
