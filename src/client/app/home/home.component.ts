import { Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import { NameListService } from '../shared/name-list/name-list.service';
import { Currency } from '../currency.interface';
/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent implements OnInit {

  errorMessage:any;
  currency:any;
  currencyValue:any;
  selectedValue: string;
  foods = [
     {value: '1', viewValue: 'CN & Coins'},
  ];
   rows = [
   { currency: 'Dirham', type: 'CN & Coins', amount: 1000, rate: 14,rupee:15000  }
   ];
   columns = [
   { prop: 'currency' },
   { name: 'Type' },
   { name: 'Amount' },
   { name: 'Rate' },
   { name: 'Rupee' }
   ];
   dataModel:any;
   constructor(
     public nameListService: NameListService) {
       this.dataModel = {};
       this.dataModel.currency = {};
       this.currency = {};
  }

    ngOnInit() {

    this.getCurrency();
    }
    save(data:Currency) {
      console.log(data);
    }
  getCurrency() {
    this.nameListService.get()
   .subscribe(
     currency => this.currency = currency,
     error => this.errorMessage = <any>error
   );
  }
  handleChange(value: any) {
    console.log('Changed data: ', value);

  }
}
