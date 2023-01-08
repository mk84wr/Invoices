import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { HttpCategoriesService } from 'src/app/api/http-categories.service';
import { Category } from 'src/app/models/category';
import { AddCategoryComponent } from './add-category/add-category.component';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import  '../../../assets/fonts/Amiri-Regular-normal.js';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
category: Partial<Category>={};
categories: Category[]=[];
categorySubscription!: Subscription;
isLoading=true;
 
constructor(private modalService: NgbModal, private httpCategoriesService: HttpCategoriesService, public auth:AuthService) { }

  ngOnInit(): void {
    this.getCategories();
  }
  toPdf(){
    const doc = new jsPDF();
      
    autoTable(doc, {
      head: [['Lp', 'Nazwa',  'Wartość','Należność']],
      body: this.categories.map((category, index) => [index+1, category.name, category.total??'', category.sum??'']),
      bodyStyles:{font:"Amiri-Regular"},
      headStyles:{font:"Amiri-Regular"}
      
  });    
  window.open(doc.output('bloburl'), '_blank' );   
   
  }
  addCategory(){
    if(this.auth.isModerator()){
    const modalRef = this.modalService.open(AddCategoryComponent, {backdrop: 'static', keyboard: false});   
    modalRef.componentInstance.eventTask.subscribe((x:Partial<Category>) =>{
    this.category.name = x.name;    
    this.postCategory(this.category as Category);      
   });
  }
  }
  postCategory(category: Category){    
    this.categorySubscription = this.httpCategoriesService.postCategory(category).subscribe({
      next: (response) => { 
        this.isLoading=true;        
        this.getCategories();
     },
     error:(e)=>{
       console.log(e);       
     }})   
    
  }
  editCategory(category: Category){
    this.categorySubscription = this.httpCategoriesService.putCategory(category).subscribe({
      next: (response) => {  
        this.isLoading=true;       
        this.getCategories();
     },
     error:(e)=>{
       console.log(e);       
     }})   
  }
  deleteCategory(id: number){
    this.categorySubscription = this.httpCategoriesService.deleteCategory(id).subscribe({
      next: (response) => {
        this.isLoading=true;         
        this.getCategories();
     },
     error:(e)=>{
      alert("Nie można usunąć kategorii z przypisaną fakturą");
       console.log(e);       
     }})   
  }
  getCategories(){
    this.categorySubscription = this.httpCategoriesService.getCategories().subscribe({
      next: (response) => {        
      this.categories = response;
      this.isLoading=false;
     },
     error:(e)=>{
       console.log(e);       
     }})   
  }
  ngOnDestroy(): void {
    this.categorySubscription && this.categorySubscription.unsubscribe();
  }
  getCategoryParentApi():CategoryParentComponentApi{
    return{
      delete:(id)=>{this.deleteCategory(id)},
      edit:(category)=>{this.editCategory(category)}       
    }
   }
}
export interface CategoryParentComponentApi {
  delete:(id:number)=>void,
  edit:(category:Category)=>void
  
}
