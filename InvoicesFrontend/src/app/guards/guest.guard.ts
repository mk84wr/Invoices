import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(private authService: AuthService, private route: Router){}
  canActivate(){
    if(!this.authService.isLogged()){
      return true;
    }
    this.route.navigate(['faktury'])
    return false;  
  }
  
}
