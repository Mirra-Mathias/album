import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthentificationService} from "./authentification.service";

interface User {
  token: string;
  user : {
    id: number;
    login: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate{


  currentUser: User | undefined;

  constructor(private router: Router,
              private authenticationService: AuthentificationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const signed = this.currentUser ? true : false;

    if(signed !== true){
      this.router.navigate([''])
    }

    return signed;
  }

}
