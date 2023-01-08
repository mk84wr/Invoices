import { Component,    OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InvoiceParameters } from 'src/app/models/invoiceParameters';


@Component({
  selector: 'app-invoice-filter',
  templateUrl: './invoice-filter.component.html',
  styleUrls: ['./invoice-filter.component.css']
})
export class InvoiceFilterComponent implements OnInit {
 
 model:InvoiceParameters={}; 
 submittedButton =false;

 fields:{en:string, pl:string}[]= 
 [{en:"Number", pl:"Numer"},
  {en:"Customer.Name", pl: "Kontrahent"},
 {en:"Category.Name", pl:"Kategoria"},
 {en:"DateOfInvoice", pl:"Data wystawienia"},
 {en: "DueDate", pl:"Termin płatności"},
 {en:"Value", pl:"Wartość faktury"},
 {en:"ToPay", pl: "Pozostało do zapłaty"}];
  
  constructor(public activeModal: NgbActiveModal ) { }

  ngOnInit(): void {
    if(this.model.ascending==null)this.model.ascending=false;
    }
  
  filter(){  
    if(!this.submittedButton){
      this.submittedButton=true;   
      if(this.model.maxDateOfInvoice?.toString()=='')this.model.maxDateOfInvoice=undefined;
      if(this.model.minDateOfInvoice?.toString()=='')this.model.minDateOfInvoice=undefined;
      if(this.model.maxDueDate?.toString()=='')this.model.maxDueDate=undefined;
      if(this.model.minDueDate?.toString()=='')this.model.minDueDate=undefined;
      if(this.model.minSettlementDate?.toString()=='')this.model.minSettlementDate=undefined;
      if(this.model.maxSettlementDate?.toString()=='')this.model.maxSettlementDate=undefined;
      this.model.customer = this.model.customer?.trim();
      this.model.category = this.model.category?.trim();
      this.model.nip = this.model.nip?.trim();
      this.model.number = this.model.number?.trim();
      if(this.model.customer=='')this.model.customer=undefined;
      if(this.model.category=='')this.model.category=undefined;
      if(this.model.nip=='')this.model.nip=undefined;
      if(this.model.number=='')this.model.number=undefined;
      this.activeModal.close(this.model);
    }
  }  
}
