import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  CategoryComponent,
  HomeComponent,
  LoginComponent,
  NotFoundComponent,
  ProfileComponent,
  RegisterComponent,
  ProductDetailComponent
} from './pages';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Inicio',
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'category/:id',
    component: CategoryComponent,
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent,
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
