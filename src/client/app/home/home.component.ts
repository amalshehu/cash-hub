import { Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Currency } from '../currency.interface';
import 'rxjs/add/operator/startWith';
import { CurrencyService } from '../currency.service';
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
  public itemForm: any;
  stateCtrl: FormControl;

  filteredStates: any;
  rateCtrl: FormControl;

  errorMessage: any;
  currency: any;
  currencyValue: any;
  selctedValue: any;
  model: Currency;
  currencyType: string[];
  tax: number = 16;
  serialNumber: number = 47020;
  rows = [
    { currency: 'Dirham', type: 'CN & Coins', amount: 1000, rate: 14, rupee: 15000 },
    { currency: 'Dirham', type: 'CN & Coins', amount: 1000, rate: 14, rupee: 15000 }

  ];
  columns = [
    { prop: 'currencyName' },
    { name: 'currencyType' },
    { name: 'Amount' },
    { name: 'presentRate' },
    { name: 'total' }
  ];
  //  dataModel:any;
  presentRate = '';
  reactiveStates: any;
  d: any;
  constructor(
    public nameListService: CurrencyService,
    private fb: FormBuilder) {
    this.stateCtrl = new FormControl();
    this.rateCtrl = new FormControl();
    this.d = {};
    this.reactiveStates = this.stateCtrl.valueChanges
      .startWith(this.stateCtrl.value)
      .map(val => this.displayFn(val))
      .map(name => this.filterStates(name));
  }
  displayFn(value: any): string {
    return value && typeof value === 'object' ? value.currency : value;
  }

  filterStates(val: string) {
    return val ? this.currency.filter((s) => s.name.match(new RegExp(val, 'gi'))) : this.currency;
  }

  ngOnInit() {
    this.handleSelect(event);
    this.currencyType = ['CN & Coins']
    this.getCurrency();
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      date: ['', [Validators.required, Validators.minLength(2)]],
      address: ['', [Validators.required, Validators.minLength(2)]],
      remarks: ['', [Validators.required, Validators.minLength(2)]],
      serialNumber: [this.serialNumber],
      idNumber: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(2)]],
      mobileNumber: ['', [Validators.required, Validators.minLength(2)]],
      nationality: [''],
      tax: [this.tax],
      totalCost: [{ value: '', disabled: true }, [Validators.minLength(2)]],
      taxAmount: [{ value: '', disabled: true }, [Validators.minLength(2)]],
      grandTotal: [{ value: '', disabled: true }, [Validators.minLength(2)]],
      items: this.fb.array([
        this.initItem(),
      ])
    });
    this.itemForm = this.fb.group({
      currencyName: [''],
      currencyType: [''],
      amount: [''],
      presentRate: [''],
      total: [{ value: '', disabled: true }, [Validators.minLength(2)]]
    });
  }
  initItem() {
    return this.fb.group({
      currencyName: [this.d.currencyName],
      currencyType: [this.d.currencyType],
      amount: [this.d.amount],
      presentRate: [this.d.presentRate],
      total: [{ value: '', disabled: true }, [Validators.minLength(2)]]
    });

  }
  handleSelect(event) {
    this.selctedValue = event;
    console.log(this.selctedValue)
  }
  addItem(itemData: any) {
    this.d = itemData;

    const control = <FormArray>this.myForm.controls['items'];
    control.push(this.initItem());
    let val = control.at(0);
    debugger
    if (val.value.currencyName === null ) {
      debugger
      control.removeAt(0);
    }
  }

  removeItem(i: number) {
    const control = <FormArray>this.myForm.controls['items'];
    control.removeAt(0);
  }
  save(formValue: any) {
    // const control3: AbstractControl = this.myForm.get(`items.${i}.amount`);
    // const control4: AbstractControl = this.myForm.get(`items.${i}.total`);
    // let total = control3.value;
    // console.log(total);
    // control4.patchValue(total);
    // call API to save
    // ...
    this.model = formValue as Currency;
    this.model = formValue.value;
    console.log(this.model);
    // let stringified = JSON.stringify(this.model);
    // this.model = JSON.parse(stringified);
  }
  getCurrency() {
    this.nameListService.get()
      .subscribe(
      currency => this.currency = currency,
      error => this.errorMessage = <any>error
      );
  }
  handle($event: any) {
    console.log('Changed datassds: ', $event.source);
    let currencyRate: any;
    let currencyName: any;
    if ($event.source) {

      currencyName = $event.source.value.currency;
      currencyRate = $event.source.value.rate;
    } else {
      currencyRate = '';
      currencyName = '';

    }
    this.itemForm.patchValue({
      currencyName: currencyName,
      presentRate: currencyRate,
      total: this.getRupee()

    });


  }

  getTax() {
    //    var tax = this.myForm.value.tax =10;
    //    return tax;
  }
  getRupee() {
    let rate = this.itemForm.value.presentRate;
    let amount = this.itemForm.value.amount;
    if (rate && amount) {
      var rupee = rate * amount;
    }
    else {
      rupee = 0.00;
    }
    return rupee;
  }
  getTaxAmount() {
    let taxAmount = 0;
    let total = this.itemForm.value.amount;
    if (this.getTotal()) {
      taxAmount = this.getTotal();
      taxAmount = taxAmount * (10 / 100);
    }
    return taxAmount;
  }

  getTotal() {
    let total = 0;
    for (var i = 0; i <= this.myForm.value.items.length; i++) {
      let item = this.myForm.value.items[i];
      if (item) {
        total += (item.amount * item.presentRate);
      }
    }
    return total;
  }

  getGrand() {
    let gTotal = 0;
    let total = this.getTotal();
    let tax = this.getTaxAmount();
    if (total && tax) {
      return gTotal = total + tax;

    }
    return gTotal;
  }

}
