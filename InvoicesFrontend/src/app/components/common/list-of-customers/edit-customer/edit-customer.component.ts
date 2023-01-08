import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { HttpCustomersService } from 'src/app/api/http-customers.service';
import { Customer } from 'src/app/models/customer';
import { nipValidator } from 'src/app/validators/nip-validator';
import { requiredValidator } from 'src/app/validators/required-validator';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  @Input() fromParent: any;
  model:Partial<Customer>={};
  @Output()
  eventTask = new EventEmitter<Partial<Customer>>();
  customerForm!:FormGroup;
  submitted = false;   
  submittedNip=false; 
  nipForm!:FormGroup;
  name="";
  time=0;
  ready=true;
  submittedButton =false;

  constructor( public activeModal: NgbActiveModal, private httpCustomersService: HttpCustomersService, private fb: FormBuilder) { }

  ngOnInit(): void { 
    this.name=this.model.name??"";   
    this.customerForm = this.fb.group({
      name: new FormControl('', requiredValidator()),      
      city: new FormControl(),
      street: new FormControl(),
      phone: new FormControl(),
      isActive: new FormControl(),
      isVisible: new FormControl(),
      email: new FormControl('', Validators.email )
    });     
    this.nipForm = this.fb.group({      
      nip: new FormControl('', nipValidator())      
    }) 
   }
   get customerFormControl(){
    return this.customerForm.controls;    
  }
  get nipFormControl(){
    return this.nipForm.controls;
  }
   editCustomer(){ 
    if(!this.submittedButton){  
      this.submitted = true;  
      this.submittedButton=true;       
      if(this.customerForm.valid){  
        if(this.model.nip!=undefined){
          let nip = "";
          for (var i = 0; i < this.model.nip.length; i++) { 
            if(this.model.nip.charAt(i)!='-'){              
              nip = nip+this.model.nip.charAt(i);
            }              
          }  
          this.model.nip = nip;        
        }       
        this.eventTask.emit(this.model );
        this.activeModal.close(this.model); 
      }
      else{
        this.submittedButton =false;
      }
    }
  }
  
  getBusiness(nip:string){
    if(this.ready){
      this.time=60;
      this.ready=false;
      const myInterval =setInterval(() => {
        if (this.time > 0) {
          this.time -= 1;          
        } else {
          this.ready=true
          clearInterval(myInterval);
        }
      }, 500);
    this.submittedNip=true;
    if(this.nipForm.valid){
    this.httpCustomersService.getBusiness(nip).subscribe({
      next: (response) => {        
        this.model.name = response.name;
      this.model.city = response.city;
      this.model.street = response.street;
     },
     error:(e)=>{
      alert("Błąd pobierania podmiotu");       
     }})  
    } 
  }
}

}
