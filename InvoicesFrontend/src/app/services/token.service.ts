import { Injectable } from "@angular/core";
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class TokenService {
  tokenresp: any;
  constructor(private route: Router) { }

  isLogged(){
    return localStorage.getItem('token')!=null;
  }
  getToken(){
   return localStorage.getItem('token')||'';
  }
  logout(){
    localStorage.clear();
    this.route.navigateByUrl('/logowanie')
    }
  saveToken(tokendata: any) {
    localStorage.setItem('token', tokendata);     
       
  }
  getUserNameByToken(token: any) {
    console.log(token);
    let _token = token.split('.')[1];
    this.tokenresp = JSON.parse(atob(_token))
    return this.tokenresp["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
  }
  getRoleIdByToken(token: any) {
    let _token = token.split('.')[1];
    this.tokenresp = JSON.parse(atob(_token))
    return this.tokenresp["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  }
  getUserIdByToken(token: any) {
    let _token = token.split('.')[1];
    this.tokenresp = JSON.parse(atob(_token))
    return this.tokenresp["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  }
}
