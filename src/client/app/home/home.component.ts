import { Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NameListService } from '../shared/name-list/name-list.service';
import { Currency, Item } from '../currency.interface';
import 'rxjs/add/operator/startWith';

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
  public tempItems:FormGroup;

  stateCtrl: FormControl;
  filteredStates: any;

  errorMessage:any;
  currency:any;
  currencyValue:any;
  selectedValue: string;
  items:any = [];
  item :any= {};
  temp:any={};
  temps:any=[];
  model:Currency;
  currencyType:string[];
   rows = [
   { currency: 'Dirham', type: 'CN & Coins', amount: 1000, rate: 14,rupee:15000  },
   ];
  //  dataModel:any;
   presentRate = '';
   reactiveStates: any;

   constructor(
     public nameListService: NameListService,
     private fb: FormBuilder) {
    //  this.currency = {};
    //  this.model = {};
    //  this.model.items. = [];
    this.stateCtrl = new FormControl();

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
    this.currencyType = ['CN & Coins']
    this.getCurrency();
    this.tempItems = this.fb.group({
      currency: [''],
      currencyName: [''],
      currencyType: [''],
      amount: [],
      presentRate:[''],
      total:[{ value: '', disabled: true }, [Validators.minLength(2)]]
   });
    this.myForm = this.fb.group({
          name: ['', [Validators.required, Validators.minLength(2)]],
          date: ['', [Validators.required, Validators.minLength(2)]],
          address: ['', [Validators.required, Validators.minLength(2)]],
          remarks: ['', [Validators.required, Validators.minLength(2)]],
          serialNumber: ['', [Validators.required, Validators.minLength(1)]],
          idNumber: ['', [Validators.required, Validators.minLength(2)]],
          phoneNumber: ['', [Validators.required, Validators.minLength(2)]],
          mobileNumber: ['', [Validators.required, Validators.minLength(2)]],
          nationality: [''],
          tax: ['', [Validators.minLength(2)]],
          totalCost: [{ value: '', disabled: true }, [Validators.minLength(2)]],
          taxAmount: [{ value: '', disabled: true }, [Validators.minLength(2)]],
          grandTotal: [{ value: '', disabled: true }, [Validators.minLength(2)]],
          items: this.fb.array([
              this.initItem(),
          ])
      });
    }
    initItem() {
      return this.fb.group({
          currencyName: [''],
          currencyType: [''],
          amount: [],
          presentRate:[''],
          total:[{ value: '', disabled: true }, [Validators.minLength(2)]]
      });
  }


  addItem(data) {

    // const control = <FormArray>this.myForm.controls['items'];
       console.log(data);
      //  control.push(this.initItem());
  }

  removeItem(i: number) {
      const control = <FormArray>this.myForm.controls['items'];
      control.removeAt(i);
  }
  save(formValue:any) {
    // const control3: AbstractControl = this.myForm.get(`items.${i}.amount`);
    // const control4: AbstractControl = this.myForm.get(`items.${i}.total`);
    // let total = control3.value;
    // console.log(total);
    // control4.patchValue(total);
        // call API to save
        // ...
        // this.model = formValue as Currency;
        this.model = formValue;
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
  handleChange($event: any, i: index) {
  console.log($event)
  const control: AbstractControl = this.myForm.get(`tempItems.presentRate`);
  const control2: AbstractControl = this.myForm.get(`tempItems.currencyName`);


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
  loadProducts(){
      this.http.get("/products").map(res => res.json()).subscribe(
        data => this.products = data,
        error => console.log(error)
      );
    }

   onBlurMethod(i) {
    this.http.get("/productssss/"+this.myForm.value.products[i].productName).map(res => res.json()).subscribe(
        data =>{ this.seas = data;

         this.myForm.value.products[i].cost=this.seas.pcost;

          },
        error => console.log(error)
     );
  }


  BlurMethod(i){
    this.http.get("/productssss/"+this.myForm.value.products[i].productName).map(res => res.json()).subscribe(
        data =>{ this.seas = data;
      this.myForm.value.products[i].cost=this.seas.pcost;
         this.myForm.value.products[i].total=this.seas.pcost*this.myForm.value.products[i].quantity;

          },
        error => console.log(error)
     );

  }
   getTax() {
     var tax = this.myForm.value.tax =10;
     return tax;
   }
   getRupee() {
     let rate = this.myForm.value.items[0].presentRate;
     let amount = this.myForm.value.items[0].amount;
     if (rate && amount) {
        var rupee = rate * amount ;
     }
     return rupee;
   }
   getTaxAmount() {
     let taxAmount;
     if (this.getRupee()) {
       taxAmount = this.getRupee();
       taxAmount = taxAmount * (10 / 100);
     }
    //  if (this.myForm.value.items[0].amount) {
    //    return this.myForm.get('items[0].amount').valueChanges
    //        .subscribe(val => {
    //          this.myForm.get('taxAmount').updateValueAndValidity(val * 11 )
    //        }
    //  );
    //  }
    return taxAmount;;
   }

   getTotal() {
     var total = 0;
     for(var i = 0; i === this.myForm.value.items.length; i++) {
        var item = this.myForm.value.items[i];
        total += (item.amount * item.presentRate);
        this.myForm.controls['totalCost'].setValue(total);
        this.myForm.controls['grandTotal']
        .setValue(this.myForm.value.totalCost+this.myForm.value.totalCost*(this.myForm.value.tax/100))
      }
      return total;
    }

}
