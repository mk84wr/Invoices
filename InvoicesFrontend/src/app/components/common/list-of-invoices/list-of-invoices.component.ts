import { Component, Input, OnChanges } from '@angular/core';
import { Invoice } from 'src/app/models/invoice';
import { AuthService } from 'src/app/services/auth.service';
import { InvoiceParentComponentApi } from '../../invoices/invoices.component';

@Component({
  selector: 'app-list-of-invoices',
  templateUrl: './list-of-invoices.component.html',
  styleUrls: ['./list-of-invoices.component.css']
})
export class ListOfInvoicesComponent implements OnChanges {
  @Input()
  invoices:Invoice[]=[];
  @Input()
  parentApi?: InvoiceParentComponentApi;
  @Input()
  categoryId?:number;
  @Input()
  customerId?:number;
  page=1;

  pageSize=10;
  
  constructor(public auth:AuthService) { }
  ngOnInit():void  {
    //this.pageSize =(this.customerId || this.categoryId)?8:10;
    
  }
  ngOnChanges():void{  
   
  }
  getInvoiceParentApi(){
    return this.parentApi;
   }
}

