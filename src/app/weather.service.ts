import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs';
import { environment } from '../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  baseUrl = environment.baseUrl;
  constructor(
    private httpClient: HttpClient
  ) { }
  getWOE_ID(city) {
    return this.httpClient.get(this.baseUrl + `location/search/?query=${city}`)
  }
  getTemp(id) {
    return forkJoin([
      this.httpClient.get(this.baseUrl + ` location/${id}/2019/6/01/`),
      this.httpClient.get(this.baseUrl + ` location/${id}/2019/6/02/`),
      this.httpClient.get(this.baseUrl + ` location/${id}/2019/6/03/`),
      this.httpClient.get(this.baseUrl + ` location/${id}/2019/6/04/`),
      this.httpClient.get(this.baseUrl + ` location/${id}/2019/6/05/`),
      this.httpClient.get(this.baseUrl + ` location/${id}/2019/6/06/`),
      this.httpClient.get(this.baseUrl + ` location/${id}/2019/6/07/`),
    ]);
  }
}
