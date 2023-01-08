import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { HttpCustomersService } from 'src/app/api/http-customers.service';
import { InvoiceParentComponentApi } from 'src/app/components/invoices/invoices.component';
import { Customer } from 'src/app/models/customer';

import { Invoice } from 'src/app/models/invoice';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmationComponent } from '../../confirmation/confirmation.component';
import { CustomerDetailsComponent } from '../../list-of-customers/customer/customer-details/customer-details.component';
import { EditInvoiceComponent } from '../edit-invoice/edit-invoice.component';
import { InvoiceDetailsComponent } from '../invoice-details/invoice-details.component';


import { SettleInvoiceComponent } from '../settle-invoice/settle-invoice.component';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit  {
  invoicesSubscription!: Subscription;
  @Input()
  invoice?:Invoice;
  @Input()
  index?:number;
  @Input()
  customerId?:number;
  @Input()
  categoryId?:number;
  @Input()
  parentApi?: InvoiceParentComponentApi
 
  
  constructor( private modalService: NgbModal, public auth:AuthService, private httpCustomersService: HttpCustomersService) { }
  
  delete(id?:number): void{ 
    if(this.auth.isModerator()){  
   if(id){   
    const modalRef = this.modalService.open(ConfirmationComponent,{ backdrop: 'static', keyboard: false});
      modalRef.componentInstance.title="Usunąć fakturę nr: "+this.invoice?.number+"?";
      modalRef.result
    .then((result) => {
     if (result) {        
      this.parentApi?.delete(id);
     }
    }).catch(() => {
     //Tu reakcja na błąd w tym zamknięcie okna
     console.log('error');
    }); 
   } 
  }
}
  edit(id?: number): void{
    if(this.auth.isModerator()){
    if(id){
   const modalRef = this.modalService.open(EditInvoiceComponent,{ backdrop: 'static', keyboard: false}); 
  modalRef.componentInstance.model = Object.assign({},this.invoice);   
  modalRef.result
    .then((result) => {
      if (result) {   
            
        this.parentApi?.edit(result as Invoice)
      }
    }).catch(() => {
      //Tu reakcja na błąd w tym zamknięcie okna
      console.log('error');
    });
  }
  }
}
  settle(id?:number): void{
    if(this.auth.isModerator()){
    if(id){
      const modalRef = this.modalService.open(SettleInvoiceComponent,{ backdrop: 'static', keyboard: false});      
      modalRef.componentInstance.model = Object.assign({},this.invoice);
     
  modalRef.result
    .then((result) => {
      if (result) {        
        this.parentApi?.settle(result as Invoice)
      }
    }).catch(() => {
      //Tu reakcja na błąd w tym zamknięcie okna
      console.log('error');
    });
  }
  }
}
  details(){
    const modalRef = this.modalService.open(InvoiceDetailsComponent,{ backdrop: 'static', keyboard: false}); 
    modalRef.componentInstance.invoice = Object.assign({},this.invoice);
  }
  customerDetails(id?:number){
    if(id){
    this.httpCustomersService.getCustomer(id).subscribe({
      next: (response) => {
        const modalRef = this.modalService.open(CustomerDetailsComponent,{ backdrop: 'static', keyboard: false}); 
        modalRef.componentInstance.customer = Object.assign({}, response )
      },
      error:(e)=>{
        console.log(e);       
      }
    })
  }
  }
  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.invoicesSubscription && this.invoicesSubscription.unsubscribe();
  }   
}
