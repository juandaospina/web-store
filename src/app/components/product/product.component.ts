import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() product: Product = {
    id: 0,
    title: "",
    description: "",
    images: [],
    price: 0,
    category: {
      id: 0,
      name: ''
    },
  }
  @Output() addedProduct = new EventEmitter<Product>()
  @Output() showProduct = new EventEmitter<number>()

  onAddToCart() {
    this.addedProduct.emit(this.product);
  }

  onShowDetail() {
    this.showProduct.emit(this.product.id);
  }
}
