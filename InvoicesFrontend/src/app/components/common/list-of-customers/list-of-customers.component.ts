
import { Component,  Input, OnChanges } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerParentComponentApi } from '../../customers/customers.component';


@Component({
  selector: 'app-list-of-customers',
  templateUrl: './list-of-customers.component.html',
  styleUrls: ['./list-of-customers.component.css']
})
export class ListOfCustomersComponent implements OnChanges {
  @Input()
  customers:Customer[]=[]; 
  @Input()
  parentApi?: CustomerParentComponentApi
 
  pageSize=10;
  page=1;
 
  constructor(public auth:AuthService) { }
  
  ngOnChanges():void{  }  
  getCustomerParentApi(){
  return this.parentApi;
 }
}
