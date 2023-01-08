import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { requiredValidator } from 'src/app/validators/required-validator';
import { passwordValidator } from 'src/app/validators/password-validator'; 
import { HttpUsersService } from 'src/app/api/http-users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  model:Partial<User>={}
  userSubscription!: Subscription;  
  userForm!:FormGroup;
  submitted = false;
  submittedButton =false;
   
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private httpUsersService: HttpUsersService) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: new FormControl('',requiredValidator()), 
      email: new FormControl('',[Validators.email, requiredValidator()]),     
      role: new FormControl('',Validators.required)
    })
  }
  get userFormControl(){
    return this.userForm.controls;
  }
  addUser(){
    if(!this.submittedButton){
    this.submitted = true; 
    this.submittedButton =true;      
    if(this.userForm.valid){
      this.model.name = this.model.name?.trim();
      this.model.email = this.model.email?.trim();            
      this.userSubscription = this.httpUsersService.postUser(this.model as User).subscribe({
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
