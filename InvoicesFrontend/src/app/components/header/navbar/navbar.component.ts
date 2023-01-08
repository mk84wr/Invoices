import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Update } from 'src/app/models/update';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { UpdateDateApi } from '../header.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { UpdateDateComponent } from './update-date/update-date.component';
import { UserPanelComponent } from './user-panel/user-panel.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {
  @Input()
  parentApi?: UpdateDateApi;
  @Input()
  date:Partial<Update>={};

  constructor(private tokenService: TokenService, private modalService: NgbModal, public auth:AuthService) { }

  ngOnChanges(): void {
  }
logout(){
  this.tokenService.logout();  
}
userPanel(){
  const modalRef = this.modalService.open(UserPanelComponent, {backdrop: 'static', keyboard: false}); 
}
updateDate(){
  const modalRef = this.modalService.open(UpdateDateComponent, {backdrop: 'static', keyboard: false}); 
  modalRef.componentInstance.model = Object.assign({},this.date);
  modalRef.result
  .then((result) => {       
    this.parentApi?.setUpdateDate(result as Update);
  }).catch(() => {
    //Tu reakcja na błąd w tym zamknięcie okna
    console.log('error');
  });
  
}


passwordChange(){
  const modalRef = this.modalService.open(PasswordChangeComponent, {backdrop: 'static', keyboard: false}); 
}
}
