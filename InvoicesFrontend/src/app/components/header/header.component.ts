import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpInvoicesService } from 'src/app/api/http-invoices.service';
import { Update } from 'src/app/models/update';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  update:Partial<Update>={};
  updateSubscription!: Subscription;
  constructor(private httpInvoicesService: HttpInvoicesService ) { }

  ngOnInit(): void {
    this.getUpdate();
  }
  ngOnDestroy(): void {
    this.updateSubscription && this.updateSubscription.unsubscribe();
  }
  getUpdate(){
    this.updateSubscription = this.httpInvoicesService.getUpdateDate(1).subscribe({
      next: (response) => {                        
        this.update = response;
     },
     error:(e)=>{
       console.log(e);       
     }})   
    
  }
  setUpdateDate(update:Update){    
    this.updateSubscription = this.httpInvoicesService.putUpdateDate(update).subscribe({
      next: (response) => {        
        this.getUpdate();
     },
     error:(e)=>{
       console.log(e);       
     }});  
  }
  getUpdateDateParentApi():UpdateDateApi{
    return{
      getUpdateDate:()=>{this.getUpdate()},
      setUpdateDate:(update)=>{this.setUpdateDate(update)}
    }
  }
  
}
export interface UpdateDateApi{
  getUpdateDate:()=>void,
  setUpdateDate:(update:Update)=>void
}
