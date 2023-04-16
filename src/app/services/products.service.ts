import {
  HttpClient,
  HttpErrorResponse,
  HttpInterceptor,
  HttpParams,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable, inject, OnInit, InjectionToken } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { CreateProductDTO, Product, UpdateProductDTO } from '../types/product';
import { TimeInterceptor } from '../interceptors/time.interceptor';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
  deps: [new InjectionToken<HttpInterceptor[]>('HTTP_INTERCEPTORS')]
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
    console.log("[error_handle]", error)
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
    ↓ These methods allow access to server resources such as 
    products (GET, POST, PUT, DELETE)
  */ 
  getAllProducts(limit?: number, offset?: number): Observable<Product[]> {
    let params = new HttpParams();
    if (limit != undefined && offset != undefined) {
      // Se debe llamar params = params, set devuelve el body,
      // si solo se hace params.set se esta creando una nueva instancia de HttpParams
      params = params.set('offset', offset);
      params = params.set('limit', limit);
    }
    return this._http
      .get<Product[]>(`${environment.baseUrl}/products`, { params })
      .pipe(
        map(products => products.map((product) => {
          return {
            ...product,
            taxe: product.price * 0.19
          }
        })),
        catchError((err: HttpErrorResponse): Observable<never> => {
          return this.handleErrors(err);
        })
      );
  }

  getProduct(id: number) {
    return this._http.get<Product>(`${environment.baseUrl}/${id}`);
  }

  create(data: CreateProductDTO) {
    return this._http.post<Product>(`${environment.baseUrl}/products`, data);
  }

  update(id: number, data: UpdateProductDTO) {
    return this._http.put<Product>(
      `${environment.baseUrl}/products/${id}`,
      data
    );
  }

  delete(id: number) {
    return this._http.delete<boolean>(`${environment.baseUrl}/products/${id}`);
  }
}
