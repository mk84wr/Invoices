import { HttpParams } from '@angular/common/http';
import { Component, OnInit,  } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { HttpInvoicesService } from 'src/app/api/http-invoices.service';
import { Invoice } from 'src/app/models/invoice';
import { InvoiceParameters } from 'src/app/models/invoiceParameters';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';
import { InvoiceFilterComponent } from './invoice-filter/invoice-filter.component';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import  '../../../assets/fonts/Amiri-Regular-normal.js';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

params:InvoiceParameters={};
invoices:Invoice[]=[];
isLoading=true;


defaultInvoiceFilter:InvoiceParameters= {        
  isActive: true,
  isVisible: true,
  ascending: false 
  };

invoiceSubscription!: Subscription;

  constructor(private modalService: NgbModal, private httpInvoicesService: HttpInvoicesService, public auth:AuthService) { }

  ngOnInit(): void {
    this.params = this.defaultInvoiceFilter;
    this.getInvoices(this.getParams(this.params));
  }
  
  open() {
    if(this.auth.isModerator()){
    const modalRef =this.modalService.open(AddInvoiceComponent, {backdrop: 'static', keyboard: false});    
    modalRef.componentInstance.eventTask.subscribe((x:Partial<Invoice>) =>{
      this.addInvoice(x as Invoice);
    });
  }
  }
  filter(){
    const modalRef = this.modalService.open(InvoiceFilterComponent, { backdrop: 'static', keyboard: false});     
    modalRef.componentInstance.model = Object.assign({}, this.params);    
    modalRef.result
    .then((result) => {
      if (result) { 
        this.isLoading=true;              
        this.params = result;        
        this.getInvoices(this.getParams(this.params));
      }
    }).catch(() => {      
      console.log('error');
    });      
  }
  toPdf(){
    const doc = new jsPDF();
      
    autoTable(doc, {
      head: [['Lp', 'Numer', 'Kontrahent', 'Termin', 'Należność', 'Telefon']],
      body: this.invoices.map((invoice, index) => [index+1, invoice.number, 
       invoice.customer? (invoice.customer?.length<24?invoice.customer :invoice.customer?.slice(0, 23)+'...'):'', invoice.dueDate.toString().slice(0, 10)??'', invoice.toPay??'',invoice.phone??'']),
      bodyStyles:{font:"Amiri-Regular"},
      headStyles:{font:"Amiri-Regular"}
      
  });    
   
   window.open(doc.output('bloburl'), '_blank' );  
   
  }
  ngOnDestroy(): void {
    this.invoiceSubscription && this.invoiceSubscription.unsubscribe();
  }
  addInvoice(invoice:Invoice){    
    this.invoiceSubscription = this.httpInvoicesService.postInvoice(invoice).subscribe({
      next: (response) => { 
        this.isLoading=true;          
        this.getInvoices(this.getParams(this.params));
     },
     error:(e)=>{       
       console.log(e);       
     }})      
    
  }
 editInvoice(invoice:Invoice){
  this.isLoading=true;
  this.invoiceSubscription = this.httpInvoicesService.putInvoice(invoice).subscribe({
    next: (response) => {  
      this.isLoading=true;      
      this.getInvoices(this.getParams(this.params));
   },
   error:(e)=>{
     console.log(e);       
   }})   
 }
 deleteInvoice(id:number){
  
  this.invoiceSubscription = this.httpInvoicesService.deleteInvoice(id).subscribe({
    next: (response) => { 
      this.isLoading=true;            
      this.getInvoices(this.getParams(this.params));
   },
   error:(e)=>{
     console.log(e);       
   }})   
 }
 getInvoices(param: HttpParams){
  this.invoiceSubscription = this.httpInvoicesService.getInvoices(param).subscribe({
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
 getInvoiceParentApi():InvoiceParentComponentApi{
  return{
    delete:(id)=>{this.deleteInvoice(id)},
    edit:(invoice)=>{this.editInvoice(invoice) },  
    settle:(invoice)=>{this.editInvoice(invoice) }  
  }
 }
  
}
export interface InvoiceParentComponentApi {
  delete:(id:number)=>void,
  edit:(invoice:Invoice)=>void,
  settle:(invoice:Invoice)=>void
}


