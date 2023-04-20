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

  ngOnInit(): void {
    this.productService.getAllProducts(this.limit, this.offset).subscribe({
      next: (value) => {
        this.products = value;
        this.offset = this.limit;
        this.statusResponse = 'success';
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

  public onProductMoreLoad() {
    // console.log("[limit_offset]", { values })
    this.productService
      .getAllProducts(this.limit, this.offset)
      .subscribe((data) => {
        this.products = [...this.products, ...data];
        this.offset += this.limit;
      });
  }
}
