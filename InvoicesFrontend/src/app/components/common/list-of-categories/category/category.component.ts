import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryParentComponentApi } from 'src/app/components/categories/categories.component';
import { Category } from 'src/app/models/category';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmationComponent } from '../../confirmation/confirmation.component';
import { EditCategoryComponent } from '../edit-category/edit-category.component';
import { CategoryInvoicesComponent } from './category-invoices/category-invoices.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Input()
  category?:Category;
  @Input()
  index?:number;
  @Input()
  parentApi?: CategoryParentComponentApi
   
  constructor(private modalService: NgbModal, public auth:AuthService) { }

  ngOnInit(): void {
  }
  edit(id?: number): void{
    if(this.auth.isModerator()){
    if(id){
   const modalRef = this.modalService.open(EditCategoryComponent,{ backdrop: 'static', keyboard: false});
   modalRef.componentInstance.model = Object.assign({},this.category)
   modalRef.result
   .then((result) => {
     if (result) {        
       this.parentApi?.edit(result as Category)
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
      modalRef.componentInstance.title="Usunąć kategorię: "+this.category?.name+"?";
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
  invoices(id?:number):void{
    const modalRef = this.modalService.open(CategoryInvoicesComponent,{ size: 'lg', backdrop: 'static', keyboard: false});
    let data ={
      category:this.category     
     }
   modalRef.componentInstance.fromParent = data;
  }
}

