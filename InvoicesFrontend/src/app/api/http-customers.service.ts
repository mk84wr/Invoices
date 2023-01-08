import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { CustomerPage } from '../models/customerPage';
import { InvoicePage } from '../models/invoicePage';
import { domain } from '../api/domain' 

@Injectable({
  providedIn: 'root'
})
export class HttpCustomersService {
  private url = domain+'/customer';

  constructor(private http: HttpClient) { }
  getCustomer(id: number):Observable<Customer>{
    return this.http.get<Customer>(this.url +'/' +id);
  }
  getCustomers(params: HttpParams):Observable<CustomerPage>{
    return this.http.get<CustomerPage>(this.url, {params});
  }
  getInvoices(id:number, params: HttpParams ):Observable<InvoicePage>{
    return this.http.get<InvoicePage>(this.url+'/'+id+'/invoice', {params});
  }
  postCustomer(customer: Customer):Observable<Customer>{
    return this.http.post<Customer>(this.url, customer);
  }
  getBusiness(nip:string):Observable<Customer>{
    return this.http.get<Customer>(domain+'/business/'+nip);
  }
  putCustomer(customer:Customer){    
    return this.http.put(this.url+'/'+customer.id, customer);
  }
  deleteCustomer(id:number){
    return this.http.delete(this.url +'/' +id);
  }
}
