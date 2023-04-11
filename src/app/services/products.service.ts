import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor() {}
  private _http = inject(HttpClient);
  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';

  getAllProducts() {
    return this._http.get<Product[]>(this.apiUrl);
  }

  getProduct(id: number) {
    return this._http.get<Product>(`${this.apiUrl}/${id}`);
  }
}
