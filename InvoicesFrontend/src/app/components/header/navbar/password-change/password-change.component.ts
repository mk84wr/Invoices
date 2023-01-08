import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangePassword } from 'src/app/models/changePassword';
import { requiredValidator } from 'src/app/validators/required-validator';
import { passwordValidator } from 'src/app/validators/password-validator';
import { HttpUsersService } from 'src/app/api/http-users.service';
import { compareValidator } from 'src/app/validators/compare-validator';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {  
  model:Partial<ChangePassword>={};
  passwordForm!:FormGroup;
  submitted = false;
  submittedButton =false;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder,  private httpUsersService: HttpUsersService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      currentPassword: new FormControl('', requiredValidator()),
      newPassword: new FormControl('', [requiredValidator(),passwordValidator()]),
      reNewPassword: new FormControl('', [requiredValidator(),passwordValidator()])
    },{ validators: compareValidator()})
  }
  get passwordFormControl(){
    return this.passwordForm.controls;    
  }
  
changePassword(){  
  if(!this.submittedButton){ 
  this.submitted = true;
  this.submittedButton=true;
  if(this.passwordForm.valid){
    this.model.currentPassword = this.passwordForm.value.currentPassword;
    this.model.newPassword = this.passwordForm.value.newPassword;
    this.httpUsersService.changePassword(this.tokenService.getUserIdByToken(this.tokenService.getToken()), this.model as ChangePassword).subscribe({
      next: (response) => { 
        this.activeModal.close(); 
     },
     error:(e)=>{
      this.submittedButton =false;
      alert("Błędnie podane aktualne hasło")         
     }}) 
    } 
    else{
      this.submittedButton =false;
    } 
  }
}

}
