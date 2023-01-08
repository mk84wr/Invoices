import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, throwError } from 'rxjs';
import { HttpUsersService } from 'src/app/api/http-users.service';
import { User } from 'src/app/models/user';
import { AddUserComponent } from './add-user/add-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userSubscription!: Subscription;
  users:User[]=[];
  user:Partial<User>={}
  isLoading=true;
  
  constructor(private httpUsersService: HttpUsersService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers(){
    this.userSubscription = this.httpUsersService.getUsers().subscribe({
      next: (response) => {        
        this.users = response;
        this.isLoading=false;
     },
     error:(e)=>{
       console.log(e);       
     }})   
  }
  deleteUser(id:number){
    this.userSubscription = this.httpUsersService.deleteUser(id).subscribe({
      next: (response) => {  
        this.isLoading=true;       
        this.getUsers();
     },
     error:(e)=>{
       console.log(e);       
     }})   
  }
  editUser(user:User){
    this.userSubscription = this.httpUsersService.putUser(user).subscribe({
      next: (response) => { 
        this.isLoading=true;        
        this.getUsers();
     },
     error:(e)=>{              
     }})   
  }
  addUser(user:User){
    this.userSubscription = this.httpUsersService.postUser(user).subscribe({
      next: (response) => { 
        this.isLoading=true;        
        this.getUsers();
     },
     error:(e)=>{      
     }})   
  }
  getUserParentApi():UserParentComponentApi{
    return{
      delete:(id)=>{this.deleteUser(id)},
      edit:(user)=>{this.editUser(user)}, 
      refresh:()=>{this.getUsers()}   
    }
  }
  ngOnDestroy(): void {
    this.userSubscription && this.userSubscription.unsubscribe();
  }
  open() {
    const modalRef =this.modalService.open(AddUserComponent, {backdrop: 'static', keyboard: false});     
  modalRef.result
  .then((result) => {
    this.getUsers();
  })
  }
  }
  export interface UserParentComponentApi {
    delete:(id:number)=>void,
    edit:(user:User)=>void,  
    refresh: ()=>void
  }
