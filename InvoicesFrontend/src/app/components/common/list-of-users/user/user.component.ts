import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { HttpUsersService } from 'src/app/api/http-users.service';
import { UserParentComponentApi } from 'src/app/components/users/users.component';
import { User } from 'src/app/models/user';
import { TokenService } from 'src/app/services/token.service';
import { ConfirmationComponent } from '../../confirmation/confirmation.component';
import { EditUserComponent } from '../edit-user/edit-user.component';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  invoicesSubscription!: Subscription;
  @Input()
  user?:User;
  @Input()
  index?:number;
  @Input()
  parentApi?:UserParentComponentApi
  owner=false
  

  constructor(private modalService: NgbModal, private tokenService: TokenService){}
  ngOnInit(): void {
    if( this.tokenService.getUserIdByToken(this.tokenService.getToken())==this.user?.id) this.owner =true
  }
  delete(id?:number): void{   
    if(id && !this.owner){   
      const modalRef = this.modalService.open(ConfirmationComponent,{ backdrop: 'static', keyboard: false});
      modalRef.componentInstance.title="Usunąć użytkownika: "+this.user?.name+"?";
      modalRef.result
    .then((result) => {
     if (result) {        
      this.parentApi?.delete(id);
     }
    }).catch(() => {
     //Tu reakcja na błąd w tym zamknięcie okna
     console.log('error');
    }); 
    } 
   }
   
   edit(id?: number):void{
    if(id && !this.owner){
      const modalRef = this.modalService.open(EditUserComponent,{ backdrop: 'static', keyboard: false}); 
      modalRef.componentInstance.model = Object.assign({},this.user);
      modalRef.result
    .then((result) => {            
       this.parentApi?.refresh();      
    }).catch(() => {
      //Tu reakcja na błąd w tym zamknięcie okna
      console.log('error');
    });
  }
    }
   
}
