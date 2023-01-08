import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  title="";
  @Output()
  eventTask = new EventEmitter<boolean>(); 

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }
  confirm(){
    this.eventTask.emit(true);
    this.activeModal.close(true); 
  }
  cancel(){
    this.eventTask.emit(false);
    this.activeModal.close(false);
  }
}
