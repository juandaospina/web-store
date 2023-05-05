import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { switchMap } from 'rxjs';

import { ProductsService } from 'src/app/services';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  constructor(
    // Provided access to information about route (params, querys)
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {}

  // Properties
  public products: Product[] = [];
  public categoryId: string | null = null;
  public limit = 10;
  public offset = 0;
  
  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params) => {
        this.categoryId = params.get('id')
        if (this.categoryId) {
          return this.productService.getByCategory(this.categoryId, this.limit, this.offset);
        }
        return [];
      })
    )
    .subscribe({
      next: (result) => {
        this.products = result
      },
      error: (error) => console.log("[error_product_by_id]", error)
    })
  }
}
