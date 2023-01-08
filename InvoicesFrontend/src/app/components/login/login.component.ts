import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpUsersService } from 'src/app/api/http-users.service';
import { Login } from 'src/app/models/login';
import { ResetPassword } from 'src/app/models/resetPassword';
import { TokenService } from 'src/app/services/token.service';
import { ResetComponent } from './reset/reset.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:Partial<Login>={};
  responsedata: any;
  submitted = false;
  submittedButton =false;
  
  constructor(private httpUsersService: HttpUsersService, private tokenService: TokenService, private route: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)    
  });

  get loginFormControl(){
    return this.loginForm.controls;
  }  
  reset(){
    if(!this.submittedButton){
      const modalRef = this.modalService.open(ResetComponent,{ backdrop: 'static', keyboard: false}); 
    }
  }
  login(){ 
    if(!this.submittedButton){
    this.submitted = true; 
    this.submittedButton =true;  
    if(this.loginForm.valid){     
      this.user.email = this.loginForm.value.username;
      this.user.password = this.loginForm.value.password;     
      this.httpUsersService.login(this.user as Login).subscribe({        
        next:(response)=>{          
          this.responsedata = response;
          this.tokenService.saveToken(this.responsedata);  
          this.route.navigate(['faktury']);  
        },
        error:(e)=>{             
          this.submittedButton =false;             
          alert("Nieprawidłowy login lub hasło");              
         }}) 
       }
       else{
        this.submittedButton =false;
      }
    }
  }
}
