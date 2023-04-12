import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { Product } from 'src/app/models';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
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
  // @Output() showProduct = new EventEmitter<number>();
  public storeService = inject(StoreService);

  ngOnInit(): void {
    // console.log('[product]', this.product);
  }

  onAddToCart() {
    this.addedProduct.emit(this.product);
  }

  onShowDetail() {
    // this.showProduct.emit(this.product.id);
    this.storeService.addProductToDetail(this.product);
  }
}
