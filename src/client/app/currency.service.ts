import { Currency } from './currency.interface';
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/Rx';

let baseUrl:string = 'assets/data.json';
let settingUrl:string = 'assets/settings.json';
@Injectable()
export class CurrencyService {
  tax: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  constructor(private http: Http) { }

  create(currency:Currency) {
          let headers = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: headers });
          let body = JSON.stringify(currency);
          return this.http.post(baseUrl, body, options).map((res: Response) => res.json());
        }
  edit(currency:Currency) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(currency);
    return this.http.put(baseUrl, body, options).map((res: Response) => res.json());
  }
  staticSettings() {
          return this.http.get(settingUrl)
                          .map((res: Response) => res.json())
                          .do(data => console.log('Static settings recieved:', data))  // debug
                          .catch(this.handleError);
  }
  get(): Observable<string[]> {
    return this.http.get(baseUrl)
      .map((res: Response) => res.json())
      // .do(data => console.log('server data:', data))  // debug
      .catch(this.handleError);
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
