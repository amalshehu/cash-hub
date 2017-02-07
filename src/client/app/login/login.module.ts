import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { MaterialModule } from '@angular/material';
import { FormsModule }   from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,LoginRoutingModule, FormsModule, MaterialModule.forRoot(), FlexLayoutModule.forRoot()
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class LoginModule { }
