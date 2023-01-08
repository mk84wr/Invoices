import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Invoice } from 'src/app/models/invoice';

@Component({
  selector: 'app-settle-invoice',
  templateUrl: './settle-invoice.component.html',
  styleUrls: ['./settle-invoice.component.css']
})
export class SettleInvoiceComponent implements OnInit {
  model:Partial<Invoice>={};
  settlementDate:string=""
  @Output()
  eventTask = new EventEmitter<Partial<Invoice>>();  
  payment:number=0;
  invoiceForm!:FormGroup;
  min!:number;
  max!:number;
  submitted = false;
  submittedButton =false;

  constructor( public activeModal: NgbActiveModal, private fb: FormBuilder) { }

  ngOnInit(): void {
    if(this.model.value!=undefined && this.model.toPay!=undefined){
      this.min = this.model.value>0?(Math.round((this.model.toPay-this.model.value) *100)/100):this.model.toPay;
      this.max = this.model.value>0?this.model.toPay:(Math.round((this.model.toPay-this.model.value) *100)/100);
    }
    else{
      this.min =0;
      this.max =0;
    }
    
    this.invoiceForm = this.fb.group({ 
      payment: new FormControl('', [Validators.min(this.min), Validators.max(this.max)]),
      settlementDate: new FormControl()
    })
  }
  get invoiceFormControl(){
    return this.invoiceForm.controls;    
  }
  settleInvoice(){
    if(!this.submittedButton){ 
    this.submitted = true; 
    this.submittedButton=true;
    if(this.invoiceForm.valid){
      if(this.model.toPay != undefined){
        this.model.toPay = this.model.toPay - this.payment;  
        this.model.toPay = Math.round(this.model.toPay *100)/100;      
      }    
      if(this.settlementDate ==""){
        this.model.settlementDate = undefined;      
      }
      else {
        this.model.settlementDate = new Date(this.settlementDate) ;      
      }            
      this.eventTask.emit(this.model );
      this.activeModal.close(this.model); 
    } 
    else{
      this.submittedButton =false;
    }       
  }
}
  
setPayment(){
    this.payment = this.model.toPay??0;    
}
}
