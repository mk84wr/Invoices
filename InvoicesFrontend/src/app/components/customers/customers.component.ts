import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { HttpCustomersService } from 'src/app/api/http-customers.service';
import { Customer } from 'src/app/models/customer';
import { CustomerParameters } from 'src/app/models/customerParameters';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { CustomerFilterComponent } from './customer-filter/customer-filter.component';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import  '../../../assets/fonts/Amiri-Regular-normal.js';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customer:Partial<Customer> ={}; 
  params:CustomerParameters={}; 
  customers:Customer[]=[];
  customerSubscription!: Subscription;
  isLoading=true;
  

  defaultCustomerFilter:CustomerParameters= {        
    isActive: true,
    isVisible: true,
    ascending: true           
    };

  constructor(private modalService: NgbModal,  private httpCustomersService: HttpCustomersService, public auth:AuthService) { }

  ngOnInit(): void {
    this.params = this.defaultCustomerFilter;
    this.getCustomers(this.getParams(this.params));
  }
  toPdf(){
    const doc = new jsPDF();
      
    autoTable(doc, {
      head: [['Lp', 'Nazwa', 'NIP', 'Należność', 'Telefon']],
      body: this.customers.map((customer, index) => [index+1, (customer.name.length<24?customer.name:customer.name.slice(0, 23)+'...'), customer.nip??'',  customer.sum??'', customer.phone??'']),
      bodyStyles:{font:"Amiri-Regular"},
      headStyles:{font:"Amiri-Regular"}
      
  });    
   //return doc.save("kontrahenci"); 
   window.open(doc.output('bloburl'), '_blank' );      
   
  }
  open() {
    this.modalService.open(AddCustomerComponent, {backdrop: 'static', keyboard: false});    
  }
  addCustomer(){
    if(this.auth.isModerator()){
    const modalRef = this.modalService.open(AddCustomerComponent, {backdrop: 'static', keyboard: false});   
    modalRef.componentInstance.eventTask.subscribe((x:Partial<Customer>) =>{
    this.customer.name = x.name;
    this.customer.nip = x.nip;
    this.customer.street = x.street;
    this.customer.city = x.city;
    this.postCustomer(this.customer as Customer);        
   });
  }
  }
  
  filter(){
    const modalRef = this.modalService.open(CustomerFilterComponent, { backdrop: 'static', keyboard: false});
    modalRef.componentInstance.model = Object.assign({}, this.params);
    
    modalRef.result
    .then((result) => {
      if (result) {  
        this.isLoading=true;       
        this.params = result;        
        this.getCustomers(this.getParams(this.params));
      }
    }).catch(() => {
      //Tu reakcja na błąd w tym zamknięcie okna
      console.log('error');
    });
  }
  postCustomer(customer: Customer){        
    this.customerSubscription =this.httpCustomersService.postCustomer(customer).subscribe({
      next: (response) => { 
        this.isLoading=true;             
        this.getCustomers(this.getParams(this.params));
     },
     error:(e)=>{
       console.log(e);       
     }})   
  }
  getCustomers(param:HttpParams){
    this.customerSubscription  = this.httpCustomersService.getCustomers(param).subscribe({
    next: (response) => {        
    this.customers = response.items;
    this.isLoading=false;
   },
   error:(e)=>{
     console.log(e);       
   }})   
  }
  editCustomer(customer: Customer){
    this.customerSubscription = this.httpCustomersService.putCustomer(customer).subscribe({
      next: (response) => {  
        this.isLoading=true;       
      this.getCustomers(this.getParams(this.params));
     },
     error:(e)=>{
       console.log(e);       
     }})   
  }
  deleteCustomer(id: number){
   this.customerSubscription= this.httpCustomersService.deleteCustomer(id).subscribe({
      next: (response) => {    
        this.isLoading=true;    
        this.getCustomers(this.getParams(this.params));
     },
     error:(e)=>{
       console.log(e); 
       alert("Nie można usunąć kontrahenta z przypisaną fakturą");      
     }})   
  }
  getParams(param:CustomerParameters):HttpParams{
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
getCustomerParentApi():CustomerParentComponentApi{
  return{
    delete:(id)=>{this.deleteCustomer(id)},
    edit:(customer)=>{this.editCustomer(customer)},    
  }
}
ngOnDestroy(): void {
  this.customerSubscription && this.customerSubscription.unsubscribe();
}
}
export interface CustomerParentComponentApi {
  delete:(id:number)=>void,
  edit:(customer:Customer)=>void  
}
