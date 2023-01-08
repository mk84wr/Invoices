import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpUsersService } from 'src/app/api/http-users.service';
import { User } from 'src/app/models/user';
import { TokenService } from 'src/app/services/token.service';
import { requiredValidator } from 'src/app/validators/required-validator';


@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {
  model:Partial<User>={};
  userForm!:FormGroup;
  submitted = false;
  submittedButton =false;

  constructor(public activeModal: NgbActiveModal, private httpUsersService: HttpUsersService, private tokenService: TokenService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.setData();
    this.userForm = this.fb.group({
      name: new FormControl('', requiredValidator()),
      email: new FormControl('', [requiredValidator(), Validators.email])
    })
  }
  get userFormControl(){
    return this.userForm.controls;    
  }
  setData(){
    const id = this.tokenService.getUserIdByToken(this.tokenService.getToken());
    this.httpUsersService.getUser(id).subscribe(x => this.model = x);
  }
  editData(){
    if(!this.submittedButton){ 
    this.submitted = true;
    this.submittedButton=true; 
    if(this.userForm.valid){
      this.httpUsersService.putUser(this.model as User).subscribe({
        next: (response) => { 
          this.activeModal.close(); 
       },
       error:(e)=>{
        this.submittedButton =false; 
        alert("Ten login jest już zajęty")                 
       }}) 
      }
      else{
        this.submittedButton =false;
      }  
    }   
  }
}
