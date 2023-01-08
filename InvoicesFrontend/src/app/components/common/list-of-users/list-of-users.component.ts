import { Component, Input, OnChanges, OnInit} from '@angular/core';
import { User } from 'src/app/models/user';
import { UserParentComponentApi } from '../../users/users.component';

@Component({
  selector: 'app-list-of-users',
  templateUrl: './list-of-users.component.html',
  styleUrls: ['./list-of-users.component.css']
})
export class ListOfUsersComponent implements OnChanges {
  @Input()
  users:User[]=[];
  @Input()
  parentApi?: UserParentComponentApi;  
  page=1;
  pageSize=10;
  
  getUserParentApi(){
    return this.parentApi;
   }
  constructor() {}
 
  ngOnChanges(): void {
  }  
 
}
