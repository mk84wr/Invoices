import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private authService: AuthService, private route: Router){}
  canActivate(){    
    if(this.authService.isLogged()){
      return true;
    }
    this.route.navigate(['logowanie'])
    return false;  
  }  
}
