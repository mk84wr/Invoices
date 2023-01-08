import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { HttpCustomersService } from 'src/app/api/http-customers.service';
import { Invoice } from 'src/app/models/invoice';
import { InvoiceParameters } from 'src/app/models/invoiceParameters';
import { CustomerInvoicesFilterComponent } from './customer-invoices-filter/customer-invoices-filter.component';

@Component({
  selector: 'app-customer-invoices',
  templateUrl: './customer-invoices.component.html',
  styleUrls: ['./customer-invoices.component.css']
})
export class CustomerInvoicesComponent implements OnInit {
  @Input() fromParent: any; 
  invoiceParameters:InvoiceParameters={}
  invoices:Invoice[]=[];
  customerSubscription!: Subscription;
  isLoading=true;

  defaultInvoiceFilter:InvoiceParameters= {    
    ascending: false 
    };
 

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private httpCustomersService: HttpCustomersService) { }

  ngOnInit(): void {
    this.invoiceParameters = this.defaultInvoiceFilter;
    this.getInvoicesFromCustomer(this.fromParent.customer.id, this.getParams(this.invoiceParameters));   
  }
  ngOnDestroy(): void {
    this.customerSubscription && this.customerSubscription.unsubscribe();
  }
  filter(){
    const modalRef = this.modalService.open(CustomerInvoicesFilterComponent, { backdrop: 'static', keyboard: false});
    modalRef.componentInstance.model = Object.assign({}, this.invoiceParameters);

    modalRef.result
    .then((result) => {
      if (result) { 
        this.isLoading=true;         
        this.invoiceParameters = result;        
        this.getInvoicesFromCustomer(this.fromParent.customer.id, this.getParams(this.invoiceParameters));  
      }
    }).catch(() => {      
      console.log('error');
    });
  }
  getInvoicesFromCustomer(id:number, params: HttpParams){
    this.customerSubscription = this.httpCustomersService.getInvoices(id, params).subscribe({
      next: (response) => {        
        this.invoices = response.items;
        this.isLoading=false;
     },
     error:(e)=>{
       console.log(e);       
     }})   
  }
  getParams(param:InvoiceParameters):HttpParams{
    let params = new HttpParams();
     
      if(param){
      for (let [key, value] of Object.entries(param)) {
        if(value!=null){
        if(value instanceof Date){
          const param: string = value.toISOString().substring(0, 10); 
          params = params.set(key, param);
      }
      else{
        params = params.set(key, value);
      }
    }
  }
  }
  return params;
   }
}
