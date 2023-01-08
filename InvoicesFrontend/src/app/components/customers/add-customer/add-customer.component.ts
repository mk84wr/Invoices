import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpCustomersService } from 'src/app/api/http-customers.service';
import { Customer } from 'src/app/models/customer';
import { nipValidator } from 'src/app/validators/nip-validator';
import { requiredValidator } from 'src/app/validators/required-validator';



@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  model:Partial<Customer> = {};
  @Output()
  eventTask = new EventEmitter<Partial<Customer>>();
  customerForm!:FormGroup;
  submitted = false;   
  submittedNip=false; 
  nipForm!:FormGroup;
  time=0;
  ready=true;
  submittedButton =false;
   
  constructor(public activeModal: NgbActiveModal, private httpCustomersService: HttpCustomersService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      name: new FormControl('', requiredValidator()),      
      city: new FormControl(),
      street: new FormControl(),
      phone: new FormControl(),
      email: new FormControl('', Validators.email )
    });     
    this.nipForm = this.fb.group({      
      nip: new FormControl('', nipValidator())      
    }) 
  }
  addCustomer(){
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
        this.eventTask.emit(this.model);
        this.activeModal.close(this.model );
      }
      else{
        this.submittedButton =false;
      }
    }
  }  
  get customerFormControl(){
    return this.customerForm.controls;    
  }
  get nipFormControl(){
    return this.nipForm.controls;
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
