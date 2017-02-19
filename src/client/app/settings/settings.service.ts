import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions,URLSearchParams } from '@angular/http';

@Injectable()

export class SettingService {
  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });
  constructor (private http: Http) {}

  loadItems() {
    return this.http.get('/items').map(res => res.json());
    }

  addItem(item:any) {
    return this.http.post('/item', JSON.stringify(item), this.options);
    }

  enableSearch(name:any) {
    return this.http.get('/item'+name).map(res => res.json());
    }

  submitChange(item:any) {
    return this.http.put('/item'+item._id, JSON.stringify(item), this.options);
  }

  submitRemove(item:any) {
   return this.http.delete('/item'+item._id, this.options);
  }

  getItem(_id:any) {
   return this.http.get('/item'+_id).map(res => res.json());
  }

  search(term: string) {
   var search = new URLSearchParams();
   search.set('action', 'opensearch');
   search.set('search', term);
   search.set('format', 'json');
   return this.http
              .get('/itemss/'+term, { search })
              .map(res => res.json());
  }

}
