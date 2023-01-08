import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private tokenService: TokenService) { }

  isLogged():boolean{
    if(this.tokenService.isLogged()) return true;
    else return false;
  }
  isModerator():boolean{
    let role = this.tokenService.getRoleIdByToken(this.tokenService.getToken());
    if(role== 1 || role==2)  return true;
    else return false;
  }
  isAdmin():boolean{
    let role = this.tokenService.getRoleIdByToken(this.tokenService.getToken());
    if(role== 1) return true;
    else return false;
  }
}
