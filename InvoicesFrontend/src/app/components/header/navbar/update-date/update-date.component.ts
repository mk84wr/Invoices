import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpInvoicesService } from 'src/app/api/http-invoices.service';
import { Update } from 'src/app/models/update';



@Component({
  selector: 'app-update-date',
  templateUrl: './update-date.component.html',
  styleUrls: ['./update-date.component.css']
})
export class UpdateDateComponent implements OnInit {
  @Input()
  model:Partial<Update>={};
  @Output()
  eventTask = new EventEmitter<Partial<Update>>();
  submittedButton =false;
 
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void { }

  edit(){  
    if(!this.submittedButton){  
      if(this.model.updateDate?.toString()=='')this.model.updateDate=undefined;     
      this.eventTask.emit(this.model );
      this.activeModal.close(this.model);
    } 
  }  
}
