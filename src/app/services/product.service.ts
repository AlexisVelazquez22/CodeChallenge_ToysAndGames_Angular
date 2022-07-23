import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.interface';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),responseType: 'text' as 'json'
};


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url : string = 'http://localhost:37959/api/home';

  constructor(private _http: HttpClient) { }

  getProduct(): Observable<Product[]>{
    return this._http.get<Product[]>(`${this.url}/show`);
  }

  addProuct(product: Product): Observable<Response>{
    return this._http.post<Response>(`${this.url}/add`, product, httpOptions);
  }

  updateProuct(product: Product): Observable<Response>{
    return this._http.put<Response>(`${this.url}/edit`, product, httpOptions);
  }

  deleteProuct(id: number): Observable<Response>{
    return this._http.delete<Response>(`${this.url}/eliminate/${id}`, httpOptions);
  }

}
