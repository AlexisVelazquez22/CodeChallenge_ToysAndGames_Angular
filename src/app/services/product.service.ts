import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../models/company.interface';
import { ProductResponse } from '../models/product-response.interface';
import { Product } from '../models/product.interface';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  responseType: 'text' as 'json'
};


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url : string = 'http://localhost:37959/api/product';

  constructor(private _http: HttpClient) { }

  getProduct(): Observable<Product[]>{
    return this._http.get<Product[]>(`${this.url}`);
  }

  addProuct(product: ProductResponse): Observable<Response>{
    return this._http.post<Response>(`${this.url}`, product, httpOptions);
  }

  updateProuct(product: ProductResponse, id: number): Observable<Response>{
    return this._http.put<Response>(`${this.url}/${id}`, product, httpOptions);
  }

  deleteProuct(id: number): Observable<Response>{
    return this._http.delete<Response>(`${this.url}/${id}`, httpOptions);
  }

}
