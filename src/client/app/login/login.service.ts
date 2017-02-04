import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

export class User {
  constructor(
    public email: any,
    public password: any) { }
}

var users = [
  new User('admin@admin.com','admin'),
  new User('user1@gmail.com','a23')
];

@Injectable()
export class AuthenticationService {

  constructor(
    private _router: Router){}

  logout() {
    localStorage.removeItem('user');
    this._router.navigate(['Login']);
  }

  login(user:any){
    var authenticatedUser = users.find(u => u.email === user.email);
    if (authenticatedUser && authenticatedUser.password === user.password){
      localStorage.setItem("user", authenticatedUser);
      this._router.navigate(['Home']);
      return true;
    }
    return false;

  }

   checkCredentials(){
    if (localStorage.getItem("user") === null){
        this._router.navigate(['Login']);
    }
  }
}
