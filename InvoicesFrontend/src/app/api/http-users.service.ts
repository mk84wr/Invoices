import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangePassword } from '../models/changePassword';
import { Login } from '../models/login';
import {  ResetPassword } from '../models/resetPassword';
import { User } from '../models/user';
import { domain } from '../api/domain' 

@Injectable({
  providedIn: 'root'
})
export class HttpUsersService {
  private url = domain+'/user';

  constructor(private http: HttpClient) { }

  login(user:Login): Observable<any>{
    return this.http.post(domain+'/login',user);
  }
  getUser(id:number):Observable<User>{
    return this.http.get<User>(this.url +'/'+id);
  }
  getUsers():Observable<User[]>{
    return this.http.get<User[]>(this.url);
  }
  postUser(user:User){
    return this.http.post(this.url, user);
  }
  putUser(user:User){
    return this.http.put(this.url+'/'+user.id, user);
  }
  deleteUser(id:number){
    return this.http.delete(this.url+'/'+id);
  }
  resetPassword(reset: ResetPassword){
    return this.http.post(domain+'/password', reset );
  }
  changePassword(id: number, change: ChangePassword){
    return this.http.put(this.url +'/'+id +'/password', change);
  }
}
