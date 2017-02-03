// import { Component, OnInit } from '@angular/core';

// @Component({
//   moduleId:module.id,
//   selector: 'sd-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import {Component, ElementRef} from '@angular/core';
import {AuthenticationService, User} from './login.service'
 
@Component({
	moduleId:module.id,
    selector: 'sd-login',
    providers: [AuthenticationService],
    templateUrl: './login.component.html', 
    styleUrls: ['./login.component.css']
})
 
export class LoginComponent {
 
    public user = new User('','');
    public errorMsg = '';
 
    constructor(
        private _service:AuthenticationService) {}
 
    login() {
        if(!this._service.login(this.user)){
            this.errorMsg = alert("Failed to login");

        }
    }
}