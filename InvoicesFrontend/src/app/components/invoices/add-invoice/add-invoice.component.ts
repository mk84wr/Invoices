import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpCategoriesService } from 'src/app/api/http-categories.service';
import { HttpCustomersService } from 'src/app/api/http-customers.service';
import { Category } from 'src/app/models/category';
import { Customer } from 'src/app/models/customer';
import { Invoice } from 'src/app/models/invoice';
import { AddCategoryComponent } from '../../categories/add-category/add-category.component';
import { AddCustomerComponent } from '../../customers/add-customer/add-customer.component';
import { requiredValidator } from 'src/app/validators/required-validator'; 
import { CustomerParameters } from 'src/app/models/customerParameters';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent implements OnInit {
  categories:Category[] =[];
  customers:Customer[] = [];
  model:Partial<Invoice>={};
  customer:Partial<Customer> ={};
  category:Partial<Category>={};
  @Output()
  eventTask = new EventEmitter<Partial<Invoice>>();
  invoiceForm!:FormGroup;
  submitted = false;
  submittedButton =false;

  defaultCustomerFilter:CustomerParameters= {        
    isActive: true,
    isVisible: true,
    ascending: true           
    }; 

  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal,
     private httpCustomersService: HttpCustomersService, private httpCategoriesService: HttpCategoriesService,
     private fb: FormBuilder) { }

  ngOnInit(): void {
    this.setCategories();
    this.setCustomers(); 
    this.invoiceForm = this.fb.group({      
      number: new FormControl('',requiredValidator()),
      dateOfInvoice: new FormControl('',requiredValidator()),
      dueDate: new FormControl('',requiredValidator()),
      value: new FormControl('',Validators.required),
      category: new FormControl('',Validators.required),
      customer: new FormControl('',Validators.required)
    });      
  }  
  get invoiceFormControl(){
    return this.invoiceForm.controls;
  }
  addInvoice(){ 
    if(!this.submittedButton){
      this.submitted = true; 
      this.submittedButton =true;      
      if(this.invoiceForm.valid){
        this.model.number = this.model.number?.trim();
        this.eventTask.emit(this.model );
        this.activeModal.close(this.model ); 
      }  
      else{
        this.submittedButton =false;
      }    
    }
  }
  addCustomer(){
    const modalRef = this.modalService.open(AddCustomerComponent, {backdrop: 'static', keyboard: false});   
    modalRef.componentInstance.eventTask.subscribe((x:Partial<Customer>) =>{
    this.customer.name = x.name;
    this.customer.nip = x.nip;
    this.customer.street = x.street;
    this.customer.city = x.city;
    this.postCustomer(this.customer as Customer);    
   });   
  }
  addCategory(){
    const modalRef = this.modalService.open(AddCategoryComponent, {backdrop: 'static', keyboard: false});  
    modalRef.componentInstance.eventTask.subscribe((x:Partial<Category>) =>{  
      this.category.name = x.name;
      this.postCategory(this.category as Category);      
    });
  }
  setCustomers(){       
    this.httpCustomersService.getCustomers(this.getParams(this.defaultCustomerFilter)).subscribe(x => this.customers = x.items);    
  }
  setCategories(){
    this.httpCategoriesService.getCategories().subscribe(x => this.categories = x);
  }
  postCategory(category: Category){
      this.httpCategoriesService.postCategory(category).subscribe(x=>this.categories.unshift(x));
  }
  postCustomer(customer: Customer){
    this.httpCustomersService.postCustomer(customer).subscribe(x => this.customers.unshift(x));
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
}
