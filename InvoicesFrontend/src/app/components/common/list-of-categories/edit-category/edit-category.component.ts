import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { requiredValidator } from 'src/app/validators/required-validator'; 
import { Category } from 'src/app/models/category';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  model:Partial<Category>={};
 
  @Input() fromParent: any;
  @Output()
  eventTask = new EventEmitter<Partial<Category>>();
  categoryForm!:FormGroup;
  submitted = false;
  submittedButton =false;

  constructor( public activeModal: NgbActiveModal, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: new FormControl('',requiredValidator())
    })
  }
  get categoryFormControl(){
    return this.categoryForm.controls;
  }
  
editCategory(){ 
  if(!this.submittedButton){
    this.submitted = true;  
    this.submittedButton=true;      
    if(this.categoryForm.valid){ 
      this.model.name = this.model.name?.trim();        
      this.eventTask.emit(this.model );
      this.activeModal.close(this.model);  
    } 
    else{
      this.submittedButton =false;
    } 
  }
}
}
