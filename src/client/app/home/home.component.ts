import { Component, OnInit } from '@angular/core';
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
    currencyCodes: Array<any> = [
    { name: 'UAE Dirham', value: '19' },
    { name: 'Dollar', value: '65' },
    { name: 'Australian dollar', value: '63' },
    { name: 'Riyal', value: '25' },
    { name: 'Yen', value: '80' }
    ];
   item: any;
   currency:any;
  selectedValue: string;
  currencyValue:any;
   foods = [
     {value: 'steak-0', viewValue: 'Steak'},
     {value: 'pizza-1', viewValue: 'Pizza'},
     {value: 'tacos-2', viewValue: 'Tacos'}
   ];

   rows = [
   { name: 'Austin', gender: 'Male', company: 'Swimlane' },
   { name: 'Dany', gender: 'Male', company: 'KFC' },
   { name: 'Molly', gender: 'Female', company: 'Burger King' },
   ];
   columns = [
   { prop: 'name' },
   { name: 'Gender' },
   { name: 'Company' }
   ];
  /**
   * Creates an instance of the HomeComponent with the injected
   * NameListService.
   *
   * @param {NameListService} nameListService - The injected NameListService.
   */
  constructor() {
    this.currency = {};
  }

    ngOnInit() {

    }
    handleChange(value: any) {
      console.log('Changed data: ', value);
      this.currencyValue = value.value.value;
    }

  }
