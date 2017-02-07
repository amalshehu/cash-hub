import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { NameListService } from '../shared/name-list/name-list.service';

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
  selectedValue: string;
  foods = [
     {value: '1', viewValue: 'CN & Coins'},
  ];

   rows = [
   { currency: 'Dirham', type: 'CN & Coins', amount: 1000, rate: 14,rupee:15000  },
   { name: 'Dany', gender: 'Male', company: 'KFC' },
   { name: 'Molly', gender: 'Female', company: 'Burger King' },
   ];
   columns = [
   { prop: 'currency' },
   { name: 'Type' },
   { name: 'Amount' },
   { name: 'Rate' },
   { name: 'Rupee' }
   ];
   constructor(public nameListService: NameListService) {
    this.currency = {};
  }

    ngOnInit() {
    this.getCurrency();
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
      this.currencyValue = value.value.value;
    }

  }
