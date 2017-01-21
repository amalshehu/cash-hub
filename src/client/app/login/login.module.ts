import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { MaterialModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,LoginRoutingModule, MaterialModule.forRoot()
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class LoginModule { }
