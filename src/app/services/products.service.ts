import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from '../models';
import { env } from '../enviroments';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor() {}
  private _http = inject(HttpClient);
  // private apiUrl = '/';

  getAllProducts() {
    return this._http.get<Product[]>(`${env.baseUrl}/products`);
  }

  getProduct(id: number) {
    return this._http.get<Product>(`${env.baseUrl}/${id}`);
  }
}
