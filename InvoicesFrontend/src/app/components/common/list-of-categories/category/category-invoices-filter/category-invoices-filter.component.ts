import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InvoiceParameters } from 'src/app/models/invoiceParameters';

@Component({
  selector: 'app-category-invoices-filter',
  templateUrl: './category-invoices-filter.component.html',
  styleUrls: ['./category-invoices-filter.component.css']
})
export class CategoryInvoicesFilterComponent implements OnInit {

  model:InvoiceParameters={}; 
  submittedButton =false;
  
  fields:{en:string, pl:string}[]= 
  [{en:"Namber", pl:"Numer"},   
  {en:"Customer", pl:"Kontrahent"},
  {en:"DateOfInvoice", pl:"Data wystawienia"},
  {en: "DueDate", pl:"Termin płatności"},
  {en:"Value", pl:"Wartość faktury"},
  {en:"ToPay", pl: "Pozostało do zapłaty"}];
  constructor(public activeModal: NgbActiveModal) { }

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
      this.activeModal.close(this.model);
    }
  }
}
