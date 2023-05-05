import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'; 
import { ActivatedRoute } from '@angular/router';

import { switchMap } from 'rxjs';
import { ProductsService } from 'src/app/services';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private location: Location
  ) {}

  // Properties
  public productId!: string;
  public product: Product | null = null;

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.productId = params.get('id') as string;
        if (this.productId) {
          return this.productService.getProduct(this.productId)
        }
        return []
      })
    ).subscribe({
      next: (product) => {
        this.product = product
      },
      error: (err) => console.log("[product_detail]", err)
    })
  }

  public goBack(): void {
    this.location.back();
  }
}
