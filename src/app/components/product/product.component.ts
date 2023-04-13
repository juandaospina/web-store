import { Component, Input, Output, EventEmitter, inject } from '@angular/core';

import { StoreService } from 'src/app/services';
import { Product } from 'src/app/models';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() product: Product = {
    id: 0,
    title: '',
    description: '',
    images: [],
    price: 0,
    category: {
      id: 0,
      name: '',
    },
  };
  @Output() addedProduct = new EventEmitter<Product>();
  public storeService = inject(StoreService);

  onAddToCart() {
    this.addedProduct.emit(this.product);
  }

  onShowDetail() {
    this.storeService.addProductToDetail(this.product);
  }

  onCreateProduct() {}
}
