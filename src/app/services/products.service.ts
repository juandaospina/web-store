import {
  HttpClient,
  HttpErrorResponse,
  HttpInterceptor,
  HttpParams,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable, inject, OnInit, InjectionToken } from '@angular/core';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { CreateProductDTO, Product, UpdateProductDTO } from '../types/product';
import { environment } from '../../environments/environment';
import { checkTime } from '../interceptors/time.interceptor';

@Injectable({
  providedIn: 'root',
  deps: [new InjectionToken<HttpInterceptor[]>('HTTP_INTERCEPTORS')],
})
export class ProductsService implements OnInit {
  // Dependencies
  constructor() {}
  private _http = inject(HttpClient);
  // Behavior Subject
  private _updatedProduct = new BehaviorSubject<Product>({
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
  private _deletedProduct = new BehaviorSubject<Product>({
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
  // Observables
  public updatedProduct$ = this._updatedProduct.asObservable();
  public deletedProduct$ = this._deletedProduct.asObservable();
  ngOnInit(): void {}

  // ↓ Util methods
  private handleErrors(error: HttpErrorResponse): Observable<never> {
    console.log('[error_handle]', error);
    if (error.status == HttpStatusCode.Forbidden)
      return throwError(() => 'No tiene permisos para realizar la solicitud.');
    if (error.status == HttpStatusCode.NotFound)
      return throwError(() => 'No existen productos en el servicio.');
    if (error.status == HttpStatusCode.InternalServerError)
      return throwError(() => 'Error en el servidor.');
    return throwError(() => 'Un error inesperado ha ocurrido.');
  }

  /* 
    ↓ Handler methods: These methods allow to handle
    the state of the observers
  */
  onUpdatedProduct(product: Product) {
    this._updatedProduct.next(product);
  }

  onDeletedProduct(product: Product) {
    this._deletedProduct.next(product);
  }

  /*
    ↓ These methods allow access to server resources of products (GET, POST, PUT, DELETE)
      get by category
  */
  public getAllProducts(
    limit?: number,
    offset?: number
  ): Observable<Product[]> {
    let params = new HttpParams();
    if (limit != undefined && offset != undefined) {
      // Se debe llamar params = params, set devuelve el body,
      // si solo se hace params.set se esta creando una nueva instancia de HttpParams
      params = params.set('offset', offset);
      params = params.set('limit', limit);
    }
    return this._http
      .get<Product[]>(`${environment.baseUrl}/products`, {
        params,
        context: checkTime(),
      })
      .pipe(
        map((products) =>
          products.map((product) => {
            return {
              ...product,
              taxe: product.price * 0.19,
            };
          })
        ),
        catchError((err: HttpErrorResponse): Observable<never> => {
          return this.handleErrors(err);
        })
      );
  }

  public getByCategory(categoryId: string, limit: number, offset: number) {
    let params = new HttpParams
    if (limit !== null && offset !== null) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this._http.get<Product[]>(
      `${environment.baseUrl}/categories/${categoryId}/products`, {
        params
      }
    );
  }

  public getProduct(id: number) {
    return this._http.get<Product>(`${environment.baseUrl}/${id}`);
  }

  public create(data: CreateProductDTO) {
    return this._http.post<Product>(`${environment.baseUrl}/products`, data);
  }

  public update(id: number, data: UpdateProductDTO) {
    return this._http.put<Product>(
      `${environment.baseUrl}/products/${id}`,
      data
    );
  }

  public delete(id: number) {
    return this._http.delete<boolean>(`${environment.baseUrl}/products/${id}`);
  }
}
