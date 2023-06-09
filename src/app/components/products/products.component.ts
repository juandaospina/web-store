import { Component, inject, Input, Output, EventEmitter } from '@angular/core';

// import Swal from 'sweetalert2';
// import 'sweetalert2/src/sweetalert2.scss';

import { ProductsService } from 'src/app/services/products.service';
import { StoreService } from 'src/app/services/store.service';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  // Dependencies
  public storeService = inject(StoreService);
  public productsService = inject(ProductsService);
  // Properties
  @Input() products: Product[] = [];
  @Input() statusResponse: string = '';
  @Input() blockRequest!: boolean;
  /*
    ↓	 @Input = It is a property received by the parent component
    set → Is a convencional setter, this assigne the value a the Input property and execute code that is defined it
  */
  @Input() set productId(id: string | null) {
    if (id) {
      this.showDetail(id);
    }
  };
  @Output() loadMoreProducts = new EventEmitter<any>();
  public shoppingCartList: Product[] = [];
  public total: number = 0;
  public productDetail: Product | null = null;
  public hasProductDetail: boolean = false;

  ngOnInit() {
    this.statusResponse = 'loading';
    this.shoppingCartList = this.storeService.getShoppingCartList();

    this.productsService.updatedProduct$.subscribe((product) => {
      const productIndex = this.products.findIndex(
        (item) => item.id === product.id
      );
      this.products[productIndex] = product;
      // or
      // this.products = this.products.map((item) =>
      //   item.id === product.id ? { ...product } : { ...item }
      // );
    });
    this.productsService.deletedProduct$.subscribe((product) => {
      const productIndex = this.products.findIndex(
        (item) => item.id === product.id
      );
      this.products.splice(productIndex, 1);
    });
  }

  public onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  public onCreateProduct() {
    const newProduct = {
      title: 'Vans Clasic',
      price: 213000,
      description: 'Shoes Vans Clasic new generation',
      categoryId: 1,
      images: ['https://placeimg.com/640/480/animals?r=0.9730893452398492'],
    };
    this.productsService.create(newProduct).subscribe((data) => {
      this.products.unshift(data);
    });
  }

  public onDetailShowHandler(show: boolean) {
    this.hasProductDetail = show;
  }

  public onProductsLoadHandle() {
    console.log("[scroll_in_products]")
    this.loadMoreProducts.emit();
  }

  public showDetail(id: string): void {
    if (!this.hasProductDetail) {
      this.hasProductDetail = true;
    }
    this.productsService.getProduct(id).subscribe({
      next: (data) => {
        // this.hasProductDetail = !this.hasProductDetail;
        this.productDetail = data;
      },
      error: (error) => {
        window.alert(`Error al ver detalle de producto → ${error}`)
      }
    })
  }
}
