import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { InvoicePage } from '../models/invoicePage';
import { domain } from '../api/domain' 

@Injectable({
  providedIn: 'root'
})
export class HttpCategoriesService {

  private url = domain+'/category';

  private headers= new HttpHeaders({ 
    
    'Content-Type': 'application/json'
  })
  // .set('content-type', 'application/json')
  // .set('Access-Control-Allow-Origin', '*');
  
  constructor(private http: HttpClient) {}
    
   getCategories(): Observable<Category[]>{
     return this.http.get<Category[]>(this.url );
   }
   getCategory(id:number): Observable<Category>{
     return this.http.get<Category>(this.url + '/' + id);
   }
   postCategory(category:Category): Observable<Category> {
     return this.http.post<Category>(this.url, category);
   }
   putCategory(category:Category): Observable<Category> {
     return this.http.put<Category>(this.url + '/' + category.id, category);
   }
   getInvoices(id:number, params: HttpParams ):Observable<InvoicePage>{
    return this.http.get<InvoicePage>(this.url+'/'+id+'/invoice', {params});
  }
  deleteCategory(id:number){
    return this.http.delete(this.url +'/'+id, { 'headers': this.headers, withCredentials: true });
  }
}
