import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { HttpCategoriesService } from 'src/app/api/http-categories.service';
import { Invoice } from 'src/app/models/invoice';
import { InvoiceParameters } from 'src/app/models/invoiceParameters';
import { CategoryInvoicesFilterComponent } from '../category-invoices-filter/category-invoices-filter.component';

@Component({
  selector: 'app-category-invoices',
  templateUrl: './category-invoices.component.html',
  styleUrls: ['./category-invoices.component.css']
})
export class CategoryInvoicesComponent implements OnInit {
  @Input() fromParent: any;
  categorySubscription!: Subscription;
  invoiceParameters:InvoiceParameters={}
  invoices:Invoice[]=[];
  isLoading=true;

  defaultInvoiceFilter:InvoiceParameters= {        
    isActive: true,
    isVisible: true,
    ascending: false 
    };

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private httpCategoriesService:  HttpCategoriesService) { }

  ngOnInit(): void {
    this.invoiceParameters = this.defaultInvoiceFilter;
    this.getInvoicesFromCategory(this.fromParent.category.id, this.getParams(this.invoiceParameters)); 
  }
  filter(){
    const modalRef = this.modalService.open(CategoryInvoicesFilterComponent, { backdrop: 'static', keyboard: false});
    modalRef.componentInstance.model = Object.assign({}, this.invoiceParameters);

    modalRef.result
    .then((result) => {
      if (result) {   
        this.isLoading=true;      
        this.invoiceParameters = result;
        this.getInvoicesFromCategory(this.fromParent.category.id, this.getParams(this.invoiceParameters));
      }
    }).catch(() => {      
      console.log('error');
    });
  }
  getInvoicesFromCategory(id:number, params: HttpParams){
    this.categorySubscription = this.httpCategoriesService.getInvoices(id, params).subscribe({
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
