import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../models/company.interface';

const options = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  responseType: 'text' as 'json'
};

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  url: string = 'http://localhost:37959/api/company';

  constructor(
    private _http: HttpClient
  ) { }

  deployCompany(): Observable<Company[]>{
    return this._http.get<Company[]>(this.url);
  }
}
