import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Invoice } from 'src/app/models/invoice';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css']
})
export class InvoiceDetailsComponent implements OnInit {
  invoice:Partial<Invoice>={};

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
