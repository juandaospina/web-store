import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImgComponent } from './components/img/img.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { PostInfoComponent } from './components/post-info/post-info.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductImageComponent } from './components/product-image/product-image.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { NgOptimizedImage } from '@angular/common';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { TimeInterceptorConfig } from './interceptors/time.interceptor';
import { TokenInterceptorConfig } from './interceptors/token.interceptor';
import { AuthInterceptorConfig } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ImgComponent,
    PostCardComponent,
    PostInfoComponent,
    ProductComponent,
    ProductsComponent,
    ProductImageComponent,
    NavigationComponent,
    ReversePipe,
    TimeAgoPipe,
    HighlightDirective,
    ProductDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgOptimizedImage,
    SweetAlert2Module.forRoot(),
  ],
  providers: [
    TimeInterceptorConfig,
    TokenInterceptorConfig,
    // AuthInterceptorConfig,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

