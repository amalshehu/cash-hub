import { Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
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
          currency: [''],
          currencyName: [''],
          currencyType: [''],
          amount: [],
          presentRate:[''],
          total:[]
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
  save(model:any, i: index) {
    // const control3: AbstractControl = this.myForm.get(`items.${i}.amount`);
    // const control4: AbstractControl = this.myForm.get(`items.${i}.total`);
    // let total = control3.value;
    // console.log(total);
    // control4.patchValue(total);
        // call API to save
        // ...
        console.log(model.value);
    }
  getCurrency() {
    this.nameListService.get()
   .subscribe(
     currency => this.currency = currency,
     error => this.errorMessage = <any>error
   );
  }
  handleChange($event: any, i: index) {
  console.log($event)
  const control: AbstractControl = this.myForm.get(`items.${i}.presentRate`);
  const control2: AbstractControl = this.myForm.get(`items.${i}.currencyName`);


  let currencyRate: any;
  let currencyName:any;
  if ($event.value) {
    currencyName = $event.value.currency;
    currencyRate = $event.value.rate;
  } else {
    currencyRate = '';
    currencyName = '';
  }
  control.patchValue(currencyRate);
  control2.patchValue(currencyName);

}
  change(value: any) {
    console.log('Changed datassds: ', value);
    // let name = value.value;
    // this.myForm.controls['nationality'].setValue(name);
  }

}
