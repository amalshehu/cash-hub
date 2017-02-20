import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Md2Module }  from 'md2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingService } from './settings.service';
@NgModule({
  imports: [
    CommonModule, SettingsRoutingModule, MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(), ReactiveFormsModule
  ],
  declarations: [SettingsComponent],
  exports: [SettingsComponent],
  providers: [SettingService]
})
export class SettingsModule { }
