import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  public offset = 10;
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params  => {
      this.categoryId = params.get('id');
    })

    this.productService.getByCategory(this.categoryId ?? '', this.limit, this.offset).subscribe(data => {
      this.products = data;
    })
  }

}
