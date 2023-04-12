import { Component, inject } from '@angular/core';

import { Product } from 'src/app/models';
import { ProductsService } from 'src/app/services/products.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  public shoppingCartList: Product[] = [];
  public storeService = inject(StoreService)
  public productsService = inject(ProductsService);
  public total: number = 0;
  public products: Product[] = []
  public today: Date = new Date();
  public date: Date = new Date(2023, 3, 29)

  ngOnInit() {
    this.shoppingCartList = this.storeService.getShoppingCartList();
    this.productsService.getAllProducts().subscribe((data) => {
      this.products = data;
    })
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }
}
