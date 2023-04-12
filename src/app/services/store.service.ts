import { Injectable } from '@angular/core';
// Patrón para permitir que otros componentes se puedan suscribir a una variable
import { BehaviorSubject } from 'rxjs';

import { Product } from '../models';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor() {}
  private _shoppingCartList: Product[] = [];
  private _hasProductDetail = new BehaviorSubject<boolean>(false);
  private _cart = new BehaviorSubject<Product[]>([]);
  private _productDetail = new BehaviorSubject<Product>({
    id: 0,
    title: '',
    description: '',
    images: [],
    price: 0,
    category: {
      id: 0,
      name: '',
    },
  });
  public cart$ = this._cart.asObservable();
  public productDetail$ = this._productDetail.asObservable();
  public hasProductDetail$ = this._hasProductDetail.asObservable();

  addProduct(product: Product) {
    this._shoppingCartList.push(product);
    this._cart.next(this._shoppingCartList);
  }

  addProductToDetail(product: Product) {
    this._productDetail.next(product);
    this._hasProductDetail.next(true);
  }

  getShoppingCartList() {
    return this._shoppingCartList;
  }

  getTotal() {
    return this._shoppingCartList.reduce((sum, item) => sum + item.price, 0);
  }
}
