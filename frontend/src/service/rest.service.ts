import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CountryModel } from 'src/models/country-model';

@Injectable({
  providedIn: 'root'
})

export class RestService {
  endpoint = 'https://localhost:5001/api';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  private extractData(res: CountryModel) {
    let body = res;
    return body || {};
  }

  getCountryTreeStats(): Observable<any> {
    return this.http.get(this.endpoint + '/countrytrees').pipe(
      map(this.extractData));
  }
}
