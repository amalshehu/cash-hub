import { InvoiceComponent } from './invoice/invoice.component';
import { Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Currency } from '../currency.interface';
import 'rxjs/add/operator/startWith';
import { CurrencyService } from '../currency.service';
import { MdDialog, MdDialogRef } from '@angular/material';

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
    tax: any;
  public myForm: FormGroup;
  public itemForm: any;
  stateCtrl: FormControl;

  filteredStates: any;
  rateCtrl: FormControl;
  selectedOption: string;
  errorMessage: any;
  currency: any;
  currencyValue: any;
  selctedValue: any;
  model: Currency;
  currencyType: string[];
  taxCtrl: FormControl;
  serialNumber: number;
  rows:any[];
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
  printData:any;
  dialogRef: MdDialogRef<any>;
  setting:any;
  constructor(
    public currencyservice: CurrencyService,
    private fb: FormBuilder,
    public dialog: MdDialog,
    public invoice: InvoiceComponent
    ) {
    this.stateCtrl = new FormControl();
    this.taxCtrl = new FormControl();
    this.setting = {};
    this.setting.cash = {};
    this.setting.keys = {};
    this.d = {};
    this.printData = {};
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
   filterCountry(val: string) {
    return val ? this.currency.filter((s) => s.name.match(new RegExp(val, 'gi'))) : this.currency;
  }
  ngOnInit() {
    this.getSettings();
    this.selectChange(event);
    this.currencyType = ['CN & Coins'];
    this.getCurrency();
    this.myForm = this.fb.group({
      serialNumber: [1000, [Validators.required, Validators.minLength(2)]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      date: ['', [Validators.required, Validators.minLength(2)]],
      address: ['', [Validators.required, Validators.minLength(2)]],
      remarks: ['', [Validators.required, Validators.minLength(2)]],
      idNumber: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(2)]],
      mobileNumber: ['', [Validators.required, Validators.minLength(2)]],
      nationality: [''],
      tax: [''],
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
      amount: [],
      presentRate: [],
      total: [{ value: [], disabled: true }, [Validators.minLength(2)]]
    });
     this.taxCtrl.valueChanges.subscribe(data => {
      console.log('Form changes', data);
      this.tax = data;
      const control: AbstractControl = this.myForm.get('tax');
      control.patchValue(data);

    });
   //  this.initItem[totalCost].valueChanges.subscribe(data => {
  //     console.log('Form changes', data)
  //     this.output = data
  //   })
  }
  initItem() {
    return this.fb.group({
      currencyName: [this.d.currencyName],
      currencyType: [this.d.currencyType],
      amount: [this.d.amount],
      presentRate: [this.d.presentRate],
      total: [this.d.total],
    });

  }
  openDialog(data) {
    // console.log(data);
    let dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
      if(this.selectedOption === 'print') {
        console.log('Print' + this.printData);

        this.invoice.print(this.printData);
      }
      if(this.selectedOption === 'save') {
        debugger
        this.save(data);
        this.currencyservice.create(this.model)
        .subscribe(
                data => {
                  console.log('Purchase confirmed');
                },
                error =>
                      this.errorMessage = <any>error);
        this.myForm.reset();
        this.itemForm.reset();
        this.stateCtrl.reset();
      }
    });
  }

  selectChange(event) {
    this.selctedValue = event;
  }
  printInvoice(){
    debugger
    this.invoice.print(this.myForm.value);

  }
  reset(){
    this.myForm.reset();
    this.itemForm.reset();
        this.stateCtrl.reset();
  }
  addItem(itemData: any) {
    this.d = itemData;
    this.d.total = this.getRupee();
    const control = <FormArray>this.myForm.controls['items'];
    control.push(this.initItem());
    let val = control.at(0);
    if (val.value.currencyName === null ) {
      control.removeAt(0);
    }

  }

  removeItem(i: number) {
    const control = <FormArray>this.myForm.controls['items'];
    control.removeAt(this.selctedValue);
  }
  save(formValue: any) {
    // call API to save
    // ...

     this.model = formValue as Currency;
    this.model = formValue;
    console.log(this.model);
    let stringified = JSON.stringify(this.model);
    this.model = JSON.parse(stringified);
     this.model.grandTotal = this.getGrand();
    this.model.taxAmount = this.getTaxAmount();
    this.model.totalCost = this.getTotal();
    console.log( 'this.model' + this.model);
    this.printData = this.model;
    debugger
  }
  getCurrency() {
    this.currencyservice.get()
      .subscribe(
      currency => this.currency = currency,
      error => this.errorMessage = <any>error
      );
  }
  handle($event: any) {
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
   getSettings() {
        this.currencyservice.staticSettings()
            .subscribe(
                setting => {
                  this.setting = setting;
                  this.serialNumber = setting.keys.serialNumber;
                  this.taxCtrl.setValue(setting.keys.tax);
                      console.log('Settings Recieved');
                },
                error =>
                      this.errorMessage = <any>error);
  };

  getRupee() {
    let rate:number = this.itemForm.value.presentRate;
    let amount:number = this.itemForm.value.amount;
    if (rate && amount) {
      var rupee = rate * amount;
    }
    else {
      rupee = 0.00;
    }
    return rupee;
  }
  getTaxAmount() {
    let taxAmount = 0.00;
    let total = parseFloat(this.itemForm.value.amount);
    if (this.getTotal()) {
      taxAmount = this.getTotal();
      taxAmount = (Math.round(taxAmount * (this.taxCtrl.value / 100)*100)/100);
       const control: AbstractControl = this.myForm.get('taxAmount');
      control.patchValue(taxAmount);
    }
    return taxAmount;
  }

  getTotal() {
    let total = 0.00;
    for (var i = 0; i <= this.myForm.value.items.length; i++) {
      let item = this.myForm.value.items[i];
      if (item) {
        total += (Math.round(item.amount * item.presentRate*100)/100);
        const control: AbstractControl = this.myForm.get('totalCost');
        control.patchValue(total);


      }
    }
    return total;
  }

  getGrand() {
    let gTotal = 0.00;
    let total = this.getTotal();
    let tax = this.getTaxAmount();
    if (total && tax) {
      gTotal=(Math.round((total + tax)*100)/100);
      const control: AbstractControl = this.myForm.get('grandTotal');
      control.patchValue(gTotal);
      return gTotal;

    }
    return gTotal;
  }
}

@Component({
  selector: 'print-dialog',
  template: `
<div md-dialog-content>What would you like to print?</div>
<div md-dialog-actions>
  <button md-button color = "primary"(click)="dialogRef.close('print')">Print & Save</button>
  <button md-button color="warn" (click)="dialogRef.close('save')">Done</button>
</div>

  `
})
export class DialogComponent {
  constructor(public dialogRef: MdDialogRef<any>) { }
}
