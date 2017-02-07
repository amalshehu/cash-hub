import { Component, ElementRef } from '@angular/core';
import { AuthenticationService, User } from './login.service'

@Component({
    moduleId:module.id,
    selector: 'sd-login',
    providers: [AuthenticationService],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {
    user:any;
    public errorMsg:any;

    constructor(
        private _service:AuthenticationService) {
          this.user = {};
        }

    login() {
        if(!this._service.login(this.user)) {
            this.errorMsg = alert('Failed to login');

        }
    }
}
