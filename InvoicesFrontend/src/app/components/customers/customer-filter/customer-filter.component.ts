import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerParameters } from 'src/app/models/customerParameters';

@Component({
  selector: 'app-customer-filter',
  templateUrl: './customer-filter.component.html',
  styleUrls: ['./customer-filter.component.css']
})
export class CustomerFilterComponent implements OnInit {
  model:CustomerParameters={};
  submittedButton =false;

  fields:{en:string, pl:string}[]=
 [{en:"Name", pl: "Nazwa"},
 {en:"City", pl:"Miasto"}, 
 {en:"Total", pl:"Wartość faktur"},
 {en:"Sum", pl: "Należność"}];

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    if(this.model.ascending==null)this.model.ascending=false;
  }
  filter(){  
    if(!this.submittedButton){
      this.submittedButton=true; 
      this.model.nip = this.model.nip?.trim();
      this.model.name = this.model.name?.trim();
      if(this.model.nip=='')this.model.nip=undefined;
      if(this.model.name=='')this.model.name=undefined;
      this.activeModal.close(this.model);
    }
  }
}
