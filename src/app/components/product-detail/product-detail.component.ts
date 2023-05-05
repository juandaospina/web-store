import { Component, inject, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/types/product';
import { StoreService, ProductsService } from 'src/app/services';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  // Properties
  @Input() showProductDetail!: boolean;
  @Input() product!: Product | null;
  @Output() setShowProductDetail = new EventEmitter();
  public storeService = inject(StoreService);
  public productService = inject(ProductsService);

  ngOnInit(): void {
    this.storeService.productDetail$.subscribe((product) => {
      this.product = product;
    });
    this.storeService.hasProductDetail$.subscribe((hasProduct) => {
      this.showProductDetail = hasProduct;
    });
  }

  toggleProductDetail() {
    this.setShowProductDetail.emit(false);
  }

  onUpdateProduct() {
    const data = {
      title: 'Nike Jordan',
      price: 456000,
    };
    this.productService.update(this.product?.id ?? 0, data).subscribe((data) => {
      this.product = data;
      this.productService.onUpdatedProduct(data); 
    });
  }

  onDeleteProduct() {
    this.productService.delete(this.product?.id ?? 0).subscribe((res) => {
      if (res) {
        this.showProductDetail = false;
        this.productService.onDeletedProduct(this.product as Product);
      }
    });
  }
}
