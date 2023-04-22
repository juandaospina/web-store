import { Component, OnInit, inject } from '@angular/core';

import Swal from 'sweetalert2';

import { ProductsService } from 'src/app/services';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // Dependencies
  private productService = inject(ProductsService);
  // Properties
  public products: Product[] = [];
  public statusResponse: 'loading' | 'success' | 'error' | 'init' = 'init';
  public limit: number = 10;
  public offset: number = 0;
  public blockRequest: boolean = false;

  ngOnInit(): void {
    // console.log('[on_init_home]');
    this.onLoadProductsList();
    this.offset += this.limit;
  }

  public onScrollProducts() {
    this.onLoadProductsList();
    this.blockRequest = true
    setTimeout(() => {
      this.blockRequest = !this.blockRequest;
    }, 2000)
    this.offset += this.limit;
  }

  public onLoadProductsList() {
    this.productService.getAllProducts(this.limit, this.offset).subscribe({
      next: (response) => {
        this.statusResponse = 'success';
        this.products = [...this.products, ...response];
      },
      error: (err) => {
        this.statusResponse = 'error';
        Swal.fire({
          title: 'Ups.. Algo malo ocurrió',
          text: err,
          icon: 'error',
        });
      },
    });
  }
}
