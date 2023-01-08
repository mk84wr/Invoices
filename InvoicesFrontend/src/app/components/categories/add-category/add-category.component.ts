import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/models/category';
import { requiredValidator } from 'src/app/validators/required-validator';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  model:Partial<Category> = {}; 
  @Output()
  eventTask = new EventEmitter<Partial<Category>>();
  categoryForm!:FormGroup;
  submitted = false;
  submittedButton =false;

  constructor(public activeModal: NgbActiveModal,  private fb: FormBuilder) { }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: new FormControl('',requiredValidator())
    })
  }
  get categoryFormControl(){
    return this.categoryForm.controls;
  }
  addCategory(){
    if(!this.submittedButton){
      this.submitted = true; 
      this.submittedButton =true;
      if(this.categoryForm.valid){
        this.model.name = this.model.name?.trim();
        this.eventTask.emit(this.model );
        this.activeModal.close(); 
      }   
      else{
        this.submittedButton =false;
      }            
    }
  }
}
