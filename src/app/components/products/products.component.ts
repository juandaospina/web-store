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
  // Inyección de servicio con el método inject() available v15 >
  public storeService = inject(StoreService)
  public productsService = inject(ProductsService);
  public showProductDetail: boolean = false;

  // Inyección de servicio con inicialización en constructor
  // constructor(
  //   private storeService: StoreService
  // ) {
  //   this.shoppingCartList = this.storeService.getShoppingCartList();
  // }
  
  public total: number = 0;
  public products: Product[] = []
  public today: Date = new Date();
  public date: Date = new Date(2023, 3, 29)

  ngOnInit() {
    this.shoppingCartList = this.storeService.getShoppingCartList();
    this.productsService.getAllProducts().subscribe((data) => {
      console.log("[get_data]", data);
      this.products = data;
    })
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: number) {
    this.productsService.getProduct(id).subscribe((data) => {
      console.log("[product_detail]", data)
    })
    console.log("[product_id]", id)
  }
}
