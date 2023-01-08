import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerParentComponentApi } from 'src/app/components/customers/customers.component';
import { Customer } from 'src/app/models/customer';
import { CustomerParameters } from 'src/app/models/customerParameters';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmationComponent } from '../../confirmation/confirmation.component';
import { CustomerInvoicesComponent } from '../customer-invoices/customer-invoices.component';
import { EditCustomerComponent } from '../edit-customer/edit-customer.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent  {
  @Input()
  index?:number;
  @Input()
  customer?:Customer;
  @Input()
  parameters?:CustomerParameters;
  @Input()
  parentApi?: CustomerParentComponentApi
  

  constructor( private modalService: NgbModal, public auth:AuthService) { }
  

  edit(id?: number): void{
    if(this.auth.isModerator()){
    if(id){
   const modalRef = this.modalService.open(EditCustomerComponent,{ backdrop: 'static', keyboard: false});
   modalRef.componentInstance.model = Object.assign({},this.customer);
   modalRef.result
   .then((result) => {
     if (result) {              
       this.parentApi?.edit(result as Customer)
     }
   }).catch(() => {
     //Tu reakcja na błąd w tym zamknięcie okna
     console.log('error');
   });
  }
  }
}
  delete(id?:number):void{
    if(this.auth.isModerator()){
    if(id){  
      const modalRef = this.modalService.open(ConfirmationComponent,{ backdrop: 'static', keyboard: false});
      modalRef.componentInstance.title="Usunąć kontrahenta: "+this.customer?.name+"?";
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
  details(){
    const modalRef = this.modalService.open(CustomerDetailsComponent,{ backdrop: 'static', keyboard: false}); 
    modalRef.componentInstance.customer = Object.assign({},this.customer);
  }
  invoices(id?: number):void{
    const modalRef = this.modalService.open(CustomerInvoicesComponent,{ size: 'lg', backdrop: 'static', keyboard: false});
    let data ={
      customer:this.customer,
     // parameters:this.parameters
     }
   modalRef.componentInstance.fromParent = data;
  }
}
