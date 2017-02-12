import { Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
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
  public myForm: FormGroup;

  errorMessage:any;
  currency:any;
  currencyValue:any;
  selectedValue: string;
  cTypes = [
     {value: '1', viewValue: 'CN & Coins'}
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
   presentRate = '';
   constructor(
     public nameListService: NameListService,
     private fb: FormBuilder) {
       this.dataModel = {};
       this.myForm = fb.group({
             name: ['', [Validators.required, Validators.minLength(2)]],
             date: ['', [Validators.required, Validators.minLength(2)]],
             address: ['', [Validators.required, Validators.minLength(2)]],
             remarks: ['', [Validators.required, Validators.minLength(2)]],
             serialNumber: ['', [Validators.required, Validators.minLength(1)]],
             idNumber: ['', [Validators.required, Validators.minLength(2)]],
             phoneNumber: ['', [Validators.required, Validators.minLength(2)]],
             mobileNumber: ['', [Validators.required, Validators.minLength(2)]],
             nationality: [''],
             totalCost: ['', [Validators.minLength(0)]],
             tax: ['', [Validators.minLength(2)]],
             taxAmount: ['', [Validators.minLength(2)]],
             grandTotal: ['', [Validators.minLength(2)]],
             items: fb.array([
                 this.initItem(),
             ])
         });

     this.currency = {};
  }

    ngOnInit() {

    this.getCurrency();
    }
    initItem() {
      return this.fb.group({
          currencyName: [''],
          currencyType: [''],
          amount: [''],
          presentRate:this.myForm,
          total:['']
      });
  }

  addItem(i) {
    const control = <FormArray>this.myForm.controls['items'];
       control.push(this.initItem());
  }

  removeItem(i: number) {
      const control = <FormArray>this.myForm.controls['items'];
      control.removeAt(i);
  }
  save(model: Currency) {
        // call API to save
        // ...
        console.log(model);
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
    if (value) {
      this.presentRate = value.value.rate;
  }
}
  change(value: any) {
    console.log('Changed datassds: ', value);
    // let name = value.value;
    // this.myForm.controls['nationality'].setValue(name);

  }
}
