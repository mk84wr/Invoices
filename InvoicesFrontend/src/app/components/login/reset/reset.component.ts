import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpUsersService } from 'src/app/api/http-users.service';
import { ResetPassword } from 'src/app/models/resetPassword';
import { requiredValidator } from 'src/app/validators/required-validator';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  resetPassword:Partial<ResetPassword>={};
  resetForm!:FormGroup;
  submitted = false;
  submittedButton =false;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private httpUsersService: HttpUsersService ) { }

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      username : new FormControl('',  requiredValidator())
    })
  }
  get resetFormControl(){
    return this.resetForm.controls;
  }
  reset(){
    if(!this.submittedButton){
    this.submitted = true;
    this.submittedButton =true;   
    if(this.resetForm.valid){
      this.httpUsersService.resetPassword(this.resetPassword as ResetPassword).subscribe({
        next: (response) => { 
          this.activeModal.close(); 
       },
       error:(e)=>{
        this.submittedButton =false;
        alert("Użytkownik o takim loginie nie istnieje")         
       }})
      }   
      else{
        this.submittedButton =false;
      }
    }
  }
}
