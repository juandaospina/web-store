import { Component, inject, OnInit } from '@angular/core';
import { Product } from 'src/app/models';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  public showProductDetail: boolean = false;
  public storeService = inject(StoreService);
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
      console.log('[detail_suscribe]', product);
      this.product = product;
    });
    this.storeService.hasProductDetail$.subscribe(hasProduct => {
      console.log("[has_product]", hasProduct)
      this.showProductDetail = hasProduct;
    })
  }

  toggleProductDetail() {
    console.log("[toggleProductDetail]", this.showProductDetail)
    // this.storeService.onCloseProductDetail();
    this.showProductDetail = !this.showProductDetail;
  }
}
