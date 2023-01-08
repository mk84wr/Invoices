import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '../models/invoice';
import { InvoicePage } from '../models/invoicePage';
import { Update } from '../models/update';
import { domain } from '../api/domain' 

@Injectable({
  providedIn: 'root'
})
export class HttpInvoicesService {

  private url = domain+'/invoice';

  constructor(private http: HttpClient) {}
    
    getInvoice(id: number): Observable<Invoice>{
      return this.http.get<Invoice>(this.url + '/' + id);
    }
    getInvoices(params: HttpParams):Observable<InvoicePage>{
      return this.http.get<InvoicePage>(this.url, {params});
    }
    postInvoice(invoice:Invoice){
      return this.http.post(this.url, invoice);
    }
    putInvoice(invoice:Invoice){      
      return this.http.put(this.url + '/'+invoice.id, invoice);
    }
    deleteInvoice(id: number): Observable<{}>{      
      return this.http.delete<{}>(this.url + '/'+id);           
    }
    getUpdateDate(id:number): Observable<Update>{
      return this.http.get<Update>(domain+'/update/'+id);
    }
    putUpdateDate(update: Update){      
      return this.http.put(domain+'/update/'+update.id, update);
    }
}
