import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { HttpUsersService } from 'src/app/api/http-users.service';
import { User } from 'src/app/models/user';
import { requiredValidator } from 'src/app/validators/required-validator';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  model:Partial<User>={};
  @Output()
  eventTask = new EventEmitter<Partial<User>>();
  userForm!:FormGroup;
   submitted = false;
   userSubscription!: Subscription; 
   name="";
   submittedButton =false;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private httpUsersService: HttpUsersService) { }

  ngOnInit(): void {
    this.name = this.model.name ?? "";    
    this.userForm = this.fb.group({
      name: new FormControl('',requiredValidator()), 
      email: new FormControl('',[Validators.email, requiredValidator()]),      
      role: new FormControl('',Validators.required)
    })
  }
  get userFormControl(){
    return this.userForm.controls;
  }
  editUser(){
    if(!this.submittedButton){
    this.submitted = true; 
    this.submittedButton=true;      
    if(this.userForm.valid){
      this.model.name = this.model.name?.trim();
      this.model.email = this.model.email?.trim();       
      this.userSubscription = this.httpUsersService.putUser(this.model as User).subscribe({
        next: (response) => { 
          this.activeModal.close(); 
       },
       error:(e)=>{
        this.submittedButton =false;
        alert("Użytkownik o takim loginie juz istnieje")         
       }}) 
      } 
      else{
        this.submittedButton =false;
      }   
  }
}
ngOnDestroy(): void {
  this.userSubscription && this.userSubscription.unsubscribe();
}
}
