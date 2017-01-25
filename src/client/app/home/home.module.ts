import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NameListService } from '../shared/name-list/name-list.service';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, SharedModule, MaterialModule.forRoot(), FlexLayoutModule.forRoot(), NgxDatatableModule],
  declarations: [HomeComponent],
  exports: [HomeComponent],
  providers: [NameListService]
})
export class HomeModule { }
