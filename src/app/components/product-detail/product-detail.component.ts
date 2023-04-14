import { Component, inject, OnInit } from '@angular/core';
import { Product } from 'src/app/types/product';
import { StoreService, ProductsService } from 'src/app/services';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  public showProductDetail: boolean = false;
  public storeService = inject(StoreService);
  public productService = inject(ProductsService);
  public product: Product = {
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

  ngOnInit(): void {
    this.storeService.productDetail$.subscribe((product) => {
      this.product = product;
    });
    this.storeService.hasProductDetail$.subscribe((hasProduct) => {
      this.showProductDetail = hasProduct;
    });
  }

  toggleProductDetail() {
    // this.storeService.onCloseProductDetail();
    this.showProductDetail = !this.showProductDetail;
  }

  onUpdateProduct() {
    const data = {
      title: 'Nike Jordan',
      price: 456000,
    };
    this.productService.update(this.product.id, data).subscribe((data) => {
      this.product = data;
      this.productService.onUpdatedProduct(data);
    });
  }

  onDeleteProduct() {
    this.productService.delete(this.product.id).subscribe((res) => {
      if (res) {
        this.showProductDetail = false;
        this.productService.onDeletedProduct(this.product);
      }
    });
  }
}
