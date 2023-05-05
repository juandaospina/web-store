import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Category } from '../types/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(
    private _http: HttpClient
  ) {}

  getAll(): Observable<Category[]> {
    return this._http.get<Category[]>(`${environment.baseUrl}/categories`);
  }
}
