import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdministratorGuard implements CanActivate {
  constructor(private authService: AuthService, private route: Router){}
  canActivate(){  
    if(this.authService.isLogged()){  
    if(this.authService.isAdmin()){
      return true;
    }
    else{
      this.route.navigate([''])
    return false;     
    }
  }
  else{
    this.route.navigate(['logowanie'])
    return false;  
  }
}
}
  

