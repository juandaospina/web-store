import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AppComponent } from './app.component';

import { ReversePipe } from './pipes/reverse.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { NgOptimizedImage } from '@angular/common';
import { TimeInterceptorConfig } from './interceptors/time.interceptor';
import { TokenInterceptorConfig } from './interceptors/token.interceptor';
import { AuthInterceptorConfig } from './interceptors/auth.interceptor';
import { PagesModule } from './pages/pages.module';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [
    AppComponent,
    ReversePipe,
    TimeAgoPipe,
    HighlightDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgOptimizedImage,
    // SweetAlert2Module.forRoot(),
    ComponentsModule,
    PagesModule,
  ],
  providers: [
    TimeInterceptorConfig,
    TokenInterceptorConfig,
    // AuthInterceptorConfig,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

