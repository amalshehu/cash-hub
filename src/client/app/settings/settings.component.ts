import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import 'rxjs/Rx';
import { SettingService } from './settings.service';

@Component({
  moduleId: module.id,
  selector: 'sd-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  searchString: string;
  names: String;
  items: any = [];
  options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' }) });
  inChange: boolean = false;
  inSearch: boolean = false;
  inPush: boolean = false;
  item: any = {};


  addItemForm: FormGroup;
  cname = new FormControl('', Validators.required);
  ccode = new FormControl('', Validators.required);
  ccost = new FormControl('', Validators.required);
  crate = new FormControl('', Validators.required);

  constructor(private http: Http, private formBuilder: FormBuilder, private settingService: SettingService) { }

  ngOnInit() {
    this.addItemForm = this.formBuilder.group({
      cname: this.cname,
      ccode: this.ccode,
      ccost: this.ccost,
      crate: this.crate
    });
    this.loadItems();
  }
  loadItems() {
    this.http.get('/items').map(res => res.json()).subscribe(
      data => this.items = data,
      error => console.log(error)
    );
  }
  enableChange(item: any) {
    this.inChange = true;
    this.item = item;
  }

  cancelChange() {
    this.inChange = false;
    this.item = {};
    this.loadItems();
  }
  submitChange(item: any) {
    this.http.put('/item/' + item._id, JSON.stringify(item), this.options).subscribe(
      res => {
        this.inChange = false;
        this.item = item;
      },
      error => console.log(error)
    );
  }
  submitRemove(item: any) {
    let remOptions = new RequestOptions({
      body: '',
      headers: new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' })
    }
    );
    if (window.confirm('Do you want to permanently delete this Currency?')) {
      this.http.delete('/item/' + item._id, remOptions).subscribe(
        res => {
          let pos = this.items.map((e: any) => { return e._id; }).indexOf(item._id);
          this.items.splice(pos, 1);
        },
        error => console.log(error)
      );
    }
  }
  enablePush() {
    this.inPush = true;
    this.item = {};
    this.loadItems();
  }
  cancelPush() {
    this.inPush = false;
    this.item = {};
    this.loadItems();
  }

  cancelSearch() {
    this.inChange = false;
    this.item = {};
    this.loadItems();
  }

  submitPush() {
    this.http.post('/item', JSON.stringify(this.addItemForm.value), this.options).subscribe(
      res => {
        this.items.push(res.json());
        this.addItemForm.reset();
      },
      error => console.log(error)
    );
  }

  enableSearch(name: any) {
    this.inSearch = true;
    this.http.get('/items/' + name).map(res => res.json()).subscribe(
      data => this.items = data,
      error => console.log(error)
    );
  }
  search(term: any) {
    this.inSearch = true;
    this.settingService.search(term).subscribe(
      data => this.items = data);
  }
}
