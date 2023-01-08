import { Component, Input, OnChanges } from '@angular/core';
import { Category } from 'src/app/models/category';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryParentComponentApi } from '../../categories/categories.component';



@Component({
  selector: 'app-list-of-categories',
  templateUrl: './list-of-categories.component.html',
  styleUrls: ['./list-of-categories.component.css']
})
export class ListOfCategoriesComponent implements OnChanges  {
  @Input()
  categories:Category[]=[];
  @Input()
  parentApi?:CategoryParentComponentApi;
  page=1; 
  pageSize=10;
  
  constructor(public auth:AuthService) { } 
  
  ngOnChanges():void{   }   
  
  getCategoryParentApi(){
    return this.parentApi;
   }
 
 
}
