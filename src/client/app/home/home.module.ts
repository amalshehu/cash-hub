import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent, HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Md2Module }  from 'md2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableComponent } from './data-table.component';
import { CurrencyService } from '../currency.service';
import { InvoiceComponent } from './invoice/invoice.component';

@NgModule({
  imports: [CommonModule,
            HomeRoutingModule,
            SharedModule,
            MaterialModule.forRoot(),
            FlexLayoutModule.forRoot(),
            NgxDatatableModule,
            Md2Module.forRoot(),
            ReactiveFormsModule],
  declarations: [HomeComponent, DataTableComponent,
    InvoiceComponent, DialogComponent
],
  exports: [HomeComponent, DataTableComponent],
  providers: [CurrencyService, InvoiceComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [DialogComponent],
})
export class HomeModule { }
