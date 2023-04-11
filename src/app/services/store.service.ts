import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Product } from '../models';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor() {}
  // Lo recomendable es que los atributos internos sean privados para un único uso del servicio
  // Si otro componente requiere acceder a un atributo la buena práctica es hacer un método que lo retorne
  private _shoppingCartList: Product[] = [];
  private _cart = new BehaviorSubject<Product[]>([]);

  // $ observable
  _cart$ = this._cart.asObservable();

  addProduct(product: Product) {
    this._shoppingCartList.push(product);
    this._cart.next(this._shoppingCartList);
  }

  // Returna un atributo para que este no pueda ser accedido directamente y corrompido
  getShoppingCartList() {
    return this._shoppingCartList;
  }

  getTotal() {
    return this._shoppingCartList.reduce((sum, item) => sum + item.price, 0);
  }
}

