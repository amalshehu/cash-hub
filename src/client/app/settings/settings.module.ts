import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { RegisterRoutingModule } from './settings-routing.module';

@NgModule({
  imports: [
    CommonModule, RegisterRoutingModule
  ],
  declarations: [SettingsComponent],
  exports: [SettingsComponent]
})
export class RegisterModule { }
